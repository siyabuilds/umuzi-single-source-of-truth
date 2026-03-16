import { NextResponse } from "next/server";
import { loadAllGoogleDocs } from "../../../lib/google-docs-reader";
import { chunkAllDocuments } from "../../../lib/chunker";
import { embedAllChunks } from "../../../lib/embeddings";
import {
  bulkInsertGoogleDocsContent,
  clearAllGoogleDocsContent,
  countGoogleDocsContent,
} from "../../../lib/repositories/google-docs-content";
import type { CreateGoogleDocsContent } from "../../../lib/db-types";

// POST /api/ingest-google-docs — Fetches Google Docs from Drive, chunks them,
// embeds them, and stores everything (text + vector) in the database.
// WARNING: Clears existing Google Docs content first (full re-ingest).
export async function POST(req: Request) {
  if (req.headers.get("x-ingest-secret") !== process.env.INGEST_SECRET_CODE) {
    return NextResponse.json(
      { error: "Unauthorized: Invalid secret code" },
      { status: 401 },
    );
  }

  try {
    // 1. Load Google Docs from Drive folder
    console.log("Loading Google Docs from Drive...");
    const docs = await loadAllGoogleDocs();

    if (docs.length === 0) {
      return NextResponse.json(
        { error: "No Google Docs found in the configured Drive folder." },
        { status: 404 },
      );
    }

   // 2. Convert to the format expected by the chunker
const docsForChunking = docs.map((doc) => ({
  title: doc.title,
  body: doc.content,
  filePath: doc.id,
}));

    // 3. Split documents into overlapping chunks
    const chunks = chunkAllDocuments(docsForChunking);

    // 4. Compute Gemini embeddings for every chunk
    console.log(`Computing embeddings for ${chunks.length} chunks via Gemini...`);
    const embeddedChunks = await embedAllChunks(chunks, (batch, total) => {
      console.log(`  Embedding batch ${batch + 1}/${total}`);
    });

    // 5. Build database records with embeddings attached
    const records: CreateGoogleDocsContent[] = embeddedChunks.map((chunk) => ({
      title: chunk.title,
      chunk_text: chunk.chunkText,
      embedding_vector: chunk.embedding,
      doc_url: docs.find((d) => d.id === chunk.sourceFile)?.url ?? undefined,
    }));

    // WARNING: Clears existing Google Docs content first (full re-ingest).
    const deleted = await clearAllGoogleDocsContent();

    // 6. Bulk insert in batches of 50
    const BATCH_SIZE = 50;
    let inserted = 0;
    for (let i = 0; i < records.length; i += BATCH_SIZE) {
      const batch = records.slice(i, i + BATCH_SIZE);
      const count = await bulkInsertGoogleDocsContent(batch);
      inserted += count;
    }

    const total = await countGoogleDocsContent();

    return NextResponse.json({
      message: "Google Docs ingestion complete (with embeddings)",
      documentsFound: docs.length,
      chunksCreated: chunks.length,
      embeddingsComputed: embeddedChunks.length,
      previousRecordsDeleted: deleted,
      recordsInserted: inserted,
      totalRecordsInDb: total,
    });
  } catch (err) {
    console.error("Google Docs ingestion error:", err);
    return NextResponse.json(
      { error: "Google Docs ingestion failed", details: String(err) },
      { status: 500 },
    );
  }
}
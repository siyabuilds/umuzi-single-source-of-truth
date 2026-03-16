// Repository for managing Google Docs content chunks in the database.
// Uses Prisma Client for all database operations instead of raw SQL.
// Note: embedding_vector uses raw SQL via prisma.$queryRaw because pgvector
// is not natively supported by Prisma.
import prisma from "../prisma";
import type { GoogleDocsContent } from "../generated/prisma";
import type { CreateGoogleDocsContent, GoogleDocsContentWithSimilarity } from "../db-types";

// Insert a single Google Docs content record
export async function insertGoogleDocsContent(
  data: CreateGoogleDocsContent,
): Promise<GoogleDocsContent> {
  const { title, chunk_text, embedding_vector, doc_url } = data;

  const result = await prisma.$queryRaw<GoogleDocsContent[]>`
    INSERT INTO google_docs_content (title, chunk_text, embedding_vector, doc_url)
    VALUES (${title}, ${chunk_text}, ${embedding_vector ? `[${embedding_vector.join(",")}]` : null}::vector, ${doc_url ?? null})
    RETURNING *
  `;

  return result[0];
}

// Search Google Docs content by vector similarity using cosine distance.
export async function searchGoogleDocsByEmbedding(
  embedding: number[],
  limit: number = 5,
): Promise<GoogleDocsContentWithSimilarity[]> {
  const embeddingStr = `[${embedding.join(",")}]`;

  return prisma.$queryRaw<GoogleDocsContentWithSimilarity[]>`
    SELECT *, 1 - (embedding_vector <=> ${embeddingStr}::vector) as similarity
    FROM google_docs_content
    WHERE embedding_vector IS NOT NULL
    ORDER BY embedding_vector <=> ${embeddingStr}::vector
    LIMIT ${limit}
  `;
}

// Fetch all chunks belonging to a specific document title.
// Used during document expansion in the RAG pipeline.
export async function getGoogleDocsChunksByTitle(
  title: string,
): Promise<GoogleDocsContent[]> {
  return prisma.googleDocsContent.findMany({
    where: { title },
    orderBy: { id: "asc" },
  });
}

// Bulk insert many Google Docs content records in a single transaction.
export async function bulkInsertGoogleDocsContent(
  records: CreateGoogleDocsContent[],
): Promise<number> {
  if (records.length === 0) return 0;

  await prisma.$transaction(
    records.map((r) =>
      prisma.$executeRaw`
        INSERT INTO google_docs_content (title, chunk_text, embedding_vector, doc_url)
        VALUES (
          ${r.title},
          ${r.chunk_text},
          ${r.embedding_vector ? `[${r.embedding_vector.join(",")}]` : null}::vector,
          ${r.doc_url ?? null}
        )
      `,
    ),
  );

  return records.length;
}

// Delete all Google Docs content records — used before a full re-ingest
export async function clearAllGoogleDocsContent(): Promise<number> {
  const result = await prisma.googleDocsContent.deleteMany();
  return result.count;
}

// Count total Google Docs content records
export async function countGoogleDocsContent(): Promise<number> {
  return prisma.googleDocsContent.count();
}
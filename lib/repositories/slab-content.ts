// Repository for managing Slab/Markdown document chunks in the database.
// Uses Prisma Client for all database operations instead of raw SQL.
// Note: embedding_vector uses raw SQL via prisma.$queryRaw because pgvector
// is not natively supported by Prisma.
import prisma from "../prisma";
import type { SlabContent } from "../generated/prisma";
import type {
  CreateSlabContent,
  SlabContentWithSimilarity,
} from "../db-types";

// Insert a single slab content record
export async function insertSlabContent(
  data: CreateSlabContent,
): Promise<SlabContent> {
  const { title, chunk_text, embedding_vector, slab_url } = data;

  const result = await prisma.$queryRaw<SlabContent[]>`
    INSERT INTO slab_content (title, chunk_text, embedding_vector, slab_url)
    VALUES (${title}, ${chunk_text}, ${embedding_vector ? `[${embedding_vector.join(",")}]` : null}::vector, ${slab_url ?? null})
    RETURNING *
  `;

  return result[0];
}

// Find a single slab content record by ID
export async function findSlabContentById(
  id: number,
): Promise<SlabContent | null> {
  return prisma.slabContent.findUnique({
    where: { id },
  });
}

// Search slab content by vector similarity using cosine distance.
// Returns the most similar document chunks above the similarity threshold.
export async function searchByEmbedding(
  embedding: number[],
  limit: number = 5,
): Promise<SlabContentWithSimilarity[]> {
  const embeddingStr = `[${embedding.join(",")}]`;

  return prisma.$queryRaw<SlabContentWithSimilarity[]>`
    SELECT *, 1 - (embedding_vector <=> ${embeddingStr}::vector) as similarity
    FROM slab_content
    WHERE embedding_vector IS NOT NULL
    ORDER BY embedding_vector <=> ${embeddingStr}::vector
    LIMIT ${limit}
  `;
}

// Get all slab content records with pagination
export async function getAllSlabContent(
  limit: number = 50,
  offset: number = 0,
): Promise<SlabContent[]> {
  return prisma.slabContent.findMany({
    orderBy: { created_at: "desc" },
    take: limit,
    skip: offset,
  });
}

// Update the embedding vector for a slab content record
export async function updateSlabContentEmbedding(
  id: number,
  embedding: number[],
): Promise<SlabContent | null> {
  const embeddingStr = `[${embedding.join(",")}]`;

  const result = await prisma.$queryRaw<SlabContent[]>`
    UPDATE slab_content
    SET embedding_vector = ${embeddingStr}::vector
    WHERE id = ${id}
    RETURNING *
  `;

  return result[0] ?? null;
}

// Delete a slab content record by ID
export async function deleteSlabContent(id: number): Promise<boolean> {
  const result = await prisma.slabContent.deleteMany({
    where: { id },
  });

  return result.count > 0;
}

// Bulk insert many content records in a single transaction.
// Used during ingestion to store all chunks efficiently.
export async function bulkInsertSlabContent(
  records: CreateSlabContent[],
): Promise<number> {
  if (records.length === 0) return 0;

  let totalInserted = 0;

  // Use a transaction to insert all records safely one by one
  await prisma.$transaction(
    records.map((r) =>
      prisma.$executeRaw`
        INSERT INTO slab_content (title, chunk_text, embedding_vector, slab_url)
        VALUES (
          ${r.title},
          ${r.chunk_text},
          ${r.embedding_vector ? `[${r.embedding_vector.join(",")}]` : null}::vector,
          ${r.slab_url ?? null}
        )
      `,
    ),
  );

  totalInserted = records.length;
  return totalInserted;
}
// Delete all slab content records — used before a full re-ingest
export async function clearAllSlabContent(): Promise<number> {
  const result = await prisma.slabContent.deleteMany();
  return result.count;
}

// Count total slab content records
export async function countSlabContent(): Promise<number> {
  return prisma.slabContent.count();
}

// Fetch all chunks belonging to a specific document title.
// Used during document expansion in the RAG pipeline.
export async function getChunksByTitle(title: string): Promise<SlabContent[]> {
  return prisma.slabContent.findMany({
    where: { title },
    orderBy: { id: "asc" },
  });
}
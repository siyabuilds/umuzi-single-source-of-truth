import { embedText, generateText } from "./gemini";
import { searchByEmbedding } from "./repositories/slab-content";
import type { SlabContentWithSimilarity } from "./db-types";

// Default number of top relevant chunks to retrieve for context. Can be overridden by caller.
const DEFAULT_TOP_N = 5;

/**
 * Parse the CITED_SOURCES line from the LLM response and strip it from the answer text.
 *
 * Expected format at the end of the response:
 *   CITED_SOURCES: 1, 3, 5
 * or
 *   CITED_SOURCES: none
 *
 * Returns the clean answer and an array of 1-based source indices.
 * If the marker is missing or unparseable, citedIndices will be empty
 * so the caller can fall back to returning all sources.
 */
function parseCitedSources(raw: string): {
  answer: string;
  citedIndices: number[];
} {
  const marker = /\n?\s*CITED_SOURCES:\s*(.+)$/i;
  const match = raw.match(marker);

  if (!match) {
    return { answer: raw.trim(), citedIndices: [] };
  }

  const answer = raw.replace(marker, "").trim();
  const value = match[1].trim().toLowerCase();

  if (value === "none") {
    return { answer, citedIndices: [] };
  }

  const citedIndices = value
    .split(/[,\s]+/)
    .map((s) => parseInt(s, 10))
    .filter((n) => !isNaN(n));

  return { answer, citedIndices };
}

// Relevance threshold for retrieved chunks (0 to 1). Chunks with similarity below this will be discarded.
const RELEVANCE_THRESHOLD = 0.3;

// Interface for the RAG result returned by askQuestion()
export interface RAGResult {
  answer: string;
  sources: SlabContentWithSimilarity[];
}

// Helper function to build the prompt for the LLM, combining the question and retrieved context chunks.
function buildPrompt(
  question: string,
  chunks: SlabContentWithSimilarity[],
): string {
  const contextBlock = chunks
    .map(
      (chunk, i) =>
        `--- Source ${i + 1} (${chunk.title}, similarity: ${chunk.similarity.toFixed(3)}) ---\n${chunk.chunk_text}`,
    )
    .join("\n\n");

  return `You are Zazu, an internal assistant for Umuzi staff.
Answer the question below using ONLY the provided context. If the context
does not contain enough information to answer, say so honestly rather than
guessing.

Keep answers clear, concise, and well-structured. Use bullet points or
numbered lists when appropriate.

After your answer, on a NEW line, list ONLY the source numbers you actually
used to compose your answer in the format:
CITED_SOURCES: 1, 3
If you did not use any source, write:
CITED_SOURCES: none

--- CONTEXT ---
${contextBlock}

--- QUESTION ---
${question}

--- ANSWER ---`;
}

/**
 * Full RAG pipeline:
 * 1. Embed the user's question via Gemini.
 * 2. Query pgvector for the top-N most relevant content chunks.
 * 3. Filter out chunks below the relevance threshold.
 * 4. Build a prompt with the retrieved context and generate an answer.
 *
 * @param question  – the user's natural-language question.
 * @param topN      – how many chunks to retrieve (default 5).
 * @returns The generated answer together with the source chunks used.
 */
export async function askQuestion(
  question: string,
  topN: number = DEFAULT_TOP_N,
): Promise<RAGResult> {
  // 1. Convert question into a 768-dim embedding
  const questionEmbedding = await embedText(question);

  // 2. Retrieve the most similar chunks from pgvector
  const topChunks = await searchByEmbedding(questionEmbedding, topN);

  // 3. Filter out low-relevance results
  const relevantChunks = topChunks.filter(
    (chunk) => chunk.similarity >= RELEVANCE_THRESHOLD,
  );

  // 4. If nothing relevant was found, return a "no info" answer
  if (relevantChunks.length === 0) {
    return {
      answer:
        "I couldn't find any relevant information in the knowledge base to answer your question. " +
        "Try rephrasing, or reach out to the relevant team directly.",
      sources: [],
    };
  }

  // 5. Build the augmented prompt and generate an answer
  const prompt = buildPrompt(question, relevantChunks);
  const rawAnswer = await generateText(prompt);

  // 6. Parse cited sources and return only the ones the LLM actually used
  const { answer, citedIndices } = parseCitedSources(rawAnswer);

  const citedSources =
    citedIndices.length > 0
      ? relevantChunks.filter((_, i) => citedIndices.includes(i + 1))
      : relevantChunks; // fallback: return all if parsing fails

  return { answer, sources: citedSources };
}

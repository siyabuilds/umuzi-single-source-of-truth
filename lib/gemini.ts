import { GoogleGenAI } from "@google/genai";
 
// Gemini API client setup
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error(
    "GEMINI_API_KEY environment variable is not set. " +
      "Add it to .env.local or your deployment secrets.",
  );
}
 
export const genai = new GoogleGenAI({ apiKey });
 
// Centralized model names for easy maintenance and consistency across the codebase.
// Embedding model used for vectorizing text chunks.
export const EMBEDDING_MODEL = "gemini-embedding-001";
 
// Chat model used for any LLM interactions
export const CHAT_MODEL = "gemini-3-flash-preview";
 
// Task types supported by the Gemini embedding API.
// RETRIEVAL_DOCUMENT: for embedding content chunks during ingestion.
// RETRIEVAL_QUERY: for embedding user questions at query time.
// SEMANTIC_SIMILARITY: general-purpose similarity (former default when unset).
export type EmbeddingTaskType =
  | "RETRIEVAL_DOCUMENT"
  | "RETRIEVAL_QUERY"
  | "SEMANTIC_SIMILARITY";
 
// Generate a 768-dim embedding vector for a single text input.
// Defaults to RETRIEVAL_QUERY since this is only called at query time (in rag.ts).
export async function embedText(
  text: string,
  taskType: EmbeddingTaskType = "RETRIEVAL_QUERY",
): Promise<number[]> {
  const response = await genai.models.embedContent({
    model: EMBEDDING_MODEL,
    contents: text,
    config: { outputDimensionality: 768, taskType },
  });
 
  const embedding = response.embeddings?.[0]?.values;
  if (!embedding) {
    throw new Error("Gemini returned no embedding for the provided text.");
  }
  return embedding;
}
 
// Generate embedding vectors for an array of texts in batches.
// Defaults to RETRIEVAL_DOCUMENT since this is only called during ingestion (in embeddings.ts).
export async function embedTexts(
  texts: string[],
  taskType: EmbeddingTaskType = "RETRIEVAL_DOCUMENT",
): Promise<number[][]> {
  if (texts.length === 0) return [];
 
  const response = await genai.models.embedContent({
    model: EMBEDDING_MODEL,
    contents: texts,
    config: { outputDimensionality: 768, taskType },
  });
 
  const embeddings = response.embeddings;
  if (!embeddings || embeddings.length !== texts.length) {
    throw new Error(
      `Expected ${texts.length} embeddings but received ${embeddings?.length ?? 0}.`,
    );
  }
 
  return embeddings.map((e) => {
    if (!e.values) throw new Error("Embedding values missing in response.");
    return e.values;
  });
}
 
// Generate text using the Gemini chat model.
export async function generateText(prompt: string): Promise<string> {
  const response = await genai.models.generateContent({
    model: CHAT_MODEL,
    contents: prompt,
  });
 
  return response.text ?? "";
}
// @agent-platform/core — Memory Store (PARA-inspired knowledge base)

import { ulid } from "ulid";

export interface MemoryEntry {
  id: string;
  type: "user" | "project" | "reference" | "feedback";
  content: string;
  tags: string[];
  confidence: "user_stated" | "observed" | "inferred";
  sessionId: string;
  createdAt: Date;
}

export interface MemoryQuery {
  text?: string;
  tags?: string[];
  type?: MemoryEntry["type"];
  limit?: number;
}

export interface MemorySaveParams {
  sessionId: string;
  messages: unknown[]; // Will be analyzed for memory extraction
}

export class MemoryStore {
  private entries: MemoryEntry[] = [];

  async save(params: MemorySaveParams): Promise<void> {
    // In production: use embeddings + vector DB.
    // For MVP: store key facts from messages as structured entries.
    // The extraction logic is pluggable — start simple.
  }

  async search(query: MemoryQuery): Promise<MemoryEntry[]> {
    let results = [...this.entries];
    if (query.type) results = results.filter((e) => e.type === query.type);
    if (query.tags?.length)
      results = results.filter((e) =>
        query.tags!.some((t) => e.tags.includes(t))
      );
    // In production: vector similarity search
    const limit = query.limit ?? 10;
    return results.slice(0, limit);
  }

  /** Extract structured facts from conversation messages */
  async extractFacts(messages: { role: string; content: string }[]): Promise<MemoryEntry[]> {
    // MVP: simple keyword-based extraction
    // Production: LLM-driven fact extraction
    return [];
  }
}

export interface MemorySearchResult {
  entry: MemoryEntry;
  score: number;
}

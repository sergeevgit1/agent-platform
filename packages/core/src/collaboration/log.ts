// @agent-platform/core — Collaboration Log (open-core differentiation)
// Transparent inner monologue: the user sees WHAT the agent thinks,
// not just the final answer. This is the core of human-agent collaboration.

import { ulid } from "ulid";

export type ThoughtType = "reasoning" | "tool_call" | "tool_result" | "delegation" | "decision" | "draft";

export interface ThoughtStep {
  id: string;
  type: ThoughtType;
  agentSlot: string;
  content: string;
  timestamp: Date;
  metadata?: Record<string, unknown>;
}

export class CollaborationLog {
  private steps: ThoughtStep[] = [];
  private subscribers: Set<(step: ThoughtStep) => void> = new Set();

  /** Record a new thought step and notify subscribers */
  append(type: ThoughtType, agentSlot: string, content: string, metadata?: Record<string, unknown>): ThoughtStep {
    const step: ThoughtStep = {
      id: ulid(),
      type,
      agentSlot,
      content,
      timestamp: new Date(),
      metadata,
    };
    this.steps.push(step);
    for (const sub of this.subscribers) sub(step);
    return step;
  }

  /** Subscribe to real-time thought streaming */
  onThought(fn: (step: ThoughtStep) => void): () => void {
    this.subscribers.add(fn);
    return () => this.subscribers.delete(fn);
  }

  /** Get the full log */
  all(): ThoughtStep[] {
    return [...this.steps];
  }

  /** Export for human review — the "transparency report" */
  toMarkdown(): string {
    if (this.steps.length === 0) return "_No thoughts recorded._";
    
    return this.steps
      .map((s) => {
        const icon = {
          reasoning: "💭",
          tool_call: "🔧",
          tool_result: "📋",
          delegation: "🤝",
          decision: "⚡",
          draft: "✍️",
        }[s.type];
        return `[${s.timestamp.toISOString()}] ${icon} **${s.agentSlot}** (${s.type}): ${s.content}`;
      })
      .join("\n");
  }
}

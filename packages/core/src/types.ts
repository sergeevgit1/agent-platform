// @agent-platform/core — Orchestration types

import { z } from "zod";

// ── Agent Identity ────────────────────────────────────────
export const AgentRoleSchema = z.enum(["lead", "specialist"]);
export type AgentRole = z.infer<typeof AgentRoleSchema>;

export interface AgentIdentity {
  slotId: string;
  name: string;
  role: string;
  focus: string;
  systemPrompt: string;
}

// ── Team ──────────────────────────────────────────────────
export interface TeamManifest {
  lead: AgentIdentity;
  specialists: AgentIdentity[];
}

// ── Tool Definition ───────────────────────────────────────
export const ToolParameterSchema = z.object({
  name: z.string(),
  type: z.enum(["string", "number", "boolean", "array", "object"]),
  description: z.string(),
  required: z.boolean().default(true),
});

export const ToolDefinitionSchema = z.object({
  name: z.string(),
  description: z.string(),
  parameters: z.array(ToolParameterSchema),
  execute: z.function().optional(), // runtime executor
});

export type ToolDefinition = z.infer<typeof ToolDefinitionSchema> & {
  execute?: (args: Record<string, unknown>) => Promise<ToolResult>;
};

// ── Message Protocol ──────────────────────────────────────
export interface Message {
  id: string;
  role: "user" | "agent" | "system" | "tool";
  agentSlot?: string;
  content: string;
  toolCalls?: ToolCall[];
  toolResults?: ToolResult[];
  createdAt: Date;
}

export interface ToolCall {
  id: string;
  name: string;
  arguments: Record<string, unknown>;
}

export interface ToolResult {
  toolCallId: string;
  output: string;
  error?: string;
}

// ── Turn ──────────────────────────────────────────────────
export interface TurnContext {
  sessionId: string;
  turnNumber: number;
  messages: Message[];
  team: TeamManifest;
  availableTools: ToolDefinition[];
  workspacePath: string;
}

export interface TurnResult {
  response: string;
  messages: Message[];
  toolCalls: ToolCall[];
  delegation?: DelegationTarget;
}

export interface DelegationTarget {
  agentSlot: string;
  task: string;
}

// @agent-platform/core — Tool Registry
// Manages tool definitions and provides execution sandbox

import type { ToolDefinition } from "../types.js";

export class ToolRegistry {
  private tools: Map<string, ToolDefinition> = new Map();

  register(tool: ToolDefinition): void {
    this.tools.set(tool.name, tool);
  }

  registerAll(tools: ToolDefinition[]): void {
    for (const t of tools) this.register(t);
  }

  get(name: string): ToolDefinition | undefined {
    return this.tools.get(name);
  }

  list(): ToolDefinition[] {
    return [...this.tools.values()];
  }

  /** Convert to LLM function-calling format (OpenAI-compatible) */
  toLLMFormat(): unknown[] {
    return this.list().map((t) => ({
      type: "function",
      function: {
        name: t.name,
        description: t.description,
        parameters: {
          type: "object",
          properties: Object.fromEntries(
            t.parameters.map((p) => [
              p.name,
              { type: p.type, description: p.description },
            ])
          ),
          required: t.parameters.filter((p) => p.required).map((p) => p.name),
        },
      },
    }));
  }
}

// ── Built-in tools ─────────────────────────────────────────

export const builtInTools: ToolDefinition[] = [
  {
    name: "delegate_to_specialist",
    description:
      "Delegate a task to a specialist agent on the team. Use this when the task matches a specialist's expertise.",
    parameters: [
      {
        name: "agentSlot",
        type: "string",
        description: "Specialist slot ID (e.g. 'agent-1')",
        required: true,
      },
      {
        name: "task",
        type: "string",
        description: "Clear, specific instructions for the specialist",
        required: true,
      },
    ],
  },
  {
    name: "file_read",
    description:
      "Read the contents of a workspace file. Returns the file text.",
    parameters: [
      {
        name: "path",
        type: "string",
        description: "Path relative to workspace",
        required: true,
      },
    ],
  },
  {
    name: "file_write",
    description: "Write content to a workspace file.",
    parameters: [
      {
        name: "path",
        type: "string",
        description: "Path relative to workspace",
        required: true,
      },
      {
        name: "content",
        type: "string",
        description: "Content to write",
        required: true,
      },
    ],
  },
  {
    name: "web_search",
    description:
      "Search the web for information. Returns relevant results.",
    parameters: [
      {
        name: "query",
        type: "string",
        description: "Search query",
        required: true,
      },
    ],
  },
];

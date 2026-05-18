// @agent-platform/integrations — Composio adapter

import type { ToolDefinition } from "@agent-platform/core";

export interface ComposioConfig {
  apiKey: string;
  baseUrl?: string;
}

/**
 * Wrap Composio tools as @agent-platform/core ToolDefinitions.
 * This gives all 50+ managed integrations automatically.
 */
export function createComposioAdapter(
  config: ComposioConfig
): {
  listTools: (toolkit: string) => Promise<ToolDefinition[]>;
  executeTool: (toolId: string, args: Record<string, unknown>) => Promise<string>;
} {
  const baseUrl = config.baseUrl ?? "https://backend.composio.dev/api/v2";

  return {
    async listTools(toolkit: string): Promise<ToolDefinition[]> {
      const res = await fetch(`${baseUrl}/actions?appId=${toolkit}`, {
        headers: { "X-API-Key": config.apiKey },
      });
      if (!res.ok) return [];

      const data = await res.json() as { items?: Array<{ name: string; description: string; parameters: Record<string, unknown> }> };
      return (data.items ?? []).map((item) => ({
        name: `${toolkit}__${item.name}`,
        description: `${item.description} (via ${toolkit})`,
        parameters: Object.entries(item.parameters ?? {}).map(([name, schema]) => ({
          name,
          type: (schema as { type?: string }).type as ToolDefinition["parameters"][0]["type"] ?? "string",
          description: (schema as { description?: string }).description ?? name,
          required: (schema as { required?: boolean }).required ?? false,
        })),
      }));
    },

    async executeTool(toolId: string, args: Record<string, unknown>): Promise<string> {
      const res = await fetch(`${baseUrl}/actions/${toolId}/execute`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": config.apiKey,
        },
        body: JSON.stringify({ input: args }),
      });
      const data = await res.json() as { output?: unknown };
      return JSON.stringify(data.output ?? data);
    },
  };
}

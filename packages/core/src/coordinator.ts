// @agent-platform/core — Coordinator Orchestration Loop
// The central engine that runs the lead agent's turn:
//   1. Receive message
//   2. Plan → Execute tools → Delegate → Respond
//   3. Stream the inner monologue (open-core differentiation)

import { ulid } from "ulid";
import type {
  TurnContext,
  TurnResult,
  Message,
  ToolCall,
  ToolResult,
  DelegationTarget,
} from "./types.js";
import { LLMService } from "./llm/index.js";
import { ToolRegistry } from "./tools/registry.js";
import { MemoryStore } from "./memory/store.js";
import { CollaborationLog, type ThoughtStep } from "./collaboration/log.js";

export interface CoordinatorConfig {
  llm: LLMService;
  tools: ToolRegistry;
  memory: MemoryStore;
  maxToolCallsPerTurn?: number;
  stream?: (step: ThoughtStep) => void; // open-core: stream inner monologue
}

export class Coordinator {
  private collabLog: CollaborationLog;

  constructor(private config: CoordinatorConfig) {
    if (!config.maxToolCallsPerTurn) config.maxToolCallsPerTurn = 10;
    this.collabLog = new CollaborationLog();
  }

  async runTurn(ctx: TurnContext): Promise<TurnResult> {
    const maxCalls = this.config.maxToolCallsPerTurn!;
    const toolCalls: ToolCall[] = [];
    const newMessages: Message[] = [];

    // ── Step 1: System prompt with team roster ─────────────
    const systemMsg: Message = {
      id: ulid(),
      role: "system",
      content: this.buildSystemPrompt(ctx),
      createdAt: new Date(),
    };
    newMessages.push(systemMsg);

    // ── Step 2: Compose LLM context ────────────────────────
    let context = [...ctx.messages, ...newMessages];

    // ── Step 3: Agentic loop (plan → act → observe → repeat) 
    for (let i = 0; i < maxCalls; i++) {
      const response = await this.config.llm.chat({
        model: "gpt-4o",
        messages: context,
        tools: this.config.tools.toLLMFormat(),
      });

      // Stream inner monologue BEFORE showing result (open-core differentiation)
      if (this.config.stream) {
        this.config.stream({
          id: ulid(),
          type: "reasoning",
          agentSlot: ctx.team.lead.slotId,
          content: `[Planning step ${i + 1}]`,
          timestamp: new Date(),
        });
      }

      const assistantMsg: Message = {
        id: ulid(),
        role: "agent",
        agentSlot: ctx.team.lead.slotId,
        content: response.content ?? "",
        createdAt: new Date(),
      };

      // No tool calls → final response
      if (!response.toolCalls || response.toolCalls.length === 0) {
        assistantMsg.content = response.content ?? "";
        newMessages.push(assistantMsg);
        
        await this.config.memory.save({
          sessionId: ctx.sessionId,
          messages: [...context, ...newMessages],
        });

        return {
          response: response.content ?? "",
          messages: newMessages,
          toolCalls,
        };
      }

      // Execute tool calls
      const results: ToolResult[] = [];
      assistantMsg.toolCalls = [];

      for (const tc of response.toolCalls) {
        const call: ToolCall = {
          id: tc.id,
          name: tc.function.name,
          arguments: JSON.parse(tc.function.arguments ?? "{}"),
        };
        assistantMsg.toolCalls.push(call);
        toolCalls.push(call);

        // Stream tool execution (transparency)
        if (this.config.stream) {
          this.config.stream({
            id: ulid(),
            type: "tool_call",
            agentSlot: ctx.team.lead.slotId,
            content: `🔧 ${tc.function.name}(${tc.function.arguments})`,
            timestamp: new Date(),
          });
        }

        const result = await this.executeTool(call, ctx);
        results.push(result);
        
        if (this.config.stream) {
          this.config.stream({
            id: ulid(),
            type: "tool_result",
            agentSlot: ctx.team.lead.slotId,
            content: result.output.slice(0, 500),
            timestamp: new Date(),
          });
        }
      }

      assistantMsg.toolResults = results;
      newMessages.push(assistantMsg);

      // Add tool result messages to context for next iteration
      for (const r of results) {
        context.push({
          id: ulid(),
          role: "tool",
          content: r.output,
          toolCalls: [],
          toolResults: [r],
          createdAt: new Date(),
        });
      }
    }

    // Max tool calls reached — synthesize response
    const finalResponse = await this.config.llm.chat({
      model: "gpt-4o",
      messages: [...context, ...newMessages, {
        id: ulid(),
        role: "system",
        content: "Max tool calls reached. Synthesize a concise response based on what you have.",
        createdAt: new Date(),
      }],
    });

    return {
      response: finalResponse.content ?? "Task exceeded maximum steps.",
      messages: newMessages,
      toolCalls,
    };
  }

  private buildSystemPrompt(ctx: TurnContext): string {
    const specialistList = ctx.team.specialists
      .map((s) => `- **${s.name}** (${s.role}, slot: ${s.slotId}): ${s.focus}`)
      .join("\n");

    return [
      `You are the lead agent of a team managing an AI agent workspace.`,
      ``,
      `## Your Team`,
      `- **${ctx.team.lead.name}** (Lead, slot: ${ctx.team.lead.slotId})`,
      specialistList,
      ``,
      `## Instructions`,
      `1. For each user request, decide: can you handle it directly, or delegate?`,
      `2. Use tools where available. Delegate to specialists when appropriate.`,
      `3. Be transparent — show your thinking process.`,
      `4. Work step by step, one tool call at a time.`,
    ].join("\n");
  }

  private async executeTool(
    call: ToolCall,
    ctx: TurnContext,
  ): Promise<ToolResult> {
    try {
      const tool = this.config.tools.get(call.name);
      if (!tool?.execute) {
        return {
          toolCallId: call.id,
          output: `Tool "${call.name}" not available for execution`,
          error: "Tool not found",
        };
      }
      const output = await tool.execute(call.arguments);
      return { toolCallId: call.id, output: typeof output === "string" ? output : JSON.stringify(output) };
    } catch (e) {
      return {
        toolCallId: call.id,
        output: `Error executing ${call.name}: ${e instanceof Error ? e.message : String(e)}`,
        error: e instanceof Error ? e.message : String(e),
      };
    }
  }
}

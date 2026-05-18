// @agent-platform/core — LLM Service with multi-provider routing
// Supports: OpenAI, Anthropic, OpenRouter, Groq, local (Ollama)

export interface LLMMessage {
  role: "user" | "assistant" | "system" | "tool";
  content: string;
  toolCalls?: LLMToolCall[];
  toolResults?: unknown[];
}

export interface LLMToolCall {
  id: string;
  function: {
    name: string;
    arguments: string;
  };
}

export interface LLMResponse {
  content: string | null;
  toolCalls?: LLMToolCall[];
  usage?: { promptTokens: number; completionTokens: number };
  model: string;
}

export interface LLMChatParams {
  model: string;
  messages: LLMMessage[];
  tools?: unknown[];
  temperature?: number;
  maxTokens?: number;
}

export interface LLMProvider {
  name: string;
  chat(params: LLMChatParams): Promise<LLMResponse>;
  listModels(): Promise<string[]>;
}

export class LLMService {
  private providers: Map<string, LLMProvider> = new Map();
  
  addProvider(provider: LLMProvider): void {
    this.providers.set(provider.name, provider);
  }

  /** Route a chat request to the appropriate provider based on model prefix */
  async chat(params: LLMChatParams): Promise<LLMResponse> {
    const provider = this.resolveProvider(params.model);
    return provider.chat(params);
  }

  private resolveProvider(model: string): LLMProvider {
    // Try prefix-based routing first
    for (const [name, p] of this.providers) {
      if (model.startsWith(name + "/")) return p;
    }
    // Fallback: pick first provider
    const first = this.providers.values().next().value;
    if (!first) throw new Error("No LLM providers configured");
    return first;
  }
}

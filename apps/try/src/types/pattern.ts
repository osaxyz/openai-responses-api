import type { createOpenAI } from "@ai-sdk/openai"

export type OpenAIProvider = ReturnType<typeof createOpenAI>

export type PatternCategory =
    | "text_generation"
    | "streaming"
    | "tool_calling"
    | "vision"
    | "structured_output"
    | "web_search"
    | "parameters"

export type PatternMethod = "generateText" | "streamText"

export type CollectPattern = {
    id: string
    description: string
    category: PatternCategory
    method: PatternMethod
    model_id: string
    execute: (provider: OpenAIProvider) => Promise<unknown>
}

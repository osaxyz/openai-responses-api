import { generateText, tool } from "ai"
import { z } from "zod"
import type { CollectPattern, OpenAIProvider } from "../../types/pattern"

export const tool_calling_patterns: CollectPattern[] = [
    {
        id: "tool_calling/single_tool",
        description: "単一ツール定義と実行",
        category: "tool_calling",
        method: "generateText",
        model_id: "gpt-5.2",
        execute: async (provider: OpenAIProvider) => {
            await generateText({
                model: provider.responses("gpt-5.2"),
                prompt: "What is the weather in Tokyo?",
                tools: {
                    get_weather: tool({
                        description: "Get the current weather for a location",
                        inputSchema: z.object({
                            location: z.string().describe("The city name")
                        }),
                        execute: async ({ location }) => {
                            return {
                                location,
                                temperature: 22,
                                condition: "sunny"
                            }
                        }
                    })
                }
            })
        }
    },
    {
        id: "tool_calling/multiple_tools",
        description: "複数ツール定義",
        category: "tool_calling",
        method: "generateText",
        model_id: "gpt-5.2",
        execute: async (provider: OpenAIProvider) => {
            await generateText({
                model: provider.responses("gpt-5.2"),
                prompt: "What is the weather in Tokyo and convert 100 USD to JPY?",
                tools: {
                    get_weather: tool({
                        description: "Get the current weather for a location",
                        inputSchema: z.object({
                            location: z.string().describe("The city name")
                        }),
                        execute: async ({ location }) => {
                            return {
                                location,
                                temperature: 22,
                                condition: "sunny"
                            }
                        }
                    }),
                    convert_currency: tool({
                        description: "Convert currency",
                        inputSchema: z.object({
                            amount: z.number().describe("Amount to convert"),
                            from: z.string().describe("Source currency code"),
                            to: z.string().describe("Target currency code")
                        }),
                        execute: async ({ amount, from, to }) => {
                            return {
                                amount,
                                from,
                                to,
                                result: amount * 150,
                                rate: 150
                            }
                        }
                    })
                }
            })
        }
    },
    {
        id: "tool_calling/parallel_calls",
        description: "並列ツール呼び出し",
        category: "tool_calling",
        method: "generateText",
        model_id: "gpt-5.2",
        execute: async (provider: OpenAIProvider) => {
            await generateText({
                model: provider.responses("gpt-5.2"),
                prompt: "Get the weather in Tokyo, Osaka, and Kyoto at the same time.",
                tools: {
                    get_weather: tool({
                        description: "Get the current weather for a location",
                        inputSchema: z.object({
                            location: z.string().describe("The city name")
                        }),
                        execute: async ({ location }) => {
                            return {
                                location,
                                temperature: 20 + Math.floor(Math.random() * 10),
                                condition: "cloudy"
                            }
                        }
                    })
                }
            })
        }
    },
    {
        id: "tool_calling/no_execute",
        description: "execute無し（呼び出しのみ）",
        category: "tool_calling",
        method: "generateText",
        model_id: "gpt-5.2",
        execute: async (provider: OpenAIProvider) => {
            await generateText({
                model: provider.responses("gpt-5.2"),
                prompt: "Search for recent news about AI.",
                tools: {
                    search_news: tool({
                        description: "Search for news articles",
                        inputSchema: z.object({
                            query: z.string().describe("Search query"),
                            max_results: z.number().nullable().describe("Maximum number of results")
                        })
                    })
                }
            })
        }
    }
]

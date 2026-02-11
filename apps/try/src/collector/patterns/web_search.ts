import { generateText } from "ai"
import type { CollectPattern, OpenAIProvider } from "../../types/pattern"

export const web_search_patterns: CollectPattern[] = [
    {
        id: "web_search/basic",
        description: "基本的なWeb検索",
        category: "web_search",
        method: "generateText",
        model_id: "gpt-5.2",
        execute: async (provider: OpenAIProvider) => {
            await generateText({
                model: provider.responses("gpt-5.2"),
                prompt: "What are the latest developments in AI in 2025?",
                providerOptions: {
                    openai: {
                        tools: [{ type: "web_search_preview" }]
                    }
                }
            })
        }
    },
    {
        id: "web_search/with_location",
        description: "ロケーション指定付きWeb検索",
        category: "web_search",
        method: "generateText",
        model_id: "gpt-5.2",
        execute: async (provider: OpenAIProvider) => {
            await generateText({
                model: provider.responses("gpt-5.2"),
                prompt: "What is the weather forecast for today?",
                providerOptions: {
                    openai: {
                        tools: [
                            {
                                type: "web_search_preview",
                                user_location: {
                                    type: "approximate",
                                    country: "JP",
                                    city: "Tokyo",
                                    region: "Tokyo"
                                }
                            }
                        ]
                    }
                }
            })
        }
    }
]

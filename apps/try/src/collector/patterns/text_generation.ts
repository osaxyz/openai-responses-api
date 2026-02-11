import { generateText } from "ai"
import type { CollectPattern, OpenAIProvider } from "../../types/pattern"

export const text_generation_patterns: CollectPattern[] = [
    {
        id: "text_generation/basic",
        description: "基本的なテキスト生成",
        category: "text_generation",
        method: "generateText",
        model_id: "gpt-5.2",
        execute: async (provider: OpenAIProvider) => {
            await generateText({
                model: provider.responses("gpt-5.2"),
                prompt: "What is the capital of Japan?"
            })
        }
    },
    {
        id: "text_generation/with_system_message",
        description: "システムメッセージ付きテキスト生成",
        category: "text_generation",
        method: "generateText",
        model_id: "gpt-5.2",
        execute: async (provider: OpenAIProvider) => {
            await generateText({
                model: provider.responses("gpt-5.2"),
                system: "You are a helpful assistant that responds in Japanese.",
                prompt: "What is the capital of France?"
            })
        }
    },
    {
        id: "text_generation/multi_turn",
        description: "マルチターン会話",
        category: "text_generation",
        method: "generateText",
        model_id: "gpt-5.2",
        execute: async (provider: OpenAIProvider) => {
            await generateText({
                model: provider.responses("gpt-5.2"),
                messages: [
                    { role: "user", content: "My name is Taro." },
                    {
                        role: "assistant",
                        content: "Hello Taro! How can I help you today?"
                    },
                    { role: "user", content: "What is my name?" }
                ]
            })
        }
    },
    {
        id: "text_generation/gpt_5_mini",
        description: "gpt-5-miniモデルでのテキスト生成",
        category: "text_generation",
        method: "generateText",
        model_id: "gpt-5-mini",
        execute: async (provider: OpenAIProvider) => {
            await generateText({
                model: provider.responses("gpt-5-mini"),
                prompt: "What is 2 + 2?"
            })
        }
    },
    {
        id: "text_generation/gpt_5_nano",
        description: "gpt-5-nanoモデルでのテキスト生成",
        category: "text_generation",
        method: "generateText",
        model_id: "gpt-5-nano",
        execute: async (provider: OpenAIProvider) => {
            await generateText({
                model: provider.responses("gpt-5-nano"),
                prompt: "Explain what an API is in one sentence."
            })
        }
    }
]

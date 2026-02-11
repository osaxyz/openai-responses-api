import { generateText } from "ai"
import { ERROR_MESSAGE } from "../../constants/error"
import type { CollectPattern, OpenAIProvider } from "../../types/pattern"

export const parameters_patterns: CollectPattern[] = [
    {
        id: "parameters/temperature",
        description: "temperature指定",
        category: "parameters",
        method: "generateText",
        model_id: "gpt-5.2",
        execute: async (provider: OpenAIProvider) => {
            await generateText({
                model: provider.responses("gpt-5.2"),
                prompt: "Write a creative short poem about the moon.",
                temperature: 0.9
            })
        }
    },
    {
        id: "parameters/max_output_tokens",
        description: "maxOutputTokens指定",
        category: "parameters",
        method: "generateText",
        model_id: "gpt-5.2",
        execute: async (provider: OpenAIProvider) => {
            await generateText({
                model: provider.responses("gpt-5.2"),
                prompt: "Explain quantum computing.",
                maxOutputTokens: 100
            })
        }
    },
    {
        id: "parameters/store_false",
        description: "store: false指定",
        category: "parameters",
        method: "generateText",
        model_id: "gpt-5.2",
        execute: async (provider: OpenAIProvider) => {
            await generateText({
                model: provider.responses("gpt-5.2"),
                prompt: "What is 1 + 1?",
                providerOptions: {
                    openai: {
                        store: false
                    }
                }
            })
        }
    },
    {
        id: "parameters/previous_response_id",
        description: "previousResponseId指定",
        category: "parameters",
        method: "generateText",
        model_id: "gpt-5.2",
        execute: async (provider: OpenAIProvider) => {
            // まず最初のレスポンスを取得
            const first_result = await generateText({
                model: provider.responses("gpt-5.2"),
                prompt: "Remember this number: 42"
            })

            const first_response_id = first_result.providerMetadata?.openai?.responseId as
                | string
                | undefined

            if (!first_response_id) {
                throw new Error(ERROR_MESSAGE.COLLECTOR_RESPONSE_ID_NOT_FOUND)
            }

            // previousResponseIdを使って続きの会話
            await generateText({
                model: provider.responses("gpt-5.2"),
                prompt: "What number did I ask you to remember?",
                providerOptions: {
                    openai: {
                        previousResponseId: first_response_id
                    }
                }
            })
        }
    }
]

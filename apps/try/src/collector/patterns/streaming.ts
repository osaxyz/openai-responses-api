import { streamText } from "ai"
import type { CollectPattern, OpenAIProvider } from "../../types/pattern"

export const streaming_patterns: CollectPattern[] = [
    {
        id: "streaming/basic",
        description: "基本的なストリーミング",
        category: "streaming",
        method: "streamText",
        model_id: "gpt-5.2",
        execute: async (provider: OpenAIProvider) => {
            const result = streamText({
                model: provider.responses("gpt-5.2"),
                prompt: "Count from 1 to 5."
            })
            // ストリームを最後まで消費する
            for await (const _chunk of result.textStream) {
                // interceptorがストリームデータを収集する
            }
        }
    },
    {
        id: "streaming/with_system_message",
        description: "システムメッセージ付きストリーミング",
        category: "streaming",
        method: "streamText",
        model_id: "gpt-5.2",
        execute: async (provider: OpenAIProvider) => {
            const result = streamText({
                model: provider.responses("gpt-5.2"),
                system: "You are a concise assistant.",
                prompt: "What is TypeScript?"
            })
            for await (const _chunk of result.textStream) {
                // interceptorがストリームデータを収集する
            }
        }
    },
    {
        id: "streaming/on_finish_capture",
        description: "onFinish付きストリーミング",
        category: "streaming",
        method: "streamText",
        model_id: "gpt-5.2",
        execute: async (provider: OpenAIProvider) => {
            const result = streamText({
                model: provider.responses("gpt-5.2"),
                prompt: "Say hello in three languages.",
                onFinish: () => {
                    // onFinishコールバックの動作確認用
                }
            })
            for await (const _chunk of result.textStream) {
                // interceptorがストリームデータを収集する
            }
        }
    }
]

import { generateText, Output } from "ai"
import { z } from "zod"
import type { CollectPattern, OpenAIProvider } from "../../types/pattern"

export const structured_output_patterns: CollectPattern[] = [
    {
        id: "structured_output/generate_object",
        description: "Zodスキーマによる構造化出力",
        category: "structured_output",
        method: "generateText",
        model_id: "gpt-5.2",
        execute: async (provider: OpenAIProvider) => {
            await generateText({
                model: provider.responses("gpt-5.2"),
                prompt: "Generate a person profile for a fictional character.",
                output: Output.object({
                    schema: z.object({
                        name: z.string().describe("Full name"),
                        age: z.number().describe("Age in years"),
                        occupation: z.string().describe("Job title"),
                        hobbies: z.array(z.string()).describe("List of hobbies")
                    })
                })
            })
        }
    },
    {
        id: "structured_output/generate_object_array",
        description: "配列出力の構造化出力",
        category: "structured_output",
        method: "generateText",
        model_id: "gpt-5.2",
        execute: async (provider: OpenAIProvider) => {
            await generateText({
                model: provider.responses("gpt-5.2"),
                prompt: "List 3 popular programming languages with their use cases.",
                output: Output.array({
                    element: z.object({
                        name: z.string().describe("Language name"),
                        use_case: z.string().describe("Primary use case"),
                        year_created: z.number().describe("Year the language was created")
                    })
                })
            })
        }
    },
    {
        id: "structured_output/generate_object_choice",
        description: "choice出力の構造化出力",
        category: "structured_output",
        method: "generateText",
        model_id: "gpt-5.2",
        execute: async (provider: OpenAIProvider) => {
            await generateText({
                model: provider.responses("gpt-5.2"),
                prompt: "Classify the sentiment of this text: 'I love programming, it makes me so happy!'",
                output: Output.choice({
                    options: ["positive", "negative", "neutral"]
                })
            })
        }
    }
]

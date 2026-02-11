import { generateText } from "ai"
import type { CollectPattern, OpenAIProvider } from "../../types/pattern"

export const vision_patterns: CollectPattern[] = [
    {
        id: "vision/url_image",
        description: "URL画像入力",
        category: "vision",
        method: "generateText",
        model_id: "gpt-5.2",
        execute: async (provider: OpenAIProvider) => {
            await generateText({
                model: provider.responses("gpt-5.2"),
                messages: [
                    {
                        role: "user",
                        content: [
                            { type: "text", text: "What is in this image?" },
                            {
                                type: "image",
                                image: new URL("https://picsum.photos/id/237/300/200")
                            }
                        ]
                    }
                ]
            })
        }
    },
    {
        id: "vision/multi_image",
        description: "複数画像入力",
        category: "vision",
        method: "generateText",
        model_id: "gpt-5.2",
        execute: async (provider: OpenAIProvider) => {
            await generateText({
                model: provider.responses("gpt-5.2"),
                messages: [
                    {
                        role: "user",
                        content: [
                            {
                                type: "text",
                                text: "Compare these two images. What are the differences?"
                            },
                            {
                                type: "image",
                                image: new URL("https://picsum.photos/id/237/300/200")
                            },
                            {
                                type: "image",
                                image: new URL("https://picsum.photos/id/1025/300/200")
                            }
                        ]
                    }
                ]
            })
        }
    }
]

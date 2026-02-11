import { createOpenAI } from "@ai-sdk/openai"
import { ERROR_MESSAGE } from "../constants/error"
import type { ProviderOptions } from "../types/provider"

export function createProvider(interceptor: ProviderOptions) {
    const api_key = process.env.OPENAI_API_KEY

    if (!api_key) {
        throw new Error(ERROR_MESSAGE.COLLECTOR_MISSING_API_KEY)
    }

    const openai = createOpenAI({
        apiKey: api_key,
        fetch: interceptor.fetch
    })

    return openai
}

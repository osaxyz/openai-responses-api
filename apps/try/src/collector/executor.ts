import { ERROR_MESSAGE } from "../constants/error"
import { LOG_MESSAGE } from "../constants/log"
import type { CollectPattern } from "../types/pattern"
import type { CollectResult } from "../types/result"
import { createInterceptor } from "./interceptor"
import { createProvider } from "./provider"
import { serializeToYaml } from "./serializer"

const RATE_LIMIT_DELAY_MS = 1000

function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function executePatterns(
    patterns: CollectPattern[],
    sdk_version: string,
    provider_version: string
): Promise<CollectResult[]> {
    const results: CollectResult[] = []
    const interceptor = createInterceptor()
    const provider = createProvider(interceptor)

    for (let i = 0; i < patterns.length; i++) {
        const pattern = patterns[i]
        console.log(
            `\n[${i + 1}/${patterns.length}] ${LOG_MESSAGE.COLLECTOR_PATTERN_START}: ${pattern.id}`
        )

        const start_time = performance.now()
        interceptor.reset()

        try {
            await pattern.execute(provider)

            const request_body = interceptor.captured.request_body
            let response_body = interceptor.captured.response_body

            if (!response_body && interceptor.captured.stream_chunks.length > 0) {
                response_body = parseStreamChunks(interceptor.captured.stream_chunks)
            }

            if (!response_body) {
                throw new Error(ERROR_MESSAGE.COLLECTOR_INVALID_RESPONSE)
            }

            await serializeToYaml(
                pattern,
                request_body,
                response_body,
                sdk_version,
                provider_version
            )

            const duration_ms = Math.round(performance.now() - start_time)
            console.log(`  ${LOG_MESSAGE.COLLECTOR_PATTERN_SUCCESS} (${duration_ms}ms)`)

            results.push({
                pattern_id: pattern.id,
                success: true,
                error_message: null,
                duration_ms
            })
        } catch (error) {
            const duration_ms = Math.round(performance.now() - start_time)
            const error_message = error instanceof Error ? error.message : String(error)
            console.error(`  ${LOG_MESSAGE.COLLECTOR_PATTERN_FAILED}: ${error_message}`)

            results.push({
                pattern_id: pattern.id,
                success: false,
                error_message,
                duration_ms
            })
        }

        if (i < patterns.length - 1) {
            console.log(`  ${LOG_MESSAGE.COLLECTOR_RATE_LIMIT_WAIT}`)
            await sleep(RATE_LIMIT_DELAY_MS)
        }
    }

    return results
}

function parseStreamChunks(chunks: string[]): Record<string, unknown> {
    const raw_text = chunks.join("")
    const lines = raw_text.split("\n")
    const events: Record<string, unknown>[] = []

    for (const line of lines) {
        if (line.startsWith("data: ")) {
            const data_str = line.slice(6).trim()
            if (data_str === "[DONE]") continue
            try {
                events.push(JSON.parse(data_str))
            } catch {
                // JSONパース失敗は無視
            }
        }
    }

    return {
        stream: true,
        events
    }
}

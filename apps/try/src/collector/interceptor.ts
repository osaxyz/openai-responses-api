import type { CapturedData, InterceptorStore } from "../types/interceptor"

export function createInterceptor(): InterceptorStore {
    const captured: CapturedData = {
        request_body: null,
        response_body: null,
        stream_chunks: []
    }

    function reset(): void {
        captured.request_body = null
        captured.response_body = null
        captured.stream_chunks = []
    }

    const intercepted_fetch: typeof globalThis.fetch = async (
        input: RequestInfo | URL,
        init?: RequestInit
    ): Promise<Response> => {
        if (init?.body) {
            try {
                const body_text =
                    typeof init.body === "string"
                        ? init.body
                        : new TextDecoder().decode(init.body as ArrayBuffer)
                captured.request_body = JSON.parse(body_text)
            } catch {
                captured.request_body = null
            }
        }

        const response = await globalThis.fetch(input, init)

        const content_type = response.headers.get("content-type") ?? ""
        const is_streaming = content_type.includes("text/event-stream")

        if (is_streaming && response.body) {
            const [branch_for_sdk, branch_for_capture] = response.body.tee()

            collectStreamChunks(branch_for_capture, captured)

            return new Response(branch_for_sdk, {
                status: response.status,
                statusText: response.statusText,
                headers: response.headers
            })
        }

        const cloned = response.clone()
        try {
            captured.response_body = await cloned.json()
        } catch {
            captured.response_body = null
        }

        return response
    }

    return {
        captured,
        fetch: intercepted_fetch,
        reset
    }
}

async function collectStreamChunks(
    stream: ReadableStream<Uint8Array>,
    captured: CapturedData
): Promise<void> {
    const reader = stream.getReader()
    const decoder = new TextDecoder()

    try {
        while (true) {
            const { done, value } = await reader.read()
            if (done) break
            const chunk_text = decoder.decode(value, { stream: true })
            captured.stream_chunks.push(chunk_text)
        }
    } catch {
        // ストリーム読み取りエラーは無視して収集を継続
    } finally {
        reader.releaseLock()
    }
}

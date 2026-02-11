export type CapturedData = {
    request_body: Record<string, unknown> | null
    response_body: Record<string, unknown> | null
    stream_chunks: string[]
}

export type InterceptorStore = {
    captured: CapturedData
    fetch: typeof globalThis.fetch
    reset: () => void
}

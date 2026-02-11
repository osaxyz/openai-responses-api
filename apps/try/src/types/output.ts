export type YamlOutputSchema = {
    id: string
    description: string
    category: string
    method: string
    model_id: string
    collected_at: string
    sdk_version: string
    provider_version: string
}

export type YamlOutput = {
    schema: YamlOutputSchema
    request: Record<string, unknown>
    response: Record<string, unknown>
}

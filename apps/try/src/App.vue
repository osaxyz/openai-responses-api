<script setup lang="ts">
import { reactive } from "vue"
import { ERROR_MESSAGE } from "./constants/error"

const request = reactive({
    api_key: "",
    endpoint: "https://api.openai.com/v1/responses",
    body: JSON.stringify({ model: "gpt-4o", input: "Hello, world!" }, null, 4),
    is_loading: false,
})

const response = reactive({
    data: "",
})

async function sendRequest() {
    if (!request.api_key) {
        response.data = JSON.stringify({ error: ERROR_MESSAGE.MISSING_API_KEY }, null, 4)
        return
    }

    request.is_loading = true
    response.data = ""

    try {
        const fetch_response = await fetch(request.endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${request.api_key}`
            },
            body: request.body
        })

        const data = await fetch_response.json()
        response.data = JSON.stringify(data, null, 4)
    } catch (error) {
        const error_message = error instanceof Error ? error.message : String(error)
        response.data = JSON.stringify({ error: error_message }, null, 4)
    } finally {
        request.is_loading = false
    }
}
</script>

<template>
    <div class="app">
        <header class="header">
            <h1>Try - OpenAI Responses API</h1>
            <a href="/" class="back-link">Back to Home</a>
        </header>

        <main class="main">
            <div class="panel request-panel">
                <h2>Request</h2>

                <label class="field">
                    <span class="field-label">API Key</span>
                    <input
                        v-model="request.api_key"
                        type="password"
                        placeholder="sk-..."
                        class="input"
                    />
                </label>

                <label class="field">
                    <span class="field-label">Endpoint</span>
                    <input
                        v-model="request.endpoint"
                        type="text"
                        class="input"
                    />
                </label>

                <label class="field">
                    <span class="field-label">Body (JSON)</span>
                    <textarea
                        v-model="request.body"
                        class="textarea"
                        rows="12"
                    />
                </label>

                <button
                    class="send-button"
                    :disabled="request.is_loading"
                    @click="sendRequest"
                >
                    {{ request.is_loading ? "送信中..." : "送信" }}
                </button>
            </div>

            <div class="panel response-panel">
                <h2>Response</h2>
                <pre v-if="response.data" class="response-output">{{ response.data }}</pre>
                <pre v-else class="response-output placeholder">レスポンスがここに表示されます</pre>
            </div>
        </main>
    </div>
</template>

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    color: #1a1a1a;
    background-color: #fafafa;
}

.app {
    min-height: 100vh;
    padding: 2rem;
}

.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 2rem;
}

.header h1 {
    font-size: 1.5rem;
}

.back-link {
    color: #666;
    text-decoration: none;
}

.back-link:hover {
    text-decoration: underline;
}

.main {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
}

@media (max-width: 768px) {
    .main {
        grid-template-columns: 1fr;
    }
}

.panel {
    background: #fff;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 1.5rem;
}

.panel h2 {
    font-size: 1.125rem;
    margin-bottom: 1rem;
}

.field {
    display: block;
    margin-bottom: 1rem;
}

.field-label {
    display: block;
    font-size: 0.875rem;
    font-weight: 500;
    margin-bottom: 0.25rem;
    color: #444;
}

.input,
.textarea {
    width: 100%;
    padding: 0.5rem 0.75rem;
    border: 1px solid #d0d0d0;
    border-radius: 4px;
    font-size: 0.875rem;
    font-family: inherit;
}

.textarea {
    font-family: "SF Mono", "Fira Code", monospace;
    resize: vertical;
}

.send-button {
    width: 100%;
    padding: 0.75rem;
    background: #1a1a1a;
    color: #fff;
    border: none;
    border-radius: 4px;
    font-size: 0.875rem;
    cursor: pointer;
}

.send-button:hover:not(:disabled) {
    background: #333;
}

.send-button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.response-output {
    background: #f5f5f5;
    border-radius: 4px;
    padding: 1rem;
    font-family: "SF Mono", "Fira Code", monospace;
    font-size: 0.8rem;
    line-height: 1.6;
    overflow-x: auto;
    white-space: pre-wrap;
    word-break: break-word;
    min-height: 300px;
}

.response-output.placeholder {
    color: #999;
}
</style>

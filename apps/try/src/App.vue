<script setup lang="ts">
import { ref } from "vue"
import { ERROR_MESSAGE } from "./constants/error"

const api_key = ref("")
const endpoint = ref("https://api.openai.com/v1/responses")
const request_body = ref(JSON.stringify({
    model: "gpt-4o",
    input: "Hello, world!"
}, null, 4))
const response_data = ref("")
const is_loading = ref(false)

async function sendRequest() {
    if (!api_key.value) {
        response_data.value = JSON.stringify({ error: ERROR_MESSAGE.MISSING_API_KEY }, null, 4)
        return
    }

    is_loading.value = true
    response_data.value = ""

    try {
        const response = await fetch(endpoint.value, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${api_key.value}`
            },
            body: request_body.value
        })

        const data = await response.json()
        response_data.value = JSON.stringify(data, null, 4)
    } catch (error) {
        response_data.value = JSON.stringify({
            error: error instanceof Error ? error.message : ERROR_MESSAGE.REQUEST_FAILED
        }, null, 4)
    } finally {
        is_loading.value = false
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
                        v-model="api_key"
                        type="password"
                        placeholder="sk-..."
                        class="input"
                    />
                </label>

                <label class="field">
                    <span class="field-label">Endpoint</span>
                    <input
                        v-model="endpoint"
                        type="text"
                        class="input"
                    />
                </label>

                <label class="field">
                    <span class="field-label">Body (JSON)</span>
                    <textarea
                        v-model="request_body"
                        class="textarea"
                        rows="12"
                    />
                </label>

                <button
                    class="send-button"
                    :disabled="is_loading"
                    @click="sendRequest"
                >
                    {{ is_loading ? "送信中..." : "送信" }}
                </button>
            </div>

            <div class="panel response-panel">
                <h2>Response</h2>
                <pre class="response-output">{{ response_data || "レスポンスがここに表示されます" }}</pre>
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
</style>

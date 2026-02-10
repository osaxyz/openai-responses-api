export default defineNuxtConfig({
    compatibilityDate: "2025-01-01",
    devtools: { enabled: true },
    app: {
        head: {
            title: "OpenAI Responses API Schema",
            meta: [
                { charset: "utf-8" },
                { name: "viewport", content: "width=device-width, initial-scale=1" },
                {
                    name: "description",
                    content: "OpenAI互換のエンドポイントを作成しやすくするための仕様群"
                }
            ]
        }
    }
})

import { defineConfig } from "vitepress"

export default defineConfig({
    title: "OpenAI Responses API Schema",
    description: "OpenAI互換のエンドポイントを作成しやすくするための仕様群",
    lang: "ja",
    themeConfig: {
        nav: [
            { text: "Home", link: "/" },
            { text: "Guide", link: "/guide/" },
            { text: "Schema", link: "/guide/schema" }
        ],
        sidebar: [
            {
                text: "Guide",
                items: [
                    { text: "概要", link: "/guide/" },
                    { text: "スキーマ参照", link: "/guide/schema" }
                ]
            }
        ],
        socialLinks: [
            { icon: "x", link: "https://x.com/ouchiarata" }
        ],
        footer: {
            message: "Created by Arata Ouchi (Original SIN Architecture)",
            copyright: ""
        }
    }
})

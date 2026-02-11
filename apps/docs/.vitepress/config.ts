import { defineConfig } from "vitepress"

export default defineConfig({
    title: "OpenAI Responses API Schema",
    description: "OpenAI互換のエンドポイントを作成しやすくするための仕様群",
    lang: "ja",
    themeConfig: {
        nav: [
            { text: "Home", link: "/" },
            { text: "Guide", link: "/guide/" },
            { text: "Schema", link: "/schema/" }
        ],
        sidebar: {
            "/guide/": [
                {
                    text: "Guide",
                    items: [
                        { text: "概要", link: "/guide/" }
                    ]
                }
            ],
            "/schema/": [
                {
                    text: "Schema",
                    items: [
                        { text: "スキーマ参照", link: "/schema/" }
                    ]
                },
                {
                    text: "カテゴリ",
                    items: [
                        { text: "テキスト生成", link: "/schema/text-generation" },
                        { text: "ストリーミング", link: "/schema/streaming" },
                        { text: "ツール呼び出し", link: "/schema/tool-calling" },
                        { text: "ビジョン", link: "/schema/vision" },
                        { text: "構造化出力", link: "/schema/structured-output" },
                        { text: "Web検索", link: "/schema/web-search" },
                        { text: "パラメータ", link: "/schema/parameters" }
                    ]
                }
            ]
        },
        socialLinks: [
            { icon: "x", link: "https://x.com/ouchiarata" }
        ],
        footer: {
            message: "Created by Arata Ouchi (Original SIN Architecture)",
            copyright: ""
        }
    }
})

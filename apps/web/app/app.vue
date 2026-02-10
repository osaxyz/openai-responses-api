<template>
    <div class="landing">
        <header class="header">
            <h1 class="title">OpenAI Responses API Schema</h1>
            <p class="subtitle">OpenAI互換のエンドポイントを作成しやすくするための仕様群</p>
        </header>

        <main class="main">
            <section class="description">
                <p>
                    OpenAI互換の「OpenAI Responses API」互換エンドポイントを作成しやすくするため、
                    実際にVercel AI SDKで問い合わせ、そのレスポンスを対応として記録したプロジェクトです。
                    OpenAIおよびVercel AI SDKが更新され次第、順次対応します。
                </p>
            </section>

            <nav class="navigation">
                <a href="/try" class="nav-card">
                    <h2>Try</h2>
                    <p>APIリクエストを送信してレスポンスを確認</p>
                </a>
                <a href="/docs" class="nav-card">
                    <h2>Docs</h2>
                    <p>ドキュメントを参照</p>
                </a>
                <a href="/docs/guide/schema" class="nav-card">
                    <h2>Schema</h2>
                    <p>APIスキーマ一覧を確認</p>
                </a>
            </nav>
        </main>

        <footer class="footer">
            <p class="author">
                Created by
                <a href="https://osa.xyz" target="_blank" rel="noopener noreferrer">
                    Arata Ouchi (Original SIN Architecture)
                </a>
            </p>
            <p class="links">
                <a href="https://x.com/ouchiarata" target="_blank" rel="noopener noreferrer">
                    X (Twitter)
                </a>
                <span class="separator">|</span>
                <a href="https://osa.xyz" target="_blank" rel="noopener noreferrer">
                    Homepage
                </a>
            </p>
        </footer>
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

.landing {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
}

.header {
    text-align: center;
    margin-top: 4rem;
    margin-bottom: 3rem;
}

.title {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 0.75rem;
}

.subtitle {
    font-size: 1.125rem;
    color: #666;
}

.main {
    max-width: 800px;
    width: 100%;
    flex: 1;
}

.description {
    text-align: center;
    margin-bottom: 3rem;
    line-height: 1.8;
    color: #444;
}

.navigation {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1.5rem;
    margin-bottom: 3rem;
}

.nav-card {
    display: block;
    padding: 1.5rem;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    text-decoration: none;
    color: inherit;
    transition: border-color 0.2s, box-shadow 0.2s;
}

.nav-card:hover {
    border-color: #1a1a1a;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.nav-card h2 {
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
}

.nav-card p {
    font-size: 0.875rem;
    color: #666;
}

.footer {
    text-align: center;
    padding: 2rem 0;
    color: #666;
    font-size: 0.875rem;
}

.footer a {
    color: #1a1a1a;
    text-decoration: none;
}

.footer a:hover {
    text-decoration: underline;
}

.author {
    margin-bottom: 0.5rem;
}

.separator {
    margin: 0 0.5rem;
}
</style>

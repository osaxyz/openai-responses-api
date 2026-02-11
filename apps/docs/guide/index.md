# 概要

**OpenAI Responses API Schema** は、OpenAI互換の「OpenAI Responses API」互換エンドポイントを作成しやすくするため、実際にVercel AI SDKで問い合わせ、そのレスポンスを対応として記録したプロジェクトです。

OpenAIおよびVercel AI SDKが更新され次第、順次対応します。

## 収集環境

| 項目 | バージョン |
|------|-----------|
| Vercel AI SDK (`ai`) | 6.0.78 |
| OpenAI Provider (`@ai-sdk/openai`) | 3.0.26 |
| 主要モデル | gpt-5.2, gpt-5-mini, gpt-5-nano |
| 収集日 | 2026-02-11 |

## プロジェクト構成

- **web** - ランディングページ (Nuxt 4)
- **try** - APIレスポンス自動収集ツール (Node.js)
- **docs** - ドキュメント (VitePress)
- **result** - 収集済みAPIスキーマファイル (YAML)

## 収集カテゴリ

| カテゴリ | パターン数 | 説明 |
|---------|-----------|------|
| [テキスト生成](/schema/text-generation) | 5 | 基本的なテキスト生成、システムメッセージ、マルチターン、モデル比較 |
| [ストリーミング](/schema/streaming) | 3 | SSEベースのストリーミングレスポンス |
| [ツール呼び出し](/schema/tool-calling) | 4 | Function calling（単一・複数・並列・実行無し） |
| [ビジョン](/schema/vision) | 2 | 画像入力（単一・複数） |
| [構造化出力](/schema/structured-output) | 3 | JSON Schemaによる構造化レスポンス |
| [Web検索](/schema/web-search) | 2 | Web検索ツール連携 |
| [パラメータ](/schema/parameters) | 4 | 各種パラメータの挙動確認 |

## 製作者

[Arata Ouchi (Original SIN Architecture)](https://osa.xyz)

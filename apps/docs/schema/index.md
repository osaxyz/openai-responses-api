# スキーマ参照

OpenAI Responses APIの実際のリクエスト/レスポンスを、Vercel AI SDKを通じて収集・記録したスキーマ一覧です。

## YAMLフォーマット

各スキーマファイルは以下の3セクションで構成されています。

### schema（メタデータ）

```yaml
schema:
    id: "category/pattern_name"     # パターンID
    description: "パターンの説明"     # 日本語の説明
    category: "category_name"       # カテゴリ名
    method: "generateText"          # SDKメソッド名
    model_id: "gpt-5.2"             # 使用モデル
    collected_at: "ISO8601"         # 収集日時
    sdk_version: "6.0.78"           # AI SDKバージョン
    provider_version: "3.0.26"      # @ai-sdk/openaiバージョン
```

### request（OpenAIへの生リクエスト）

Vercel AI SDKが内部的にOpenAI Responses APIへ送信するHTTPリクエストボディです。

```yaml
request:
    model: "gpt-5.2"
    input:
        - role: "user"
          content:
              - type: "input_text"
                text: "..."
```

### response（OpenAIからの生レスポンス）

OpenAI Responses APIから返却されるHTTPレスポンスボディです。非ストリーミングの場合はJSONオブジェクト、ストリーミングの場合はSSEイベント配列として記録されます。

```yaml
# 非ストリーミング
response:
    id: "resp_xxx"
    object: "response"
    status: "completed"
    output:
        - type: "message"
          content:
              - type: "output_text"
                text: "..."
    usage:
        input_tokens: 13
        output_tokens: 13
        total_tokens: 26

# ストリーミング
response:
    stream: true
    events:
        - type: "response.created"
        - type: "response.output_text.delta"
        - type: "response.completed"
```

## カテゴリ一覧

| カテゴリ | パターン数 | 説明 |
|---------|-----------|------|
| [テキスト生成](./text-generation) | 5 | 基本的なテキスト生成、システムメッセージ、マルチターン、モデル比較 |
| [ストリーミング](./streaming) | 3 | SSEベースのストリーミングレスポンス |
| [ツール呼び出し](./tool-calling) | 4 | Function calling（単一・複数・並列・実行無し） |
| [ビジョン](./vision) | 2 | 画像入力（単一・複数） |
| [構造化出力](./structured-output) | 3 | JSON Schemaによる構造化レスポンス |
| [Web検索](./web-search) | 2 | Web検索ツール連携 |
| [パラメータ](./parameters) | 4 | 各種パラメータの挙動確認 |

## 再収集

スキーマデータは `apps/try` の収集スクリプトで自動生成されます。

```bash
npm run collect
```

`result/` ディレクトリ以下にYAMLファイルが出力されます。

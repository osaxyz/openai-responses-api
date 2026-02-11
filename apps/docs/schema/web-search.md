# Web検索

Web検索ツール連携の収集結果です。`providerOptions` で `web_search_preview` ツールを指定します。

::: info
Web検索はVercel AI SDKの `providerOptions.openai.tools` で設定されるため、リクエストボディには明示的なツール定義が含まれない場合があります。
:::

## basic

基本的なWeb検索

| フィールド | 値 |
|-----------|---|
| ID | `web_search/basic` |
| メソッド | `generateText` |
| モデル | `gpt-5.2` |

### リクエスト

```yaml
model: "gpt-5.2"
input:
    - role: "user"
      content:
          - type: "input_text"
            text: "What are the latest developments in AI in 2025?"
```

::: details レスポンス
```yaml
id: "resp_0c93efd25c9c957200698be37374888195953da0a496657724"
object: "response"
status: "completed"
model: "gpt-5.2-2025-12-11"
output:
    - type: "message"
      status: "completed"
      content:
          - type: "output_text"
            annotations: []
            text: >-
                I can't reliably summarize "the latest developments in 2025"
                in a comprehensive way because my knowledge isn't continuously
                updated with real-time news. ...

                ## 1) AI "agents" and tool use moved from demos to workflows
                ## 2) Multimodal models became the default
                ## 3) Longer context and better retrieval
                ## 4) On-device and edge AI expanded
                ## 5) Open-source models and tooling kept improving
                ## 6) Safety, evaluation, and governance became more operational
                ## 7) Enterprise adoption: from chatbots to integrated systems
                ## 8) Synthetic data and data quality engineering
      role: "assistant"
usage:
    input_tokens: 18
    output_tokens: 690
    total_tokens: 708
```
:::

## with_location

ロケーション指定付きWeb検索。`user_location` パラメータで地域を指定します。

| フィールド | 値 |
|-----------|---|
| ID | `web_search/with_location` |
| メソッド | `generateText` |
| モデル | `gpt-5.2` |

### リクエスト

```yaml
model: "gpt-5.2"
input:
    - role: "user"
      content:
          - type: "input_text"
            text: "What is the weather forecast for today?"
```

::: details レスポンス
```yaml
id: "resp_0953eb8344ff149f00698be382a1288193aa9e7d6e8eae991e"
object: "response"
status: "completed"
model: "gpt-5.2-2025-12-11"
output:
    - type: "message"
      status: "completed"
      content:
          - type: "output_text"
            annotations: []
            text: >-
                I can't see your location or live weather data from here.
                If you tell me your city/ZIP code, I can give you today's
                forecast.
      role: "assistant"
usage:
    input_tokens: 14
    output_tokens: 73
    total_tokens: 87
```
:::

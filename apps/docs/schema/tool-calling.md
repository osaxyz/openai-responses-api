# ツール呼び出し

Function calling（ツール呼び出し）パターンの収集結果です。リクエストに `tools` 配列と `tool_choice` を含め、モデルが関数呼び出しを生成します。

## レスポンスの特徴

ツール呼び出し時、レスポンスの `output` には `type: "function_call"` のアイテムが含まれます。

```yaml
output:
    - type: "function_call"
      status: "completed"
      name: "get_weather"
      arguments: '{"location":"Tokyo"}'
      call_id: "call_xxx"
```

## single_tool

単一ツール定義と実行

| フィールド | 値 |
|-----------|---|
| ID | `tool_calling/single_tool` |
| メソッド | `generateText` |
| モデル | `gpt-5.2` |

### リクエスト

```yaml
model: "gpt-5.2"
input:
    - role: "user"
      content:
          - type: "input_text"
            text: "What is the weather in Tokyo?"
tools:
    - type: "function"
      name: "get_weather"
      description: "Get the current weather for a location"
      parameters:
          type: "object"
          properties:
              location:
                  type: "string"
                  description: "The city name"
          required:
              - "location"
          additionalProperties: false
tool_choice: "auto"
```

::: details レスポンス
```yaml
id: "resp_09b5110d86cec7e100698be356e4748193a989fc01f57e94b5"
object: "response"
status: "completed"
model: "gpt-5.2-2025-12-11"
output:
    - id: "fc_09b5110d86cec7e100698be35798908193b7ebb0320a82b006"
      type: "function_call"
      status: "completed"
      arguments: '{"location":"Tokyo"}'
      call_id: "call_G2LQoyrmb3WdJjTnTjKjQjAJ"
      name: "get_weather"
tools:
    - type: "function"
      name: "get_weather"
      parameters:
          type: "object"
          properties:
              location:
                  type: "string"
                  description: "The city name"
          required:
              - "location"
          additionalProperties: false
      strict: true
usage:
    input_tokens: 56
    output_tokens: 18
    total_tokens: 74
```
:::

## multiple_tools

複数ツール定義。モデルが適切なツールを選択して呼び出します。

| フィールド | 値 |
|-----------|---|
| ID | `tool_calling/multiple_tools` |
| メソッド | `generateText` |
| モデル | `gpt-5.2` |

### リクエスト

```yaml
model: "gpt-5.2"
input:
    - role: "user"
      content:
          - type: "input_text"
            text: "What is the weather in Tokyo and convert 100 USD to JPY?"
tools:
    - type: "function"
      name: "get_weather"
      description: "Get the current weather for a location"
      parameters:
          type: "object"
          properties:
              location:
                  type: "string"
                  description: "The city name"
          required:
              - "location"
          additionalProperties: false
    - type: "function"
      name: "convert_currency"
      description: "Convert currency"
      parameters:
          type: "object"
          properties:
              amount:
                  type: "number"
                  description: "Amount to convert"
              from:
                  type: "string"
                  description: "Source currency code"
              to:
                  type: "string"
                  description: "Target currency code"
          required:
              - "amount"
              - "from"
              - "to"
          additionalProperties: false
tool_choice: "auto"
```

::: details レスポンス
```yaml
id: "resp_0f93e13b3c91dc4c00698be3591a00819581b0e59ad6574f34"
object: "response"
status: "completed"
model: "gpt-5.2-2025-12-11"
output:
    - type: "function_call"
      status: "completed"
      arguments: '{"location":"Tokyo"}'
      call_id: "call_5RATn3zJo5doGoe9lzf9JcIN"
      name: "get_weather"
    - type: "function_call"
      status: "completed"
      arguments: '{"amount":100,"from":"USD","to":"JPY"}'
      call_id: "call_d5yH5NgGTeCNXYCc9ppgZrEt"
      name: "convert_currency"
parallel_tool_calls: true
usage:
    input_tokens: 102
    output_tokens: 56
    total_tokens: 158
```
:::

## parallel_calls

並列ツール呼び出し。同一ツールを複数回同時に呼び出します。

| フィールド | 値 |
|-----------|---|
| ID | `tool_calling/parallel_calls` |
| メソッド | `generateText` |
| モデル | `gpt-5.2` |

### リクエスト

```yaml
model: "gpt-5.2"
input:
    - role: "user"
      content:
          - type: "input_text"
            text: "Get the weather in Tokyo, Osaka, and Kyoto at the same time."
tools:
    - type: "function"
      name: "get_weather"
      description: "Get the current weather for a location"
      parameters:
          type: "object"
          properties:
              location:
                  type: "string"
                  description: "The city name"
          required:
              - "location"
          additionalProperties: false
tool_choice: "auto"
```

::: details レスポンス
```yaml
id: "resp_0a27b3f92fd273b900698be35b4d688193bfeb4953cb35c0f8"
object: "response"
status: "completed"
model: "gpt-5.2-2025-12-11"
output:
    - type: "function_call"
      status: "completed"
      arguments: '{"location":"Tokyo"}'
      call_id: "call_EDySAtSnRiIwepuWimIN2SdQ"
      name: "get_weather"
    - type: "function_call"
      status: "completed"
      arguments: '{"location":"Osaka"}'
      call_id: "call_ZJHALscnDUsBalDBXbfSjsGn"
      name: "get_weather"
    - type: "function_call"
      status: "completed"
      arguments: '{"location":"Kyoto"}'
      call_id: "call_ysOIRHoltR8WjjIlePIQ1ulO"
      name: "get_weather"
parallel_tool_calls: true
usage:
    input_tokens: 64
    output_tokens: 64
    total_tokens: 128
```
:::

## no_execute

execute無し（呼び出しのみ）。ツールの `execute` 関数を定義せず、モデルの関数呼び出し結果のみを取得するパターンです。`nullable` なパラメータの扱いも確認できます。

| フィールド | 値 |
|-----------|---|
| ID | `tool_calling/no_execute` |
| メソッド | `generateText` |
| モデル | `gpt-5.2` |

### リクエスト

```yaml
model: "gpt-5.2"
input:
    - role: "user"
      content:
          - type: "input_text"
            text: "Search for recent news about AI."
tools:
    - type: "function"
      name: "search_news"
      description: "Search for news articles"
      parameters:
          type: "object"
          properties:
              query:
                  type: "string"
                  description: "Search query"
              max_results:
                  type:
                      - "number"
                      - "null"
                  description: "Maximum number of results"
          required:
              - "query"
              - "max_results"
          additionalProperties: false
tool_choice: "auto"
```

::: details レスポンス
```yaml
id: "resp_01fd1ab747f6741400698be35dd0e08197a043832b5d8f5192"
object: "response"
status: "completed"
model: "gpt-5.2-2025-12-11"
output:
    - type: "function_call"
      status: "completed"
      arguments: '{"query":"recent news about AI","max_results":5}'
      call_id: "call_Ckj8etIdOJy02YlVygV3IZ2P"
      name: "search_news"
usage:
    input_tokens: 78
    output_tokens: 26
    total_tokens: 104
```
:::

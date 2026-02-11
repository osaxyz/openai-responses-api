# パラメータ

各種パラメータの挙動確認パターンの収集結果です。`temperature`、`max_output_tokens`、`store`、`previous_response_id` などのパラメータがリクエスト/レスポンスにどのように反映されるかを記録しています。

## temperature

temperature指定。`temperature: 0.2` を指定した場合のリクエスト/レスポンス。

| フィールド | 値 |
|-----------|---|
| ID | `parameters/temperature` |
| メソッド | `generateText` |
| モデル | `gpt-5.2` |

### リクエスト

```yaml
model: "gpt-5.2"
input:
    - role: "user"
      content:
          - type: "input_text"
            text: "Write a creative short poem about the moon."
```

::: details レスポンス
```yaml
id: "resp_075f98dd891a331c00698be386066081949d17706c9aa5cb12"
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
                The moon hangs like a silver secret,
                Pinned to the dark with quiet light.
                It stitches tides to sleeping shorelines,
                And mends the sky throughout the night.
      role: "assistant"
temperature: 1
usage:
    input_tokens: 15
    output_tokens: 112
    total_tokens: 127
```
:::

## max_output_tokens

maxOutputTokens指定。出力トークン数の上限を設定した場合、レスポンスの `status` が `"incomplete"` になり、`incomplete_details.reason` に `"max_output_tokens"` が記録されます。

| フィールド | 値 |
|-----------|---|
| ID | `parameters/max_output_tokens` |
| メソッド | `generateText` |
| モデル | `gpt-5.2` |

### リクエスト

```yaml
model: "gpt-5.2"
input:
    - role: "user"
      content:
          - type: "input_text"
            text: "Explain quantum computing."
max_output_tokens: 100
```

::: details レスポンス
```yaml
id: "resp_030a983d693e221700698be38ba2c48194af66e1a06f9f5076"
object: "response"
status: "incomplete"
model: "gpt-5.2-2025-12-11"
incomplete_details:
    reason: "max_output_tokens"
max_output_tokens: 100
output:
    - type: "message"
      status: "incomplete"
      content:
          - type: "output_text"
            annotations: []
            text: >-
                Quantum computing is a way of processing information using
                the rules of quantum mechanics. Instead of storing and
                manipulating data as ordinary bits, it uses **quantum bits
                (qubits)**, which behave differently and can enable certain
                computations to be done much faster than on classical computers.

                ## Classical bits vs qubits
                - **Classical bit:** always either **0** or **1**.
                - **Qubit:** can be in a combination of **0
      role: "assistant"
usage:
    input_tokens: 10
    output_tokens: 100
    total_tokens: 110
```
:::

## store_false

store: false指定。レスポンスを保存しない設定。レスポンスの `store` フィールドが `false` になります。

| フィールド | 値 |
|-----------|---|
| ID | `parameters/store_false` |
| メソッド | `generateText` |
| モデル | `gpt-5.2` |

### リクエスト

```yaml
model: "gpt-5.2"
input:
    - role: "user"
      content:
          - type: "input_text"
            text: "What is 1 + 1?"
store: false
include:
    - "reasoning.encrypted_content"
```

::: details レスポンス
```yaml
id: "resp_0b1c5ae74aae2ea701698be38faa508190a2203168ef91bf20"
object: "response"
status: "completed"
model: "gpt-5.2-2025-12-11"
store: false
output:
    - type: "message"
      status: "completed"
      content:
          - type: "output_text"
            annotations: []
            text: "1 + 1 = 2."
      role: "assistant"
usage:
    input_tokens: 14
    output_tokens: 12
    total_tokens: 26
```
:::

## previous_response_id

previousResponseId指定。前回のレスポンスIDを指定することで、会話の継続が可能です。`previous_response_id` がリクエストとレスポンスの両方に反映されます。

| フィールド | 値 |
|-----------|---|
| ID | `parameters/previous_response_id` |
| メソッド | `generateText` |
| モデル | `gpt-5.2` |

### リクエスト

```yaml
model: "gpt-5.2"
input:
    - role: "user"
      content:
          - type: "input_text"
            text: "What number did I ask you to remember?"
previous_response_id: "resp_0b5ee5d75b4a961500698be3915c548190804ac7bd8ad61fad"
```

::: details レスポンス
```yaml
id: "resp_0b5ee5d75b4a961500698be3925f70819091523036897adb70"
object: "response"
status: "completed"
model: "gpt-5.2-2025-12-11"
previous_response_id: "resp_0b5ee5d75b4a961500698be3915c548190804ac7bd8ad61fad"
output:
    - type: "message"
      status: "completed"
      content:
          - type: "output_text"
            annotations: []
            text: "**42**"
      role: "assistant"
usage:
    input_tokens: 52
    output_tokens: 7
    total_tokens: 59
```
:::

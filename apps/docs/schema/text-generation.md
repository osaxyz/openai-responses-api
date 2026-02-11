# テキスト生成

基本的なテキスト生成パターンの収集結果です。`generateText` メソッドを使用し、各種モデルでの挙動を記録しています。

## basic

基本的なテキスト生成（gpt-5.2）

| フィールド | 値 |
|-----------|---|
| ID | `text_generation/basic` |
| メソッド | `generateText` |
| モデル | `gpt-5.2` |

### リクエスト

```yaml
model: "gpt-5.2"
input:
    - role: "user"
      content:
          - type: "input_text"
            text: "What is the capital of Japan?"
```

::: details レスポンス
```yaml
id: "resp_05f2499051634db200698be33df87481948b44278a71443649"
object: "response"
created_at: 1770775358
status: "completed"
model: "gpt-5.2-2025-12-11"
output:
    - id: "msg_05f2499051634db200698be33fecb08194acb1c09d4916f68d"
      type: "message"
      status: "completed"
      content:
          - type: "output_text"
            annotations: []
            text: "The capital of Japan is **Tokyo**."
      role: "assistant"
temperature: 1
top_p: 0.98
usage:
    input_tokens: 13
    output_tokens: 13
    total_tokens: 26
```
:::

## with_system_message

システムメッセージ付きテキスト生成。Responses APIでは `role: "developer"` としてシステムメッセージが送信されます。

| フィールド | 値 |
|-----------|---|
| ID | `text_generation/with_system_message` |
| メソッド | `generateText` |
| モデル | `gpt-5.2` |

### リクエスト

```yaml
model: "gpt-5.2"
input:
    - role: "developer"
      content: "You are a helpful assistant that responds in Japanese."
    - role: "user"
      content:
          - type: "input_text"
            text: "What is the capital of France?"
```

::: details レスポンス
```yaml
id: "resp_068b389eae431e1300698be341cefc8190a23dca0bc1b17bce"
object: "response"
created_at: 1770775361
status: "completed"
model: "gpt-5.2-2025-12-11"
output:
    - id: "msg_068b389eae431e1300698be3423d3081908d90c94f671228cb"
      type: "message"
      status: "completed"
      content:
          - type: "output_text"
            annotations: []
            text: "フランスの首都はパリです。"
      role: "assistant"
temperature: 1
top_p: 0.98
usage:
    input_tokens: 27
    output_tokens: 15
    total_tokens: 42
```
:::

## multi_turn

マルチターン会話。`input` 配列にユーザーとアシスタントのメッセージを交互に含めます。

| フィールド | 値 |
|-----------|---|
| ID | `text_generation/multi_turn` |
| メソッド | `generateText` |
| モデル | `gpt-5.2` |

### リクエスト

```yaml
model: "gpt-5.2"
input:
    - role: "user"
      content:
          - type: "input_text"
            text: "My name is Taro."
    - role: "assistant"
      content:
          - type: "output_text"
            text: "Hello Taro! How can I help you today?"
    - role: "user"
      content:
          - type: "input_text"
            text: "What is my name?"
```

::: details レスポンス
```yaml
id: "resp_024445c2624f7d3100698be343d48881969a81f179b00478b1"
object: "response"
created_at: 1770775363
status: "completed"
model: "gpt-5.2-2025-12-11"
output:
    - id: "msg_024445c2624f7d3100698be34422d08196a5cbb2f2543ea165"
      type: "message"
      status: "completed"
      content:
          - type: "output_text"
            annotations: []
            text: "Your name is Taro."
      role: "assistant"
temperature: 1
top_p: 0.98
usage:
    input_tokens: 38
    output_tokens: 10
    total_tokens: 48
```
:::

## gpt_5_mini

gpt-5-miniモデルでのテキスト生成。レスポンスに `reasoning` 出力アイテムが含まれます。

| フィールド | 値 |
|-----------|---|
| ID | `text_generation/gpt_5_mini` |
| メソッド | `generateText` |
| モデル | `gpt-5-mini` |

### リクエスト

```yaml
model: "gpt-5-mini"
input:
    - role: "user"
      content:
          - type: "input_text"
            text: "What is 2 + 2?"
```

::: details レスポンス
```yaml
id: "resp_043bc8410b6e69d600698be345b308819481d3ce9cb8e64387"
object: "response"
created_at: 1770775365
status: "completed"
model: "gpt-5-mini-2025-08-07"
output:
    - id: "rs_043bc8410b6e69d600698be34685a08194a12f6bb4a300ff3d"
      type: "reasoning"
      summary: []
    - id: "msg_043bc8410b6e69d600698be3471ff48194ae4eea3debbbba6d"
      type: "message"
      status: "completed"
      content:
          - type: "output_text"
            annotations: []
            text: "2 + 2 = 4."
      role: "assistant"
reasoning:
    effort: "medium"
    summary: null
temperature: 1
top_p: 1
usage:
    input_tokens: 14
    output_tokens: 61
    output_tokens_details:
        reasoning_tokens: 0
    total_tokens: 75
```
:::

## gpt_5_nano

gpt-5-nanoモデルでのテキスト生成。reasoningトークンが使用されます。

| フィールド | 値 |
|-----------|---|
| ID | `text_generation/gpt_5_nano` |
| メソッド | `generateText` |
| モデル | `gpt-5-nano` |

### リクエスト

```yaml
model: "gpt-5-nano"
input:
    - role: "user"
      content:
          - type: "input_text"
            text: "Explain what an API is in one sentence."
```

::: details レスポンス
```yaml
id: "resp_0f5c17d823e64a3500698be3498f7c81979b80a66d581fa8ae"
object: "response"
created_at: 1770775369
status: "completed"
model: "gpt-5-nano-2025-08-07"
output:
    - id: "rs_0f5c17d823e64a3500698be349ea1c81979a13f1fcc5f0462e"
      type: "reasoning"
      summary: []
    - id: "msg_0f5c17d823e64a3500698be34d8fd48197903853905ab55801"
      type: "message"
      status: "completed"
      content:
          - type: "output_text"
            annotations: []
            text: "An API (Application Programming Interface) is a defined set of rules and protocols that lets one software application communicate with another by requesting data or services and receiving responses."
      role: "assistant"
reasoning:
    effort: "medium"
    summary: null
temperature: 1
top_p: 1
usage:
    input_tokens: 15
    output_tokens: 356
    output_tokens_details:
        reasoning_tokens: 256
    total_tokens: 371
```
:::

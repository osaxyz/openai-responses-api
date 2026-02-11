# ストリーミング

SSEベースのストリーミングレスポンスの収集結果です。`streamText` メソッドを使用し、リクエストに `stream: true` が付与されます。

レスポンスは `events` 配列としてSSEイベントを順序通りに記録しています。

## イベントフロー

ストリーミングレスポンスのイベント順序は以下の通りです：

1. `response.created` - レスポンスオブジェクト作成
2. `response.in_progress` - 処理開始
3. `response.output_item.added` - 出力アイテム追加
4. `response.content_part.added` - コンテンツパート追加
5. `response.output_text.delta` - テキストデルタ（複数回）
6. `response.output_text.done` - テキスト完了
7. `response.content_part.done` - コンテンツパート完了
8. `response.output_item.done` - 出力アイテム完了
9. `response.completed` - レスポンス完了

## basic

基本的なストリーミング

| フィールド | 値 |
|-----------|---|
| ID | `streaming/basic` |
| メソッド | `streamText` |
| モデル | `gpt-5.2` |

### リクエスト

```yaml
model: "gpt-5.2"
input:
    - role: "user"
      content:
          - type: "input_text"
            text: "Count from 1 to 5."
stream: true
```

::: details レスポンス（主要イベント抜粋）
```yaml
stream: true
events:
    # 1. レスポンス作成
    - type: "response.created"
      response:
          id: "resp_0a5c636b9f3143d900698be34f6ed4819092526116371f21c8"
          status: "in_progress"
          model: "gpt-5.2-2025-12-11"
          output: []

    # 2. 出力アイテム追加
    - type: "response.output_item.added"
      item:
          type: "message"
          status: "in_progress"
          role: "assistant"

    # 3. テキストデルタ（チャンクごとに配信）
    - type: "response.output_text.delta"
      delta: "1"
      sequence_number: 4
    - type: "response.output_text.delta"
      delta: " \n"
      sequence_number: 5
    # ... 2, 3, 4, 5 と続く

    # 4. テキスト完了
    - type: "response.output_text.done"
      text: "1 \n2 \n3 \n4 \n5"

    # 5. レスポンス完了
    - type: "response.completed"
      response:
          status: "completed"
          usage:
              input_tokens: 14
              output_tokens: 13
              total_tokens: 27
```
:::

## with_system_message

システムメッセージ付きストリーミング

| フィールド | 値 |
|-----------|---|
| ID | `streaming/with_system_message` |
| メソッド | `streamText` |
| モデル | `gpt-5.2` |

### リクエスト

```yaml
model: "gpt-5.2"
input:
    - role: "developer"
      content: "You are a concise assistant."
    - role: "user"
      content:
          - type: "input_text"
            text: "What is TypeScript?"
stream: true
```

::: details レスポンス（最終イベント抜粋）
```yaml
stream: true
events:
    # ... 前半のイベントは basic と同様の構造

    # テキスト完了
    - type: "response.output_text.done"
      text: >-
          TypeScript is a programming language from Microsoft that adds
          **static typing** to JavaScript.

          - It's a **superset of JavaScript**: any valid JavaScript code
            is valid TypeScript.
          - You can add **types** so errors are caught **at compile time**
            rather than at runtime.
          - TypeScript code is **compiled (transpiled) to JavaScript**,
            so it runs anywhere JavaScript runs.

          It's commonly used to make large JavaScript codebases easier
          to maintain, refactor, and scale.

    # レスポンス完了
    - type: "response.completed"
      response:
          status: "completed"
          usage:
              input_tokens: 21
              output_tokens: 130
              total_tokens: 151
```
:::

## on_finish_capture

onFinish付きストリーミング。SDKの `onFinish` コールバックでの処理を想定したパターンです。

| フィールド | 値 |
|-----------|---|
| ID | `streaming/on_finish_capture` |
| メソッド | `streamText` |
| モデル | `gpt-5.2` |

### リクエスト

```yaml
model: "gpt-5.2"
input:
    - role: "user"
      content:
          - type: "input_text"
            text: "Say hello in three languages."
stream: true
```

::: details レスポンス（最終イベント抜粋）
```yaml
stream: true
events:
    # テキスト完了
    - type: "response.output_text.done"
      text: >-
          - English: Hello
          - Spanish: Hola
          - French: Bonjour

    # レスポンス完了
    - type: "response.completed"
      response:
          status: "completed"
          usage:
              input_tokens: 12
              output_tokens: 18
              total_tokens: 30
```
:::

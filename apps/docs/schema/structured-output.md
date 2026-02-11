# 構造化出力

JSON Schemaによる構造化レスポンスの収集結果です。リクエストの `text.format` に `json_schema` を指定し、レスポンスのテキストをJSON形式に制約します。

## リクエストの特徴

```yaml
text:
    format:
        type: "json_schema"
        strict: true
        name: "response"
        schema:
            type: "object"
            properties:
                # ... スキーマ定義
            required: [...]
            additionalProperties: false
```

## generate_object

Zodスキーマによる構造化出力（単一オブジェクト）

| フィールド | 値 |
|-----------|---|
| ID | `structured_output/generate_object` |
| メソッド | `generateText` |
| モデル | `gpt-5.2` |

### リクエスト

```yaml
model: "gpt-5.2"
input:
    - role: "user"
      content:
          - type: "input_text"
            text: "Generate a person profile for a fictional character."
text:
    format:
        type: "json_schema"
        strict: true
        name: "response"
        schema:
            type: "object"
            properties:
                name:
                    type: "string"
                    description: "Full name"
                age:
                    type: "number"
                    description: "Age in years"
                occupation:
                    type: "string"
                    description: "Job title"
                hobbies:
                    type: "array"
                    items:
                        type: "string"
                    description: "List of hobbies"
            required:
                - "name"
                - "age"
                - "occupation"
                - "hobbies"
            additionalProperties: false
```

::: details レスポンス
```yaml
id: "resp_0f67998ec0d4350b00698be36a89048196bf01b341a623964a"
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
                {"name":"Mara Elowen Hart","age":32,
                "occupation":"Disaster cartographer and remote-sensing analyst",
                "hobbies":["Urban sketching","Restoring antique radios",
                "Trail running at dawn","Cooking regional stews",
                "Learning endangered languages"]}
      role: "assistant"
text:
    format:
        type: "json_schema"
        name: "response"
        strict: true
usage:
    input_tokens: 87
    output_tokens: 60
    total_tokens: 147
```
:::

## generate_object_array

配列出力の構造化出力。スキーマのトップレベルに `elements` 配列を定義します。

| フィールド | 値 |
|-----------|---|
| ID | `structured_output/generate_object_array` |
| メソッド | `generateText` |
| モデル | `gpt-5.2` |

### リクエスト

```yaml
model: "gpt-5.2"
input:
    - role: "user"
      content:
          - type: "input_text"
            text: "List 3 popular programming languages with their use cases."
text:
    format:
        type: "json_schema"
        strict: true
        name: "response"
        schema:
            type: "object"
            properties:
                elements:
                    type: "array"
                    items:
                        type: "object"
                        properties:
                            name:
                                type: "string"
                                description: "Language name"
                            use_case:
                                type: "string"
                                description: "Primary use case"
                            year_created:
                                type: "number"
                                description: "Year the language was created"
                        required:
                            - "name"
                            - "use_case"
                            - "year_created"
                        additionalProperties: false
            required:
                - "elements"
            additionalProperties: false
```

::: details レスポンス
```yaml
id: "resp_049639777ac6b52700698be36dd7548194b2e3b0c437a72a6c"
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
                {"elements":[
                {"name":"Python","use_case":"Data science, automation/scripting,
                web backends, machine learning","year_created":1991},
                {"name":"JavaScript","use_case":"Web front-end development,
                server-side applications (Node.js)","year_created":1995},
                {"name":"Java","use_case":"Enterprise back-end systems,
                Android apps, large-scale distributed services","year_created":1995}
                ]}
      role: "assistant"
usage:
    input_tokens: 88
    output_tokens: 104
    total_tokens: 192
```
:::

## generate_object_choice

choice出力の構造化出力。`enum` でレスポンスを選択肢に制約します。

| フィールド | 値 |
|-----------|---|
| ID | `structured_output/generate_object_choice` |
| メソッド | `generateText` |
| モデル | `gpt-5.2` |

### リクエスト

```yaml
model: "gpt-5.2"
input:
    - role: "user"
      content:
          - type: "input_text"
            text: "Classify the sentiment of this text: 'I love programming, it makes me so happy!'"
text:
    format:
        type: "json_schema"
        strict: true
        name: "response"
        schema:
            type: "object"
            properties:
                result:
                    type: "string"
                    enum:
                        - "positive"
                        - "negative"
                        - "neutral"
            required:
                - "result"
            additionalProperties: false
```

::: details レスポンス
```yaml
id: "resp_0aabaa994ab1d82400698be37151288197aa6b21a9834d6d62"
object: "response"
status: "completed"
model: "gpt-5.2-2025-12-11"
output:
    - type: "message"
      status: "completed"
      content:
          - type: "output_text"
            annotations: []
            text: '{"result":"positive"}'
      role: "assistant"
usage:
    input_tokens: 55
    output_tokens: 12
    total_tokens: 67
```
:::

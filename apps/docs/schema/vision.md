# ビジョン

画像入力パターンの収集結果です。リクエストの `content` 配列に `type: "input_image"` を含めることで、画像を入力として渡します。

## 入力フォーマット

```yaml
content:
    - type: "input_text"
      text: "What is in this image?"
    - type: "input_image"
      image_url: "https://example.com/image.jpg"
```

## url_image

URL画像入力（単一画像）

| フィールド | 値 |
|-----------|---|
| ID | `vision/url_image` |
| メソッド | `generateText` |
| モデル | `gpt-5.2` |

### リクエスト

```yaml
model: "gpt-5.2"
input:
    - role: "user"
      content:
          - type: "input_text"
            text: "What is in this image?"
          - type: "input_image"
            image_url: "https://picsum.photos/id/237/300/200"
```

::: details レスポンス
```yaml
id: "resp_013f285e108b9ab500698be35ffcb88196880a236e58c999d3"
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
                The image shows a black dog (likely a puppy) sitting on a
                wooden floor, looking up toward the camera.
      role: "assistant"
usage:
    input_tokens: 97
    output_tokens: 27
    total_tokens: 124
```
:::

## multi_image

複数画像入力。`content` 配列に複数の `input_image` を含めます。

| フィールド | 値 |
|-----------|---|
| ID | `vision/multi_image` |
| メソッド | `generateText` |
| モデル | `gpt-5.2` |

### リクエスト

```yaml
model: "gpt-5.2"
input:
    - role: "user"
      content:
          - type: "input_text"
            text: "Compare these two images. What are the differences?"
          - type: "input_image"
            image_url: "https://picsum.photos/id/237/300/200"
          - type: "input_image"
            image_url: "https://picsum.photos/id/1025/300/200"
```

::: details レスポンス
```yaml
id: "resp_0d358ed581b50a6b00698be3642c6481968e555d0aff859a6a"
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
                - **Subject:** The first image shows a **black puppy/dog**;
                  the second shows a **small dog (looks like a pug)** wrapped up.
                - **Setting:** First is indoors/on a **wood plank floor**;
                  second is outdoors in a **forest/greenery** on a leafy ground.
                - **Pose/Composition:** First is a close-up with the dog
                  lying/crouched and looking up at the camera; second is a
                  wider shot with the dog **sitting** and mostly covered by
                  a **blanket**.
                - **Color/Lighting:** First is darker and more neutral;
                  second has more natural greens and a softer, outdoor look.
                - **Props:** No props in the first image; a **striped blanket**
                  is prominent in the second.
      role: "assistant"
usage:
    input_tokens: 186
    output_tokens: 168
    total_tokens: 354
```
:::

export const ERROR_MESSAGE = {
    COLLECTOR_MISSING_API_KEY: "OPENAI_API_KEY環境変数が設定されていません",
    COLLECTOR_PATTERN_FAILED: "パターンの実行に失敗しました",
    COLLECTOR_SERIALIZATION_FAILED: "YAMLシリアライズに失敗しました",
    COLLECTOR_DIRECTORY_CREATION_FAILED: "出力ディレクトリの作成に失敗しました",
    COLLECTOR_FILE_WRITE_FAILED: "YAMLファイルの書き込みに失敗しました",
    COLLECTOR_INVALID_RESPONSE: "レスポンスが取得できませんでした",
    COLLECTOR_VERSION_DETECTION_FAILED: "パッケージバージョンの検出に失敗しました",
    COLLECTOR_RESPONSE_ID_NOT_FOUND: "最初のレスポンスからresponseIdを取得できませんでした"
} as const

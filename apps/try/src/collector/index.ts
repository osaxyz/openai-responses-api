import { config } from "dotenv"
import { resolve } from "node:path"
import { ERROR_MESSAGE } from "../constants/error"
import { LOG_MESSAGE } from "../constants/log"
import { all_patterns } from "./patterns/index"
import { executePatterns } from "./executor"

// プロジェクトルートの.envを読み込み
config({ path: resolve(import.meta.dirname, "../../../../.env") })

async function main(): Promise<void> {
    const api_key = process.env.OPENAI_API_KEY
    if (!api_key) {
        console.error(ERROR_MESSAGE.COLLECTOR_MISSING_API_KEY)
        process.exit(1)
    }

    const sdk_version = await getPackageVersion("ai")
    const provider_version = await getPackageVersion("@ai-sdk/openai")

    console.log(LOG_MESSAGE.COLLECTOR_START)
    console.log(`  SDK version: ${sdk_version}`)
    console.log(`  Provider version: ${provider_version}`)
    console.log(`  パターン数: ${all_patterns.length}`)

    const start_time = performance.now()
    const results = await executePatterns(all_patterns, sdk_version, provider_version)
    const total_duration_ms = Math.round(performance.now() - start_time)

    const success_count = results.filter((r) => r.success).length
    const failed_count = results.filter((r) => !r.success).length

    console.log(`\n${LOG_MESSAGE.COLLECTOR_SUMMARY_HEADER}`)
    console.log(`${LOG_MESSAGE.COLLECTOR_SUMMARY_TOTAL}: ${results.length}`)
    console.log(`${LOG_MESSAGE.COLLECTOR_SUMMARY_SUCCESS}: ${success_count}`)
    console.log(`${LOG_MESSAGE.COLLECTOR_SUMMARY_FAILED}: ${failed_count}`)
    console.log(
        `${LOG_MESSAGE.COLLECTOR_SUMMARY_DURATION}: ${(total_duration_ms / 1000).toFixed(1)}s`
    )

    if (failed_count > 0) {
        console.log(`\n${LOG_MESSAGE.COLLECTOR_FAILED_PATTERNS_HEADER}`)
        for (const result of results) {
            if (!result.success) {
                console.log(`  - ${result.pattern_id}: ${result.error_message}`)
            }
        }
    }

    console.log(`\n${LOG_MESSAGE.COLLECTOR_COMPLETE}`)

    if (failed_count > 0) {
        process.exit(1)
    }
}

async function getPackageVersion(package_name: string): Promise<string> {
    try {
        const package_json_path = resolve(
            import.meta.dirname,
            `../../../../node_modules/${package_name}/package.json`
        )
        const { default: pkg } = await import(package_json_path, {
            with: { type: "json" }
        })
        return pkg.version as string
    } catch {
        throw new Error(`${ERROR_MESSAGE.COLLECTOR_VERSION_DETECTION_FAILED}: ${package_name}`)
    }
}

main()

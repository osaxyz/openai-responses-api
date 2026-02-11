import type { CollectPattern } from "../../types/pattern"
import { text_generation_patterns } from "./text_generation"
import { streaming_patterns } from "./streaming"
import { tool_calling_patterns } from "./tool_calling"
import { vision_patterns } from "./vision"
import { structured_output_patterns } from "./structured_output"
import { web_search_patterns } from "./web_search"
import { parameters_patterns } from "./parameters"

export const all_patterns: CollectPattern[] = [
    ...text_generation_patterns,
    ...streaming_patterns,
    ...tool_calling_patterns,
    ...vision_patterns,
    ...structured_output_patterns,
    ...web_search_patterns,
    ...parameters_patterns
]

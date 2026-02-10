import js from "@eslint/js"
import ts_plugin from "@typescript-eslint/eslint-plugin"
import ts_parser from "@typescript-eslint/parser"
import vue_plugin from "eslint-plugin-vue"
import vue_parser from "vue-eslint-parser"
import prettier_config from "eslint-config-prettier"

export default [
    js.configs.recommended,
    prettier_config,
    {
        ignores: [
            "node_modules/**",
            "dist/**",
            ".nuxt/**",
            ".output/**",
            ".vitepress/cache/**",
            ".vitepress/dist/**",
            "temp/**"
        ]
    },
    {
        files: ["**/*.ts", "**/*.tsx"],
        languageOptions: {
            parser: ts_parser,
            parserOptions: {
                ecmaVersion: "latest",
                sourceType: "module"
            }
        },
        plugins: {
            "@typescript-eslint": ts_plugin
        },
        rules: {
            semi: ["error", "never"],
            quotes: ["error", "double"],
            indent: ["error", 4],
            "no-unused-vars": "off",
            "@typescript-eslint/no-unused-vars": "warn"
        }
    },
    {
        files: ["**/*.vue"],
        languageOptions: {
            parser: vue_parser,
            parserOptions: {
                parser: ts_parser,
                ecmaVersion: "latest",
                sourceType: "module"
            }
        },
        plugins: {
            vue: vue_plugin
        },
        rules: {
            ...vue_plugin.configs["vue3-recommended"].rules,
            semi: ["error", "never"],
            quotes: ["error", "double"],
            indent: ["error", 4],
            "vue/html-indent": ["error", 4],
            "vue/script-indent": ["error", 4, { baseIndent: 0 }],
            "vue/multi-word-component-names": "off"
        }
    },
    {
        files: ["**/*.js", "**/*.mjs"],
        rules: {
            semi: ["error", "never"],
            quotes: ["error", "double"],
            indent: ["error", 4]
        }
    }
]

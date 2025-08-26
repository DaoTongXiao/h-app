import js from '@eslint/js'
import vue from 'eslint-plugin-vue'
import vueParser from 'vue-eslint-parser'
import tsParser from '@typescript-eslint/parser'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import globals from 'globals'

export default [
  // 基础 JavaScript 推荐配置
  js.configs.recommended,

  // Vue 3 推荐配置
  ...vue.configs['flat/essential'],

  // Vue 文件配置
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        // 小程序全局变量
        uni: 'readonly',
        wx: 'readonly',
        WechatMiniprogram: 'readonly',
        getCurrentPages: 'readonly',
        getApp: 'readonly',
        UniApp: 'readonly',
        UniHelper: 'readonly',
        App: 'readonly',
        Page: 'readonly',
        Component: 'readonly',
        AnyObject: 'readonly',
      },
    },
    rules: {
      // 自定义规则
      'vue/multi-word-component-names': 'off',
      'vue/no-setup-props-destructure': 'off',
      'vue/no-deprecated-html-element-is': 'off',
    },
  },

  // JavaScript/TypeScript 文件配置
  {
    files: ['**/*.{js,mjs,cjs,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        // 小程序全局变量
        uni: 'readonly',
        wx: 'readonly',
        WechatMiniprogram: 'readonly',
        getCurrentPages: 'readonly',
        getApp: 'readonly',
        UniApp: 'readonly',
        UniHelper: 'readonly',
        App: 'readonly',
        Page: 'readonly',
        Component: 'readonly',
        AnyObject: 'readonly',
      },
    },
  },

  // TypeScript 文件专用配置
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      // TypeScript 推荐规则
      ...tsPlugin.configs.recommended.rules,
    },
  },

  // 忽略文件配置
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      '.git/**',
      '.husky/**',
      'src/static/**',
      '**/*.d.ts',
    ],
  },
]
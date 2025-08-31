import js from '@eslint/js'
import ts from 'typescript-eslint'
import vue from 'eslint-plugin-vue'
import vueParser from 'vue-eslint-parser'
import tsParser from '@typescript-eslint/parser'

export default [
  js.configs.recommended,
  ...ts.configs.recommended,
  ...vue.configs['flat/recommended'],
  {
    ignores: ['**/*.cjs', '**/node_modules/**', '**/dist/**']
  },
  {
    languageOptions: {
      globals: {
        uni: true,
        wx: true,
        WechatMiniprogram: true,
        getCurrentPages: true,
        getApp: true,
        UniApp: true,
        UniHelper: true,
        App: true,
        Page: true,
        Component: true,
        AnyObject: true,
        console: true,
        window: true,
        document: true
      }
    }
  },
  {
    rules: {
      // javascript
      semi: ['error', 'never'],
      quotes: ['error', 'single'],
      'max-len': ['error', { 'code': 320, 'tabWidth': 2 }],
      'comma-dangle': ['error', 'never'],
      'no-unused-expressions': 'off',
      // typescript
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          'args': 'all',
          'argsIgnorePattern': '^_',
          'caughtErrors': 'all',
          'caughtErrorsIgnorePattern': '^_',
          'destructuredArrayIgnorePattern': '^_',
          'varsIgnorePattern': '^_',
          'ignoreRestSiblings': true
        }
      ],
      'no-unused-vars': 'off',
      // vue
      'vue/multi-word-component-names': 'off',
      'vue/block-order': ['error', {
        'order': ['script', 'template', 'style']
      }],
      'vue/html-closing-bracket-newline': [
        'error',
        {
          'singleline': 'never',
          'multiline': 'always',
          'selfClosingTag': {
            'singleline': 'never',
            'multiline': 'always'
          }
        }
      ]
    }
  },
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: {
          // 为 <script> 标签指定 TypeScript 解析器
          ts: tsParser,
          js: 'espree',
          '<template>': 'espree'
        },
        extraFileExtensions: ['.vue'],
        ecmaVersion: 'latest',
        sourceType: 'module',
        requireConfigFile: false
      }
    },
    rules: {
      'no-undef': 'off',
      'semi': ['error', 'never'],
      'quotes': ['error', 'single'],
      'max-len': ['error', { 'code': 320, 'tabWidth': 2 }],
      'comma-dangle': ['error', 'never'],
      'no-unused-expressions': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          'args': 'all',
          'argsIgnorePattern': '^_',
          'caughtErrors': 'all',
          'caughtErrorsIgnorePattern': '^_',
          'destructuredArrayIgnorePattern': '^_',
          'varsIgnorePattern': '^_',
          'ignoreRestSiblings': true
        }
      ],
      'no-unused-vars': 'off',
      'vue/multi-word-component-names': 'off',
      'vue/block-order': ['error', {
        'order': ['script', 'template', 'style']
      }],
      'vue/html-closing-bracket-newline': [
        'error',
        {
          'singleline': 'never',
          'multiline': 'always',
          'selfClosingTag': {
            'singleline': 'never',
            'multiline': 'always'
          }
        }
      ]
    }
  }
]
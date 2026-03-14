import importPlugin from 'eslint-plugin-import'
import prettierConfig from 'eslint-plugin-prettier/recommended'
import { defineConfig, globalIgnores, type Config } from 'eslint/config'
import { configs, type InfiniteDepthConfigWithExtends } from 'typescript-eslint'

const eslintConfig: InfiniteDepthConfigWithExtends = {
  name: 'eslint-config',
  rules: {
    'array-callback-return': [
      'error',
      {
        allowImplicit: false,
        checkForEach: true,
      },
    ],
    'block-scoped-var': 'error',
    camelcase: [
      'error',
      {
        ignoreDestructuring: false,
        ignoreGlobals: false,
        ignoreImports: false,
        properties: 'never',
      },
    ],
    complexity: 'off',
    'dot-notation': 'error',
    eqeqeq: [
      'error',
      'always',
      {
        null: 'ignore',
      },
    ],
    'max-depth': ['warn', 4],
    'max-params': ['error', 5],
    'newline-after-var': 'off',
    'no-caller': 'error',
    'no-cond-assign': ['error', 'except-parens'],
    'no-console': ['error', { allow: ['warn', 'error', 'debug', 'info'] }],
    'no-const-assign': 'error',
    'no-constant-condition': 'error',
    'no-debugger': 'error',
    'no-dupe-args': 'error',
    'no-dupe-keys': 'error',
    'no-duplicate-case': 'error',
    'no-else-return': 'error',
    'no-empty': [
      'error',
      {
        allowEmptyCatch: true,
      },
    ],
    'no-eq-null': 'off',
    'no-extra-bind': 'error',
    'no-extra-boolean-cast': 'error',
    'no-func-assign': 'error',
    'no-implicit-coercion': 'error',
    'no-lonely-if': 'error',
    'no-nested-ternary': 'error',
    'no-new': 'error',
    'no-param-reassign': 'error',
    'no-restricted-globals': ['error', 'fdescribe', 'fit'],
    'no-return-assign': 'off',
    'no-sequences': 'error',
    'no-sparse-arrays': 'error',
    'no-undef': 'off',
    'no-unneeded-ternary': 'error',
    'no-unreachable': 'error',
    'no-unused-expressions': 'off',
    'no-use-before-define': 'off',
    'no-var': 'warn',
    'no-warning-comments': [
      'error',
      {
        location: 'anywhere',
        terms: ['FIXME'],
      },
    ],
    'one-var': [
      'error',
      {
        const: 'never',
        let: 'never',
      },
    ],
    'padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        next: '*',
        prev: ['const', 'let', 'var'],
      },
      {
        blankLine: 'any',
        next: ['const', 'let', 'var'],
        prev: ['const', 'let', 'var'],
      },
      {
        blankLine: 'always',
        next: 'return',
        prev: '*',
      },
    ],
    'prefer-const': [
      'error',
      {
        destructuring: 'all',
        ignoreReadBeforeAssign: true,
      },
    ],
    'use-isnan': 'error',
    yoda: 'error',
  },
}

const importConfig: InfiniteDepthConfigWithExtends = {
  name: 'import-config',
  extends: [importPlugin.flatConfigs.recommended, importPlugin.flatConfigs.typescript],
  rules: {
    'import/no-named-as-default': 'off',
    'import/first': 'warn',
    'import/no-anonymous-default-export': [
      'warn',
      {
        allowAnonymousClass: false,
        allowAnonymousFunction: false,
        allowArray: true,
        allowArrowFunction: false,
        allowCallExpression: true,
        allowLiteral: true,
        allowObject: true,
      },
    ],
    'import/no-cycle': 'error',
    'import/no-extraneous-dependencies': 'error',
    'import/no-useless-path-segments': 'error',
    'import/order': 'off',
    'import/no-duplicates': 'error',
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
}

const typescriptConfig: InfiniteDepthConfigWithExtends = [
  {
    name: 'typescript-config',
    extends: [configs.recommended],
    rules: {
      '@typescript-eslint/ban-types': 'off',
      '@typescript-eslint/ban-ts-comment': [
        'error',
        {
          'ts-expect-error': false,
          'ts-ignore': true,
          'ts-nocheck': true,
          'ts-check': false,
        },
      ],
      '@typescript-eslint/consistent-type-assertions': 'error',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'after-used',
          argsIgnorePattern: '^_',
          ignoreRestSiblings: true,
          vars: 'all',
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-use-before-define': [
        'error',
        {
          functions: false,
          ignoreTypeReferences: true,
        },
      ],
      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        {
          accessibility: 'no-public',
          overrides: {
            parameterProperties: 'explicit',
          },
        },
      ],
    },
  },
]

const recommended = defineConfig(
  eslintConfig as Config,
  typescriptConfig as Config,
  importConfig as Config,
  prettierConfig,
)

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['*.{js,ts,tsx}'],
    extends: [recommended],
    languageOptions: {
      ecmaVersion: 2020,
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
])

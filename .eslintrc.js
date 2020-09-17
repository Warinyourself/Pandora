module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/recommended',
    '@vue/standard',
    '@vue/typescript',
    'plugin:vue/essential',
    '@vue/typescript/recommended',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/eqeqeq': 'error',
    'vue/camelcase': 'error',
    'vue/key-spacing': 'error',
    'vue/brace-style': 'error',
    'vue/comma-dangle': 'error',
    'vue/block-spacing': 'error',
    'vue/arrow-spacing': 'error',
    'no-unused-expressions': 'off',
    'vue/array-bracket-spacing': 'error',
    'vue/object-curly-spacing': 'error',
    'vue/match-component-file-name': 'error',
    '@typescript-eslint/ban-ts-ignore': 'off',
    'space-before-function-paren': [2, 'never'],
    'vue/component-name-in-template-casing': 'error',
    "@typescript-eslint/interface-name-prefix": 'off',
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
  }
}

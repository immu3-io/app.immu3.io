module.exports = {
  extends: ['@nuxtjs/eslint-config-typescript', 'plugin:prettier/recommended'],
  rules: {
    // General
    'comma-dangle': ['error', 'always-multiline'],

    // Typescript
    '@typescript-eslint/type-annotation-spacing': 'error',

    // Vue
    'vue/arrow-spacing': ['error', { before: true, after: true }],
    'vue/array-bracket-spacing': ['error', 'never'],
    'vue/block-spacing': ['error', 'always'],
    'vue/brace-style': ['error', 'stroustrup', { allowSingleLine: true }],
    'vue/comma-spacing': ['error', { before: false, after: true }],
    'vue/html-comment-indent': ['error', 1],
    'vue/html-indent': ['error', 2],
    'vue/key-spacing': ['error', { beforeColon: false, afterColon: true, mode: 'strict' }],
    'vue/keyword-spacing': ['error', { before: true, after: true }],
    'vue/multi-word-component-names': 'off',
    'vue/object-curly-spacing': ['error', 'always'],
    'vue/padding-line-between-blocks': ['error', 'always'],
    'vue/script-indent': ['error', 2, { baseIndent: 0 }],
    'vue/space-infix-ops': ['error', { int32Hint: false }],
  },
  overrides: [
    {
      files: ['*.{ts,js,cjs,vue}'],
    },
  ],
};

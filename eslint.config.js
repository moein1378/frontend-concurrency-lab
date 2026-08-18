import js from '@eslint/js'
export default [
  { ignores: ['**/dist/**', '**/node_modules/**', 'brand/**'] },
  js.configs.recommended,
  { languageOptions: { globals: { console: 'readonly' } } },
]

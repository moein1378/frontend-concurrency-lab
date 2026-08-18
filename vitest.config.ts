import { defineConfig } from 'vitest/config'
import { fileURLToPath } from 'node:url'

export default defineConfig({
  resolve: {
    alias: {
      '@concurrency-lab/scenario-engine': fileURLToPath(new URL('./packages/scenario-engine/src/index.ts', import.meta.url)),
      '@concurrency-lab/timeline': fileURLToPath(new URL('./packages/timeline/src/index.ts', import.meta.url)),
    },
  },
  test: {
    include: ['packages/**/*.test.ts', 'tests/integration/**/*.test.ts'],
    coverage: { enabled: false },
  },
})

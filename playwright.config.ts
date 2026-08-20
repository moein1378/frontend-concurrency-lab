import { defineConfig, devices } from '@playwright/test'

const browserChannel = process.env.PLAYWRIGHT_BROWSER_CHANNEL === 'bundled' ? undefined : 'chrome'

export default defineConfig({
  testDir: './tests/e2e',
  testMatch: '**/*.e2e.ts',
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  reporter: 'line',
  use: { baseURL: 'http://127.0.0.1:4173', trace: 'retain-on-failure' },
  webServer: {
    command: 'corepack pnpm --filter @concurrency-lab/app dev --host 127.0.0.1',
    url: 'http://127.0.0.1:4173',
    reuseExistingServer: !process.env.CI,
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'], channel: browserChannel } }],
})

# Testing Context

```yaml
generated_at: "2026-11-06T10:08:48.730Z"
verified_commit: "8b8be1ca66154fc9d693ce26adade200f05385c8"
fingerprint: "7397424d4769ae0da6b732c9ed2c7233700b7d0389da00bf082a7afc5460cd83"
package_scope: "pnpm workspace root; apps/lab; packages/*"
package_manager: "pnpm@11.22.0"
node: ">=24 <25 (.nvmrc: 24)"
framework:
  vue: "3.5.41 (apps/lab)"
  nuxt: null
testing:
  unit_runner: "Vitest 4.1.10"
  unit_environment: "Node (Vitest default; no environment override or DOM emulator configured)"
  unit_projects:
    - "packages/**/*.test.ts (7 files at generation time)"
    - "tests/integration/**/*.test.ts (5 files at generation time)"
  nuxt_runtime: null
  e2e_runner: "Playwright Test 1.62.1"
  e2e_glob: "tests/e2e/**/*.e2e.ts (8 files at generation time)"
  browser_mode: "Playwright E2E only; Vitest browser mode is not configured"
  setup_files: []
  separation:
    - "Vitest exercises framework-independent package and integration contracts in Node."
    - "Playwright exercises the Vite-served Vue application in real browsers."
    - "There is no Nuxt runtime test project and no jsdom/happy-dom unit-test project."
libraries:
  vue_test_utils: null
  testing_library: null
  nuxt_test_utils: null
  playwright: "@playwright/test 1.62.1"
  accessibility: "No dedicated accessibility package; E2E assertions cover selected keyboard, language, direction, and viewport behavior"
  visual_regression: "Opt-in with VISUAL_REGRESSION=1; ignored local Playwright baselines in tests/e2e/ui-quality.e2e.ts-snapshots; maxDiffPixelRatio 0.01, animations disabled, full-page screenshots. Default functional tests need no baselines."
coverage:
  enabled: false
  provider: null
  thresholds: null
scripts:
  test: "vitest run"
  test_e2e: "playwright test"
  verify: "corepack pnpm lint && corepack pnpm architecture:check && corepack pnpm typecheck && corepack pnpm test && corepack pnpm test:e2e && corepack pnpm build && corepack pnpm performance:check"
  related:
    lint: "eslint . && node scripts/lint-source.mjs"
    architecture_check: "node scripts/check-architecture.mjs"
    typecheck: "corepack pnpm --filter @concurrency-lab/app typecheck"
    build: "corepack pnpm --filter @concurrency-lab/app build"
    performance_check: "node scripts/check-bundle-budget.mjs"
config_files:
  - path: "package.json"
    sha256: "d8271873d5907aeaa0689cf28ad409c6284e95900a243ef597d8954bfb41c00b"
  - path: "pnpm-lock.yaml"
    sha256: "886a21a8b6ea2af5e13f01d64cf5f3330cbc2717bc87318ea7a267c9f5dbb0dc"
  - path: "pnpm-workspace.yaml"
    sha256: "d5654359aef3bbdfd55cc5fab820ed64b84390da09d79f7db7a0eab1056b3743"
  - path: "apps/lab/package.json"
    sha256: "cd62409ff980b462407981185d4fb37b5a20cecae6c23819cdc3a4f8b9d71cc8"
  - path: "vitest.config.ts"
    sha256: "45ae4afed5f9af24160347183c7ce02898cde9213ace72c628d0d1dc3db00338"
  - path: "playwright.config.ts"
    sha256: "8a1c82698c5a36046a6eacae8a2810d10614777ebec2a6c57b40f0b7a3a50ab3"
  - path: ".github/workflows/ci.yml"
    sha256: "cee60e5a946b76b700ec9610f6d578eecfa1d2a35dd8e74008e90630b525706c"
ci:
  workflow: ".github/workflows/ci.yml"
  triggers:
    - "pull_request"
    - "push to main"
  environment: "ubuntu-latest; Node from .nvmrc; pnpm via Corepack"
  commands:
    - "pnpm install --frozen-lockfile"
    - "pnpm exec playwright install --with-deps chromium firefox webkit"
    - "pnpm verify"
  browser_projects:
    - "chromium: Desktop Chrome; optional PLAYWRIGHT_EXECUTABLE_PATH override"
    - "firefox: Desktop Firefox"
    - "webkit: Desktop Safari"
    - "phone: Pixel 7; Chromium engine with optional PLAYWRIGHT_EXECUTABLE_PATH override"
  playwright_behavior:
    fully_parallel: true
    retries: "2 in CI; 0 locally"
    reporter: "line"
    trace: "retain-on-failure"
    web_server: "Vite dev server at http://127.0.0.1:4174; reuseExistingServer false"
  artifacts:
    - "apps/lab/dist uploaded as release-candidate-production-build, even when an earlier CI step fails"
    - "Playwright traces/test-results are not uploaded by the CI workflow"
unknowns: []
```

## Freshness

Regenerate this snapshot when any listed config file, dependency version, test environment, browser project, coverage rule, package script, or CI workflow changes. The fingerprint was generated with `.agents/scripts/project-fingerprint.mjs .` from the working tree; its file hashes therefore reflect current files, including uncommitted changes. The commit records the repository HEAD, not a clean-tree assertion.

## Capability notes

- Jest and Cypress are not configured.
- Vitest coverage is explicitly disabled; no coverage provider or thresholds are configured.
- The lockfile mentions Vitest's optional browser, coverage, jsdom, and happy-dom peers as package metadata, but the repository does not declare or configure those capabilities.
- Visual regression is local and opt-in through `VISUAL_REGRESSION=1`. Screenshot assertions run for Chromium, Firefox, and phone; default runs and WebKit retain functional assertions without requiring baselines. See README.md for baseline generation and comparison commands.
- Generated test screenshots, reports, traces, coverage, logs, and caches are ignored by Git; application images remain versioned.

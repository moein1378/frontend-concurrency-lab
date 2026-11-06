---
generated_at: "2026-11-06T10:08:48.730Z"
verified_commit: "8b8be1ca66154fc9d693ce26adade200f05385c8"
fingerprint: "7397424d4769ae0da6b732c9ed2c7233700b7d0389da00bf082a7afc5460cd83"
repo:
  type: monorepo
  package_manager: pnpm@11.22.0
  node: ">=24 <25"
framework:
  vue: 3.5.41
  vue_router: 4.6.4
  intro_js: 8.5.0
  nuxt: null
  vite: 8.2.1
  typescript: 5.9.3
  vuetify: 3.13.2
packages:
  - path: apps/lab
    name: "@concurrency-lab/app"
    purpose: Client-rendered catalog and progressive broken/fixed teaching application for freshness, mutual exclusion, bounded concurrency, single-flight, and cross-tab ownership.
  - path: packages/concurrency-core
    name: "@concurrency-lab/concurrency-core"
    purpose: Framework-independent latest-wins, idempotency, mutex, semaphore, and single-flight coordination primitives.
  - path: packages/scenario-engine
    name: "@concurrency-lab/scenario-engine"
    purpose: Deterministic fixtures, scenario orchestration, and invariant evaluation; depends only on public concurrency-core and timeline APIs.
  - path: packages/timeline
    name: "@concurrency-lab/timeline"
    purpose: Framework-independent deterministic clock and monotonic event recording.
architecture:
  entry_points:
    - apps/lab/index.html
    - apps/lab/src/main.ts
    - apps/lab/src/app/App.vue
    - packages/concurrency-core/src/index.ts
    - packages/scenario-engine/src/index.ts
    - packages/timeline/src/index.ts
  components:
    - apps/lab/src/components contains shared scenario, comparison, timeline, learning, navigation, and header presentation.
    - apps/lab/src/modules contains scenario-specific labs; apps/lab/src/pages owns route composition.
  state:
    - Vue components own interaction and playback state; reusable coordination and deterministic transitions remain in packages.
  data:
    - Repository-owned deterministic fixtures only; VITE_DEMO_SEED has a public default and no live transport is required.
  routing:
    - Vue Router HTML5 history owns /scenarios and five /scenario/*/compare routes; BASE_URL supports repository-subpath deployment and the Pages workflow supplies a 404 shell.
  package_boundaries:
    - apps/lab consumes workspace packages through declared public entry points.
    - packages/ is framework-independent and must not import Vue, app paths, or deep package internals.
design_system:
  components: Vuetify components are registered explicitly in apps/lab/src/plugins/vuetify.ts; app-owned compositions live under apps/lab/src/components.
  tokens: Vuetify labLight/labDark themes define semantic roles; apps/lab/src/styles/main.css aliases them for teaching-specific presentation.
  assets: brand/ and apps/lab/public/
quality:
  scripts:
    - "pnpm lint"
    - "pnpm architecture:check"
    - "pnpm typecheck"
    - "pnpm test"
    - "pnpm test:e2e"
    - "pnpm build"
    - "pnpm performance:check"
    - "pnpm verify"
  tests:
    - Vitest 4.1.10 runs package unit tests and root integration/public-contract tests configured by vitest.config.ts.
    - Playwright 1.62.1 runs Chromium, Firefox, WebKit, and Pixel 7 projects against an isolated Vite server on port 4174, retaining traces on failure.
    - Browser suites cover every scenario plus learning behavior and UI quality; deterministic suites cover coordination invariants and public exports.
    - Screenshot comparisons require VISUAL_REGRESSION=1 and use ignored local baselines; default functional browser tests do not require screenshot files.
  ci:
    - .github/workflows/ci.yml installs Chromium, Firefox, and WebKit, runs pnpm verify, performs pull-request dependency review, and uploads apps/lab/dist.
    - .github/workflows/deploy-demo.yml builds with the Pages base path after successful main CI, deploys apps/lab/dist, and smoke-tests the search-race route.
constraints:
  - statement: Use strict TypeScript and existing Vue 3 Composition API conventions.
    evidence: apps/lab/tsconfig.json; apps/lab/src/**/*.vue
    confidence: high
  - statement: Vuetify is the general presentation system; prefer semantic theme roles and existing CSS aliases over arbitrary component-level visual values.
    evidence: docs/adr/0004-vuetify-presentation-system.md; apps/lab/src/plugins/vuetify.ts; apps/lab/src/styles/main.css
    confidence: high
  - statement: Preserve keyboard navigation, focus and skip behavior, reduced motion, responsiveness, theme persistence, and explicit English document language/direction.
    evidence: AGENTS.md; apps/lab/src/main.ts; apps/lab/src/app/App.vue; apps/lab/src/components/LabHeader.vue; apps/lab/src/styles/main.css; tests/e2e/learning-experience.e2e.ts; tests/e2e/ui-quality.e2e.ts
    confidence: high
  - statement: Teaching surfaces reveal deterministic events progressively; visible results follow revealed commits and invariant evidence, with pause/resume and replay.
    evidence: docs/adr/0002-progressive-playback-and-introjs-tours.md; apps/lab/src/modules/; tests/e2e/learning-experience.e2e.ts
    confidence: high
  - statement: Search-race comparisons share deterministic inputs and teach AbortSignal cancellation separately from latest-wins stale-result rejection.
    evidence: packages/scenario-engine/src/application/run-search-race-comparison.ts; packages/scenario-engine/src/application/search-race.test.ts; tests/integration/search-race.test.ts
    confidence: high
  - statement: The mutex is FIFO, removes cancelled waiters, releases idempotently, and runExclusive releases in finally; this is local serialization, not remote exactly-once delivery.
    evidence: packages/concurrency-core/src/application/mutex.ts; packages/concurrency-core/src/application/primitives.test.ts; docs/project/phase-03-brief.md
    confidence: high
  - statement: The semaphore grants FIFO waiters, removes cancelled waits, and returns permits idempotently; upload scenarios expose queue, cancellation, completion, and peak-active evidence.
    evidence: packages/concurrency-core/src/application/semaphore.ts; packages/scenario-engine/src/application/run-upload-comparison.ts; tests/integration/bounded-concurrency.test.ts
    confidence: high
  - statement: Single-flight normalizes active keys, shares one producer promise, cleans its registry after all outcomes, and separates subscriber cancellation from producer ownership.
    evidence: packages/concurrency-core/src/application/single-flight.ts; packages/scenario-engine/src/application/run-single-flight-comparison.ts; packages/scenario-engine/src/application/single-flight-comparison.test.ts
    confidence: high
  - statement: Cross-tab fixture mode uses deterministic tab-ID election and does not claim production crash recovery, which would require leases and heartbeats.
    evidence: packages/scenario-engine/src/application/run-cross-tab-comparison.ts; packages/scenario-engine/src/application/cross-tab.test.ts; docs/failure-catalog.md
    confidence: high
  - statement: Package src/index.ts exports are the stable public boundary and contract tests detect unintended runtime export drift.
    evidence: packages/*/package.json; packages/*/src/index.ts; tests/integration/public-contracts.test.ts
    confidence: high
  - statement: Keep initial JavaScript within the enforced 200 KiB gzip budget.
    evidence: scripts/check-bundle-budget.mjs; package.json; docs/adr/0003-scenario-boundaries-and-release-hardening.md
    confidence: high
unknowns: []
---

# Project context

This pnpm workspace is a client-rendered Vue 3 concurrency teaching lab. Current source implements five accessible deterministic broken/fixed comparisons: stale search, mutual exclusion, bounded concurrency, single-flight, and cross-tab ownership. Phase records under `docs/project/` explain intended guarantees and trade-offs, but source, configuration, and tests are authoritative when documentation drifts.

## Freshness evidence

The fingerprint is produced by `.agents/scripts/project-fingerprint.mjs`. At generation time it covered root package/workspace metadata and test configuration; app package/config/bootstrap/router/theme/styles; all framework-independent package manifests; module-boundary documentation; the bundle-budget checker; and CI/deployment workflows.

Exact path hashes are available from `node .agents/scripts/project-fingerprint.mjs`; the aggregate fingerprint above is the stale-context key. Refresh when it changes or when source/tests alter a documented contract outside its coverage.

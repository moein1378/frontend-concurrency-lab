---
generated_at: 2026-08-20T20:18:57.799Z
verified_commit: 7620a6a9f8f30fc2ac556faa95fb7e3ce8cec089
fingerprint: 7b81d927fed69e6d2717ecc0dded4d061b5186808b57cf3074b1b14278e3e328
repo:
  type: monorepo
  package_manager: pnpm@11.22.0
  node: ">=24 <25"
framework:
  vue: 3.5.41
  vue_i18n: 11.1.12
  driver_js: 1.8.0
  nuxt: null
  vite: 8.2.1
  typescript: 5.9.3
  tailwind_css: 4.3.3
packages:
  - path: apps/lab
    name: "@concurrency-lab/app"
    purpose: Client-rendered Scenario Catalog, Scenario Detail, and Broken vs Fixed Comparison application.
  - path: packages/concurrency-core
    name: "@concurrency-lab/concurrency-core"
    purpose: Framework-independent coordination primitives.
  - path: packages/scenario-engine
    name: "@concurrency-lab/scenario-engine"
    purpose: Deterministic scenario orchestration, fixtures, and invariant evaluation.
  - path: packages/timeline
    name: "@concurrency-lab/timeline"
    purpose: Deterministic clock and monotonic event recording.
architecture:
  entry_points:
    - apps/lab/index.html
    - apps/lab/src/main.ts
    - apps/lab/src/app/App.vue
  components:
    - apps/lab/src/components/LabHeader.vue
  localization:
    - apps/lab/src/i18n owns English/Persian messages, locale persistence, and html lang/dir synchronization.
  tours:
    - apps/lab/src/tours owns Driver.js configuration; catalog and scenario pages own their localized steps.
  state:
    - Local Vue refs compose synchronized comparison controls, results, locale, theme, and optional tours; domain transitions live in packages.
  data:
    - Repository-owned deterministic fixtures only; VITE_DEMO_SEED has a safe public default.
  routing:
    - Lightweight pathname composition for /scenarios and /scenario/search-race/{broken,compare}; BASE_URL-prefixed links and a Pages 404 shell support repository-subpath hosting without a router dependency.
  package_boundaries:
    - apps/lab consumes packages only through their public entry points.
    - Framework-independent packages under packages/ must not import Vue or application paths.
design_system:
  components: apps/lab/src/components
  tokens: apps/lab/src/styles/main.css
  assets: brand/ and apps/lab/public/
quality:
  scripts:
    - "pnpm lint"
    - "pnpm architecture:check"
    - "pnpm typecheck"
    - "pnpm test"
    - "pnpm test:e2e"
    - "pnpm build"
    - "pnpm verify"
  tests:
    - Vitest 4.1.10 for colocated unit and root integration tests.
    - Playwright 1.62.1 uses installed stable Chrome by default and supports a PLAYWRIGHT_BROWSER_CHANNEL=bundled local override.
    - Translation-contract tests require matching non-empty English/Persian message keys; E2E covers RTL and tours.
  ci:
    - .github/workflows/ci.yml runs the frozen-install verify gate and uploads apps/lab/dist.
    - .github/workflows/deploy-demo.yml publishes the deterministic demo to GitHub Pages only after CI succeeds on main.
constraints:
  - statement: Use strict TypeScript and the existing Vue 3 Composition API conventions.
    evidence: apps/lab/tsconfig.json; apps/lab/src/components/LabHeader.vue
    confidence: high
  - statement: Consume semantic CSS custom properties instead of hard-coded component-level visual roles.
    evidence: apps/lab/src/styles/main.css; README.md
    confidence: high
  - statement: Preserve keyboard focus, skip navigation, reduced-motion handling, and responsive behavior.
    evidence: apps/lab/src/app/App.vue; apps/lab/src/styles/main.css; README.md
    confidence: high
  - statement: Every new visitor-facing string and guided-tour step must ship in English and Persian, with technical values isolated appropriately inside RTL layout.
    evidence: docs/adr/0001-bilingual-guided-teaching-ui.md; apps/lab/src/i18n/messages.ts; tests/integration/i18n-messages.test.ts
    confidence: high
  - statement: Phase 2 compares the intentionally broken stale-search run with AbortSignal cancellation or a latest-wins sequence-token guard using identical deterministic inputs.
    evidence: README.md; docs/project/phase-02-brief.md; packages/scenario-engine/src/application/run-search-race-comparison.ts
    confidence: high
  - statement: Keep future framework-independent packages under packages/ and free of Vue imports.
    evidence: docs/architecture/module-boundaries.md
    confidence: high
unknowns: []
---

# Project context

This is a pnpm workspace for a browser-based frontend concurrency teaching lab. Phase 2 provides an accessible Scenario Catalog and synchronized stale-search comparison with deterministic broken, cancellation-protected, and freshness-protected runs. Structured timelines expose request, abort, response, commit, discard, and invariant events. Treat `docs/project/phase-02-brief.md` as the implemented Phase 2 scope, while current source and configuration remain authoritative when documentation differs.

## Freshness evidence

The fingerprint follows `.agents/scripts/project-fingerprint.mjs` and covers these root files:

- `package.json`: `ba78efee5560d2a82ae4bca0297a6e3c92262e016366b01c035e0eb9ff35450b`
- `pnpm-lock.yaml`: `1e7a3b3277dd3b92e5e5f339882e750518e592e9a262a31cdc83fac3bbd3c7e0`
- `pnpm-workspace.yaml`: `d5654359aef3bbdfd55cc5fab820ed64b84390da09d79f7db7a0eab1056b3743`
- `vitest.config.ts`: `6a65916fc8442d8fabb5d636c3804b0465ada87a350af1fe0204ea29b4389674`
- `playwright.config.ts`: `703f64d8a22f2219ea8163601a82adde2c678c4cbb923f5c16eaba2ab58e65b2`
- `tsconfig.json`: `58e531ebfe1669592922decf3c0198acfefdd29ba0cb22591ea3017a384dce3e`

Because framework dependencies, localization, tours, and Pages base-path behavior live under `apps/lab`, refresh this context whenever `apps/lab/package.json` (`f2b0d338c94645ac4f92e8964293cd01a02e25c31aae1944bc399244dbd91407`), `apps/lab/vite.config.ts` (`10789ca3bf6a77e05ce1c644519a0975e21cb76f6f51c769350e8c34bec39511`), message contracts, or documented architecture boundaries change, even if the root fingerprint still reports fresh.

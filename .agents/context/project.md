---
generated_at: 2026-08-20T22:08:00+03:30
verified_commit: 70b1e39d47ae305bff2805fdf180e7adeede33de
fingerprint: cecf006e4cc700991da275bde8f080eb7b451957a4d4431fc66ebc5c88d6680b
repo:
  type: monorepo
  package_manager: pnpm@11.22.0
  node: ">=24 <25"
framework:
  vue: 3.5.41
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
  state:
    - Local Vue refs compose synchronized comparison controls and results; domain transitions live in packages.
  data:
    - Repository-owned deterministic fixtures only; VITE_DEMO_SEED has a safe public default.
  routing:
    - Lightweight pathname composition for /scenarios and /scenario/search-race/{broken,compare}; no router dependency.
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
  ci:
    - .github/workflows/ci.yml runs the frozen-install verify gate and uploads apps/lab/dist.
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
- `pnpm-lock.yaml`: `d79ac6ada507e856a4e5eb788d2cf9f393c56c6717474f0844078b402cc444bb`
- `pnpm-workspace.yaml`: `d5654359aef3bbdfd55cc5fab820ed64b84390da09d79f7db7a0eab1056b3743`
- `vitest.config.ts`: `6a65916fc8442d8fabb5d636c3804b0465ada87a350af1fe0204ea29b4389674`
- `playwright.config.ts`: `703f64d8a22f2219ea8163601a82adde2c678c4cbb923f5c16eaba2ab58e65b2`
- `tsconfig.json`: `58e531ebfe1669592922decf3c0198acfefdd29ba0cb22591ea3017a384dce3e`

Because framework dependencies and Vite configuration live under `apps/lab`, refresh this context whenever `apps/lab/package.json`, `apps/lab/vite.config.ts`, or the documented architecture boundaries change, even if the root fingerprint still reports fresh.

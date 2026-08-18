---
generated_at: 2026-08-18T18:46:18.245Z
verified_commit: null
fingerprint: 829612c29bb45bf8c85f7d14afe310bd6dd36e3218df300eafd889989810a3a1
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
    purpose: Client-rendered Scenario Catalog and Scenario Detail application.
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
    - Local Vue refs compose scenario controls and results; domain transitions live in packages.
  data:
    - Repository-owned deterministic fixtures only; VITE_DEMO_SEED has a safe public default.
  routing:
    - Lightweight pathname composition for /scenarios and /scenario/search-race/broken; no router dependency.
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
    - Playwright 1.62.1 using the installed stable Chrome channel for reviewer journeys.
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
  - statement: Phase 1 intentionally exposes the broken stale-search variant; corrected freshness/cancellation behavior remains Phase 2 scope.
    evidence: README.md; agent/TASK-BRIEF.md; packages/scenario-engine/src/application/run-broken-search-race.ts
    confidence: high
  - statement: Keep future framework-independent packages under packages/ and free of Vue imports.
    evidence: docs/architecture/module-boundaries.md
    confidence: high
unknowns:
  - The repository is not initialized as a Git worktree, so no commit can be recorded.
---

# Project context

This is a pnpm workspace for a browser-based frontend concurrency teaching lab. Phase 1 provides an accessible Scenario Catalog, a deterministic stale-search Scenario Detail, a structured event timeline, and framework-independent clock, scenario, and concurrency packages. Treat `agent/TASK-BRIEF.md` as phase scope, while current source and configuration remain authoritative when documentation differs.

## Freshness evidence

The fingerprint follows `.agents/scripts/project-fingerprint.mjs` and covers these root files:

- `package.json`: `27afbd147b00f6cdb3b49b2d7a2f950209c7712aac9347926dafb174e7623d6c`
- `pnpm-lock.yaml`: `7cf81d3942fc572a995bfc863c92444cef203be7497332a0174c215082058990`
- `pnpm-workspace.yaml`: `d5654359aef3bbdfd55cc5fab820ed64b84390da09d79f7db7a0eab1056b3743`
- `vitest.config.ts`: `6a65916fc8442d8fabb5d636c3804b0465ada87a350af1fe0204ea29b4389674`
- `playwright.config.ts`: `9b002b2e385a223a7cb46ff1c198157d47618df56f3f0954748ddec9c3906c5c`
- `tsconfig.json`: `58e531ebfe1669592922decf3c0198acfefdd29ba0cb22591ea3017a384dce3e`

Because framework dependencies and Vite configuration live under `apps/lab`, refresh this context whenever `apps/lab/package.json`, `apps/lab/vite.config.ts`, or the documented architecture boundaries change, even if the root fingerprint still reports fresh.

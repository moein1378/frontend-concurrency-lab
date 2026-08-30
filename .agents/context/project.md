---
generated_at: 2026-08-30T09:30:11.095Z
verified_commit: ad659ab9cbc51dddb73b6f4695e1cdd0733a2ebd
fingerprint: 3159c0632b4e3180756ae9ccee4cca54b8cb0b2abbc61368f7ee0f015ea78bf8
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
    purpose: Client-rendered MVP catalog and progressive broken/fixed teaching application for freshness, mutual exclusion, bounded concurrency, single-flight, and cross-tab ownership.
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
    - apps/lab/src/components provides the shared scenario shell, comparison lanes, timelines, learning journey, live tutor, state stepper, workspace navigation, and header.
  state:
    - Local Vue refs and computed state compose synchronized comparison controls, progressive playback, state-derived learning steppers, live explanations, visible commit projections, and theme; domain transitions live in packages.
  data:
    - Repository-owned deterministic fixtures only; VITE_DEMO_SEED has a safe public default.
  routing:
    - Vue Router with HTML5 history owns /scenarios and the five /scenario/* comparison routes; createWebHistory receives BASE_URL so the Pages 404 shell supports repository-subpath hosting.
  package_boundaries:
    - apps/lab consumes packages only through their public entry points.
    - Framework-independent packages under packages/ must not import Vue or application paths.
design_system:
  components: Vuetify components registered explicitly in apps/lab/src/plugins/vuetify.ts, plus app-owned composition in apps/lab/src/components
  tokens: Vuetify labLight/labDark themes provide semantic roles; apps/lab/src/styles/main.css aliases them for teaching-specific CSS
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
    - Vitest 4.1.10 for colocated unit, root integration, and frozen v1 public-export contract tests.
    - Playwright 1.62.1 defines Chromium, Firefox, WebKit, and phone projects; the isolated port-4174 server never reuses stale development state, and local Chromium supports PLAYWRIGHT_EXECUTABLE_PATH.
    - E2E covers state-derived teaching flows, interaction-gated Intro.js lessons, viewport overflow, browser errors, and Chromium/Firefox/phone screenshot baselines.
  ci:
    - .github/workflows/ci.yml installs Chromium/Firefox/WebKit, runs the frozen-install verify and bundle-budget gates, performs pull-request dependency review, and uploads apps/lab/dist.
    - .github/workflows/deploy-demo.yml publishes the deterministic demo to GitHub Pages only after CI succeeds on main and smoke-tests a stable scenario route.
constraints:
  - statement: Use strict TypeScript and the existing Vue 3 Composition API conventions.
    evidence: apps/lab/tsconfig.json; apps/lab/src/components/LabHeader.vue
    confidence: high
  - statement: Consume semantic CSS custom properties instead of hard-coded component-level visual roles.
    evidence: apps/lab/src/styles/main.css; README.md
    confidence: high
  - statement: Vuetify is the only general presentation system in apps/lab; register only used components to preserve tree-shaking and keep bespoke CSS focused on timelines, accessibility, responsive teaching layouts, and unique decoration.
    evidence: docs/adr/0004-vuetify-presentation-system.md; apps/lab/src/plugins/vuetify.ts; apps/lab/package.json; apps/lab/src/styles/main.css
    confidence: high
  - statement: Preserve keyboard focus, skip navigation, reduced-motion handling, and responsive behavior.
    evidence: apps/lab/src/app/App.vue; apps/lab/src/styles/main.css; README.md
    confidence: high
  - statement: Persist the selected light/dark theme in localStorage so client-side navigation and reloads retain the visitor's choice.
    evidence: apps/lab/src/components/LabHeader.vue; tests/e2e/learning-experience.e2e.ts
    confidence: high
  - statement: The visitor-facing application is English-only and keeps the root document language and direction explicit.
    evidence: apps/lab/src/main.ts; apps/lab/src/components/LabHeader.vue
    confidence: high
  - statement: Phase 2 compares the intentionally broken stale-search run with AbortSignal cancellation or a latest-wins sequence-token guard using identical deterministic inputs.
    evidence: README.md; docs/project/phase-02-brief.md; packages/scenario-engine/src/application/run-search-race-comparison.ts
    confidence: high
  - statement: Scenario teaching surfaces must reveal deterministic events progressively; visible results update on revealed commit events and invariants remain pending until their event, with pause/resume and replay available.
    evidence: docs/adr/0002-progressive-playback-and-introjs-tours.md; apps/lab/src/modules/search-race/SearchRaceLab.vue; tests/e2e/search-race.e2e.ts
    confidence: high
  - statement: The Phase 3 mutex is FIFO, removes cancelled waiters, releases idempotently, and runExclusive always releases in finally; the teaching fixture distinguishes this local guarantee from remote exactly-once effects.
    evidence: packages/concurrency-core/src/application/mutex.ts; packages/scenario-engine/src/application/run-mutual-exclusion-comparison.ts; docs/project/phase-03-brief.md
    confidence: high
  - statement: The Phase 4 semaphore exposes capacity state, grants FIFO waiters, removes cancelled waits, and returns permits idempotently; deterministic upload evidence reports queue, wait, cancellation, completion, and peak-active metrics.
    evidence: packages/concurrency-core/src/application/semaphore.ts; packages/scenario-engine/src/application/run-upload-comparison.ts; docs/project/phase-04-brief.md
    confidence: high
  - statement: Phase 5 normalizes in-flight keys, shares one promise per active key, cleans registry entries after all outcomes, keeps subscriber cancellation separate from producer ownership, and teaches stale-while-refresh as cache composition.
    evidence: packages/concurrency-core/src/application/single-flight.ts; packages/scenario-engine/src/application/run-single-flight-comparison.ts; docs/project/phase-05-brief.md
    confidence: high
  - statement: Release-candidate hardening provides focusable arrow-navigable structured timelines, four Playwright projects, and an enforced 200 KiB gzip initial-JavaScript budget.
    evidence: apps/lab/src/app/App.vue; playwright.config.ts; scripts/check-bundle-budget.mjs; docs/adr/0003-scenario-boundaries-and-release-hardening.md
    confidence: high
  - statement: The v1 stable boundary is each package's deliberate src/index.ts exports; contract tests prevent accidental runtime export drift, and the app downloads visible trace evidence as local JSON.
    evidence: tests/integration/public-contracts.test.ts; apps/lab/src/app/App.vue; CHANGELOG.md
    confidence: high
  - statement: Cross-tab ownership uses deterministic tab-ID election in fixture mode and explicitly documents that production coordination additionally requires leases, heartbeats, and crash recovery.
    evidence: packages/scenario-engine/src/application/run-cross-tab-comparison.ts; apps/lab/src/pages/CrossTabPage.vue; docs/failure-catalog.md
    confidence: high
  - statement: Every scenario embeds a progressive learning journey and an Intro.js lesson whose run step advances only after the learner uses the real simulator control; the tour reads scenario state instead of owning it.
    evidence: apps/lab/src/components/ScenarioLearning.vue; apps/lab/src/components/ScenarioStateStepper.vue; tests/e2e/learning-experience.e2e.ts; docs/adr/0002-progressive-playback-and-introjs-tours.md
    confidence: high
  - statement: Keep future framework-independent packages under packages/ and free of Vue imports.
    evidence: docs/architecture/module-boundaries.md
    confidence: high
unknowns: []
---

# Project context

This is a pnpm workspace for a browser-based frontend concurrency teaching lab. The stable teaching release presents five accessible English scenarios with deterministic broken/fixed comparisons, concept-specific imagery, progressive learning depth, state-derived steppers, live explanations, and interaction-aware guided lessons. Structured timelines expose requests, ownership, queueing, outcomes, release, commits/discards, and invariant evidence. Treat the phase briefs under `docs/project/` as implemented scope, while current source and configuration remain authoritative when documentation differs.

## Freshness evidence

The fingerprint follows `.agents/scripts/project-fingerprint.mjs` and covers these root files:

- `package.json`: `e8f8fe8f5ea028cb78fd9509e049e43a2191e8be37e105f3831f02eb8651d696`
- `pnpm-lock.yaml`: `886a21a8b6ea2af5e13f01d64cf5f3330cbc2717bc87318ea7a267c9f5dbb0dc`
- `pnpm-workspace.yaml`: `d5654359aef3bbdfd55cc5fab820ed64b84390da09d79f7db7a0eab1056b3743`
- `vitest.config.ts`: `45ae4afed5f9af24160347183c7ce02898cde9213ace72c628d0d1dc3db00338`
- `playwright.config.ts`: `a96b1d202fef11a3b524796bed3096ce0538348c1b100743e3b740c16f15fab9`
- `tsconfig.json`: `58e531ebfe1669592922decf3c0198acfefdd29ba0cb22591ea3017a384dce3e`

Because framework dependencies, playback, routing, and Pages base-path behavior live under `apps/lab`, refresh this context whenever its package metadata, router, Vite config, Vuetify setup, global styles, scenario learning component, or documented architecture boundaries change, even if the root fingerprint still reports fresh.

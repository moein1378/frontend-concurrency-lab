---
id: full-ui-redesign
status: superseded
created_at: 2026-08-24T18:05:00+03:30
updated_at: 2026-08-24T18:05:00+03:30
baseline:
  git_commit: ad659ab9cbc51dddb73b6f4695e1cdd0733a2ebd
  fingerprint: 5ceffc31b4affe90d6aad0cd51ac0088eea434525d807280c2c915bcc8286e03
goal: Rebuild the catalog and all five scenario experiences as one coherent, responsive, theme-safe Vuetify MVP, verified through repeated desktop and phone screenshot comparison.
non_goals:
  - Change concurrency algorithms, deterministic fixtures, public package APIs, or scenario invariants.
  - Add a router, Nuxt, another component system, external service, animation library, or decorative content.
  - Restore glossary, lesson levels, long explanations, or other removed non-MVP teaching content.
  - Uninstall Intro.js or remove it from package manifests and the lockfile.
acceptance_criteria:
  - id: A1
    statement: The landing page uses one continuous theme-aware surface; no forced white hero beside a forced dark catalog, in either light or dark mode.
  - id: A2
    statement: All five catalog cards share the same badge component, padding, height rules, typography, footer alignment, action treatment, and responsive grid behavior.
  - id: A3
    statement: Every scenario uses the same shell and visual hierarchy: compact identity header, control workspace, broken/fixed comparison lanes, invariant state, and timeline evidence.
  - id: A4
    statement: Search race, mutual exclusion, bounded concurrency, single-flight, and cross-tab ownership retain their current behavior and show their scenario-specific metrics without layout duplication or clipping.
  - id: A5
    statement: At desktop width, comparison lanes align as two equal columns; at phone width, controls, lanes, metrics, actions, and timelines stack into one readable column with no horizontal overflow.
  - id: A6
    statement: Light and dark states use semantic Vuetify theme tokens with accessible contrast, visible focus, and meaning that does not depend on color alone.
  - id: A7
    statement: Guided-tour usage is absent from the rendered application and source execution paths: no tour buttons, event wiring, adapter imports, tour selectors, or tour-only messages/tests remain, while the Intro.js dependency stays installed.
  - id: A8
    statement: Approved visual baselines exist for the catalog and every scenario in desktop and phone Chrome, with representative dark coverage.
  - id: A9
    statement: Lint, architecture, types, 44 unit/integration tests, Chrome desktop E2E, Chrome phone E2E, production build, and bundle budget pass; unavailable Firefox/WebKit coverage is reported exactly.
risks:
  - App-wide presentation reach makes shared-shell regressions possible; shared components must be introduced before page-specific styling.
  - Progressive search playback and timeline focus behavior are browser-sensitive and must be verified after each structural change.
  - Existing scenario templates are inconsistent and several are compressed into one-line files, increasing accidental behavior-change risk during markup extraction.
  - Screenshot baselines can approve a stable but poor composition; every generated image must be visually inspected before acceptance.
  - Removing tour-only translations must distinguish genuinely tour-exclusive keys from strings reused by normal application UI.
unknowns:
  - No external design or Figma source was supplied. The proposed direction is a restrained technical-workbench UI using the existing blue brand, neutral theme surfaces, and explicit broken/fixed semantic accents.
  - Firefox and WebKit binaries are not currently available locally; their download previously stalled.
steps:
  - id: S1
    status: pending
    purpose: Capture and classify the current visual failures before changing UI.
    depends_on: []
    files_or_surface:
      - /scenarios
      - all five /scenario/*/compare routes
      - light, dark, desktop, and phone states
    acceptance_refs: [A1, A2, A3, A5, A6]
    evidence:
      - Named baseline screenshots at 1440x1000 and Pixel 7 dimensions
      - Measured container widths, lane widths, gaps, header/footer alignment, and horizontal overflow
      - Short route-by-route defect inventory
  - id: S2
    status: pending
    purpose: Define the shared Vuetify visual grammar and remove forced surface/color exceptions.
    depends_on: [S1]
    files_or_surface:
      - apps/lab/src/plugins/vuetify.ts
      - apps/lab/src/styles/main.css
      - shared presentation components under apps/lab/src/components
    acceptance_refs: [A1, A3, A5, A6]
    evidence:
      - Verified semantic token mapping for canvas, surface, elevated surface, border, muted text, broken, fixed, focus, and code/timeline roles
      - No catalog-only hard-coded dark canvas or raw badge variant mismatch
      - Shared spacing/container/grid primitives demonstrated in both themes
  - id: S3
    status: pending
    purpose: Rebuild the landing/catalog as a compact, single-surface MVP with one reusable scenario-card data model.
    depends_on: [S2]
    files_or_surface:
      - apps/lab/src/pages/ScenarioCatalogPage.vue
      - catalog-related shared components and locale messages
    acceptance_refs: [A1, A2, A5, A6]
    evidence:
      - Desktop and phone catalog screenshots inspected and approved against A1/A2
      - All five cards render from one structure with identical badge and action components
      - Catalog navigation E2E passes and all cards remain keyboard accessible
  - id: S4
    status: pending
    purpose: Introduce one reusable scenario shell and comparison-lane/timeline presentation boundary without changing domain behavior.
    depends_on: [S2]
    files_or_surface:
      - apps/lab/src/components/ScenarioShell.vue
      - apps/lab/src/components/ComparisonLane.vue
      - apps/lab/src/components/EventTimeline.vue
      - five scenario page wrappers
    acceptance_refs: [A3, A5, A6]
    evidence:
      - Component contracts cover headings, controls, empty/running/complete states, lane status, metrics, and timeline slots
      - Typecheck and existing scenario E2E remain green after extraction
  - id: S5
    status: pending
    purpose: Redesign search race within the shared shell while preserving progressive playback.
    depends_on: [S4]
    files_or_surface:
      - apps/lab/src/pages/SearchRacePage.vue
      - apps/lab/src/modules/search-race/SearchRaceLab.vue
    acceptance_refs: [A3, A4, A5, A6, A8]
    evidence:
      - Before/after desktop, phone, and dark screenshots inspected
      - Playback, pause/resume, strategy selection, invariant, keyboard timeline, and trace download E2E pass
  - id: S6
    status: pending
    purpose: Redesign mutual exclusion and bounded concurrency with aligned controls, metric grids, invariant banners, lanes, and timelines.
    depends_on: [S4]
    files_or_surface:
      - apps/lab/src/pages/MutualExclusionPage.vue
      - apps/lab/src/modules/mutual-exclusion/MutualExclusionLab.vue
      - apps/lab/src/pages/BoundedConcurrencyPage.vue
      - apps/lab/src/modules/bounded-concurrency/BoundedConcurrencyLab.vue
    acceptance_refs: [A3, A4, A5, A6, A8]
    evidence:
      - Scenario-specific desktop and phone screenshots inspected after populated result states
      - Reveal progression, recovery outcomes, capacity metrics, invariants, and overflow checks pass
  - id: S7
    status: pending
    purpose: Redesign single-flight and cross-tab ownership with the same shell, lane, metric, status, and timeline treatment.
    depends_on: [S4]
    files_or_surface:
      - apps/lab/src/pages/SingleFlightPage.vue
      - apps/lab/src/modules/single-flight/SingleFlightLab.vue
      - apps/lab/src/pages/CrossTabPage.vue
    acceptance_refs: [A3, A4, A5, A6, A8]
    evidence:
      - Scenario-specific desktop and phone screenshots inspected after populated result states
      - Single-flight producer/caching evidence and two-page ownership convergence E2E pass
  - id: S8
    status: pending
    purpose: Remove all guided-tour usage while retaining Intro.js as an installed but unused package.
    depends_on: [S3, S5]
    files_or_surface:
      - apps/lab/src/components/LabHeader.vue
      - apps/lab/src/pages/ScenarioCatalogPage.vue
      - apps/lab/src/modules/search-race/SearchRaceLab.vue
      - apps/lab/src/tours/create-tour.ts
      - apps/lab English copy surfaces
      - tests/e2e/search-race.e2e.ts
      - apps/lab/package.json
      - pnpm-lock.yaml
    acceptance_refs: [A7]
    evidence:
      - Source search finds no runtime Intro.js import, lab:start-tour event, data-tour attribute, or guided-tour control
      - Tour-only test and message usage is removed without weakening other browser journeys
      - apps/lab/package.json and pnpm-lock.yaml still contain Intro.js at the existing version
  - id: S9
    status: pending
    purpose: Run the visual correction loop across every route and state until the shared geometry and theme behavior meet the acceptance criteria.
    depends_on: [S6, S7, S8]
    files_or_surface:
      - tests/e2e/ui-quality.e2e.ts
      - tests/e2e/ui-quality.e2e.ts-snapshots
    acceptance_refs: [A1, A2, A3, A5, A6, A8]
    evidence:
      - Screenshot matrix: catalog plus five populated scenarios in desktop and phone
      - Additional dark search screenshot
      - Each generated image opened and inspected; defects logged, corrected, and regenerated before baseline acceptance
      - Computed assertions for equal desktop lane widths, one-column phone flow, viewport containment, and zero console/page errors
  - id: S10
    status: pending
    purpose: Complete regression gates, independent review, documentation, and precise handoff.
    depends_on: [S9]
    files_or_surface:
      - Playwright and integration tests
      - docs/adr/0004-vuetify-presentation-system.md if component boundaries materially change
      - .agents/context/project.md
    acceptance_refs: [A4, A7, A9]
    evidence:
      - Chrome desktop and phone suites pass without retries or arbitrary waits
      - pnpm lint, architecture:check, typecheck, test, build, and performance:check pass
      - Independent visual/code review finds no unresolved high-severity issue
      - Exact Firefox/WebKit verification status recorded
decisions:
  - date: 2026-08-24
    decision: Use one theme-aware neutral surface family throughout the landing and scenario pages instead of a permanently dark catalog island.
    reason: Directly resolves the user's white-hero/dark-catalog mismatch while allowing the existing light/dark control to own the complete application appearance.
  - date: 2026-08-24
    decision: Keep visual emphasis restrained: blue for primary actions, red plus icon/text for broken state, green plus icon/text for fixed state, neutral surfaces for structure.
    reason: Produces a coherent technical-workbench MVP and preserves accessible non-color state communication.
  - date: 2026-08-24
    decision: Preserve scenario behavior and package boundaries; redesign only apps/lab presentation and browser regression coverage.
    reason: The domain scenarios currently pass and should not be destabilized by a visual rebuild.
  - date: 2026-08-24
    decision: Remove all guided-tour application usage but retain Intro.js in package metadata.
    reason: The user explicitly wants tours absent from the MVP while keeping the package available for possible future work.
---

## Approval checkpoint

No redesign implementation begins until the user approves this plan and the proposed single-surface technical-workbench direction.

Superseded on 2026-08-28 by `scenario-learning-state-machine-and-qa.md`. The newer user requirements explicitly retain and expand Intro.js, educational content, generated scenario imagery, state-derived steppers, and full browser QA.

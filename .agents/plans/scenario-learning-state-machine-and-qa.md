---
id: scenario-learning-state-machine-and-qa
status: completed-with-exceptions
created_at: 2026-08-28T00:00:00+03:30
updated_at: 2026-08-30T11:42:00+03:30
baseline:
  git_commit: ad659ab9cbc51dddb73b6f4695e1cdd0733a2ebd
  fingerprint: 0ab219811f567184c3f7585ed38aafde95635787c806319fd304e160d7dca23a-b639ad9595fc7000af0ea95105e000814a3513ed4e4b84f5f1f49a0342d92d25-c09485e0fdf505d029cd929af6d9fe84e69172a1d798927894dde4b2a0a1275f
goal: Apply the complete learning, imagery, simulator-state, guided-tour, responsive, theme, and browser-QA acceptance criteria consistently to the catalog and all five scenarios while preserving deterministic domain behavior and package boundaries.
non_goals:
  - Change concurrency algorithms or public domain package APIs unless a verified simulator correctness defect requires it.
  - Add Nuxt, external services, accounts, secrets, or another UI framework.
  - Turn scenario pages into exhaustive reference documentation.
acceptance_criteria:
  - id: A1
    statement: No reading-time estimate remains in rendered UI, metadata, locale content, or scenario data.
  - id: A2
    statement: Every scenario teaches a connected problem setup, substantial real-world flow and mapping, technical solution, and concise mental model with progressive depth for junior, mid-level, and senior readers.
  - id: A3
    statement: Every scenario has a unique concept-specific generated banner in one coherent illustration system, reused on its catalog card and detail hero.
  - id: A4
    statement: Difficult concepts use accessible, theme-safe static flow or state diagrams that clarify rather than decorate.
  - id: A5
    statement: Every simulator exposes an explicit state model whose current step and allowed transitions derive from simulator conditions, including configuration changes, invalid input, repeat actions, reset, completion, failures, retries, skipped/not-applicable states, and no-change outcomes where supported.
  - id: A6
    statement: Simulator result, visualization, explanation, stepper, and guided lesson agree through one scenario-level source of truth.
  - id: A7
    statement: Every Intro.js lesson teaches cause and effect, coordinates with meaningful interaction where appropriate, and is readable and design-system-consistent in light and dark themes.
  - id: A8
    statement: Primary simulator controls, current state/result, contextual explanation, and state stepper remain practically co-visible on normal desktop/laptop viewports and conceptually adjacent on smaller screens.
  - id: A9
    statement: All catalog and scenario pages have no structural horizontal overflow or clipped content at desktop, laptop, tablet, and phone representative sizes in either theme.
  - id: A10
    statement: Automated unit/component coverage protects state-machine transitions and Playwright protects every scenario happy path, alternative/boundary/invalid/repeat/reset/failure-retry path applicable to it, tours, themes, viewport behavior, and page-by-page visual contracts.
  - id: A11
    statement: The release gate pnpm verify passes, or any environmental gap is documented exactly without claiming it passed.
risks:
  - The worktree contains substantial user-owned uncommitted redesign changes; edits must preserve and build on them.
  - State synchronization spans five distinct simulator implementations and browser-sensitive progressive playback.
  - Generated raster assets must remain legible in both themes and responsive crops while representing distinct concepts consistently.
  - Existing E2E files include compressed tests and visual baselines; broad screenshot changes require deliberate inspection, not blind updates.
  - Intro.js currently has shared CSS but its runtime interaction model is static; changing it can introduce focus, overlay, or stale-target regressions.
unknowns:
  - Exact edge/failure capabilities differ by simulator and must be mapped from source before state contracts are finalized.
  - Existing generated/user assets, if any, have not yet been identified.
steps:
  - id: S1
    status: completed
    purpose: Inventory all five simulator contracts, interaction edge cases, current content, tours, visual assets, and rendered baseline before implementation.
    depends_on: []
    files_or_surface: [apps/lab/src, packages, tests/e2e, tests/integration, /scenarios, all five scenario routes]
    acceptance_refs: [A1, A2, A5, A6, A7, A8, A9]
    evidence: [Scenario-by-scenario edge-case/state table, source search for reading-time strings, baseline browser screenshots and overflow/viewport measurements in both themes]
  - id: S2
    status: completed
    purpose: Define reusable scenario identity, educational-content, diagram, and state-machine presentation contracts without weakening scenario-specific behavior.
    depends_on: [S1]
    files_or_surface: [apps/lab/src/components, apps/lab/src/modules, apps/lab/src/pages, apps/lab/src/styles/main.css]
    acceptance_refs: [A1, A2, A4, A5, A6, A8]
    evidence: [Typed explicit state/transition contracts, transition tests, shared content schema, verified semantic-token mappings]
  - id: S3
    status: completed
    purpose: Generate, inspect, persist, and integrate five coherent concept-specific scenario banners.
    depends_on: [S1]
    files_or_surface: [apps/lab/public/scenarios, catalog cards, scenario heroes]
    acceptance_refs: [A3, A9]
    evidence: [Five inspected workspace assets, prompt record, card/hero reuse assertions, responsive/theme screenshots]
  - id: S4
    status: completed
    purpose: Remove reading-time content and expand every scenario into the required connected learning journey with progressive disclosure and supporting diagrams.
    depends_on: [S2, S3]
    files_or_surface: [ScenarioCatalogPage.vue, ScenarioShell.vue, ScenarioLearning.vue, locale messages, scenario diagrams]
    acceptance_refs: [A1, A2, A3, A4, A9]
    evidence: [Content/schema tests for all scenarios, rendered inspection in English and representative Persian, source search with no reading-time UI strings]
  - id: S5
    status: completed
    purpose: Implement and verify scenario-specific state machines and synchronized steppers for search race, mutual exclusion, and bounded concurrency.
    depends_on: [S2]
    files_or_surface: [three scenario modules plus shared stepper/state helpers]
    acceptance_refs: [A5, A6, A8, A10]
    evidence: [Transition tests and browser flows covering normal, backward, repeat, invalid, boundary, reset, and applicable failure/retry states]
  - id: S6
    status: completed
    purpose: Implement and verify scenario-specific state machines and synchronized steppers for single-flight and cross-tab ownership.
    depends_on: [S2]
    files_or_surface: [two scenario modules plus shared stepper/state helpers]
    acceptance_refs: [A5, A6, A8, A10]
    evidence: [Transition tests and browser flows covering normal, backward, repeat, invalid, boundary, reset, and applicable failure/retry states]
  - id: S7
    status: completed
    purpose: Rebuild every Intro.js lesson around interaction-aware teaching and fix its rendered design-system styling in both themes.
    depends_on: [S4, S5, S6]
    files_or_surface: [ScenarioLearning.vue, tour adapter/composable, main.css, E2E]
    acceptance_refs: [A6, A7, A10]
    evidence: [Browser assertions that meaningful interaction gates relevant tour progression, screenshots for light/dark/phone, contrast and overflow inspection, reset/stale-target coverage]
  - id: S8
    status: completed
    purpose: Complete responsive one-viewport simulator layout and route-by-route visual correction across themes and representative sizes.
    depends_on: [S3, S4, S5, S6, S7]
    files_or_surface: [all pages/components/styles, visual E2E baselines]
    acceptance_refs: [A3, A8, A9, A10]
    evidence: [Page-by-page desktop/laptop/tablet/phone light/dark QA, zero horizontal overflow, measured action-result-explanation-stepper proximity, inspected screenshots]
  - id: S9
    status: completed-with-exceptions
    purpose: Exercise every simulator and guided flow end to end, repair findings, run the release gate, and update durable project records.
    depends_on: [S8]
    files_or_surface: [tests, docs, .agents/context/project.md, complete application]
    acceptance_refs: [A10, A11]
    evidence: [Scenario QA matrix with rerun results, pnpm verify result, final visual inspection record, updated freshness-aware project context]
decisions:
  - date: 2026-08-28
    decision: Preserve the current Vuetify redesign and domain packages, treating the new requirements as an extension of the existing shared shell.
    reason: The worktree already contains substantial user-owned implementation and passing-oriented test infrastructure.
  - date: 2026-08-28
    decision: Supersede the older plan's tour-removal requirement and make Intro.js a synchronized learning client of scenario state.
    reason: The newest user acceptance criteria explicitly require educational, interaction-aware tours in both themes.
  - date: 2026-08-28
    decision: Use generated raster art for scenario banners and code-native HTML/CSS/SVG-like diagrams for deterministic educational flows.
    reason: Banners require a coherent illustration system; instructional diagrams require precise, accessible, responsive labels.
  - date: 2026-08-30
    decision: Accept the local release verification with a documented WebKit host-dependency exception.
    reason: Chromium, Firefox, and phone behavior/visual projects pass; the installed WebKit binary cannot launch because the host lacks its required GTK, ICU, GStreamer, media, and graphics libraries. CI installs these dependencies with Playwright.
---

## Execution note

The user authorized implementation and any needed skill installation. Existing installed repository skills cover the task; no additional skill is currently required. The dirty worktree is preserved as baseline state, and unrelated blueprint/.idea changes remain untouched.

## Completion evidence

- Drift classification: minor. The baseline commit and root fingerprint remain unchanged; the planned app-source redesign accumulated in the preserved dirty worktree and matches the plan intent.
- Reading-time source/UI assertion, five unique scenario images, progressive learning content, state-derived steppers, interaction-gated tours, theme checks, responsive proximity, and overflow behavior are covered by `tests/e2e/learning-experience.e2e.ts` and `tests/e2e/ui-quality.e2e.ts`.
- `pnpm lint`, `pnpm architecture:check`, `pnpm typecheck`, and `pnpm test` passed during the 2026-08-30 `pnpm verify` run; Vitest reported 13 files and 44 tests passed.
- Chromium and Firefox passed their 30-test projects; the release-gate bundled-browser phone project passed 30/30. Firefox and phone visual baselines were regenerated with their release-gate browser engines and inspected.
- `pnpm build` passed (632 modules; 432.98 kB raw / 141.93 kB gzip application JavaScript), and `pnpm performance:check` passed at 140,898 bytes gzip against the 204,800-byte budget.
- `pnpm verify` is not green locally only because WebKit cannot launch without host libraries; all other release-gate stages were executed successfully as recorded above.

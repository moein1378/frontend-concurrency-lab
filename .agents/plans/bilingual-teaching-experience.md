---
id: bilingual-teaching-experience
status: completed-with-exceptions
created_at: 2026-08-20
updated_at: 2026-08-20
baseline:
  git_commit: 7620a6a9f8f30fc2ac556faa95fb7e3ce8cec089
  fingerprint: 7cec53c0dd6e8419ecb9a0bb216780d8dfdb18fe8250fe14839d5c47bec65ee0
goal: Make every implemented surface a clear, guided, bilingual English/Persian concurrency lesson for junior, mid-level, and senior frontend developers.
non_goals:
  - Add later-phase concurrency scenarios or real network adapters.
  - Translate internal developer documentation or source identifiers.
  - Add user accounts, analytics, or remote persistence.
acceptance_criteria:
  - id: A1
    statement: All visitor-facing catalog, scenario, control, result, timeline, glossary, and guidance content is accurately localized in English and Persian.
  - id: A2
    statement: Locale switching updates html lang and dir, persists locally, and yields a usable mirrored RTL layout without breaking LTR technical values.
  - id: A3
    statement: Catalog and stale-search scenario offer keyboard-accessible localized guided tours with clear progress and exit controls.
  - id: A4
    statement: The scenario explains prerequisites, mental model, failure, protections, invariant, event evidence, trade-offs, decision guidance, and level-specific takeaways.
  - id: A5
    statement: Existing deterministic behavior remains unchanged and automated tests cover locale, RTL, tours, and the reviewer workflow.
  - id: A6
    statement: Dependency decisions, local runbooks, phase handoff, and durable project context are current.
risks:
  - RTL can expose physical-direction CSS and punctuation/order defects.
  - Tour overlays can reduce accessibility or become stale when conditional result content is absent.
  - Large translation dictionaries can drift from templates without tests.
unknowns: []
steps:
  - id: S1
    status: completed
    purpose: Add pinned i18n/tour dependencies, architecture decision, and localization foundation.
    depends_on: []
    files_or_surface: [apps/lab/package.json, apps/lab/src/i18n, apps/lab/src/main.ts, docs/adr]
    acceptance_refs: [A1, A2, A6]
    evidence: [Dependency install and typecheck pass; locale service unit tests pass.]
  - id: S2
    status: completed
    purpose: Localize and expand catalog/header into a progressive learning entry point with a catalog tour.
    depends_on: [S1]
    files_or_surface: [apps/lab/src/components, apps/lab/src/pages/ScenarioCatalogPage.vue]
    acceptance_refs: [A1, A2, A3, A4]
    evidence: [English and Persian catalog browser assertions are implemented for CI.]
  - id: S3
    status: completed
    purpose: Turn the stale-search comparison into a complete guided lesson and localize dynamic event evidence.
    depends_on: [S1]
    files_or_surface: [apps/lab/src/pages/SearchRacePage.vue, apps/lab/src/modules/search-race]
    acceptance_refs: [A1, A3, A4]
    evidence: [Both strategies and localized timelines remain deterministic; scenario tour is executable.]
  - id: S4
    status: completed
    purpose: Implement responsive RTL/theme-safe styling and accessibility details.
    depends_on: [S2, S3]
    files_or_surface: [apps/lab/src/styles/main.css]
    acceptance_refs: [A2, A3, A4]
    evidence: [Type/lint/build gates pass; RTL browser assertions are implemented for CI.]
  - id: S5
    status: pending
    purpose: Update automated coverage, documentation, project context, and run the release gate.
    depends_on: [S1, S2, S3, S4]
    files_or_surface: [tests, docs, README.md, .agents/context/project.md]
    acceptance_refs: [A5, A6]
    evidence: [pnpm verify passes; project context fingerprint is refreshed.]
decisions:
  - date: 2026-08-20
    decision: Use vue-i18n 11 Composition API and Driver.js with repository-owned localized tour definitions.
    reason: They provide typed Vue-native localization and dependency-light accessible tour primitives while domain packages remain framework-independent.
---

## Verification note

S1–S4 are implemented and pass lint, architecture, strict typecheck, 20 unit/integration tests, and production build. S5 retains browser verification until CI runs the five Playwright journeys with stable Chrome; the local Linux environment cannot download the pinned browser because the primary CDN is region-blocked.

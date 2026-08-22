---
id: remaining-concurrency-lab-phases
status: pending
created_at: 2026-08-22
updated_at: 2026-08-22
baseline:
  git_commit: 1472d0390de903fb220b6fc8693c590796374045
  fingerprint: 0736716e43e9e70a1a139d44aba0e1d1ab2d149411d0626c95ddd0025f3e1c2a
goal: Complete the remaining scenario-first concurrency teaching lab phases, preserving deterministic progressive evidence, bilingual accessibility, package boundaries, tests, documentation, and one verified commit per phase.
non_goals:
  - Add Nuxt, SSR, external services, paid accounts, secrets, or real nondeterministic network timing.
  - Invent retry, timeout, caching, upload cancellation, or cross-tab browser API semantics not required by a scenario invariant.
  - Commit IDE metadata, generated test artifacts, or unrelated user files.
acceptance_criteria:
  - id: A1
    statement: Phase 2 progressive search playback is correct, accessible, documented, and committed as its own verified boundary.
  - id: A2
    statement: Phase 3 teaches double-submit/shared-resource mutual exclusion with identical broken/fixed inputs and deterministic queue/critical-section evidence.
  - id: A3
    statement: Phase 4 teaches bounded concurrency with deterministic workload, peak-active invariant evidence, and a semaphore-protected comparison.
  - id: A4
    statement: Phase 5 teaches in-flight duplicate coalescing, proving producer call count and shared outcomes while preserving retry after failure.
  - id: A5
    statement: Phase 6 hardens the lab with keyboard-accessible timelines, responsive layouts, performance budgets, cross-browser coverage, architecture/failure documentation, and release-candidate delivery.
  - id: A6
    statement: Every visitor-facing scenario is available in English and Persian, remains usable in RTL and phone layouts, and explains mental model, evidence, trade-offs, decision guidance, and limitations.
  - id: A7
    statement: Each phase has focused unit/integration coverage, a browser-critical reviewer journey, updated phase brief/handoff documentation, and a phase commit after proportional verification.
  - id: A8
    statement: Phase 7 freezes public primitive contracts and completes explanations, downloadable traces, accessibility evidence, and reproducible stable-release documentation.
risks:
  - High async/concurrency sensitivity requires deterministic scheduling and independent review of shared primitives and orchestration.
  - Repeating the current search-specific playback implementation would create drift and accessibility regressions across scenarios.
  - The local environment has no stable Chrome binary, so browser execution may remain a documented exception unless a compatible browser becomes available.
  - Publishing GitHub Pages, tags, or releases requires remote credentials and authority; local delivery artifacts and workflows can still be completed and verified.
unknowns: []
steps:
  - id: S0
    status: completed
    purpose: Close the existing dirty Phase 2 teaching/playback work, fix reproduced defects, refresh context, verify, and commit it.
    depends_on: []
    files_or_surface:
      - apps/lab search-race UI, playback, tokens, localization, and browser tests
      - docs/adr, docs/project, .agents/context
    acceptance_refs: [A1, A6, A7]
    evidence:
      - Focused regression checks for intermediate commit content and truthful lock/live-region state.
      - lint, architecture, typecheck, unit/integration, browser attempt, and build results.
      - One Phase 2 completion commit excluding .idea and generated artifacts.
  - id: S2
    status: completed
    purpose: Implement and commit Phase 3 mutual exclusion as a complete vertical teaching slice.
    depends_on: [S0]
    files_or_surface:
      - packages/concurrency-core, packages/scenario-engine, packages/timeline, apps/lab, tests, docs/project
    acceptance_refs: [A2, A6, A7]
    evidence:
      - Red/Green tests prove broken overlap and fixed serialized critical sections.
      - Progressive browser journey exposes queued, entered, committed, released, and invariant states.
      - Phase gate passes or has an exact documented browser exception; phase commit exists.
  - id: S3
    status: completed
    purpose: Implement and commit Phase 4 bounded concurrency as a complete vertical teaching slice.
    depends_on: [S2]
    files_or_surface:
      - packages/concurrency-core, packages/scenario-engine, packages/timeline, apps/lab, tests, docs/project
    acceptance_refs: [A3, A6, A7]
    evidence:
      - Red/Green tests prove broken peak exceeds capacity and fixed peak never does while all jobs finish.
      - Progressive browser journey explains queue pressure and capacity trade-offs.
      - Phase gate passes or has an exact documented browser exception; phase commit exists.
  - id: S4
    status: completed
    purpose: Implement and commit Phase 5 single-flight request coalescing as a complete vertical teaching slice.
    depends_on: [S3]
    files_or_surface:
      - packages/concurrency-core, packages/scenario-engine, packages/timeline, apps/lab, tests, docs/project
    acceptance_refs: [A4, A6, A7]
    evidence:
      - Red/Green tests prove one producer per in-flight key, shared outcome, key isolation, and retry after rejection.
      - Progressive browser journey distinguishes in-flight sharing from caching.
      - Phase gate passes or has an exact documented browser exception; phase commit exists.
  - id: S5
    status: pending
    purpose: Implement and commit Phase 6 release-candidate hardening: accessible timelines, responsive behavior, performance budgets, cross-browser tests, architecture/failure documentation, and GitHub Pages delivery configuration.
    depends_on: [S4]
    files_or_surface:
      - shared timeline/playback UI, responsive styles, Playwright projects, CI/deployment, scripts, ADRs, failure catalog, docs/project
    acceptance_refs: [A5, A6, A7]
    evidence:
      - Keyboard timeline and phone playback journeys pass in available browser projects.
      - Deterministic bundle/runtime budgets are documented and enforced.
      - Release-candidate gate passes or has exact environment-only exceptions; phase commit exists.
  - id: S6
    status: pending
    purpose: Implement and commit Phase 7 stable teaching-release completion and run the final release audit.
    depends_on: [S5]
    files_or_surface:
      - public package contracts, explanations and trace downloads, accessibility evidence, release notes, README, docs, .agents/context, all gates
    acceptance_refs: [A6, A7, A8]
    evidence:
      - Public API contract tests protect the frozen primitive surface.
      - Every scenario offers complete guidance and a deterministic downloadable trace.
      - pnpm verify passes, or the exact unavailable browser capability is recorded; phase commit and clean tracked worktree exist.
decisions:
  - date: 2026-08-22
    decision: Follow the authoritative v3 Phase 3–7 files: mutex/double submit, semaphore/uploads, single-flight/deduplication, release-candidate hardening, then stable teaching release.
    reason: The external blueprint directory named by the user is authoritative and resolves the earlier repository-local inference.
  - date: 2026-08-22
    decision: Keep deterministic domain runs synchronous and project them progressively in the application layer.
    reason: This preserves fast exact domain tests while teaching observable temporal ordering, matching ADR 0002.
  - date: 2026-08-22
    decision: Do not implement inferred cross-tab ownership in Phase 6.
    reason: It is V1 product scope but is not assigned to Phases 3–7; phase instructions prohibit pulling backlog scope into an active phase.
---

## Baseline evidence

- Non-browser gates passed on 2026-08-22: lint, architecture, strict typecheck, 20 Vitest tests, production build.
- Playwright reached the configured server only outside the sandbox, then all six workers failed before test execution because the configured stable Chrome binary `/opt/google/chrome/chrome` is absent.
- Read-only audits found an intermediate-result reconstruction defect, an inaccurate always-locked timeline label, duplicate live-region risk, reduced-motion timing not handled in JavaScript, and missing reusable scenario boundaries.

## Drift protocol

Before each phase, compare HEAD, package/config fingerprints, incomplete-step surfaces, and any newly added brief. A newly supplied authoritative blueprint is material drift and must update Phase 4–6 requirements before further implementation.

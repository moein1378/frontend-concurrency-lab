---
id: phase-02-cancellation-and-freshness
status: completed-with-exceptions
created_at: 2026-08-20
updated_at: 2026-08-20
baseline:
  git_commit: 70b1e39d47ae305bff2805fdf180e7adeede33de
  fingerprint: unavailable-before-edit-node-runtime-not-launching-in-sandbox
goal: Deliver the complete v0.2.0 cancellation-and-freshness vertical slice with deterministic broken-versus-fixed comparison and synchronized project context.
non_goals:
  - Add mutual-exclusion, bounded-upload, single-flight, cross-tab, or other later-phase scenario surfaces.
  - Add a real network service, router dependency, SSR, or paid capability.
acceptance_criteria:
  - id: A1
    statement: AbortController propagation cancels the superseded request and records request, abort, response, commit, and invariant events.
  - id: A2
    statement: Latest-wins freshness protection discards a stale response and records request, response, commit, discard, and invariant events.
  - id: A3
    statement: A reviewer can run broken and selected fixed behavior from one synchronized comparison surface using the same seed and timings.
  - id: A4
    statement: Concurrency-core exposes tested latest-wins, single-flight, mutex, and semaphore responsibilities required by Phase 2.
  - id: A5
    statement: Unit, integration, browser, architecture, type, lint, and production-build gates pass.
  - id: A6
    statement: Phase status, runbook/handoff documentation, and .agents/context/project.md reflect v0.2.0 from verified repository facts.
risks:
  - High runtime-sensitivity: deterministic cancellation and stale completion ordering must remain monotonic and comparable.
  - Shared public package contracts must stay framework-independent and preserve Phase 1 callers.
  - Comparison layout must remain usable as a single-column phone playback surface.
unknowns:
  - The Linux Node launcher is unavailable in the sandbox; verification may require the installed Windows Node runtime with approval.
steps:
  - id: S1
    status: completed
    purpose: Extend core and timeline public contracts for cancellation, freshness, discard, and semaphore behavior.
    depends_on: []
    files_or_surface:
      - packages/concurrency-core/src
      - packages/timeline/src
    acceptance_refs: [A1, A2, A4]
    evidence:
      - Focused Vitest primitive and timeline tests pass.
  - id: S2
    status: completed
    purpose: Implement deterministic abort-protected and freshness-protected search orchestration and paired comparison.
    depends_on: [S1]
    files_or_surface:
      - packages/scenario-engine/src
      - tests/integration
    acceptance_refs: [A1, A2, A3]
    evidence:
      - Unit and integration tests assert event order, shared inputs, and passing invariants.
  - id: S3
    status: completed
    purpose: Replace the broken-only detail with accessible broken-versus-fixed comparison controls, results, and structured timelines.
    depends_on: [S2]
    files_or_surface:
      - apps/lab/src/modules/search-race
      - apps/lab/src/pages
      - apps/lab/src/styles
      - tests/e2e
    acceptance_refs: [A3]
    evidence:
      - Deterministic Playwright reviewer and failure-path workflows pass.
  - id: S4
    status: completed
    purpose: Update Phase 2 release documentation and durable project context.
    depends_on: [S1, S2, S3]
    files_or_surface:
      - README.md
      - docs/project
      - docs/runbooks
      - .agents/context/project.md
    acceptance_refs: [A6]
    evidence:
      - Context fingerprint is refreshed and docs match implemented routes and behavior.
  - id: S5
    status: pending
    purpose: Run the complete release gate and resolve regressions.
    depends_on: [S1, S2, S3, S4]
    files_or_surface:
      - repository verification surface
    acceptance_refs: [A5]
    evidence:
      - pnpm verify passes.
decisions:
  - date: 2026-08-20
    decision: Keep deterministic virtual-time orchestration and model AbortSignal propagation without introducing a real network fixture.
    reason: Phase 2 requires cancellation semantics while the primary workflow must stay instant, replayable, offline, and seed-synchronized.
  - date: 2026-08-20
    decision: Expose cancellation and freshness as selectable fixed strategies within one comparison route.
    reason: This covers both required protections while preserving the phase's single Broken vs Fixed Comparison surface.
---

## Execution notes

- Existing untracked `.idea/` content is user-owned and excluded from this plan.
- Current source/config and the Phase 2 blueprint are authoritative if this plan drifts.
- S5 evidence: lint, architecture, typecheck, 18 unit/integration tests, and production build pass. Playwright could not launch because system Chrome is absent; the primary browser CDN returned a regional HTTP 403 and the alternate mirror timed out. Three deterministic E2E journeys are implemented for CI execution.

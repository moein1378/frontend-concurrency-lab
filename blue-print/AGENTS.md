# AGENTS.md — Frontend Concurrency Lab

## Mission

Maintain `frontend-concurrency-lab` against the current source-backed blueprint v4 and root repository instructions. This directory preserves the original implementation document structure while describing workspace 1.1.0. Do not restart completed historical phases or substitute the stack based on superseded planning examples.

## Required reading order

1. Root `AGENTS.md`, relevant source/configuration/tests, and `node .agents/scripts/context-status.mjs`.
2. `01-blueprint.md` and `10-repository-map.md`.
3. `11-engineering-policies.md` and `04-dependencies-and-services.md`.
4. Relevant `03-design-tokens.md` / `05-brand-system.md` for presentation work.
5. The relevant historical phase record when it informs the task.
6. `agent/TASK-BRIEF.md` and current task requirements.

A fresh generated context fingerprint does not establish every narrative claim remains current. Verify disputed behavior in source; older README/ADR/phase prose may lag implementation.

## Hard constraints

- Keep changes within the authorized task; preserve unrelated staged renames and edits.
- Keep the primary workflow free of paid services, accounts, secrets, and backend dependencies.
- Preserve scenario-first boundaries: framework-independent `concurrency-core`, `scenario-engine`, and `timeline`; Vue owns presentation and browser adapters.
- Use Vue 3 + Vite + strict TypeScript + Vue Router + Vuetify. Tailwind, Pinia, XState, MSW, and Hono are not current dependencies.
- Rendering remains a client SPA; no SSR is required for the interactive fixture workflow.
- Do not put secrets in client `VITE_*` values or invent API success outside the documented local fixtures.
- Preserve supplied brand assets, semantic themes, keyboard/skip/focus behavior, reduced motion, responsive layouts, and explicit English/LTR behavior.
- Preserve deterministic invariants and distinguish real coordination primitives from illustrative scenario traces.
- Do not claim the localStorage teaching claim provides atomic election, leases, heartbeats, crash recovery, or remote exactly-once effects.
- Keep behavior tests and durable docs current with material changes. Use proportionate validation under root instructions.

## Completion command

`pnpm verify` is the broad runtime gate: lint, architecture checks, typecheck, unit/integration tests, four browser projects, production build, and bundle budget. Run it when task risk warrants broad validation; documentation-only work also needs link/path, source-consistency, template-parity, and diff checks. Do not require a release tag or a new handoff for every small edit.

For this blueprint reconciliation, record actual checks, source evidence, remaining limitations, and the next safe step in `agent/HANDOFF.md`. Failed or unavailable checks must remain explicit.

## Verification provenance

Verified 2026-11-14 against `19640ebd8169ce625b2a093caafc1ca2483b6a84` plus working-tree changes. Confidence: high. Evidence: [root instructions](../AGENTS.md), [scripts](../package.json), [app stack](../apps/lab/package.json), [router](../apps/lab/src/router.ts), and [boundaries](../docs/architecture/module-boundaries.md). Recheck after architecture, tooling, route, or behavior changes. These instructions supersede this directory's original v3/current-phase/Tailwind execution profile.

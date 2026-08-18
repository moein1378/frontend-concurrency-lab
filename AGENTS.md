# Frontend Concurrency Lab — Codex Instructions

## Mission

Implement the repository phase by phase as a scenario-first Vue 3 concurrency teaching lab. Current source and configuration are authoritative; durable project facts are cached in `.agents/context/project.md`.

## Before changing code

1. Read the relevant source, tests, package scripts, and `docs/project/phase-01-brief.md`.
2. Identify the owning workspace package and its public boundary.
3. Use the narrowest matching skill from `.agents/skills/` when its description matches the task.
4. Separate verified facts from assumptions; do not invent routes, APIs, environment variables, invariants, or design states.

## Architecture

- `apps/lab` owns Vue composition and presentation.
- `packages/concurrency-core` owns framework-independent coordination primitives.
- `packages/scenario-engine` owns deterministic scenario orchestration and invariant evaluation.
- `packages/timeline` owns deterministic time and monotonic event recording.
- Domain packages must not import Vue, application paths, provider SDKs, or deep package internals.
- Cross-package imports use public entry points.
- Do not add Nuxt, SSR, a component framework, or an external service without an accepted ADR.

## Implementation defaults

- Vue 3 Composition API with `<script setup>` and strict TypeScript.
- Deterministic time, randomness, and async ordering through owned ports.
- Semantic tokens from `apps/lab/src/styles/main.css`; no unexplained visual constants.
- Accessible semantics, keyboard interaction, visible focus, and state labels that do not rely on color alone.
- Adaptive desktop-first layouts; phone mode remains a usable single-column playback surface.
- Preserve fixture/local operation without paid services, accounts, or secrets.
- Keep changes within the active phase and avoid unrelated refactors.

## Skills

Codex should select these automatically from task intent:

- `bug-fix` — reproduce, isolate, fix, and protect defects.
- `design-token-audit` — audit semantic tokens and theme-safe mappings.
- `figma-to-code` — implement supplied design evidence with measured visual verification.
- `frontend-e2e-tests` — add or repair browser-critical Playwright journeys.
- `frontend-feature-tdd` — use when test-first/TDD delivery is requested.
- `plan-and-execute` — create or resume durable implementation plans.
- `project-context` — refresh `.agents/context/project.md` after material repository changes.
- `testing-setup` — establish or refresh testing infrastructure/context.
- `vue-nuxt-refactor` — behavior-preserving Vue structural/reactive refactors.
- `write-project-docs` — maintain durable project documentation from verified sources.

Do not activate a skill merely because it exists. Follow the selected `SKILL.md` completely and use repository conventions over generic examples.

## Verification

Choose the smallest evidence that proves the behavior, then run broader gates proportional to risk. The release gate is:

```bash
pnpm verify
```

It covers lint, architecture boundaries, types, unit/integration tests, browser tests, and production build. Never report an unexecuted command as passing. If a required capability is unavailable, state the exact unverified gap.

## Documentation and handoff

- Update tests and documentation with behavior changes.
- Record material architecture decisions under `docs/adr/`.
- Keep completed phase records under `docs/project/`; do not recreate a root `agent/` directory.
- Do not store secrets, credentials, transient logs, or generated build/test artifacts as context.

Use precise completion language: `done`, `done-with-documented-exception`, `implemented-unverified`, `reviewed`, or `blocked`.

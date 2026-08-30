# AGENTS.md — Frontend Concurrency Lab

## Mission

Implement `frontend-concurrency-lab` as defined by the v3 blueprints. Do not redesign the product or substitute the stack without an accepted ADR.

## Required reading order

1. `01-blueprint.md`
2. `10-repository-map.md`
3. `11-engineering-policies.md`
4. `04-dependencies-and-services.md`
5. `03-design-tokens.md`
6. `05-brand-system.md`
7. The active file in `phases/`
8. `agent/TASK-BRIEF.md`

## Hard constraints

- Current phase only.
- Keep the primary workflow free of paid services.
- Preserve: Scenario-first modular monolith with framework-independent concurrency primitives and deterministic simulators.
- Use: Vue 3 + Vite + TypeScript + Tailwind CSS 4; custom lab components; no SSR
- Rendering decision: Client-rendered SPA. SSR provides no meaningful benefit because every experiment is interactive and browser-runtime dependent.
- Do not add secrets to client environment variables.
- Do not introduce placeholder APIs or fake success states outside documented fixture mode.
- Do not redraw brand assets.
- Update tests and docs in the same change.

## Completion command

`pnpm verify`

A task is incomplete until verification passes and `agent/HANDOFF.md` records changed files, tests, decisions, limitations, and the next safe step.

---
name: frontend-test-context
description: Gather only the missing Vue/Nuxt testing facts needed for a specific task and produce a compact task-scoped test context. Use when test strategy is blocked by unknown runtime, dependencies, environment, or existing coverage.
---

# Frontend Test Context

Read `../_shared/skill-contract.md`, `../_shared/repository-preflight.md`, and `../_shared/version-awareness.md`.

## Intent

Avoid generic test assumptions by gathering only facts that materially change the strategy.

## Workflow

1. Read `.agents/context/testing.md` if it exists.
2. Check freshness/fingerprint when available.
3. Inspect only missing task-relevant facts:
   - test runner/environment
   - relevant Nuxt/Vue runtime
   - existing test conventions
   - helpers/setup
   - boundary dependencies
   - matching existing tests
4. Write a concise task profile only when persistence helps.

## Do Not

- rebuild full project context for every test task
- ask the user for information encoded in the repository
- assume Nuxt runtime tests and E2E share the same environment
- collect unrelated package/tooling facts

## Output

Use `references/task-test-context.md`.

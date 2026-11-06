# Repository Engineering Instructions

## Authority

Current source, configuration, tests, and repository contracts are authoritative.

Generated context under `.agents/context/` is a cache of verified facts,
not a replacement for source inspection.

Global Codex engineering instructions remain active unless this file
defines a more specific repository rule.

## Startup preflight

Before non-trivial work:

1. inspect the relevant package and repository scripts
2. inspect relevant source/config/test paths
3. run:
   `node .agents/scripts/context-status.mjs`
4. when project context is fresh and relevant, read:
   `.agents/context/project.md`
5. if context is stale and the task depends on those facts,
   use the `project-context` skill to refresh it
6. inspect existing plans only when the task appears to continue
   an existing planned initiative

Do not read every historical plan on every task.

## Repository architecture

This repository is a pnpm monorepo.

The client application lives under:
`apps/lab`

Framework-independent domain/coordination packages live under:
`packages/`

Current major packages:
- `packages/concurrency-core`
- `packages/scenario-engine`
- `packages/timeline`

Packages under `packages/` must remain framework-independent.

They must not:
- import Vue
- import application-only paths
- bypass intended public entry points

The application should consume packages through their public boundaries.

Preserve dependency direction unless an explicit architecture change is justified.

## Frontend system

Use the existing Vue 3 Composition API and strict TypeScript conventions.

Vuetify is the general presentation system in `apps/lab`.

Prefer existing semantic theme/design tokens.

Do not introduce arbitrary raw visual values when an appropriate semantic role exists.

Preserve:
- keyboard navigation
- focus behavior
- skip navigation
- reduced-motion handling
- responsive behavior
- theme persistence
- explicit English document language/direction behavior

## Skill routing

Repository skills are project-specific extensions to global methodology.

Choose them automatically based on task type.

Use:
- `bug-fix` for defects, regressions, runtime failures, and incorrect behavior
- `frontend-feature-tdd` for non-trivial frontend feature behavior
- `vue-nuxt-refactor` for concrete structural/refactoring problems
- `frontend-e2e-tests` for browser-critical integration journeys
- `testing-setup` when testing/tooling context is missing or materially changed
- `project-context` when repository context is missing or stale
- `design-token-audit` for design-system/token consistency
- `figma-to-code` only when an authoritative design source is available
- `write-project-docs` for durable architecture/contract knowledge
- `plan-and-execute` for persisted phased or multi-session plans

Generic Superpowers workflows may act as the outer methodology.

Do not run overlapping workflows that add no additional evidence.

## Concurrency specialist

Use `concurrency_reviewer` for substantial changes involving:
- cancellation
- latest-wins/freshness
- mutex behavior
- semaphore behavior
- single-flight
- cross-tab ownership
- deterministic event ordering
- race conditions
- resource ownership
- lifecycle cleanup

The specialist should review the actual repository contracts and deterministic tests.

## Concurrency correctness

Changes involving concurrency behavior must preserve documented scenario invariants.

Pay particular attention to:
- AbortSignal ownership
- stale commits
- duplicate completion
- cancelled waiter cleanup
- FIFO behavior where documented
- idempotent release
- permit accounting
- single-flight registry cleanup
- producer versus subscriber cancellation
- promise lifecycle
- deterministic event ordering
- timer/listener/subscription cleanup
- cross-tab ownership assumptions

Do not replace deterministic teaching semantics with timing-dependent behavior.

Distinguish local/in-process guarantees from guarantees that would require
a real distributed lease/heartbeat/crash-recovery system.

## Performance

For changes with plausible runtime, bundle, memory, or rendering impact:

- establish appropriate evidence
- use `performance_auditor` for substantial investigations
- use Chrome DevTools when runtime evidence is useful
- preserve the existing initial-JavaScript bundle budget

Do not run a full performance audit for unrelated trivial work.

## Architecture

Use `frontend_architect` when changes materially affect:
- package boundaries
- public exports
- module ownership
- shared primitives
- app/domain separation
- major refactors

Preserve the framework-independent package boundary.

## Testing

Use the repository's existing testing architecture.

Prefer:
- focused Vitest tests for deterministic logic
- integration tests for public contracts
- Playwright for browser-critical behavior

Do not weaken deterministic tests merely to make a change pass.

Preserve relevant Chromium, Firefox, WebKit, and phone coverage
when the affected behavior can differ across those environments.

## Quality review

Use `quality_reviewer` for medium/high-risk implementation work when an
independent pass materially improves confidence.

Concurrency/race changes should normally receive independent review.

## Verification

Use the narrowest relevant checks while iterating.

Available repository gates include:
- `pnpm lint`
- `pnpm architecture:check`
- `pnpm typecheck`
- `pnpm test`
- `pnpm test:e2e`
- `pnpm build`
- `pnpm verify`

For medium/high-risk implementation work, run the appropriate subset.

Use `pnpm verify` as the broad repository quality gate when scope/risk
justifies full validation.

Run E2E when browser-critical behavior changed and it is not already
covered by the selected gate.

Do not claim a command passed unless it actually ran successfully.

## Context

`.agents/context/project.md` stores durable verified repository facts.

It must not become a task-progress log.

Refresh it when relevant architecture/config/framework facts materially change.

## Plans

`.agents/plans/` contains durable plans and historical execution state.

Do not treat an old plan as active merely because it exists.

When resuming:
- inspect status
- inspect baseline/drift
- continue only incomplete relevant work
- update the plan when material drift invalidates assumptions

## Documentation

Update durable docs when a task materially changes:
- architecture
- public/internal contracts
- non-obvious engineering constraints
- testing strategy
- debugging/operational behavior

Do not create documentation merely for ceremony.

## Security

Use Codex Security and/or Trivy when security-sensitive changes warrant them.

Do not add broad security scanning to unrelated trivial work.

## Git

Keep changes scoped.

Never discard unrelated user modifications.

Do not use destructive Git operations without explicit authorization.

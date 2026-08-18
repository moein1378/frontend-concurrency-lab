# Handoff — Phase 1 deterministic harness

## Changed capabilities

- Added Scenario Catalog and stale-search Scenario Detail in `apps/lab`.
- Added deterministic time/event recording in `packages/timeline`.
- Added seeded latency, broken search orchestration, and invariant evaluation in `packages/scenario-engine`.
- Added latest-wins, single-flight, and mutex APIs in `packages/concurrency-core` without exposing a fixed UI before Phase 2.
- Added architecture enforcement, Vitest unit/integration suites, Playwright reviewer flows, and CI verification.

## Decisions

- The Phase 1 simulator runs synchronously on virtual time. This makes the race instant, replayable, offline, and independent of wall-clock scheduling.
- The two Phase 1 surfaces use lightweight pathname composition; a routing dependency is deferred until route complexity warrants it.
- The broken implementation commits every response by design. The UI labels it as broken and reports the invariant failure without presenting false success.

## Verification

- Required command: `pnpm verify`.
- Reviewer flow: catalog → broken stale-search detail → run → invariant violation and seven-event timeline.

## Limitations

- No fixed variant, cancellation, comparison view, MSW network layer, or hosted deployment is included in Phase 1.
- The app has no persistent state; seed/reset commands are intentionally no-ops.

## Next safe step

Start Phase 2 by protecting the same scenario with cancellation and freshness checks while replaying the identical seed and request order.

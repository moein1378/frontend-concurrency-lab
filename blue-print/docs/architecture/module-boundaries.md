# Frontend Concurrency Lab — Module Boundaries

Architecture: scenario-first modular monolith with framework-independent coordination primitives and deterministic simulators.

## Dependency graph

```text
apps/lab -> scenario-engine -> concurrency-core
        |                 -> timeline
        -> concurrency-core
        -> timeline
```

- `apps/lab` owns Vue/Vuetify presentation, routing, learning/tours, pacing, browser ownership storage, and visible-trace export.
- `concurrency-core` owns latest-wins, mutex, semaphore, single-flight, and completed-effect idempotency primitives. It has no internal workspace dependency.
- `timeline` owns deterministic time and monotonic event recording. It has no internal workspace dependency.
- `scenario-engine` owns fixture data, scenario transitions, and invariant evaluation. It consumes public APIs of the other two packages.

## Public contracts

Package `src/index.ts` files and package manifests define deliberate public boundaries. Application/package consumers must not reach into another package's deep implementation. Packages must not import Vue or application paths.

The scenario runner traces illustrate mechanisms; do not claim every fixture event directly executes the corresponding coordination primitive. Preserve the separate primitive tests and runner invariants.

`JobOwnershipPort` is exported from scenario-engine; its current browser implementation lives in `CrossTabPage.vue`. The localStorage adapter does not turn the fixture's lower-ID election into an atomic cross-tab protocol.

## Executable enforcement

`pnpm architecture:check` scans package TypeScript for selected forbidden import patterns. Runtime public-export tests live in `tests/integration/public-contracts.test.ts`. These are useful guards, not a complete cycle analyzer or proof that every dependency policy is enforced automatically.

See the [repository map](../../10-repository-map.md) for actual paths and [engineering policies](../../11-engineering-policies.md) for change constraints. There is no test-fixtures or adapter workspace package.

## Verification provenance

Verified 2026-11-14 against `19640ebd8169ce625b2a093caafc1ca2483b6a84` plus working-tree changes; confidence high. Evidence: [package manifests/APIs](../../../packages/), [app source](../../../apps/lab/src/), [architecture checker](../../../scripts/check-architecture.mjs), and [public-contract tests](../../../tests/integration/public-contracts.test.ts). Recheck after exports, package ownership, browser ports, or import rules change.

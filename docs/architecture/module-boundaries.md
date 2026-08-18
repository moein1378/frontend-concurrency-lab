# Module boundaries

The client-rendered Vue application in `apps/lab` owns route-level composition and presentation. It consumes public package entry points and does not own reusable concurrency or scenario rules.

- `packages/timeline` owns deterministic time and monotonic event recording.
- `packages/scenario-engine` owns deterministic fixture generation, scenario transitions, and invariant evaluation. It may depend on `timeline`.
- `packages/concurrency-core` owns framework-independent coordination primitives and has no internal package dependency.

Packages may not import Vue, application paths, or one another through deep `src` imports. `pnpm architecture:check` enforces these constraints.

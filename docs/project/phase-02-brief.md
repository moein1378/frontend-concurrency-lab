# Active task brief

## Active phase

`Moein-Frontend-Portfolio-Blueprints-v3/projects/01-concept-lab-frontend-concurrency-lab/phases/02-v0.2.0-cancellation-and-freshness.md`

## User-visible outcome

A reviewer can replay identical stale-search requests side by side and see cancellation or a latest-wins freshness guard preserve the newest results while the broken implementation violates the invariant.

## In scope

- AbortController/AbortSignal propagation for superseded work.
- Latest-wins sequence-token discard protection.
- Synchronized broken-versus-fixed comparison and structured event timelines.
- Phase-owned latest-wins, single-flight, mutex, and semaphore public primitives.
- Unit, integration, E2E, architecture, type, lint, and build gates.

## Out of scope

- Real network timing, retries, mutual-exclusion scenario UI, bounded uploads, cross-tab behavior, and later scenarios.
- Public deployment and hosted services.

## Acceptance tests

- `pnpm verify`
- Browser: `/scenarios` → stale-search comparison → run cancellation → broken `ca`, fixed `cat`, abort visible → switch freshness → stale discard visible.

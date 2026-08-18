# Active task brief

## Active phase

`Moein-Frontend-Portfolio-Blueprints-v3/projects/01-concept-lab-frontend-concurrency-lab/phases/01-v0.1.0-foundation-and-deterministic-harness.md`

## User-visible outcome

A reviewer can browse the Scenario Catalog, open the stale-search detail, and deterministically reproduce a stale response overwriting the latest query.

## In scope

- Scenario Catalog and stale-search Scenario Detail.
- Deterministic clock, seeded latency, event log, and invariant evaluator.
- Intentionally broken stale-search workflow with configurable response order.
- Latest-wins, single-flight, and mutex phase responsibilities behind public package APIs.
- Unit, integration, E2E, architecture, type, lint, and build gates.

## Out of scope

- Corrected/cancelled search behavior, compare mode, multi-tab behavior, and all later scenarios.
- Public deployment and optional real-latency services.

## Acceptance tests

- `pnpm verify`
- Browser: `/scenarios` → stale search → run broken search → expected `cat`, committed `ca`, invariant violated, timeline visible.

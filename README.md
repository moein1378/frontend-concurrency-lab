<div align="center">
  <img src="./brand/logo-filled.svg" alt="Frontend Concurrency Lab logo" width="104" height="104" />
  <h1>Frontend Concurrency Lab</h1>
  <p><strong>Base project for an interactive browser-concurrency teaching lab.</strong></p>
</div>

> Status: **v0.2.0 / Phase 2** — synchronized broken-vs-fixed cancellation and freshness comparison.

## Included

- Vue 3, Vite, strict TypeScript, and Tailwind CSS 4.
- pnpm workspace and exact toolchain pins.
- Semantic light/dark design tokens from the blueprint.
- Responsive, keyboard-accessible Scenario Catalog and Scenario Detail.
- Deterministic clock, seeded latency generator, monotonic event log, and replayable fixture mode.
- An intentionally broken search race that makes the `latest-query-wins` invariant fail visibly.
- Fixed cancellation and sequence-token freshness strategies replayed against the same seed and timings.
- Structured request, abort, response, commit, discard, and invariant event evidence.
- Framework-independent latest-wins, single-flight, mutex, and semaphore primitives.
- Unit, integration, and deterministic Playwright reviewer coverage.
- Repository-owned logo and favicon assets.
- Lint, typecheck, and production-build verification.

## Run locally

Requires Node.js 24 and Corepack.

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```

Open `http://localhost:4173/scenarios`, choose **Stale search response**, and run the synchronized comparison. The broken lane commits stale `ca` results while the selected cancellation or freshness strategy preserves `cat` on the fixed lane.

## Verify

```bash
pnpm verify
```

## Project shape

```text
apps/lab/          Vue application and scenario UI
packages/          Framework-independent primitives, scenario engine, and timeline
brand/             Blueprint-provided identity assets
docs/              Architecture and local-development notes
scripts/           Foundation verification and reset commands
tests/             Cross-package integration and Playwright journeys
```

## Known limitations

- The simulator is local and deterministic; it does not make real network requests.
- Cancellation is modeled through the browser `AbortController`/`AbortSignal` contract on virtual time; no transport adapter is active yet.
- Phone mode presents comparison lanes and timelines sequentially in a single column.

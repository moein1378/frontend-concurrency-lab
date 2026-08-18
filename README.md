<div align="center">
  <img src="./brand/logo-filled.svg" alt="Frontend Concurrency Lab logo" width="104" height="104" />
  <h1>Frontend Concurrency Lab</h1>
  <p><strong>Base project for an interactive browser-concurrency teaching lab.</strong></p>
</div>

> Status: **v0.1.0 / Phase 1** — deterministic harness and intentionally broken stale-search scenario.

## Included

- Vue 3, Vite, strict TypeScript, and Tailwind CSS 4.
- pnpm workspace and exact toolchain pins.
- Semantic light/dark design tokens from the blueprint.
- Responsive, keyboard-accessible Scenario Catalog and Scenario Detail.
- Deterministic clock, seeded latency generator, monotonic event log, and replayable fixture mode.
- An intentionally broken search race that makes the `latest-query-wins` invariant fail visibly.
- Framework-independent latest-wins, single-flight, and mutex primitives for later fixed scenarios.
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

Open `http://localhost:4173/scenarios`, choose **Stale search response**, and run the broken search. The older `ca` response arrives last and overwrites the expected `cat` results.

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

- Phase 1 deliberately ships only the broken variant. Cancellation and freshness protection belong to Phase 2.
- The simulator is local and deterministic; it does not make real network requests.
- Phone mode provides a single-column experiment and timeline rather than the future multi-panel comparison surface.

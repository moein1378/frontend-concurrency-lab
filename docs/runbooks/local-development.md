# Local development

## Prerequisites

- Node.js 24 LTS
- Corepack with pnpm 11.22.0

## Start

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm seed
pnpm dev
```

Visit `http://localhost:4173/scenarios`. Open the stale-search scenario, keep **Older “ca” arrives last**, and select **Run broken search**. The invariant panel should report expected `cat` and committed `ca`, with seven ordered timeline events.

## Recovery

- Port occupied: run `pnpm --filter @concurrency-lab/app dev --port 4174`.
- Dependency mismatch: confirm `node --version` is 24.x, then rerun the frozen install.
- Reset: run `pnpm reset`; Phase 1 has no persistent browser or server data.
- Offline: the running app needs no network. A first dependency install still needs npm registry access.
- Browser setup: Playwright uses the installed stable Chrome channel; install Chrome before running `pnpm test:e2e`.

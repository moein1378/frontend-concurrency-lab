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

Visit `http://localhost:4173/scenarios`. Open the stale-search comparison, keep **Older “ca” arrives last**, and select **Run synchronized comparison**. The broken lane should report expected `cat` and committed `ca`; the fixed lane should commit `cat`. Switch between **Cancel superseded** to inspect an abort event and **Discard stale** to inspect a discard event.

The interface is English-only and the root document remains left-to-right. All scenario behavior is available directly from the comparison workspace.

## Recovery

- Port occupied: run `pnpm --filter @concurrency-lab/app dev --port 4174`.
- Dependency mismatch: confirm `node --version` is 24.x, then rerun the frozen install.
- Reset: run `pnpm reset`; Phase 2 has no persistent browser or server data.
- Offline: the running app needs no network. A first dependency install still needs npm registry access.
- Browser setup: Playwright uses the installed stable Chrome channel by default. Without system Chrome, run `pnpm exec playwright install chromium`, then verify with `PLAYWRIGHT_BROWSER_CHANNEL=bundled pnpm test:e2e`.

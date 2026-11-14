# Frontend Concurrency Lab — Local Development Runbook

## Start

From the repository root, use Node.js 24.x and pnpm 11.22.0 via Corepack:

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```

Open `http://localhost:4173/scenarios`. No environment file or backend is required. Root `.env.example` records the optional public `VITE_DEMO_SEED`; the app defaults to `concurrency-v1` if unset. `pnpm dev:all` is an alias of the same app server.

## Exercise the lessons

- Search: select the default older-response-last ordering and run **Run live comparison**. Broken commits `ca`; fixed commits `cat`. Switch between **Cancel superseded** and **Discard stale** to inspect abort/discard evidence.
- Use `/scenarios` to open mutual exclusion, bounded concurrency, single-flight, and cross-tab comparisons.
- Pause/replay where offered, inspect keyboard-readable events, and download the visible trace to local JSON.
- The interface remains English and left-to-right, with persistent light/dark theme selection.

## Validation

```bash
pnpm exec playwright install --with-deps chromium firefox webkit
pnpm verify
```

For focused work, choose the appropriate script from `package.json`. Playwright starts its own Vite server on `127.0.0.1:4174` and does not reuse an existing server. All four projects run by default: Chromium, Firefox, WebKit, and phone. `PLAYWRIGHT_EXECUTABLE_PATH` optionally selects a local Chromium executable for Chromium/phone; the obsolete `PLAYWRIGHT_BROWSER_CHANNEL` variable has no effect in current config.

## Recovery

- Occupied app port: `pnpm --filter @concurrency-lab/app dev --port 4175`; keep 4174 free for E2E.
- Dependency mismatch: check Node 24 and the exact pnpm version, then rerun the frozen install.
- `pnpm seed`, `pnpm reset`, and `pnpm codegen` only print informational messages. They do not download fixtures, clear browser state, or generate contracts.
- Use a lesson's Reset button for scenario state. Cross-tab Reset removes `concurrency-lab:fixture-job:owner:v1`; close/reopen alone does not expire this claim. Theme is separately stored under `concurrency-lab-theme`.
- The running lessons need no API connection. First installs still need registry/browser download access; no service-worker offline installation is configured.

Stack and script contracts: [dependencies and services](../../04-dependencies-and-services.md).

## Verification provenance

- Last verified: 2026-11-14; source baseline `19640ebd8169ce625b2a093caafc1ca2483b6a84` plus the inspected working tree.
- Confidence: high for source/configuration facts; command descriptions are not evidence that those commands passed.
- Evidence paths below are repository-root relative. Recheck the listed inputs after relevant changes.
- Stale-sensitive evidence: `package.json`, `apps/lab/package.json`, `playwright.config.ts`, `.env.example`, `scripts/seed.mjs`, `scripts/reset.mjs`, `scripts/codegen.mjs`, `apps/lab/src/components/LabHeader.vue`, `apps/lab/src/pages/CrossTabPage.vue`, `tests/e2e/search-race.e2e.ts`.

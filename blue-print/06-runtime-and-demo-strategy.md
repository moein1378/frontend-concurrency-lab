# Frontend Concurrency Lab — Runtime and Demo Strategy

## Rendering decision

Client-rendered Vue SPA with Vue Router HTML5 history. The production output is `apps/lab/dist`; no SSR or production Node server is present.

## Execution modes

### 1. Fixture mode

- The implemented teaching mode uses repository-owned deterministic runners and local assets.
- Search exposes a seed and timing controls; other lessons provide scenario-specific fixture inputs.
- Five comparison routes cover freshness, mutual exclusion (payment/save examples), bounded concurrency, single-flight, and cross-tab ownership.
- Lesson Reset controls restore their visible state; search also supports pause/resume and replay. `pnpm seed` and `pnpm reset` are informational no-ops.
- Theme preference and the cross-tab practice claim persist in browser storage. The cross-tab Reset button clears its claim; a command-line reset does not.

### 2. Primary local mode

- `pnpm dev` serves the same fixture SPA at `http://localhost:4173/scenarios`.
- No backend, secret, external account, or live API request is required for the scenario behavior.
- An initial dependency installation and CI browser installation require download access; local operation is not a promise of an installable offline PWA.

### 3. Full-local mode

`pnpm dev:all` currently delegates to `pnpm dev`. No optional API, database, signaling, GraphQL, or container service is implemented.

### 4. Hosted adapter mode

GitHub Pages hosts the same static fixture application at `https://moein1378.github.io/frontend-concurrency-lab/`. This is a configured deployment target, not evidence of a live-site check during this documentation update. There is no connected-provider mode or MSW runtime.

## Live-demo acceptance

- Load `/scenarios` and each comparison route directly under the deployment base.
- In stale search, run the default race: broken results end at `ca`, fixed results at `cat`; cancellation and freshness reveal different preventing events.
- Keep keyboard-readable evidence, English `lang`/left-to-right direction, responsive layouts, reduced-motion handling, and theme persistence.
- Trace downloads save local JSON through the browser; they do not upload learner data.
- Cross-tab claims use browser-local storage and storage events for the lesson. This does not provide atomic locking, a distributed lease, or recovery from suspended/crashed owners.
- Never bundle secrets into `VITE_*` values. There is no implemented multi-mode status switch to validate.

## Deployment target

The workflow sets `VITE_BASE_PATH=/frontend-concurrency-lab/`, builds the SPA, copies `index.html` to `404.html`, and uploads `apps/lab/dist`. The fallback serves the client shell for deep routes; GitHub Pages may still report an HTTP 404 for a deep-link response even when the SPA renders.

## Rollback

Follow [the rollback runbook](docs/runbooks/rollback.md). Pages deployments use a `pages` concurrency group. The configured post-deploy check is an HTTP `curl` request; it does not run a browser journey, automatically restore a previous artifact, or block a tag through a release workflow.

## Verification provenance

- Last verified: 2026-11-14; source baseline `19640ebd8169ce625b2a093caafc1ca2483b6a84` plus the inspected working tree.
- Confidence: high for source/configuration facts; command descriptions are not evidence that those commands passed.
- Evidence paths below are repository-root relative. Recheck the listed inputs after relevant changes.
- Stale-sensitive evidence: `apps/lab/src/router.ts`, `apps/lab/src/modules/`, `apps/lab/src/pages/CrossTabPage.vue`, `apps/lab/src/components/LabHeader.vue`, `apps/lab/src/components/ScenarioShell.vue`, `.github/workflows/deploy-demo.yml`, `scripts/reset.mjs`.

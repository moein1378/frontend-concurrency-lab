# Frontend Concurrency Lab — Dependencies, Services, and Local Execution

> Current implementation inventory for v1.1.0. Manifests and `pnpm-lock.yaml` are authoritative; exact resolutions are summarized in [the toolchain record](docs/toolchain.lock.md).

## Stack decision

- **Stack:** Vue 3 Composition API + Vite + strict TypeScript, Vue Router, Vuetify, and app-owned lab compositions; no SSR.
- **Architecture:** Scenario-first modular monolith with framework-independent concurrency primitives, deterministic scenario runners, and timeline recording.
- **Rendering:** Client-rendered SPA. Browser interaction and local simulation drive the lessons.

## Runtime and development dependencies

| Dependency | Locked version / policy | Responsibility | Boundary rule |
|---|---|---|---|
| Node.js | 24.x; `>=24 <25`, `.nvmrc` = `24` | Toolchain and CI runtime | Major is pinned; repository does not pin an exact Node patch. |
| pnpm | 11.22.0 via `packageManager` | Workspace install and scripts | Frozen installs consume committed lockfile version 9. |
| `vue` | 3.5.41 | UI reactivity and rendering | Domain packages remain independent of Vue. |
| `vue-router` | 4.6.4 resolved; manifest `^4.6.4` | History routing | Use `BASE_URL` for subpath deployments. |
| `vuetify` | 3.13.2 | General presentation system and themes | Reuse registered components and semantic theme roles. |
| `intro.js` | 8.5.0 | Guided lessons | Keep tour integration in app presentation; domain packages remain independent. |
| `vite` / `@vitejs/plugin-vue` | 8.2.1 / 6.0.8 | Development server and static build | App config lives in `apps/lab/vite.config.ts`. |
| `typescript` / `vue-tsc` | 5.9.3 / 3.3.10 | Static and Vue template checks | Root typecheck delegates to app; app imports workspace sources. |
| `vitest` | 4.1.10 | Package unit and cross-package integration tests | Root configuration aliases public package entry points. |
| `@playwright/test` | 1.62.1 | Real-browser integration checks | Chromium, Firefox, WebKit, and Pixel 7 projects. |
| ESLint / `typescript-eslint` / `eslint-plugin-vue` | 10.8.1 / 8.68.0 / 10.10.0 resolved | JS, TS, and Vue source checks | Root flat config plus custom source-policy checker. |

Tailwind, MSW, Hono, fast-check, and Zod are not dependencies of the current workspace. Earlier blueprint suggestions for them are superseded by this inventory.

## Services and external capabilities

| Service/capability | Mode | Implemented behavior and limits |
|---|---|---|
| Deterministic scenario engine | Required browser/local | Search freshness, mutex examples, bounded uploads, single-flight, and cross-tab traces use repository-owned inputs; no live transport. |
| Browser storage | Browser-local | Theme preference and cross-tab lesson claim use `localStorage`. The claim is a teaching mechanism, without atomic election, leases, heartbeats, or crash recovery. |
| GitHub Pages | Configured static deployment | Serves the compiled SPA; no backend, account, or API key is needed to run the lab locally. |

There is no separate API/service workspace or full-local backend mode.

## Environment variables

| Variable | Default / setting | Purpose |
|---|---|---|
| `VITE_DEMO_SEED` | `concurrency-v1` | Public search-race default seed; editable in the lesson. Other runners receive their inputs from UI code. |
| `VITE_BASE_PATH` | `/`; Pages workflow supplies `/frontend-concurrency-lab/` | Build/dev base used by Vite and Router. |
| `PLAYWRIGHT_EXECUTABLE_PATH` | Unset | Optional Chromium/phone executable override; Firefox/WebKit still use Playwright browsers. |
| `VISUAL_REGRESSION` | Unset | `1` enables optional local screenshot comparisons in UI-quality tests. |
| `CI` | Set by CI runner | Enables two Playwright retries. |

No environment file is required to start. Root `.env.example` documents the public seed; an optional Vite override belongs in `apps/lab/.env.local`. Supply `VITE_BASE_PATH` through the shell or CI because Vite config reads it directly from `process.env`. Client `VITE_*` values must never contain secrets.

## Installation and startup

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```

Open `http://localhost:4173/scenarios`. Install test browsers before the full gate:

```bash
pnpm exec playwright install --with-deps chromium firefox webkit
pnpm verify
```

## Required root scripts

| Script | Current implementation |
|---|---|
| `dev` | Starts `@concurrency-lab/app` Vite server on port 4173. |
| `dev:all` | Alias of `dev`; starts no additional services. |
| `seed` | Informational no-op; does not download assets or mutate fixtures. |
| `reset` | Informational no-op; does not clear browser storage. Use lesson Reset controls for lesson state. |
| `codegen` | Informational no-op; no generated contracts exist. |
| `lint` | ESLint plus source-policy checks; no Markdown lint/link gate. |
| `architecture:check` | Custom package-boundary source scan. |
| `typecheck` | App `vue-tsc --noEmit`. |
| `test` | Vitest package unit and root integration suites. |
| `test:e2e` | Playwright functional browser journeys. |
| `build` | App typecheck and Vite build into `apps/lab/dist`. |
| `build:demo` | Alias of `build`; deployment supplies the subpath. |
| `performance:check` | Sums gzip size of emitted JavaScript against 200 KiB. |
| `verify` | Lint → architecture → typecheck → unit/integration → E2E → build → bundle budget. |

## Version and compatibility policy

- Use the recorded Node major and exact pnpm version; update manifests and lockfile together.
- Dependency ranges may exist in manifests; frozen lockfile resolutions determine installations.
- Framework or architectural changes need explicit rationale and proportionate validation; the Vuetify decision is recorded in `docs/adr/0004-vuetify-presentation-system.md`.
- Workspace packages are private and export TypeScript source. There is no configured npm publication or generated API-client pipeline.

## Zero-cost and anti-lock-in checks

- [x] Local deterministic lessons require no paid platform, credentials, backend, or hosted data.
- [x] CI tests use repository-owned fixtures and installed browser runtimes.
- [x] The hosted demo is a static artifact, with no provider SDK in domain packages.
- [x] Client environment defaults are public values.
- [ ] Production transport adapters and distributed ownership recovery are future work, not implemented capabilities.

## Verification provenance

- Last verified: 2026-11-14; source baseline `19640ebd8169ce625b2a093caafc1ca2483b6a84` plus the inspected working tree.
- Confidence: high for source/configuration facts; command descriptions are not evidence that those commands passed.
- Evidence paths below are repository-root relative. Recheck the listed inputs after relevant changes.
- Stale-sensitive evidence: `package.json`, `pnpm-lock.yaml`, `pnpm-workspace.yaml`, `apps/lab/package.json`, `apps/lab/vite.config.ts`, `playwright.config.ts`, `scripts/`, `apps/lab/src/pages/CrossTabPage.vue`.

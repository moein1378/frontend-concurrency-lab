# Frontend Concurrency Lab — Repository Map and Ownership

## Authoritative tree

Paths below are relative to the repository root. Blueprint content lives under `blue-print/`; it is not a second runtime workspace.

```text
.github/workflows/              CI and Pages deployment
.agents/context/                Verified context cache
.agents/skills/                 Project engineering skills
apps/lab/
  src/app/                      Application shell and trace download
  src/pages/                    Catalog and scenario route composition
  src/modules/                  Four scenario-specific interactive labs
  src/components/               Shared learning/presentation/navigation
  src/plugins/vuetify.ts        Component registration and semantic themes
  src/styles/                   Main CSS and themed Intro.js styling
  src/router.ts                 Registered route set
  src/main.ts                   Vue/Vuetify/router bootstrap; English/LTR
  public/                       Served logo/favicon assets
  index.html
  vite.config.ts
packages/
  concurrency-core/src/         Framework-independent primitives
  scenario-engine/src/          Deterministic fixtures, orchestration, invariants
  timeline/src/                 Clock and event log
brand/                          Repository-owned reference assets
blue-print/                     Numbered blueprint, phases, agent docs, templates
  docs/                         Blueprint architecture/runbooks/toolchain reference
  brand/                        Supplied blueprint asset copies
  phases/
  agent/
  templates/
docs/
  adr/                          Numbered architecture decisions
  architecture/                 Root architecture documentation
  project/                      Historical phase briefs/handoffs
  runbooks/                     Local and live-demo guides
scripts/                        Seed/reset/codegen and quality gates
tests/integration/              Cross-package contracts and invariants
tests/e2e/                      Browser journeys
AGENTS.md
README.md
package.json
pnpm-workspace.yaml
pnpm-lock.yaml
.nvmrc
.env.example
```

## Directory and file responsibilities

| Path | Responsibility |
|---|---|
| `.github/workflows` | Executable CI verification/dependency review and Pages build/deploy/smoke workflows. |
| `.agents/context` | Fingerprinted context cache; verify relevant source independently. |
| `brand`, `apps/lab/public` | Brand reference and served assets respectively. |
| `blue-print` | Structured implementation reference reconciled against current source. |
| `blue-print/templates` | Reference env/workflow copies; not active root configuration. |
| `blue-print/phases`, `docs/project` | Original milestone structure and implementation records; no implicit active phase. |
| `docs/adr` | Accepted decisions and supersession history. |
| `docs/architecture` | Root module/runtime context; some historical prose needs source verification. |
| `docs/runbooks`, `blue-print/docs/runbooks` | Root guides and current blueprint operational instructions. |
| `scripts` | Root quality checks and explicit fixture/no-generation scripts. |
| `tests` | Root integration and E2E suites; unit tests live beside package source. |
| `apps/lab` | Browser SPA, UI state/pacing, browser storage adapter, and trace export. |
| `packages/concurrency-core` | Latest-wins, FIFO mutex/semaphore, single-flight, completed-effect idempotency. |
| `packages/scenario-engine` | Scenario types, local runners, fixture comparisons, and invariant results. |
| `packages/timeline` | Deterministic monotonic time and per-log event sequencing. |
| `pnpm-lock.yaml` | Exact resolved dependencies; update through pnpm, not manual edits. |

There is no `packages/test-fixtures`, backend app, adapter package, generated client, or standalone top-level `phases/`, `agent/`, or `templates/` workspace. Fixtures belong to `scenario-engine`.

## Dependency direction

1. The Vue application composes public workspace APIs and owns browser-specific behavior.
2. `scenario-engine` may depend on public `concurrency-core` and `timeline` APIs.
3. `concurrency-core` and `timeline` have no internal workspace dependency.
4. Packages must not import Vue, application paths, or another package's deep `src` implementation.
5. `src/index.ts` is each package's public API; runtime export tests protect its contract.
6. Avoid circular dependencies. `pnpm architecture:check` checks selected forbidden imports; it is not a complete dependency-graph/cycle analyzer.

## Project modules

- Latest-wins coordinator: tokens and ownership of the currently active AbortController.
- Mutex/semaphore: local FIFO admission, cancellation cleanup, and idempotent release.
- Single-flight registry: exact-key active-promise sharing and subscriber cancellation.
- Idempotency registry: completed effects within an instance; not concurrent request coalescing.
- Scenario runners: deterministic broken/fixed outcomes; preserve their distinction from primitive implementations.
- Clock/event log: monotonic virtual time and typed event evidence.
- Browser ownership adapter: a `JobOwnershipPort` implemented directly in `CrossTabPage.vue`, with localStorage and storage events.

## User-facing surfaces

- `/scenarios` catalog and five `/scenario/<slug>/compare` routes.
- Embedded broken/fixed lanes, structured timelines, invariant summaries, and explanations.
- Themed six-step Intro.js lessons and mobile Controls / Why? / Result navigation.
- Footer visible-trace JSON export and light/dark theme persistence.
- `/` and unmatched paths redirect to the catalog. `PrimitivesPage.vue` is not registered.

## File placement policy

- Keep single-module deterministic tests colocated as `*.test.ts`.
- Keep cross-package integration/public export assertions under `tests/integration`.
- Keep Playwright journeys under `tests/e2e` as `*.e2e.ts`.
- Keep reports, snapshots, coverage, build output, and caches local/ignored under current `.gitignore`.
- Add generated or adapter directories only for real owned behavior; do not copy speculative skeletons into the runtime.
- Split by coherent responsibility and use explicit public entry points.

## Internal application structure

`main.ts` installs Vue, Vuetify, and the router. `app/App.vue` owns global timeline keyboard handling, shell/footer, and DOM-derived visible-trace export. `plugins/vuetify.ts` explicitly registers presentation components and themes.

Pages compose shared `ScenarioShell`/`ScenarioLearning` presentation and the feature labs. Four labs live under `modules/`; cross-tab controls and browser adapter currently live directly in `pages/CrossTabPage.vue`. This is the current placement, not a requirement to introduce wrapper layers or a new adapter framework.

## Internal package structure

```text
packages/<capability>/
  src/
    application/               Primitive or scenario orchestration, where needed
    domain/                    Scenario values/types or deterministic clock/log
    index.ts                   Explicit public exports
  package.json                 Private workspace; public source entry
  tsconfig.json                Strict TypeScript settings
```

Not every package needs every subdirectory. Tests are colocated; Vitest aliases and include patterns live in root `vitest.config.ts`. There are no per-package Vitest configs or existing `tests/contract` directories.

## File naming and responsibility map

| File/pattern | Current use |
|---|---|
| `packages/*/src/index.ts` | Deliberate public runtime/type exports. |
| `run-*-comparison.ts` | Broken/fixed scenario orchestration. |
| `domain/*.ts` | Types, fixture values, deterministic clock/log, and policy data. |
| `*.vue` | Vue composition/presentation with scenario UI ownership. |
| `*.test.ts` | Package unit or root integration tests. |
| `*.e2e.ts` | Browser workflow in the root Playwright suite. |
| `*.port.ts`, `*.adapter.ts`, `*.schema.ts`, `*.machine.ts`, `generated/` | Possible future patterns; no required or currently established layers. |

## Ownership policy

Keep reusable coordination and invariant evaluation in packages. Keep routing, theme, playback, browser storage, and DOM/export concerns in the application. Public API changes require public-contract review; significant boundary changes require architecture review. Do not add UI-framework dependencies to the package layer.

## Verification provenance

Verified 2026-11-14 at `19640ebd8169ce625b2a093caafc1ca2483b6a84` plus working-tree changes; confidence high. Evidence: [workspace](../pnpm-workspace.yaml), [package manifests](../packages/), [source](../apps/lab/src/), [architecture checker](../scripts/check-architecture.mjs), [public-contract tests](../tests/integration/public-contracts.test.ts), [Vitest configuration](../vitest.config.ts), and [ignore policy](../.gitignore). Recheck when paths, exports, package dependencies, or test discovery change.

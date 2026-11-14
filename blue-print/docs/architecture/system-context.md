# Frontend Concurrency Lab — System Context

## Users

Frontend developers, candidates/interviewers, and reviewers open a catalog scenario, reproduce a fixture failure, inspect a protection, and explain the resulting invariant and trade-off. No account or paid service is required.

## Runtime nodes

- A browser runs the client-rendered Vue/Vuetify SPA from Vite locally or a static Pages build.
- Framework-independent package code executes in the same JavaScript runtime. Deterministic clock, scenario runners, and event log perform no network/provider I/O.
- Vue owns teaching presentation: search timer playback, other scenario reveal controls, six-step Intro.js tours, and HTML timelines.
- Other same-origin tabs can observe the practice owner through localStorage and `storage` events. The deterministic comparison runner itself uses a fixed A/B election trace.
- Local JSON trace export uses Blob/object URLs and a download anchor. No export server or telemetry is configured.
- CI/build/Pages deployment are delivery processes, not runtime application services. There is no MSW worker, Hono fixture API, backend, or container requirement.

## Trust boundaries

| Boundary | Current data/behavior | Limit |
|---|---|---|
| User -> browser app | Seed, timing/order, capacity/jobs, resource/subscriber controls, and optional `tab` query value. | Fixture controls and text; not code, credentials, or remote business effects. |
| App -> scenario packages | Deterministic options and typed comparison/event results. | Browser UI state and platform storage remain app-owned. |
| Browser -> localStorage | Theme preference and `concurrency-lab:fixture-job:owner:v1`. | Same-origin readable; practice owner persists until reset. No authentication, transactions, leases, or crash recovery. |
| Other tab -> browser app | `storage` notifications update observed owner. | Notification is not atomic ownership arbitration. |
| App -> local download | Visible controls, invariants, and timeline DOM projected as `frontend-concurrency-lab-trace-v1` JSON. | Includes only currently visible evidence; no upload. |
| Hosting -> browser | Static HTML, JS, CSS, and brand assets under configured base path. | No service worker/offline installation or live API contract. |

Production browser ownership would require a designed arbitration/recovery protocol and server authority for globally unique effects. Worker/Atomics, BroadcastChannel, authentication, API adapters, and persistent application caches remain outside implemented scope.

## Verification provenance

Verified 2026-11-14 against `19640ebd8169ce625b2a093caafc1ca2483b6a84` plus working-tree changes; confidence high for source-backed topology. Evidence: [bootstrap](../../../apps/lab/src/main.ts), [router](../../../apps/lab/src/router.ts), [shell/export](../../../apps/lab/src/app/App.vue), [learning/tours](../../../apps/lab/src/components/ScenarioLearning.vue), [cross-tab page](../../../apps/lab/src/pages/CrossTabPage.vue), [fixture runner](../../../packages/scenario-engine/src/application/run-cross-tab-comparison.ts), and [delivery workflows](../../../.github/workflows/). Recheck when storage, exports, transport, ownership, hosting, or runtime dependencies change. Hosted availability was not tested by this documentation audit.

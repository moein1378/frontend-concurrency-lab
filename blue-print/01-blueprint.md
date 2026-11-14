# Frontend Concurrency Lab — Complete Implementation Blueprint v4

<img src="./brand/logo-lockup.svg" alt="Frontend Concurrency Lab logo" height="64" />

> **Repository:** [`frontend-concurrency-lab`](https://github.com/moein1378/frontend-concurrency-lab)
> **Category:** Concept Lab · Project **1 of 17**
> **Source baseline:** workspace version **1.1.0**; verified 2026-11-14 at `19640ebd8169ce625b2a093caafc1ca2483b6a84` plus working-tree changes.
> **Confidence:** high for source/configuration facts. Release tags, hosted deployment health, and remote CI results are not inferred from local files.

## Authoritative execution profile

| Decision | Current choice |
|---|---|
| Stack | Vue 3.5.41 + Vite 8.2.1 + TypeScript 5.9.3 + Vue Router 4.6.4 + Vuetify 3.13.2; client-rendered SPA. |
| Architecture | Scenario-first modular monolith with framework-independent coordination primitives, deterministic scenario runners, and timeline recording. |
| Rendering | Browser SPA; no Nuxt, SSR, hydration, or backend is required. |
| Responsive strategy | Desktop comparison workspace, stacked phone lanes, and mobile Controls / Why? / Result navigation. |
| Live demo | GitHub Pages static build; teaching data comes from repository-owned local fixtures. |
| Docker | No Docker or service process in the primary workflow. |

## Implementation document map

- [`Phase index`](02-phases.md)
- [`Design tokens`](03-design-tokens.md)
- [`Dependencies and services`](04-dependencies-and-services.md)
- [`Brand system`](05-brand-system.md)
- [`Runtime and demo strategy`](06-runtime-and-demo-strategy.md)
- [`CI/CD and delivery`](07-ci-cd-and-delivery.md)
- [`Docker strategy`](08-docker-strategy.md)
- [`Responsive and platform strategy`](09-responsive-and-platform-strategy.md)
- [`Repository map`](10-repository-map.md)
- [`Engineering policies`](11-engineering-policies.md)
- [`AI agent contract`](AGENTS.md)

## v4 authority rule

This directory reconciles the original v3 plan with the implemented 1.1.0 workspace. Current source, configuration, tests, and accepted repository contracts take precedence over planning examples. Preserve phase history, but distinguish original targets from implemented behavior. Phase filenames retain their original milestone versions; they do not establish that release tags were created.

The v3 Tailwind/MSW/Hono profile and eight-route/six-scenario target are superseded descriptions. Vuetify is the presentation system, local runners provide fixtures, and the router exposes the catalog plus five comparison routes. Blueprint templates are reference copies; executable configuration lives at the repository root.

## Project identity

### Engineering thesis

Make concurrency failures visible before presenting the mechanism that prevents them.

### Name story

The repository title states the concept directly because teaching concurrency is the product.

### Intended size

One Vue SPA, three framework-independent workspace packages, and five catalog scenarios. Payment-like and save-form examples share the mutual-exclusion scenario rather than requiring separate routes.

## The exact problem

Frontend concurrency explanations often hide request ordering, queue admission, ownership, cancellation, and stale writes. This lab exposes broken and protected traces against reproducible inputs, then explains which invariant a mechanism protects and where its guarantee ends.

## Target users

- Frontend developers learning cancellation, coordination, and browser ownership.
- Candidates and interviewers discussing observable failures and trade-offs.
- Teams documenting failure patterns without proprietary data or services.

## Scope

### V1 implemented scope

| Scenario | Protected behavior | Important limit |
|---|---|---|
| Stale search response | Cancel superseded work or reject stale commits with a latest-wins token. | Local deterministic requests; no real transport adapter. |
| Double submit and mutex | FIFO local ownership plus a separate completed-effect idempotency policy; release across success/failure/timeout/cancellation examples. | No remote exactly-once guarantee. |
| Bounded concurrent uploads | Queue/admit work within configured capacity; cancel a queued job and expose permit accounting. | Simulated jobs, no uploaded files or network upload service. |
| Single-flight | Normalize a scenario key, share one in-flight producer, and distinguish subscriber cancellation from producer ownership. | Registry accepts exact keys; normalization and stale-placeholder composition belong to the scenario. No durable cache. |
| Cross-tab ownership | Contrast duplicate fixture owners with one elected fixture owner; let real pages observe a shared browser claim. | Browser storage claim is a read/write teaching adapter, not an atomic distributed lock or recoverable lease. |

### Explicit non-goals

- A published production concurrency library or comprehensive operating-system course.
- Live APIs, authentication, payment processing, file uploads, or paid services.
- Worker/Atomics experiments, BroadcastChannel coordination, heartbeat/lease recovery, and production distributed ownership.
- Separate broken/fixed/timeline/tests routes, a filterable catalog, and a routed primitive playground. These original targets are not implemented.

## Pages and presentation surfaces

The registered routes are defined in [`router.ts`](../apps/lab/src/router.ts).

| Route or surface | Current behavior |
|---|---|
| `/` | Redirects to `/scenarios`. |
| `/scenarios` | Five scenario cards with invariant-oriented learning outcomes. |
| `/scenario/search-race/compare` | Shared seed/timing, two protection strategies, automatic progressive playback. |
| `/scenario/mutual-exclusion/compare` | Payment/save examples and manually revealed ownership events. |
| `/scenario/bounded-concurrency/compare` | Jobs/capacity/queued cancellation and manually revealed events. |
| `/scenario/single-flight/compare` | Resource/subscriber controls, stale placeholder, and manually revealed events. |
| `/scenario/cross-tab/compare` | Browser claim controls and complete deterministic comparison traces after coordination. |
| Unmatched paths | Redirect to `/scenarios`; `/primitives` is not registered. |

Broken/fixed lanes, explanations, timelines, and invariant evidence are embedded surfaces. `PrimitivesPage.vue` exists as unregistered source. Intro.js provides a themed six-step guided lesson through real simulator controls, state, explanations, and results; it does not gate each step on performing the interaction.

## Primary workflows

1. Select a scenario and inspect its invariant, controls, state stepper, and explanation.
2. Run both lanes with shared fixture configuration. Search uses virtual-time playback with pause/resume, speed, and replay; other scenarios expose their own reveal/coordination controls.
3. Inspect request, queue, ownership, commit, cancellation, and invariant evidence as structured HTML timeline entries.
4. Change a protection or input and compare the resulting behavior and trade-offs. Use Reset to restore the lesson's initial state.
5. Download the currently visible timelines and controls as local JSON from the footer; this is a visible-trace export, not the full unrevealed engine state.

## Core modules

- `concurrency-core`: latest-wins coordinator, mutex, semaphore, single-flight registry, idempotency registry.
- `timeline`: deterministic clock and monotonic event recording.
- `scenario-engine`: broken/fixed fixture runners, scenario types, seeded latency, and machine-readable invariants.
- `apps/lab`: routing, semantic themes, scenario-specific UI, pacing, learning explanations, storage adapter, and local trace download.

## Domain and behavioral contracts

- Broken/fixed comparisons share their scenario configuration and seed. Not every runner varies its outcome with the seed; the cross-tab runner records it while using a fixed fixture sequence.
- Timeline sequence IDs increase within each log even when virtual timestamps coincide; the deterministic clock rejects backward movement.
- Cancellation and freshness rejection are distinct search protections. A client abort is not rollback of a remote effect.
- Mutex/semaphore waiters are FIFO, cancelled queued waits are removed, and release handles are idempotent. Operation wrappers release in `finally`.
- Single-flight shares active promises by exact key and removes registry entries after settlement. Cancelling one subscriber does not cancel the shared producer.
- Idempotency remembers completed effects within its registry instance; it does not independently coalesce concurrent misses or persist across reloads.
- Search locks controls during automatic playback and derives visible commits/invariants from revealed events. Manual scenarios have different presentation behavior; do not assert universal playback locking or intermediate-state projection.
- The cross-tab runner's lower-ID election is separate from the page adapter's persistent first-observed claim and `storage` notifications. There is no lease expiry or crash recovery.

## Testing strategy

- Colocated Vitest tests exercise coordination primitives, clock/event ordering, and deterministic runners.
- Root integration tests cover comparison invariants and explicit runtime public exports.
- Playwright covers all five scenarios, two real pages for cross-tab behavior, search intermediate states, learning/UI contracts, and mobile section navigation.
- Chromium, Firefox, WebKit, and Pixel 7 projects are configured. Optional screenshot comparisons require `VISUAL_REGRESSION=1` and local ignored baselines.
- Configured coverage is evidence of test intent; a fresh execution result must be reported separately.

### Mandatory CI pipeline

```text
frozen install -> lint -> architecture check -> typecheck -> Vitest unit/integration
              -> Playwright -> production build -> initial-JS gzip budget
```

`pnpm verify` runs these gates. Pull requests also configure dependency review. There is no package-publishing or pack-test gate; all workspaces are private.

## Security, privacy, accessibility, and performance

### Security and privacy

- Public `VITE_*` values configure the base path and fixture seed; never put secrets in them.
- Scenario input remains local. The browser stores theme preference and the cross-tab practice owner; trace JSON is downloaded locally.
- No authentication, backend mutation, provider callback, or telemetry pipeline is configured.
- Define trust boundaries and cleanup ownership before adding any connected adapter.

### Accessibility

- Preserve keyboard access, skip navigation, visible focus, labeled controls, textual status, and arrow-key timeline navigation.
- Keep the document explicitly English and left-to-right; support theme persistence, reduced motion, and stacked phone comparisons.
- Browser tests protect selected behaviors. Do not infer a full accessibility certification from those assertions.

### Performance

- The production initial-JavaScript budget is **200 KiB gzip**, enforced by `scripts/check-bundle-budget.mjs` after build.
- Current routes and Intro.js are eagerly imported. Do not describe lazy tours or lazy routes as shipped optimizations.
- Measure before making runtime, memory, or bundle improvement claims. Dispose timers, listeners, and object URLs owned by the UI.

## Main risks and mitigations

- Trace labels can imply stronger guarantees than the teaching adapter implements: keep local, simulated, and distributed guarantees explicit.
- New scenarios can hide causality behind final summaries: preserve event evidence and test intermediate UI behavior where promised.
- Historical docs can drift from source: verify router, package manifests, styles, and workflows before carrying a claim forward.
- Storage claims can outlive a tab: expose Reset and document the missing production lease/crash-recovery protocol.

## Definition of done

- The engineering thesis, supported scenarios, routes, and limitations match source.
- The main workflow runs without paid services, secrets, or a backend.
- Deterministic fixtures, reset commands, automated boundaries, and regression tests remain available.
- Appropriate repository checks actually pass; browser/deployment claims name the evidence obtained.
- Release versions, tags, CI results, and hosted availability are reported separately. Local `git tag --list` was empty during this audit.
- Behavior or architecture changes update their owning docs and accepted decisions without turning phase history into a claim of completed release publication.

## Recommended README hero content

```text
Frontend Concurrency Lab
Interactive race conditions, synchronization primitives, and ordering guarantees in the browser.

Engineering thesis:
Make concurrency failures visible before presenting the mechanism that prevents them.

Primary actions:
[Live Demo] [Scenario Index] [Architecture] [Run Locally]
```

## Verification provenance

Evidence: [root manifest](../package.json), [app manifest](../apps/lab/package.json), [router](../apps/lab/src/router.ts), [package APIs](../tests/integration/public-contracts.test.ts), [application shell](../apps/lab/src/app/App.vue), [learning component](../apps/lab/src/components/ScenarioLearning.vue), [cross-tab adapter](../apps/lab/src/pages/CrossTabPage.vue), [tests](../tests/), and [workflows](../.github/workflows/). Recheck this baseline when these sources change; older root README/ADR/phase narratives may still describe earlier slices.

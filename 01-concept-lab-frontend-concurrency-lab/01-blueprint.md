# Frontend Concurrency Lab — Complete Implementation Blueprint v3

<img src="./brand/logo-lockup.svg" alt="Frontend Concurrency Lab logo" height="64" />

> **Repository:** [`frontend-concurrency-lab`](https://github.com/moein1378/frontend-concurrency-lab)  
> **Category:** Concept Lab  
> **Global implementation order:** **1 of 17**

## Authoritative execution profile

| Decision | Authoritative choice |
|---|---|
| Stack | Vue 3 + Vite + TypeScript + Tailwind CSS 4; custom lab components; no SSR |
| Architecture | Scenario-first modular monolith with framework-independent concurrency primitives and deterministic simulators. |
| Rendering | Client-rendered SPA. SSR provides no meaningful benefit because every experiment is interactive and browser-runtime dependent. |
| Responsive strategy | Adaptive desktop-first lab; usable on tablet, with phone mode limited to single-column experiment playback. |
| Live demo | GitHub Pages static demo using deterministic local simulators and MSW fixtures. |
| Docker | Not required. A tiny optional Hono latency fixture may run directly with Node; Docker is intentionally avoided for the primary workflow. |

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

## v3 authority rule

The files linked above are the implementation authority. Product goals, workflows, invariants, and risks below are preserved from v2. If an older stack or folder example conflicts with `10-repository-map.md`, the v3 repository map wins.

## Project identity

### Engineering thesis

Make concurrency failures visible before presenting the mechanism that prevents them.

### Name story

No animal name. The repository title states the concept directly because teaching concurrency is the product.

### Intended size

Standalone Nuxt/Vite lab; 8 route templates and 6 primary scenarios.

## The exact problem

Frontend race conditions are usually explained with isolated snippets. Visitors rarely see request ordering, lock ownership, queued tasks, abort propagation, and stale writes on one timeline. This lab provides reproducible failures and corrected implementations with controls for latency, ordering, concurrency, and tab count.

## Target users

- Senior frontend candidates and interviewers.
- Developers learning browser concurrency.
- Teams documenting failure patterns.

## Scope

### V1 must include

- Stale search response.
- Double-submit mutation.
- Bounded concurrent uploads.
- Shared resource mutex.
- Single-flight request coalescing.
- Cross-tab job ownership.
- Optional worker counter with Atomics as an advanced appendix.
- Interactive timeline and invariant inspector.

### Explicit non-goals

- A production concurrency library.
- Benchmarking every mutex implementation.
- Teaching operating-system concurrency comprehensively.

## Pages and presentation surfaces

This project uses **8 primary route templates/surfaces**. Dynamic routes may generate several concrete documentation or detail pages.

| Route or surface | Purpose |
| --- | --- |
| `/` | Concept overview and scenario map. |
| `/scenarios` | Filterable index with failure type and protected invariant. |
| `/scenario/[slug]/broken` | Reproduce the failure with controls. |
| `/scenario/[slug]/fixed` | Run the corrected implementation. |
| `/scenario/[slug]/compare` | Synchronized side-by-side run. |
| `/scenario/[slug]/timeline` | Event, queue, lock, request, and state timeline. |
| `/scenario/[slug]/tests` | Executable invariant tests and mutation demonstration. |
| `/primitives` | Mutex, semaphore, single-flight, latest-wins, and leader-election glossary. |

## Primary workflows

1. The visitor selects a scenario, changes latency/order, and triggers a deterministic failure.
2. The broken view highlights the violated invariant and links timeline events to source lines.
3. The fixed view applies one synchronization strategy and reruns the same seed.
4. The compare view overlays both runs and explains trade-offs rather than presenting one universal solution.

## Core modules

- Scenario registry
- Deterministic scheduler
- Timeline event model
- Broken/fixed implementations
- Invariant evaluator
- Network simulator
- Tab/worker harness

## Domain and behavioral contracts

- Every scenario defines one violated invariant in machine-readable form.
- Broken and fixed runs use the same deterministic seed.
- Timeline events have monotonic sequence IDs even when timestamps collide.
- Controls cannot silently change between comparison runs.

## Testing strategy

- Invariant tests for fixed implementations.
- Expected-failure or mutation tests for broken variants.
- Playwright multi-tab tests.
- Fake-clock and ordering tests.
- Accessibility tests for timeline and controls.

### Mandatory CI pipeline

```text
install -> lint -> architecture-check -> typecheck -> unit -> integration -> e2e -> build
```

Package projects add `pack-test` and bundle-size checks. Browser-heavy projects add a deterministic fixture performance job; performance results are documented, not treated as universal hardware claims.

## Security, privacy, accessibility, and performance

### Security and privacy

- Document trust boundaries and which inputs are untrusted.
- Keep secrets in local environment files and provide `.env.example` without credentials.
- Never include employer code, data, screenshots, endpoint names, or proprietary rules.
- Add explicit resource cleanup for workers, media tracks, observers, WebSockets, timers, object URLs, and subscriptions.

### Accessibility

- All primary workflows must be keyboard reachable.
- Canvas-heavy projects require an alternative structured view or control surface.
- Focus, reduced motion, contrast, labels, error announcements, and loading states are tested.

### Performance

- Define a project-specific budget before optimization.
- Measure main-thread long tasks, bundle size, memory/resource lifecycle, and interaction latency where relevant.
- Use workers only for measured heavy tasks and keep fallback behavior visible.

## Main risks and mitigations

- The lab can become a code dump: each scenario requires a visual failure and concise narrative.
- SharedArrayBuffer needs isolation headers: mark it advanced and keep a non-Atomics core.
- Too many scenarios reduce polish: ship six primary scenarios only.

## Definition of done

- The main engineering thesis is visible in the first screen of the README.
- A visitor can run the primary workflow without paid services.
- Local data, migrations, fixtures, and reset commands are included.
- Architecture boundaries are automated, not merely described.
- Critical invariants have tests that fail when the protection is removed.
- The demo includes failure, empty, loading, offline, permission-denied, or unavailable states relevant to the product.
- CI passes on a clean clone.
- Architecture, setup, limitations, and name story are current.
- At least one tagged release exists; package projects publish a prerelease or stable package.

## Recommended README hero content

```text
Frontend Concurrency Lab
Interactive race conditions, synchronization primitives, and ordering guarantees in the browser.

Engineering thesis:
Make concurrency failures visible before presenting the mechanism that prevents them.

Primary actions:
[Live Demo] [Documentation] [Architecture] [Run Locally]
```

# Frontend Concurrency Lab — Engineering Policies

## Architecture

- Preserve the scenario-first modular monolith and framework-independent coordination/scenario/timeline packages.
- Vue owns route composition, learning presentation, progressive pacing, and browser adapters. Reusable concurrency/invariant rules stay outside components.
- Consume package public entry points. Keep `scenario-engine` dependencies directed toward `concurrency-core` and `timeline`.
- `pnpm architecture:check` enforces selected import restrictions; do not describe it as comprehensive cycle or layer analysis.
- Prefer focused responsibility and explicit ownership over speculative ports, stores, wrappers, or package splits.

## Technology proportionality

- Current stack: Vue 3 + Vite + strict TypeScript + Vue Router + Vuetify; no SSR.
- Vuetify themes own semantic colors; app CSS owns teaching-specific layout/timelines, native-control contracts, and tour styling.
- Intro.js implements the six-step guided lesson. Do not substitute another tour or presentation system without a justified decision.
- Tailwind, Pinia, XState, MSW, Hono, Zod, GraphQL clients, and backend services are not current dependencies.
- Prefer existing packages and platform APIs. Record justified dependency additions in `04-dependencies-and-services.md` and update the lockfile using pnpm.

## State and concurrency

- Keep interaction/playback state local to its owning component; do not introduce global state without a shared owner requirement.
- Preserve deterministic fixture inputs, monotonic event order, and explicit machine-readable invariants.
- Treat AbortSignal cancellation and latest-wins stale rejection as different guarantees; abort cannot undo an effect already committed remotely.
- Mutex/semaphore contracts include FIFO waiters, removal of cancelled queued waits, idempotent release, and release in `finally` wrappers.
- Single-flight shares exact-key in-flight promises and cleans entries after settlement. Key normalization/cache composition belong outside the primitive; a subscriber does not own producer cancellation.
- Completed-effect idempotency is separate from locking and in-flight coalescing. The in-memory registry is neither durable nor a server exactly-once guarantee.
- Distinguish the deterministic cross-tab election trace from the page's localStorage read/write claim. Storage observation is not an atomic election or recoverable distributed lease.
- Document presentation differences: search has timed playback/locking; manual reveal and immediate cross-tab traces do not imply the same intermediate-state guarantees.
- Use the concurrency specialist for substantial coordination, cancellation, freshness, or lifecycle changes.

## Testing

- Use colocated Vitest tests for deterministic primitives/runners and root integration tests for cross-package/public contracts.
- Use Playwright for browser interactions, real-page ownership observation, keyboard/focus, responsive navigation, theme, and tour behavior.
- Preserve Chromium, Firefox, WebKit, and phone coverage where affected behavior can differ.
- No uncontrolled remote services or arbitrary sleeps in deterministic tests. Use virtual time and observable browser state.
- Functional browser tests do not require screenshot baselines. Optional comparisons require `VISUAL_REGRESSION=1`; screenshots/reports/traces remain ignored local artifacts.
- Existing tests describe intended behavior; passing execution must be evidenced separately.

## Security and privacy

- Never put secrets in `VITE_*`, fixtures, screenshots, exports, or Git history.
- Treat user-controlled scenario values and query tab IDs as input; preserve Vue's text rendering and documented validation boundaries.
- Browser storage currently holds theme preference and the practice job owner. Do not describe it as private-data caching or durable authenticated ownership.
- Trace JSON is a local download of currently visible UI evidence; no upload/telemetry service is configured.
- Preserve least-privilege workflow permissions and inspect new dependency/configuration risks when relevant.
- Any real API, authentication, uploads, messaging, or provider adapter requires a new trust-boundary and cleanup review.

## Performance

- Preserve the enforced **200 KiB gzip initial-JavaScript budget**; run the checker after a fresh production build.
- Current routes and Intro.js are eagerly imported. Evaluate lazy loading with evidence if scope warrants it; do not document an optimization before implementation.
- Measure runtime/memory/interaction changes before claiming improvement. Keep heavy-work/worker proposals separate from the implemented browser fixture runtime.
- Track lifecycle ownership of playback timers, storage/global keyboard listeners, object URLs, and any new tour/subscription resources.
- Use performance/browser tooling for substantial investigations, not as an unrelated mandatory audit.

## Documentation and releases

- Update behavior and architecture documentation with material changes, citing actual evidence and limitations.
- Accepted ADRs preserve decision history; record supersession explicitly and verify older narrative against source.
- Keep numbered blueprint structure and historical phase versions. They do not establish release publication or the next active task.
- Workspace metadata is 1.1.0; no local tags were returned during this audit. Remote release/CI/deployment status is unverified.
- Root workflows are executable authority; blueprint templates are synchronized references.
- Follow root instructions for proportionate verification. `pnpm verify` is the broad gate; docs also need link/path, template parity, and source-consistency checks.

## Verification provenance

Verified 2026-11-14 at `19640ebd8169ce625b2a093caafc1ca2483b6a84` plus working-tree changes; confidence high for source/configuration policy. Evidence: [root instructions](../AGENTS.md), [scripts](../package.json), [public APIs](../tests/integration/public-contracts.test.ts), [presentation ADR](../docs/adr/0004-vuetify-presentation-system.md), [cross-tab adapter](../apps/lab/src/pages/CrossTabPage.vue), [browser configuration](../playwright.config.ts), and [budget checker](../scripts/check-bundle-budget.mjs). Reverify when contracts, dependencies, workflows, or validation policy change.

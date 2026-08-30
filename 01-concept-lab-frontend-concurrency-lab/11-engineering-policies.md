# Frontend Concurrency Lab — Engineering Policies

## Architecture

- Architecture: Scenario-first modular monolith with framework-independent concurrency primitives and deterministic simulators.
- Domain invariants live outside Vue components and Pinia stores.
- UI components consume application services or actor/view-model interfaces.
- External services are ports/adapters.
- Import boundaries are executable rules in CI.

## Technology proportionality

- Stack: Vue 3 + Vite + TypeScript + Tailwind CSS 4; custom lab components; no SSR
- Do not introduce Nuxt, a second UI framework, a second state-machine library, or a second data client without an ADR.
- Prefer browser/platform APIs when they provide the required behavior and are testable.
- A dependency must solve a named problem, have a maintenance path, and be recorded in `04-dependencies-and-services.md`.

## State and concurrency

- Model durable domain state explicitly.
- Every async operation defines cancellation, timeout, stale-result, retry, and duplicate-submit behavior.
- Exactly-once claims are expressed as idempotent effects plus deduplicated state transitions, not as impossible network promises.
- Use monotonic sequence/version checks where response order can diverge from request order.

## Testing

- Pure rules: unit/property tests.
- Ports/adapters: contract tests.
- Feature workflows: integration tests.
- Critical reviewer journey: Playwright E2E.
- Time and randomness are injected through owned ports.
- Tests may not rely on real paid services or uncontrolled public APIs.

## Security and privacy

- Secrets never enter Vite client variables, fixtures, screenshots, or git history.
- Validate untrusted input with owned schemas.
- Set least-privilege GitHub Actions permissions.
- Camera, movement, wallet, repository, or group data remains local by default unless the user explicitly activates a documented adapter.
- Threat-model cross-origin messaging, wallet actions, uploaded files, and provider callbacks where relevant.

## Performance

- Heavy modules are lazy loaded.
- Worker boundaries are justified with measurements.
- Bundle budgets and runtime metrics are tracked from the phase where the heavy dependency appears.
- Dispose media streams, workers, subscriptions, timers, object URLs, WebGL resources, OpenCV Mats, and observers explicitly.

## Documentation and releases

- Documentation changes ship with behavior changes.
- Every material architecture change has an ADR.
- Every release has a changelog, known limitations, migration notes where needed, and reproducible commands.
- The repository README remains visual and concise; deep implementation detail stays in docs.

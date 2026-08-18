---
name: frontend-e2e-tests
description: Design and implement Playwright or repository-native browser E2E tests for browser-critical Vue/Nuxt journeys, with stable selectors, isolated state, trace/screenshot evidence on failure, and no arbitrary waits. Use E2E only when the real browser/integration path is the behavior.
---

# Frontend E2E Tests

Read:
- `../_shared/skill-contract.md`
- `../_shared/testing-policy.md`
- `../_shared/test-level-decision.md`
- `../_shared/selector-guidance.md`
- `../_shared/version-awareness.md`
- `references/e2e-strategy.md`
- `references/browser-patterns.md` for auth/navigation/forms/network/visual scenarios

## Gate

Before writing E2E, state why a lower-level test cannot provide equivalent confidence.

Valid reasons include:
- navigation/redirect behavior
- browser rendering/hydration
- multi-layer integration
- real storage/cookie/session behavior
- critical user journey
- visual contract
- browser API behavior

## Preflight

Detect:
- Playwright/Cypress/Nuxt E2E tooling
- existing config/projects/browsers
- test server/base URL strategy
- auth/session fixtures
- data reset/seed strategy
- CI artifact settings
- parallelization constraints

Do not install a browser runner unless asked.

## Authoring

- one clear journey/property per test
- deterministic seed/fixture
- semantic/stable selectors
- no arbitrary sleeps
- assert navigation/network/UI outcomes that matter
- isolate test-owned state
- preserve independent execution
- use retries to diagnose environmental instability, not to mask deterministic bugs

## Evidence on Failure

When supported/configured, preserve:
- trace
- screenshot
- console error
- relevant network failure
- video only when useful

Do not create excessive artifacts for every passing test unless the project wants that.

## Performance

Do not add Web Vitals/performance thresholds by default.

Add performance E2E only when:
- the product has a performance budget/SLO
- a known performance regression exists
- the user explicitly requests it

## Visual E2E

If appearance is the contract, use stable screenshot baselines/tolerances and environment controls. For Figma parity, use `$figma-to-code` visual verification rather than treating a generic snapshot as design truth.

## Verification

Run the narrow project/test first. Expand to the configured project/browser matrix according to risk and CI expectations.

## Output

Report:
- journey protected
- why E2E was chosen
- state/fixture strategy
- browsers/projects actually run
- artifacts on failure
- remaining environmental gaps

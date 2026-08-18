---
name: frontend-test-review
description: Audit existing Vue/Nuxt tests for correctness, behavior coverage, brittle selectors, over-mocking, duplication, invalid runtime assumptions, weak assertions, and flakiness. Use an evidence-based rubric; do not enforce style-only rules as blockers.
---

# Frontend Test Review

Read:
- `../_shared/skill-contract.md`
- `../_shared/testing-policy.md`
- `../_shared/test-level-decision.md`
- `../_shared/selector-guidance.md`
- `references/review-rubric.md`

## Modes

- `review-only`: findings only
- `review-and-apply`: fix high-confidence issues and verify

Respect the user's requested mode.

## Review Order

### 1. Test Correctness

Does the test actually exercise the intended behavior and fail when that behavior is wrong?

### 2. Risk Coverage

Are important behaviors missing while low-value details are over-tested?

### 3. Level Appropriateness

Could a costly E2E be a lower-level test? Is a unit test emulating a browser/Nuxt behavior unreliably?

### 4. Isolation / Mocking

Are mocks at sensible boundaries? Is mutable state leaking?

### 5. Assertions

Do assertions prove outcomes rather than incidental implementation details?

### 6. Selectors

Prefer semantic/stable selectors. `data-testid` is valid when it is the better durable contract; it is not universally required.

### 7. Async / Flakiness

Look for arbitrary waits, uncontrolled timers, race-dependent assertions, shared state, test-order dependence.

### 8. Environment Correctness

Verify Nuxt runtime, DOM environment, browser runner, and setup are compatible with the test.

## Severity

- **blocker:** test is false confidence, invalid, or hides a real failure
- **high:** critical behavior unprotected or deterministic flake
- **medium:** brittleness/duplication/maintainability that can cause future false failures
- **low:** optional readability/style improvement

Do not label missing `describe`, `data-testid`, `clearAllMocks`, or axe tooling as blockers by themselves.

## Apply Rules

When fixing:
- change the smallest owning test/setup/production issue
- do not rewrite large suites for stylistic consistency
- run the narrow suite
- report product defects separately from test defects

## Output

For each material finding:
- severity
- file/behavior
- evidence
- why it matters
- concrete fix

Finish with verification and remaining gaps.

---
name: frontend-feature-tdd
description: Implement a new Vue/Nuxt feature through behavior-driven Red-Green-Refactor slices, using explicit acceptance criteria, the cheapest sufficient test boundary, and continuous verification. Use when the user explicitly wants TDD/test-first development.
---

# Frontend Feature TDD

Read:
- `../_shared/skill-contract.md`
- `../_shared/testing-policy.md`
- `../_shared/test-level-decision.md`
- `../_shared/risk-model.md`
- `references/tdd-protocol.md`

## 1. Acceptance Contract

Translate the feature into externally observable acceptance criteria.

Separate:
- must-have behavior
- error/edge behavior
- explicitly out-of-scope behavior
- unresolved product decisions

Do not invent product semantics to keep TDD moving.

## 2. Slice Vertically

Choose the smallest meaningful behavior slice that can go Red -> Green.

Avoid writing an entire test suite before any implementation unless the user explicitly requests specification-first tests.

## 3. Red

Write a test that:
- represents a real acceptance criterion
- fails for the intended missing behavior
- uses the cheapest sufficient boundary

Confirm the failure reason.

## 4. Green

Implement the smallest production-quality behavior that satisfies the test.

Do not hardcode to the test in a way that violates the actual requirement.

## 5. Refactor

Improve structure only while the suite remains green.

Use `$vue-nuxt-refactor` for non-trivial structural work.

## 6. Repeat

Continue acceptance criterion by acceptance criterion.

## Stop Condition

Stop when:
- required acceptance criteria are covered
- implementation quality gates pass
- remaining cases are explicitly out of scope or low-value duplicates

## Output

Report the Red/Green evidence by slice and the final acceptance traceability.

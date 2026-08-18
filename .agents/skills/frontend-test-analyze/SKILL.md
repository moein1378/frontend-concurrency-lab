---
name: frontend-test-analyze
description: Analyze Vue/Nuxt behavior and existing coverage, assign risk, choose the cheapest sufficient test levels, and produce an evidence-backed test plan without writing tests unless asked.
---

# Frontend Test Analysis

Read:
- `../_shared/skill-contract.md`
- `../_shared/testing-policy.md`
- `../_shared/test-level-decision.md`
- `../_shared/risk-model.md`
- `../_shared/selector-guidance.md`

## Mode

Default: `analyze-only`.

Do not modify tests unless the user explicitly requests implementation.

## Workflow

### 1. Define Behavior Surface

Trace:
- inputs/triggers
- observable outcomes
- failure/edge states
- external boundaries
- SSR/browser/runtime dependencies

### 2. Map Existing Coverage

Search for existing tests covering the same behavior, including higher/lower-level tests.

Classify:
- already protected
- partially protected
- unprotected
- duplicated

### 3. Risk Assessment

Assign low/medium/high with reasons from the shared risk model.

### 4. Select Test Level

For each behavior, choose the cheapest level that proves it.

Do not assign test types from file names alone.

### 5. Prioritize Scenarios

Use:
- P0: severe correctness/security/financial/irreversible/prior regression
- P1: critical workflow/shared contract
- P2: valuable edge/error/responsive/runtime behavior
- P3: optional confidence/cosmetic cases

### 6. Produce Traceability Plan

Use `references/test-plan-template.md`.

Every proposed test should trace to:
- behavior/risk
- existing coverage gap
- chosen level
- expected evidence

## Quality Gates

- no duplicated scenario without a distinct integration purpose
- no mandatory E2E merely because a page is SSR
- no mandatory performance test without a performance contract/risk
- no test proposed only to increase count/coverage percentage

## Output

Return the test plan and explicitly state which scenarios should *not* be added because existing coverage is sufficient.

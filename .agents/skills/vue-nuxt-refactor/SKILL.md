---
name: vue-nuxt-refactor
description: Diagnose, plan, implement, and verify focused Vue/Nuxt refactors using behavior contracts, cohesion/coupling/complexity evidence, SSR/reactivity safety, and independent review for risky changes. Use when structure impedes correctness, maintainability, testability, or runtime safety.
---

# Vue / Nuxt Refactor

Read:
- `../_shared/skill-contract.md`
- `../_shared/repository-preflight.md`
- `../_shared/refactor-policy.md`
- `../_shared/risk-model.md`
- `references/behavior-contract.md`
- `references/vue-reactivity.md`
- `references/architecture-boundaries.md` when extraction/module boundaries are involved

## Intent

Improve internal structure while preserving authorized external behavior.

## Do Not Trigger

Do not refactor merely because:
- a function exceeds an arbitrary line count
- a component is “large” without a concrete problem
- a computed depends on another computed
- a different folder structure is aesthetically preferred

## 1. Diagnose

State the concrete problem:
- mixed responsibilities
- coupling/change collisions
- duplication of the same concept
- hard-to-reason branching/state machine
- unsafe SSR/browser boundary
- async race/leak ownership
- poor dependency direction
- testability blocked by architecture
- repeated defect-prone pattern

Collect evidence from actual change history/tests/source where practical.

## 2. Classify

Use:
- mechanical
- structural
- reactive
- architectural
- behavioral

If the requested change intentionally changes behavior, do not disguise it as a pure refactor.

## 3. Capture Behavior Contract

Before non-trivial edits, capture affected external contracts:
- props
- emits
- slots
- DOM/accessibility behavior
- routes/query params
- stores/composable API
- API payloads
- persisted state
- SSR output/hydration-sensitive behavior
- side-effect timing where externally observable

Use `references/behavior-contract.md`.

## 4. Choose the Smallest Coherent Boundary

Evaluate:
- cohesion
- coupling
- dependency surface
- ownership/lifecycle
- naming clarity
- reuse likelihood
- change frequency
- test boundary value

Extract only when the new boundary represents a real concept.

## 5. Implement Incrementally

Prefer one conceptual refactor step at a time:
- mechanical preparation
- extraction/move
- dependency inversion
- reactive cleanup
- call-site migration
- dead-code removal

Keep intermediate states verifiable when possible.

## 6. Verify Equivalence

Compare the before/after behavior contract.

Use:
- existing focused tests
- targeted new characterization tests when risk warrants
- type/lint/build
- SSR/runtime/browser evidence for affected behavior

For high-risk/shared refactors, use `refactor_reviewer` as an independent read-only review after the change.

## Quality Gates

- no arbitrary line-count or “one pattern fits all” rule drove the refactor
- public contract changes are intentional and explicit
- watchers/effects have correct ownership and side-effect cleanup
- SSR/browser boundaries remain safe
- extracted abstractions reduce complexity/coupling rather than just move code
- verification proves preserved or intentionally changed behavior

## Output

Report:
- diagnosed problem
- refactor class
- behavior contract affected
- structural decisions
- verification/evidence
- intentional behavior changes, if any
- residual risks

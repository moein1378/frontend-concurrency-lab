---
name: plan-and-execute
description: Create, validate, execute, and resume a persisted implementation plan with acceptance criteria, dependencies, risk, baseline fingerprint, per-step evidence, and drift detection. Use automatically for phased or multi-session work that needs a durable plan artifact under .agents/plans, or when resuming an existing repository plan. Do not use for ordinary single-session planning; use the generic planning workflow instead.
---

# Plan and Execute

Read:
- `../_shared/skill-contract.md`
- `../_shared/risk-model.md`
- `../_shared/parallelization-policy.md`
- `references/plan-template.md`
- `references/drift-and-handoff.md`

Store plans under `.agents/plans/<task-slug>.md`.

## New Plan

1. inspect relevant repository facts
2. define goal and non-goals
3. write acceptance criteria
4. capture baseline commit/fingerprint when available
5. identify risks/unknowns
6. split work into dependency-aware steps
7. define verification/evidence per step
8. mark status `pending`

If user asked plan-only, stop after the plan.

If user explicitly asked plan-and-implement, proceed.

For broad/risky work where implementation authorization is unclear, present the plan before edits.

## Step Contract

Every implementation step should specify:
- purpose
- depends_on
- expected files/surface
- completion evidence
- status

Avoid micromanaging line-by-line edits that may change as source is discovered.

## Execution

- update plan status as evidence is achieved
- keep decisions/requirement changes recorded
- parallelize only independent steps
- do not mark a step done because files changed; mark it done when evidence passes

## Drift Detection

Before resume:
- compare current commit/config/source assumptions to baseline
- inspect files referenced by incomplete steps
- classify drift as none/minor/material
- update plan before continuing if material

## Final Status

Use:
- `completed`
- `completed-with-exceptions`
- `blocked`
- `superseded`

## Output

The plan itself is the handoff artifact. Final response should summarize only changes, evidence, and remaining blockers.

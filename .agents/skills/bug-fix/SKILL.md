---
name: bug-fix
description: Reproduce, diagnose, fix, and verify a reported Vue/Nuxt bug with the smallest defensible change. Use for runtime errors, regressions, incorrect product behavior, or failing user flows. Prefer a focused regression test when it materially protects the failure mode.
---

# Bug Fix

Read `../_shared/skill-contract.md`, `../_shared/repository-preflight.md`, `../_shared/evidence-and-completion.md`, and `../_shared/risk-model.md`.

## Intent

Turn a reported symptom into a verified root cause, make the smallest safe correction, and prove the original failure no longer reproduces.

## Do Not Trigger

Do not use this skill for:
- feature development without a defect
- broad refactoring with no reproduced failure
- purely stylistic cleanup

## Workflow

### 1. Normalize the Bug Report

Capture:
- observed behavior
- expected behavior
- reproduction conditions
- affected route/component/composable/module
- environment/version details when relevant
- whether the issue is deterministic

If the report is vague, derive a minimal reproducible hypothesis from the repository before asking broad questions.

### 2. Reproduce or Establish Evidence

Prefer:
1. existing failing test
2. deterministic local reproduction
3. browser/runtime evidence
4. static trace when runtime reproduction is unavailable

Record the evidence class. If the bug cannot be reproduced, do not invent a cause; narrow the hypothesis and mark uncertainty.

### 3. Trace the Execution Path

Identify:
- entry point
- state/data source
- transformation/branch causing the symptom
- side effects
- downstream contract that becomes incorrect

Distinguish root cause from the line where the failure is merely observed.

### 4. Protect the Failure Mode

When valuable and practical, add or adapt a regression test that:
- fails for the original defect
- asserts observable behavior
- is at the cheapest sufficient level
- does not encode the implementation mistake itself

For nondeterministic defects, read `references/nondeterministic-regressions.md`.

### 5. Fix Minimally

- change the owning behavior, not unrelated callers
- avoid “fixing” by loosening a correct assertion
- preserve public contracts unless the contract is the bug
- avoid opportunistic refactors unless required for a safe fix

### 6. Prove the Fix

At minimum:
- original reproduction no longer fails
- focused regression check passes
- adjacent high-risk behavior is not obviously broken

Increase verification for high-risk changes.

## Quality Gates

Do not claim `done` unless:
- root cause is stated with evidence
- the original failure path is verified fixed, or explicitly marked unverified
- any added regression test proves the defect rather than an implementation detail
- no known relevant failure is hidden by disabled/skipped checks

## Output

Report:
- root cause
- exact fix
- regression coverage
- evidence before/after
- commands/checks run
- remaining uncertainty

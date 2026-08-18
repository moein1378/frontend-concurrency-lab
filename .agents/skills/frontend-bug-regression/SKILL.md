---
name: frontend-bug-regression
description: Create a focused regression test for a known Vue/Nuxt defect, proving the old behavior fails and the corrected behavior passes at the cheapest sufficient test level. Use for confirmed bugs and incident follow-up.
---

# Frontend Bug Regression

Read:
- `../_shared/skill-contract.md`
- `../_shared/testing-policy.md`
- `../_shared/test-level-decision.md`
- `references/regression-protocol.md`

## Intent

Encode the failure mechanism, not merely the current implementation.

## Workflow

1. state the bug in observable terms
2. identify the minimal triggering condition
3. find existing related coverage
4. choose the cheapest sufficient level
5. write the test
6. prove it fails on the buggy behavior when practical
7. apply/confirm the fix
8. prove it passes after the fix
9. check for redundant overlap with existing tests

For time/race/random bugs, use the controlled nondeterminism guidance from `$bug-fix`.

## Quality Gates

A regression test is strong when:
- removing/reverting the fix makes it fail for the intended reason
- it does not rely on unrelated implementation details
- it is deterministic
- its test level matches the actual failure mechanism

## Output

Report:
- defect protected
- failure mechanism
- red evidence
- green evidence
- test level rationale

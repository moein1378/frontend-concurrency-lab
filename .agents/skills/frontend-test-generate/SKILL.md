---
name: frontend-test-generate
description: Implement focused Vue/Nuxt unit, component, or Nuxt-runtime tests from an evidence-backed behavior/test plan. Use existing project conventions, semantic selectors, deterministic boundaries, and run/fix verification. Do not generate tests by file-type quotas.
---

# Frontend Test Generation

Read:
- `../_shared/skill-contract.md`
- `../_shared/testing-policy.md`
- `../_shared/test-level-decision.md`
- `../_shared/selector-guidance.md`
- `../_shared/version-awareness.md`
- `references/vue-nuxt-test-patterns.md`
- `references/mocking-and-async.md`

Load topic references only when relevant:
- `references/forms-and-components.md`
- `references/state-and-composables.md`
- `references/routing-security-flags.md`
- `references/ssr-hydration-performance.md`

## Preconditions

Prefer an existing test plan from `$frontend-test-analyze`.

If no plan exists, first identify:
- behavior
- risk
- chosen level
- existing coverage

## Core Rules

- test public/observable behavior
- use repository-native helpers and setup
- mock external/owned boundaries only when needed
- prefer deterministic controlled async behavior
- choose selectors based on semantics/stability
- do not require `describe`
- do not require `data-testid`
- do not require axe tooling
- do not snapshot as the only proof of important behavior

## Nuxt

Detect installed Nuxt and `@nuxt/test-utils` setup.

Keep Nuxt-runtime unit tests and E2E utilities in compatible test environments/configurations.

Do not copy Nuxt 3/4 patterns without checking repository version/config.

## Run/Fix Loop

For each focused batch:
1. run the narrow test target
2. classify failure:
   - product defect
   - incorrect test
   - environment/config
   - flake/nondeterminism
3. fix the owning problem
4. rerun
5. run adjacent relevant checks when risk warrants

Never weaken a correct assertion to match a bug.

## Quality Gates

- every new test traces to a meaningful behavior/risk
- no accidental duplicate coverage
- test fails for the intended wrong behavior when practical
- tests are isolated at the actual contamination boundary
- focused suite passes

## Output

Report:
- tests added/changed
- behavior protected
- test level rationale
- commands run
- unresolved environment gaps

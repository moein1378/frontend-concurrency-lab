---
name: vue-testing-best-practices
description: Version-aware reference skill for professional Vue 3/Nuxt 3/4 testing decisions across Vitest, Vue Test Utils, Nuxt test-utils, and Playwright. Use for framework-specific guidance after detecting the project's actual versions and tooling.
---

# Vue Testing Best Practices

Read:
- `../_shared/version-awareness.md`
- `../_shared/testing-policy.md`
- `../_shared/test-level-decision.md`
- `../_shared/selector-guidance.md`
- `references/vue-component-testing.md`
- `references/nuxt-testing.md`
- `references/async-and-lifecycle.md`
- `references/browser-and-visual.md`

## Rule

This skill is a reference library, not a generator.

Detect installed versions/config before applying an API pattern.

## Decision Priorities

1. observable behavior
2. correct runtime boundary
3. deterministic setup
4. minimal mocking
5. maintainable selector/assertion
6. version-compatible APIs

## Do Not Encode as Universal Rules

- all selectors must be `data-testid`
- every test file needs `describe`
- every composable needs integration coverage
- performance E2E without a real performance contract/risk
- every suite needs axe/jest-axe
- every mock suite needs the same cleanup call
- Nuxt 3 examples are valid for every Nuxt 4 project

## Use Other Skills For

- planning: `$frontend-test-analyze`
- implementation: `$frontend-test-generate`
- review: `$frontend-test-review`
- E2E: `$frontend-e2e-tests`

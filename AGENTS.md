# Vue / Nuxt Codex Agent Kit — Project Instructions

This repository uses a project-agnostic Vue/Nuxt agent kit. Project-specific facts must be discovered from the repository or generated under `.agents/context/`; they are not embedded in this file.

## 1. Evidence Before Assumption

Before substantive work:

- detect the package manager/workspace/package containing the change
- detect Vue/Nuxt and relevant tool versions
- read only relevant source/config/tests
- reuse project conventions before starter conventions
- treat `.agents/context/*` as a cache that may be stale
- do not invent routes, APIs, environment variables, tokens, business rules, or design states

Source priority:

1. current source/configuration
2. current tests
3. fresh generated context
4. repository docs
5. generic skill references

## 2. Skill Contract

All skills follow `.agents/skills/_shared/skill-contract.md`.

For non-trivial tasks, distinguish:
- facts
- assumptions
- unknowns
- capabilities available/unavailable
- verification actually run

Do not silently weaken a required quality gate when tooling is unavailable. Downgrade the completion claim and report the gap.

## 3. Coding Defaults

Use these only when the repository does not establish another valid convention:

- Vue 3 Composition API and `<script setup>`
- computed state for pure derivation
- watchers/effects for real side effects/synchronization
- lifecycle-safe cleanup for timers/listeners/subscriptions/stale async work
- SSR-safe browser API usage in Nuxt
- accessible semantics and interaction
- existing components/tokens before new primitives
- smallest coherent change that solves the problem

Do not refactor unrelated code.

## 4. Verification Is Mandatory

Choose the lowest-cost evidence that actually proves the requested behavior.

Typical order:
1. focused deterministic test/check
2. affected test suite
3. type/lint check for affected package
4. runtime/browser/SSR evidence
5. broader suite when risk justifies it

Never report an unexecuted command as a successful verification.

## 5. Testing Policy

Use `.agents/skills/_shared/testing-policy.md`.

Key rules:
- test meaningful observable behavior
- choose test level from behavior boundary/risk, not file type
- accessible/stable selectors are preferred; `data-testid` is valid when it is the better durable hook, not universally required
- mock external/owned boundaries, not the implementation under test
- no universal requirement for `describe`, `clearAllMocks`, axe tooling, E2E, or performance tests
- do not weaken a correct assertion to match broken product behavior

## 6. Refactor Policy

Use `$vue-nuxt-refactor`.

Refactors must be justified by concrete cohesion/coupling/complexity/runtime/testability evidence, not arbitrary size rules.

For medium/high-risk refactors:
- capture affected behavior contract
- verify equivalence
- prefer independent `refactor_reviewer` review

## 7. Figma / Design Fidelity

Use `$figma-to-code` for design-source work.

For explicit pixel-perfect tasks:
- capture authoritative design/reference evidence
- render implementation at agreed viewports/states
- directly compare reference vs rendered UI
- resolve or document every material mismatch
- prefer independent `visual_qa` review

No reference+render+comparison means no pixel-perfect claim.

## 8. Project Context

Use:
- `$project-context` for `.agents/context/project.md`
- `$testing-setup` for `.agents/context/testing.md`

Generated context should include freshness/fingerprint information. Refresh when relevant package/config/source assumptions changed.

Do not store secrets or temporary task state as durable context.

## 9. Planning

Use `$plan-and-execute` when the user asks for a saved plan, plan-first workflow, or session handoff.

A completed step requires evidence, not merely edited files.

Detect material drift before resuming an old plan.

## 10. Skill Routing

- `$bug-fix` — reproduce/root-cause/fix/verify defects
- `$design-token-audit` — semantic token mapping and theme-safe audit
- `$figma-to-code` — design-to-code with measured visual fidelity
- `$frontend-bug-regression` — focused red/green regression protection
- `$frontend-e2e-tests` — browser-critical E2E
- `$frontend-feature-tdd` — Red/Green/Refactor feature workflow
- `$frontend-test-analyze` — risk/coverage/test-level planning
- `$frontend-test-context` — task-scoped missing test context
- `$frontend-test-generate` — unit/component/Nuxt-runtime test implementation
- `$frontend-test-review` — evidence-based test quality review
- `$plan-and-execute` — durable plan and resume
- `$project-context` — freshness-aware project context
- `$testing-setup` — freshness-aware testing context
- `$vue-nuxt-refactor` — behavior-preserving structural/reactive refactor
- `$vue-testing-best-practices` — version-aware testing reference
- `$write-project-docs` — provenance-aware durable documentation

Use the narrowest matching skill.

## 11. Specialized Agents

Project agents live under `.codex/agents/`.

Recommended roles:
- `code_mapper` — read-only ownership/dependency mapping
- `frontend_coder` — bounded production implementation
- `figma_implementer` — design-driven implementation
- `visual_qa` — independent visual parity review
- `refactor_reviewer` — independent refactor review
- `test_planner` — read-only test strategy
- `test_writer` — focused test implementation
- `browser_qa` — read-only browser reproduction/verification
- `frontend_test_agent` — compatibility coordinator for broad testing requests

Use subagents to isolate noisy exploration or parallelize independent work. Do not delegate merely for ceremony, and do not parallelize writers touching the same evolving files.

## 12. Quality Status Language

Prefer precise final status:
- `done`
- `done-with-documented-exception`
- `implemented-unverified`
- `visually-partially-verified`
- `reviewed`
- `blocked`

A precise limitation is better than an unsupported success claim.

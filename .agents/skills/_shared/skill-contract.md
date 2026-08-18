# Shared Skill Contract

Every production skill in this kit follows the same execution contract.

## 1. Intent

State the single job the skill owns. A skill should not silently absorb adjacent work.

## 2. Trigger / Do Not Trigger

Use the skill only when its trigger matches. Do not activate it merely because related files exist.

## 3. Inputs

Resolve the minimum inputs needed from:

1. explicit user requirements
2. repository source/config/tests
3. generated project context that is still fresh
4. connected tooling or design sources
5. external documentation only when version-specific behavior must be verified

Never replace missing facts with guesses.

## 4. Repository Preconditions

Before editing:

- identify the package manager from lockfiles/package metadata
- identify Vue/Nuxt and relevant versions
- inspect relevant scripts/configuration
- inspect local conventions before introducing a new one
- detect existing tests/components/tokens/utilities that can be reused
- treat generated context as a cache, not as source code truth

## 5. Capability Detection

A skill must distinguish between:

- capabilities proven available
- capabilities absent
- capabilities unknown

Examples: Figma MCP, browser tooling, Playwright, Vitest, Nuxt test utils, Storybook, visual-regression tooling, accessibility tooling.

Never claim a capability was used when it was not.

## 6. Facts, Assumptions, Unknowns

Keep these conceptually separate.

- **Fact:** confirmed by source, config, successful command, or authoritative tool.
- **Assumption:** a temporary working hypothesis that can be checked.
- **Unknown:** missing information that is not safe to infer.

Resolve assumptions that can materially change the implementation before declaring completion.

## 7. Execution Mode

Use one of:

- `analyze-only`
- `plan-only`
- `implement`
- `review-only`
- `review-and-apply`

Honor explicit user mode first. Do not edit in an analyze/review-only request.

## 8. Quality Gates

Each skill defines task-specific gates. A gate must be observable or evidenced, not merely aspirational.

Examples:

- a regression test is red before the fix and green after it
- visual implementation was rendered at specified viewports
- a public contract comparison found no unintended changes
- targeted typecheck/test/build command passed

## 9. Verification

Verification is part of the work.

Prefer, in order:

1. narrow deterministic check covering the changed behavior
2. relevant test file/suite
3. type/lint check for affected package
4. targeted build/runtime check
5. broader suite only when risk justifies it

Do not substitute “code looks correct” for a check that is available.

## 10. Failure / Fallback Protocol

If a required capability fails:

1. retry only when the failure is plausibly transient
2. use an equivalent verified source/tool if one exists
3. downgrade the completion claim when equivalence cannot be established
4. record exactly what remains unverified

Never silently weaken a quality gate.

## 11. Artifacts / Evidence

For non-trivial work, produce only useful artifacts such as:

- plan
- behavior contract
- test plan
- reproduction notes
- visual QA report
- context snapshot
- decision note

Do not create ceremony-only files.

## 12. Definition of Done

A skill may say `done` only when:

- requested scope is implemented/reviewed
- required gates passed
- no known blocker remains inside the requested scope
- assumptions that affect correctness are resolved or disclosed
- verification actually run is reported separately from checks merely recommended

Otherwise use a precise status such as `implemented-unverified`, `blocked`, or `partially-verified`.

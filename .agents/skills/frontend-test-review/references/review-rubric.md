# Test Review Rubric

## Blockers

Examples:
- assertion can pass when behavior is wrong
- test never executes target path
- test is permanently skipped for a critical regression
- incorrect mocking replaces the unit under test
- environment mismatch invalidates the result
- assertion was weakened to accommodate a product bug

## High

Examples:
- critical auth/permission/irreversible mutation gap
- known regression not protected
- deterministic flake in CI-critical suite
- browser-specific behavior only tested in an unrealistic node mock

## Medium

Examples:
- duplicate coverage with high maintenance cost
- brittle deep CSS selector
- mock graph tightly coupled to implementation
- global state reset missing where contamination is demonstrated

## Low

Examples:
- naming/organization/readability
- optional grouping with `describe`
- stylistic preference with no correctness impact

## Accessibility Tooling

If axe/a11y tooling already exists, review its meaningful use. Do not require adding `jest-axe` solely to satisfy this rubric.

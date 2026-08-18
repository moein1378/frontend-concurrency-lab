# Selector Guidance

Selector strategy is a contract decision, not a single-rule hierarchy.

## Prefer

For Testing Library / Playwright-style APIs:

1. role + accessible name
2. label
3. stable user-visible text when localization/content changes are not a problem
4. durable explicit hook such as `data-testid` when semantics are insufficient

For Vue Test Utils-only codebases, use the most semantic/stable selector the library and existing project conventions support.

## Use `data-testid` When

- there is no meaningful accessible selector
- localization makes text unstable
- multiple semantically identical elements need a durable business-neutral hook
- an E2E contract intentionally depends on a stable test hook
- a complex canvas/graph/custom widget has no useful DOM semantics

Do not require `data-testid` on every element.

## Avoid

- styling classes as behavior selectors unless the class itself is the contract
- brittle `nth-child`/deep CSS structure
- translated copy when translation is not what the test intends to verify
- selectors that expose private implementation details

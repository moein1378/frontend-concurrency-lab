# Frontend Testing Policy

## Purpose

Tests exist to protect meaningful observable behavior with the cheapest reliable level that proves it.

## Test What Matters

Prioritize:

- user-visible state transitions
- public component/composable/store contracts
- data transformation with meaningful edge cases
- auth/permission/security boundaries
- irreversible or financially sensitive mutations
- SSR/hydration behavior when relevant
- prior regressions
- async/race behavior with realistic failure modes

Do not require a test merely because a file is observable or a function exists.

## Test Level

Choose based on behavior boundary, not file type.

- **unit:** pure logic or isolated contract
- **component:** rendered Vue behavior and component contract
- **Nuxt runtime/integration:** behavior requiring Nuxt context/plugins/auto-imports/runtime
- **E2E/browser:** browser-critical journeys, cross-layer integration, navigation, real rendering, or behavior cheaper levels cannot prove
- **visual:** fidelity/regression where appearance itself is the contract

A composable does not automatically require both unit and integration coverage.

## Assertions

Assert externally meaningful outcomes. Avoid coupling to:

- private refs
- internal method names
- arbitrary DOM structure
- implementation-only call order unless ordering is the behavior
- snapshots as the only proof for important behavior

## Mocking

Mock at owned/external boundaries only when needed. Prefer real internal collaborators when cheap and deterministic.

`vi.clearAllMocks()` clears mock call/history state but does not reset every mock implementation/return value. Use the correct reset/restore behavior for the actual isolation need.

## Determinism

Control only sources of nondeterminism that affect the test:

- time
- random values
- network
- async scheduling/races
- locale/timezone
- storage
- generated IDs

Do not add global cleanup ritual without a concrete contamination risk.

## Accessibility

Accessible behavior is part of observable UI behavior. Prefer semantic interactions and assertions. Automated axe tooling is valuable only when already available or intentionally added; it is not a universal mandatory dependency.

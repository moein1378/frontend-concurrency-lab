# Vue Reactivity Refactor Guide

## Derived State

Use `computed` for pure derived state when it clarifies ownership/caching.

Do not mutate external state from a computed getter.

## Watchers / Effects

Use `watch` when explicit sources and change semantics matter.

Use `watchEffect` when automatic synchronous dependency collection makes the effect clearer.

Clean up side effects such as:
- requests that can become stale
- subscriptions
- timers
- listeners
- observers

Do not require a manual `stop()` for every watcher created synchronously under a component lifecycle. Explicitly manage lifetime when an effect is created outside that ownership or asynchronously in a way that escapes it.

## Async Safety

For source-driven async work:
- prevent stale response wins
- cancel/ignore invalidated work where appropriate
- avoid duplicate writes
- make loading/error ownership explicit

## Computed Chains

A computed depending on another computed is not inherently a smell. Review:
- whether names communicate stages
- whether the chain creates unnecessary recomputation
- whether a single cohesive derivation is easier to understand

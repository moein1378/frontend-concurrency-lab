# State, Stores, and Composables

## Pure Composables

Call directly when no component/Nuxt lifecycle is required.

Test:
- returned public state
- public actions
- meaningful edge cases

## Lifecycle Composables

Mount through a small harness when behavior depends on:
- onMounted/onUnmounted
- provide/inject
- component-owned watchers/effects
- template refs

Verify cleanup only for resources actually created by the composable.

## Stores

Use the project's real store setup when practical.

Protect:
- public actions
- derived getters
- state transitions
- error/rollback behavior
- persistence boundary when meaningful

Mock network/storage/SDK boundaries rather than internal store helpers.

## Async State

Use deferred/controlled promises when order matters.

Test stale response handling, duplicate submissions, cancellation, or optimistic rollback only when those are actual behaviors/risks.

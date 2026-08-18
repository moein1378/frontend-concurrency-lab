# Vue / Nuxt Test Patterns

Use examples as shapes, not copy-paste law.

## Component

Prefer user-observable flow:

1. render with meaningful props/provider state
2. interact through semantic/stable selector
3. assert DOM/emits/navigation/side effect contract

## Composable

For pure composables, call directly.

For lifecycle-dependent composables, mount through a lightweight component/harness so lifecycle ownership is real.

## Store

Test public actions/getters/state transitions. Mock network/storage boundaries, not private store internals.

## Nuxt Runtime

Use the repository's Nuxt test environment only when behavior genuinely depends on Nuxt runtime.

Examples:
- Nuxt auto-import/plugin context
- route middleware/runtime config
- framework composables

## SSR/Hydration

Add dedicated coverage only when the behavior depends on server/client divergence, browser-only APIs, serialized state, or hydration timing.

## Forms

Protect:
- validation behavior users depend on
- submit payload/side effect
- disabled/loading/error states
- accessible labels/errors where relevant

Do not assert every class/DOM wrapper.

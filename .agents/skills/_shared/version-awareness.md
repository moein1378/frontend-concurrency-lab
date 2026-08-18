# Version Awareness

Generic examples are not an API contract.

Before using version-sensitive Vue/Nuxt/Vitest/Playwright behavior:

1. inspect installed versions
2. inspect repository configuration and existing usage
3. use the matching primary documentation when uncertainty remains
4. adapt the pattern to the repository rather than forcing the reference example

## Nuxt

Nuxt 3 and Nuxt 4 may differ in directory conventions and testing/runtime setup. Do not infer version from folder names alone.

For `@nuxt/test-utils`, keep Nuxt-runtime unit tests and end-to-end utilities in compatible environments/configurations. Do not mix runtime and E2E helpers in a way the installed setup does not support.

## Vue Reactivity

Do not require manual stopping for every watcher. Watchers/effects created synchronously while owned by a component are tied to that lifecycle; clean up the side effects they create and explicitly stop effects whose ownership/lifetime is not component-bound.

## Testing Libraries

Do not assume:

- Testing Library exists because Vue Test Utils exists
- `jest-axe`/axe exists
- Playwright exists
- browser mode exists
- fake timers are configured

Detect first.

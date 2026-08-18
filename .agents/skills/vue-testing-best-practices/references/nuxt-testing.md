# Nuxt Testing

Detect Nuxt and `@nuxt/test-utils` versions/config first.

## Nuxt Runtime Tests

Use a Nuxt-aware environment for behavior that depends on:
- Nuxt app context
- auto-imports/plugins
- router/runtime config
- framework-specific composables

## E2E

Use Nuxt E2E/browser tooling or Playwright when the running app/browser path is required.

Nuxt runtime unit testing and E2E helpers may require different environments. Keep them in compatible files/projects according to the installed setup.

## Avoid

- forcing all tests into Nuxt runtime when plain Vitest is sufficient
- mocking Nuxt globally for pure logic
- mixing incompatible E2E/runtime utilities in one environment

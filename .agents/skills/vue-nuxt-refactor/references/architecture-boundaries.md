# Architecture Boundaries for Refactoring

## Component vs Composable

Move logic to a composable when it represents reusable/cohesive stateful behavior with a clear public API, not merely to shorten a component.

Keep presentation-local state in the component when extraction would add indirection without reuse/clarity.

## Utility / Helper

Do not invent a `utils` vs `helpers` distinction if the repository does not have one.

For extracted pure functions, follow existing location/naming conventions and keep domain-specific logic near its domain unless cross-domain reuse is real.

## Shared Components

Promote to shared only when:
- behavior/visual contract is stable enough
- multiple consumers share the same concept
- configuration does not become a prop explosion

Duplication of a few lines can be safer than a premature universal component.

## CSS / Tailwind

If Tailwind exists:
- follow existing utility/token conventions
- avoid converting unrelated CSS to Tailwind during a logic refactor
- do not add arbitrary values when a verified token exists
- preserve responsive/state variants

If Tailwind is absent, ignore Tailwind-specific advice.

## Dependency Direction

Prefer dependencies toward stable lower-level contracts.

Watch for:
- shared UI importing feature/domain modules
- generic utilities depending on app routes/stores
- composables that combine unrelated domains
- circular imports introduced by extraction

## SSR Boundary

Keep browser-only effects behind client lifecycle/runtime-safe guards as established by the repository.

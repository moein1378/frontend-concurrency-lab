# Routing, Security Boundaries, and Feature Flags

## Route Guards / Middleware

Test the observable contract:
- allowed path continues
- denied path redirects/blocks
- required state/session is interpreted correctly
- query/return URL handling when contractual

Use a Nuxt/router-aware environment when framework integration itself matters. Pure policy logic can be tested lower-level.

## Security / Permission UI

Frontend tests can protect:
- hidden/disabled actions
- route access behavior
- sanitized/escaped rendering behavior already owned by the frontend
- permission-state transitions

Do not treat frontend hiding as a substitute for server authorization.

Avoid writing “security tests” that assert implementation trivia without demonstrating a security-relevant behavior.

## Feature Flags

Protect:
- flag off behavior
- flag on behavior
- fallback/default state when relevant
- interaction with persisted/server-provided flag state when contractual

Do not duplicate the same flag assertion at unit/component/E2E unless each level proves a distinct integration property.

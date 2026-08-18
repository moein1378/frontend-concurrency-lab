# Browser E2E Patterns

## Authentication / Session

Prefer reusable authenticated state only when the project has a stable fixture strategy. Keep at least one focused test for the authentication flow itself if that flow is critical.

Avoid tests that depend on a human-created session or another test executing first.

## Navigation / Middleware

Assert:
- destination URL
- visible destination state
- preserved/removed query parameters only when contractual
- unauthorized behavior

## Forms / Mutations

Assert:
- user can fill/submit
- loading/disabled behavior when important
- success/failure outcome
- duplicate submission prevention when relevant

Seed/reset test data deterministically.

## Lists / Tables

Prefer content/state assertions over fragile row indexes. Use durable row/test hooks when repeated semantics cannot uniquely identify an item.

## Network

Wait on meaningful response/UI state, not arbitrary sleep.

Mock/stub network only when the goal is frontend behavior isolation. Use a real test backend when cross-service integration is the thing being tested.

## Visual

Use visual snapshots for stable appearance contracts. Keep dynamic content deterministic and mask only data that is truly irrelevant/non-deterministic.

## Failure Triage

A browser failure should be classifiable from:
- trace
- screenshot
- console
- relevant request/response
- exact test step

Do not rerun indefinitely to convert a real failure into green.

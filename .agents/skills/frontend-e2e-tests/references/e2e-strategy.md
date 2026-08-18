# E2E Strategy

## Test Data

Prefer isolated deterministic setup:
- API seed/factory
- dedicated fixture
- test account with reset
- local mock server when the purpose is frontend integration rather than backend validation

Avoid tests that depend on previous tests.

## Waiting

Wait for observable conditions:
- URL/navigation
- element state
- response/event
- loading indicator disappearance

Avoid fixed sleeps.

## Selectors

Prefer role/name/label where stable. Use test IDs for durable hooks when semantics are insufficient.

## Browser Matrix

Do not run every browser for every local edit. Use the repository's intended matrix:
- narrow local target
- broader CI matrix
- specific engine when a bug is engine-specific

## Failure Artifacts

A useful failure bundle answers:
- what page/state was visible
- what console/runtime error occurred
- which request failed
- what steps preceded the failure

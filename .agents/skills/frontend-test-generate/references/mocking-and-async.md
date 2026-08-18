# Mocking and Async

## Boundary Mocking

Good candidates:
- HTTP/client boundary
- storage
- third-party SDK
- clock/random generator
- browser API not available in the test environment

Avoid mocking:
- the implementation under test
- internal helper chains merely to make setup easy
- Vue reactivity itself

## Vitest Mock State

Use:
- `clearAllMocks` when call/history reset is enough
- `resetAllMocks` when mock implementations must reset
- `restoreAllMocks` for spies/replaced originals that should be restored

Do not claim `clearAllMocks` resets every return value/implementation.

## Async

Prefer:
- awaiting the user action
- framework flush helpers when the UI updates asynchronously
- controlled promises for race order
- fake timers only when time is the behavior

Avoid arbitrary sleeps.

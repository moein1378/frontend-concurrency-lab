# Nondeterministic Regression Strategy

Common sources:
- time/date/timezone
- random IDs
- races between requests
- duplicate submissions
- debounce/throttle
- stale async responses
- browser scheduling
- storage state
- network retries

## Make the Failure Deterministic

Control only the source responsible for nondeterminism.

Examples:
- fake/controlled clock for time-dependent logic
- explicit deferred promises for race ordering
- deterministic random source
- isolated storage state
- mock server/network boundary for retry/error sequencing

Avoid arbitrary sleeps.

## Race Test Shape

1. create two controlled operations
2. resolve them in the order that triggers the bug
3. assert the final public state
4. verify stale/duplicate work is ignored or cancelled as intended

Use mock cleanup/reset APIs according to the actual contamination risk; do not add `clearAllMocks` ritual blindly.

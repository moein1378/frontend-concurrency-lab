# Frontend Concurrency Lab — Docker Strategy

## Decision

Not required. A tiny optional Hono latency fixture may run directly with Node; Docker is intentionally avoided for the primary workflow.

## Reason for exclusion

The primary product is a browser/static/package artifact. Adding a container would duplicate the Node/Vite toolchain without improving parity, onboarding, or deployment. CI may use official service containers internally, but developers do not need Docker.

## Mandatory anti-complexity rule

A Dockerfile may be added only when it starts a real runtime service, reproduces a native dependency, or materially simplifies a multi-service workflow. It may not be added solely as portfolio decoration.

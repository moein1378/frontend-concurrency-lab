# Changelog

## 1.0.0 — 2026-08-22

- Stable teaching release with five lessons and six deterministic examples, including payment/save mutual exclusion and cross-tab ownership.
- Frozen public runtime exports for concurrency primitives, scenario engine, and timeline.
- Downloadable visible JSON traces, English guidance, keyboard timelines, responsive phone playback, and reduced-motion behavior.
- Cross-browser CI, dependency review, 200 KiB gzip JavaScript budget, Pages smoke test, failure catalog, and architecture ADRs.

Migration: no migration from 0.x is promised. The v1 public exports listed in package `src/index.ts` files are now the compatibility boundary.

Known limitation: fixture timelines teach deterministic ordering and local guarantees. They do not simulate network exactly-once delivery, server rollback, or universal performance characteristics.

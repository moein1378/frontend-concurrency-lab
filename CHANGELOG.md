# Changelog

## 1.1.0 — 2026-10-18

- Redesigned the scenario catalog and five teaching journeys with scenario illustrations, progressive explanations, live state steppers, and contextual feedback.
- Added solid light/dark guided-tour panels and accessible icon controls for previous, next, skip, and completion.
- Fixed mobile section navigation so only the selected Controls, Why?, or Result item is highlighted while preserving section scrolling.
- Expanded mobile navigation and guided-tour browser regression coverage.
- Updated repository engineering guidance, concurrency review configuration, and workspace-aware context fingerprints.
- Synchronized workspace package versions and derive the visible footer version from the app manifest.

Compatibility: public v1 package exports and deterministic fixture contracts remain unchanged; no data migration is required.

## 1.0.0 — 2026-08-22

- Stable teaching release with five lessons and six deterministic examples, including payment/save mutual exclusion and cross-tab ownership.
- Frozen public runtime exports for concurrency primitives, scenario engine, and timeline.
- Downloadable visible JSON traces, English guidance, keyboard timelines, responsive phone playback, and reduced-motion behavior.
- Cross-browser CI, dependency review, 200 KiB gzip JavaScript budget, Pages smoke test, failure catalog, and architecture ADRs.

Migration: no migration from 0.x is promised. The v1 public exports listed in package `src/index.ts` files are now the compatibility boundary.

Known limitation: fixture timelines teach deterministic ordering and local guarantees. They do not simulate network exactly-once delivery, server rollback, or universal performance characteristics.

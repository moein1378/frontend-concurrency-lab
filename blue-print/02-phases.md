# Frontend Concurrency Lab — Versioned Phase Index

> Reconciled 2026-11-14 against `19640ebd8169ce625b2a093caafc1ca2483b6a84` plus the working tree. Confidence: high for current source/configuration; historical releases and hosted deployment are unverified. Evidence: [package metadata](../package.json), [router](../apps/lab/src/router.ts), [public contracts](../tests/integration/public-contracts.test.ts), and [phase records](../docs/project/). Recheck when these inputs change.

The sequence below preserves the original runnable vertical-slice roadmap. It is now a historical map, not a directive to start Phase 1. Current root and app versions are **1.1.0**. Source implements five deterministic broken/fixed comparisons: stale search, mutual exclusion, bounded concurrency, single-flight, and cross-tab ownership.

- [`v0.1.0 — Foundation and Deterministic Harness`](phases/01-v0.1.0-foundation-and-deterministic-harness.md)
- [`v0.2.0 — Cancellation and Freshness`](phases/02-v0.2.0-cancellation-and-freshness.md)
- [`v0.3.0 — Mutual Exclusion`](phases/03-v0.3.0-mutual-exclusion.md)
- [`v0.4.0 — Bounded Concurrency`](phases/04-v0.4.0-bounded-concurrency.md)
- [`v0.5.0 — Single-flight and Deduplication`](phases/05-v0.5.0-single-flight-and-deduplication.md)
- [`v0.9.0 — Hardening and Portfolio Release Candidate`](phases/06-v0.9.0-hardening-and-portfolio-release-candidate.md)
- [`v1.0.0 — Stable Teaching Release`](phases/07-v1.0.0-stable-teaching-release.md)

## Release discipline

- `v0.1.0–v0.5.0`: original additive development milestones, with current source evidence reconciled in each phase.
- `v0.9.0`: original hardening/delivery milestone; workflow configuration exists, but successful publication requires run evidence.
- `v1.0.0`: original stable-contract milestone; current export/behavioral tests protect public package APIs. Current 1.1.0 also includes Vuetify presentation and workspace navigation refinements.
- Preserve original goals while distinguishing implemented fixture behavior, deferred real-service aspirations, and unverified release execution.
- `git tag --list` returned no local tags at reconciliation time. Package versions and old handoff claims do not prove tags or GitHub Releases exist.
- Scope future work through [agent/TASK-BRIEF.md](agent/TASK-BRIEF.md); these phase numbers are not an active work queue.

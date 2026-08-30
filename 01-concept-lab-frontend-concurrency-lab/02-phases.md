# Frontend Concurrency Lab — Versioned Phase Index

Every phase is a runnable vertical slice. Do not begin the next phase until the active phase exit criteria pass and the release tag exists.

- [`v0.1.0 — Foundation and Deterministic Harness`](phases/01-v0.1.0-foundation-and-deterministic-harness.md)
- [`v0.2.0 — Cancellation and Freshness`](phases/02-v0.2.0-cancellation-and-freshness.md)
- [`v0.3.0 — Mutual Exclusion`](phases/03-v0.3.0-mutual-exclusion.md)
- [`v0.4.0 — Bounded Concurrency`](phases/04-v0.4.0-bounded-concurrency.md)
- [`v0.5.0 — Single-flight and Deduplication`](phases/05-v0.5.0-single-flight-and-deduplication.md)
- [`v0.9.0 — Hardening and Portfolio Release Candidate`](phases/06-v0.9.0-hardening-and-portfolio-release-candidate.md)
- [`v1.0.0 — Stable Teaching Release`](phases/07-v1.0.0-stable-teaching-release.md)

## Release discipline

- `v0.1.0–v0.5.0`: additive development milestones.
- `v0.9.0`: release candidate with deployment, documentation, compatibility, and supply-chain checks.
- `v1.0.0`: stable public contract or stable portfolio product.
- Scope not listed in a phase belongs in the backlog, not the current implementation.

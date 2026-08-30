---
title: Scenario package boundaries and release hardening
type: adr
last_verified_at: 2026-08-22
confidence: high
---

# ADR 0003: Scenario package boundaries and release hardening

## Decision

Concurrency primitives stay framework-independent in `concurrency-core`. Deterministic broken/fixed orchestration and machine-readable invariants stay in `scenario-engine`. Monotonic event recording stays in `timeline`; Vue owns progressive pacing and English teaching projections.

The release candidate uses structured HTML timelines rather than canvas. Each timeline is one keyboard focus region; Up/Down moves through events, visible focus is token-driven, and all evidence remains readable without color or motion. The application shell handles timeline keyboard navigation through scoped DOM event delegation.

Production JavaScript has a 200 KiB gzip initial-shell budget enforced after build. CI installs and runs Chromium, Firefox, WebKit, plus a phone viewport. GitHub Pages deployment runs only after CI and smoke-tests a stable scenario route.

## Consequences

Scenario modules can grow independently without importing Vue into domain packages. Vue Router owns the fixed catalog and scenario route set. Browser binaries are a required CI capability; local hosts without them can still run every deterministic non-browser gate.

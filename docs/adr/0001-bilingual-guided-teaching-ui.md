# ADR 0001 — Bilingual guided teaching UI

## Status

Accepted — 2026-08-20.

## Context

The lab must teach deterministic browser-concurrency concepts to English- and Persian-speaking developers at junior, mid-level, and senior depth. Hand-rolled string switching would make fallback, interpolation, persistence, and future scenario coverage difficult to verify. A guided tour also needs focus-aware overlays, progress, teardown, and localized controls.

## Decision

- Use `vue-i18n@11.1.12` in Composition API mode inside `apps/lab`, with its matching published devtools type package available only for strict typechecking. Newer 11.2+ bundles currently import a Vue type absent from the latest Vue 3.5 release.
- Use `driver.js@1.8.0` for page-owned guided tours.
- Keep messages and tour definitions in the application package; framework-independent domain packages remain language-neutral.
- Locale changes update `html[lang]`, `html[dir]`, and a safe local-storage preference. Persian uses full document RTL while technical identifiers and timing values retain explicit LTR isolation.
- Tours are optional, restartable, keyboard operable, reduced-motion aware, and never required to access scenario behavior.

## Alternatives

- Hand-written dictionaries: rejected because it recreates fallback/interpolation/plugin behavior and scales poorly across scenarios.
- Custom tour overlay: rejected because focus, positioning, collision handling, progress, and cleanup are substantial accessibility-sensitive responsibilities.
- English-only long-form content: rejected because it does not satisfy the requested bilingual teaching contract.

## Consequences

- The application bundle gains two pinned dependencies; no domain package gains a UI dependency.
- Every new visitor-facing string and tour step must ship in both locales.
- Layout and E2E tests must cover both LTR and RTL.

## Evidence

- `apps/lab/src/i18n/`
- `apps/lab/src/tours/`
- `apps/lab/src/main.ts`
- `apps/lab/package.json`

Confidence: high. Re-evaluate on major dependency upgrades or if tours become cross-route state machines.

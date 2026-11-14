<div align="center">
  <img src="./brand/logo-filled.svg" alt="Frontend Concurrency Lab logo" width="104" height="104" />
  <h1>Frontend Concurrency Lab</h1>
  <p><strong>Concept Lab · Project 1 of 17</strong></p>
</div>

> **Stack:** Vue 3 + Vite + strict TypeScript + Vue Router + Vuetify; browser SPA.
> **Architecture:** Scenario-first modular monolith with framework-independent coordination primitives and deterministic simulators.
> **Demo:** Static GitHub Pages build with local fixtures; no service or account required.
> **Baseline:** Blueprint v4, reconciled with workspace **1.1.0** on **2026-11-14**, commit `19640ebd8169ce625b2a093caafc1ca2483b6a84` plus working-tree changes.

[Implemented repository](https://github.com/moein1378/frontend-concurrency-lab) · [Root documentation](../README.md) · [Source router](../apps/lab/src/router.ts)

## What this repository proves

- Latest-wins tokens and AbortSignal propagation protect current search intent.
- A FIFO mutex serializes local work; a separate idempotency policy deduplicates completed effects.
- A semaphore bounds active work and exposes queue/cancellation accounting.
- A single-flight registry shares active producers without making one subscriber their owner.
- A deterministic cross-tab fixture illustrates election; a browser storage adapter illustrates shared claims with explicit production limits.

## Primary surfaces

- Five-scenario catalog and five broken/fixed comparison routes.
- Scenario learning narratives, six-step Intro.js lessons, live explanation panels, and state steppers.
- Structured timelines, invariant evidence, and local visible-trace JSON downloads.
- Desktop/phone layouts, mobile section navigation, and persistent light/dark themes.

Standalone broken/fixed/timeline/tests routes and `/primitives` were original targets; they are not registered in the current router.

## Implementation navigation

- [`Complete blueprint`](01-blueprint.md)
- [`Phase index`](02-phases.md)
- [`Design tokens`](03-design-tokens.md)
- [`Dependencies and services`](04-dependencies-and-services.md)
- [`Brand system`](05-brand-system.md)
- [`Runtime and demo`](06-runtime-and-demo-strategy.md)
- [`CI/CD`](07-ci-cd-and-delivery.md)
- [`Docker`](08-docker-strategy.md)
- [`Responsive/platform`](09-responsive-and-platform-strategy.md)
- [`Repository map`](10-repository-map.md)
- [`Engineering policies`](11-engineering-policies.md)
- [`AI agent contract`](AGENTS.md)

## Current implementation rule

Read source/configuration/tests first, then use this blueprint as the structured implementation reference. Historical phase filenames preserve the original milestone sequence; they are not a queue to restart or evidence of published tags. Consult the current task brief and actual incomplete work before selecting a next step.

Preserve the numbered documents, phase history, agent contracts, architecture/runbooks, templates, and supplied brand assets. Keep actual guarantees separate from original aspirations and production guidance.

## Verification provenance

Confidence is high for source-backed facts in this revision. Evidence: [workspace manifest](../package.json), [app manifest](../apps/lab/package.json), [router](../apps/lab/src/router.ts), [learning component](../apps/lab/src/components/ScenarioLearning.vue), [shell/export](../apps/lab/src/app/App.vue), [tests](../tests/), and [workflows](../.github/workflows/). Reverify when these inputs change. Hosted availability, release publication, and remote CI results require separate evidence; this refresh does not assert them.

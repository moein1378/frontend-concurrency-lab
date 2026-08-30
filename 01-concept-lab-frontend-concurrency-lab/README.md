<div align="center">
  <img src="./brand/logo-filled.svg" alt="Frontend Concurrency Lab logo" width="104" height="104" />
  <h1>Frontend Concurrency Lab</h1>
  <p><strong>Concept Lab · Project 1 of 17</strong></p>
</div>

> **Stack:** Vue 3 + Vite + TypeScript + Tailwind CSS 4; custom lab components; no SSR  
> **Architecture:** Scenario-first modular monolith with framework-independent concurrency primitives and deterministic simulators.  
> **Demo:** GitHub Pages static demo using deterministic local simulators and MSW fixtures.

[Open the implemented Frontend Concurrency Lab repository →](https://github.com/moein1378/frontend-concurrency-lab)

## What this repository proves

- `latest-wins coordinator`
- `single-flight registry`
- `mutex`
- `semaphore`
- `abort propagation`

## Primary surfaces

- Scenario Catalog
- Scenario Detail
- Broken vs Fixed Comparison
- Event Timeline
- Primitive Playground
- Results and Invariants

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

Open the first incomplete file under `phases/`. Do not start a later phase until the current version has a clean `pnpm verify`, a release tag, and updated documentation.

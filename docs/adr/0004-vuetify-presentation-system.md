---
title: Vuetify presentation system
type: adr
last_verified_at: 2026-08-23
confidence: high
---

# ADR 0004: Vuetify presentation system

## Context/problem

The lab's application package currently implements standard controls, cards, grids,
surfaces, badges, progress, and responsive layout in a dense global stylesheet. This
duplicates responsibilities already owned by a component system and makes consistent
theme, accessibility, and responsive changes expensive.

## Decision

- Vuetify 3.13.2 is the presentation component system for `apps/lab` only. The initial
  Vuetify 4.1.11 probe was rejected because its declarations are incompatible with the
  repository's current Vue 3.5 and TypeScript 5.9 typecheck. Framework-independent
  packages must not import Vuetify or depend on its DOM.
- The existing brand, semantic status colors, surfaces, typography, and radii are mapped
  into Vuetify themes. Vuetify theme state becomes the source of truth for light/dark mode.
- Prefer Vuetify components and documented layout/spacing utilities for standard UI.
  Keep focused application CSS for the skip link, deterministic timelines, teaching-specific
  decoration and reduced-motion details that are not accurately
  represented by a standard component.
- Preserve native HTML controls where current browser automation or trace serialization
  depends on their native DOM contract until an equivalent behavior is explicitly migrated.
- Remove Tailwind after verified consumers are migrated; the app must not retain two general
  presentation systems.
- The existing 200 KiB gzip initial-JavaScript budget remains unchanged. Vuetify must be
  tree-shaken and pass the existing performance gate.

## Alternatives

- Continue expanding the global stylesheet: rejected because it retains duplicated standard
  component behavior and the maintenance problem motivating this decision.
- Use Tailwind as the primary system: rejected because the requested component-level system
  is Vuetify and current templates do not materially use Tailwind utilities.
- Remove all authored CSS: rejected because timeline visualization, skip-link behavior,
  and reduced-motion behavior are product-specific contracts.

## Consequences

- UI markup changes are app-wide and require browser verification across desktop and phone projects.
- Accessible names, landmarks, route URLs, timeline hooks, and trace-download
  format remain compatibility contracts throughout the migration.
- Generated Vuetify styles may be larger than the authored stylesheet even while maintained
  application CSS declines substantially; bundle gates judge shipped impact separately.

## Status

Accepted — 2026-08-23, by explicit project-owner request.

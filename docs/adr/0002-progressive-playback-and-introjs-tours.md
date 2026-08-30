---
title: Progressive scenario playback and Intro.js-only tours
type: adr
last_verified_at: 2026-08-25
verified_commit: 1472d0390de903fb220b6fc8693c590796374045
evidence:
  - apps/lab/src/modules/search-race/SearchRaceLab.vue
  - tests/e2e/search-race.e2e.ts
confidence: high
---

# ADR 0002: Progressive scenario playback and Intro.js-only tours

## Context/problem

Computing and rendering a completed concurrency run in one click hides the causal relationship between requests, responses, commits, discards, and the final invariant.

## Decision

- A scenario engine may compute a deterministic run eagerly, but the teaching UI must present it as progressive playback ordered by virtual timestamps.
- Each playback frame reveals all events at that timestamp. A visible `commit` must immediately update that lane's result; invariant status stays pending until its event is revealed.
- Scenario playback must offer pause/resume, replay, progress, virtual time, and speed controls. Active playback locks inputs so the trace cannot drift from its declared configuration.
- Playback controls must remain keyboard accessible, reduced-motion safe, responsive, and written in English.

## Alternatives

- Immediate final rendering was rejected because it makes learners reconstruct causality after the fact.
- Real network delays were rejected because they weaken reproducibility and make tests timing-dependent.

## Consequences

- The scenario engine stays deterministic and framework-independent; pacing remains an application presentation concern.
- Browser tests must verify at least one intermediate visible state as well as the final state.
- New scenarios need event details sufficient to derive their intermediate visible result, or an explicit presentation projection at the public package boundary.
- Intro.js remains installed for possible future work, but no tour adapter, controls, messages, selectors, or runtime imports are active in the MVP.

## Status

Accepted for progressive playback. Tour-specific decisions superseded by the MVP redesign on 2026-08-25.

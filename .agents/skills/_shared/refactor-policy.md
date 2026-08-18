# Refactor Policy

A refactor should improve a concrete property without unintentionally changing behavior.

## Diagnose with Evidence

Consider:

- cohesion: does one unit own multiple unrelated responsibilities?
- coupling: how many implementation details must change together?
- complexity: branching, state transitions, async interleaving
- side effects: are effects explicit and lifecycle-safe?
- dependency direction: is lower-level code importing higher-level concerns?
- duplication: is repeated logic truly the same concept?
- change frequency: do unrelated changes repeatedly collide?
- testability: can public behavior be verified without unnatural internal mocking?
- SSR/runtime boundaries
- public API stability

Do not use arbitrary line-count thresholds.

## Extraction Rule

Extract only when the new boundary has a coherent name, responsibility, and dependency surface.

A longer cohesive function can be better than several tiny indirections.

## Vue Reactivity

- use computed state for pure derivation
- use watchers/effects for actual side effects or synchronization
- clean up timers/listeners/subscriptions/requests created by effects
- do not manually stop every component-owned synchronous watcher by default
- computed chains are not inherently bad; judge clarity, dependency shape, and unnecessary recomputation

## Refactor Classes

- mechanical
- structural
- reactive
- architectural
- behavioral (not a pure refactor; requires explicit behavior-change authorization)

Verification strength should increase as the class moves toward architectural/behavioral.

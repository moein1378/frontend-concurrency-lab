# Refactor Verification

Scale checks to risk.

## Mechanical
- typecheck/lint
- focused tests

## Structural
- behavior contract comparison
- focused tests
- dependent-package checks if shared

## Reactive
- async/race cleanup behavior
- lifecycle behavior
- SSR/client boundary where relevant
- focused tests

## Architectural
- dependency direction
- public API compatibility
- affected package integration tests
- independent reviewer

A green build alone does not prove behavioral equivalence.

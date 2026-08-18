# Eval: Stale Project Context

Priority: P1

## Setup

`.agents/context/project.md` was generated before package/config changes.

## Task

Use project context to implement a change.

## Expected

The agent treats context as a cache, notices fingerprint/config mismatch when relevant, and refreshes/rechecks source facts.

## Unacceptable

Treating stale context as higher authority than current repository configuration.

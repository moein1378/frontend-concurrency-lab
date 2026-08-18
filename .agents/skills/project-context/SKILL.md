---
name: project-context
description: Build or refresh concise project-specific Codex context from verified repository facts, with git/config fingerprints, monorepo package boundaries, evidence paths, and stale-context detection. Use for new repositories or when context is missing/stale.
---

# Project Context

Read:
- `../_shared/skill-contract.md`
- `../_shared/repository-preflight.md`
- `references/project-context-template.md`

## Intent

Create a durable cache of project facts without embedding task state or invented architecture.

## Gather

Inspect:
- package/workspace metadata
- framework/config files
- source/package boundaries
- key architecture entry points
- existing engineering docs
- CI/test/build scripts
- existing AGENTS instructions

For monorepos, prefer:
- one repo-level overview
- package-scoped context only for packages with meaningful distinct architecture

Do not copy large source snippets.

## Evidence

Each non-obvious statement should be traceable to:
- file/path
- config
- repository documentation
- explicit user/team instruction

Mark confidence when a statement is inferred across multiple sources.

## Freshness

Use `.agents/scripts/project-fingerprint.mjs` when possible.

Persist:
- generated_at
- verified git commit
- package/config hashes
- framework versions

Treat context as stale when relevant fingerprints changed.

## Context Hygiene

Do not store:
- secrets
- credentials
- temporary task status
- transient branch-specific details unless clearly marked
- business assumptions not confirmed by source/user

## Output

Write or update `.agents/context/project.md`.

Merge valid developer-maintained notes rather than replacing them wholesale.

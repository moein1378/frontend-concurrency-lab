---
name: write-project-docs
description: Capture durable, non-obvious engineering knowledge with source provenance, last-verified commit/fingerprint, confidence, and ADR separation. Use after meaningful architecture/contract changes or when the user asks for project documentation.
---

# Write Project Docs

Read:
- `../_shared/skill-contract.md`
- `references/documentation-model.md`

## Intent

Persist knowledge that future agents/developers cannot cheaply infer from code alone.

## Write When

- a non-obvious constraint matters
- a public/internal contract changed
- an architectural decision has alternatives/tradeoffs
- a risky edge case needs preservation
- a module's behavior spans files in a way source discovery repeatedly costs time

Do not document obvious syntax or temporary task status as durable architecture.

## Provenance

Every durable document should include:
- last verified date
- git commit/fingerprint when available
- evidence paths
- confidence
- known stale-sensitive dependencies

## Separate Knowledge Types

### Context / Module Docs
“What exists and how it behaves.”

### ADR / Decision
“Why a choice was made, alternatives, consequences.”

### Runbook
“How to operate/debug/recover.”

Do not merge all three into a giant context file.

## Update / Merge

When a doc exists:
- preserve still-valid human/project notes
- update stale statements with evidence
- record superseded decisions rather than silently rewriting history
- remove duplicated content by pointing to the authoritative document

## Quality Gate

A reader should be able to distinguish:
- verified fact
- design decision
- recommendation
- unknown/stale information

# Documentation Model

Suggested locations:

```text
.agents/context/
  project.md
  testing.md
  modules/
.agents/decisions/
  ADR-0001-...
.agents/runbooks/
  ...
```

Recommended header:

```yaml
title: ...
type: context|adr|runbook
last_verified_at: ...
verified_commit: ...
evidence:
  - ...
confidence: high|medium
```

## ADR Sections

- context/problem
- decision
- alternatives
- consequences
- status
- supersedes/superseded_by

## Staleness

A document is suspect when the files/configs listed in its evidence/fingerprint changed materially.

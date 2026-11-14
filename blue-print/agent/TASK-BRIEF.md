# Active Task Brief — Frontend Concurrency Lab

> Reconciled 2026-11-14 against `19640ebd8169ce625b2a093caafc1ca2483b6a84` plus the working tree. Confidence: high for source/configuration; verification results and publication require separate evidence. Sources: [root instructions](../../AGENTS.md), [package metadata](../../package.json), [router](../../apps/lab/src/router.ts), and [repository scripts](../../package.json). Recheck when those inputs or task scope change.

## Active phase

Documentation reconciliation across `blue-print/` is recorded in [the handoff](HANDOFF.md); no historical implementation phase is active. The [phase index](../02-phases.md) preserves the original seven milestones. Current root/app metadata is 1.1.0.

## User-visible outcome

A reviewer can read the blueprint and distinguish the implemented application, original roadmap intent, current constraints, and unverified release/deployment claims without being directed to restart Phase 1.

## In scope

- Reconcile blueprint architecture, runtime, dependencies, design, delivery, platform, phase, agent, and operational guidance against current source/config/tests.
- Preserve useful goals, document headings, phase sequence, and repository-owned brand assets.
- Distinguish five deterministic fixture comparisons from real browser ownership storage, future service adapters, and publication evidence.
- Correct relative links after the user’s move into `blue-print/` and add concise provenance.

## Out of scope

- Application changes, new scenarios, dependencies, or architectural redesign.
- Creating tags, publishing releases, deployment, external writes, or asserting historical checks passed.
- Reverting the user’s staged blueprint rename or existing ESLint change.

## Acceptance tests

- Inspect current scripts, source, tests, package versions, local tags, and applicable engineering constraints.
- Check blueprint relative links and stale factual claims; inspect the documentation diff and `git diff --check`.
- Run the parent task’s selected repository checks and record only actual results in [HANDOFF.md](HANDOFF.md). The checklist records observed documentation results; the handoff separately records the failed WebKit launch gate.
- Existing browser tests describe the application contract; documentation edits do not establish fresh browser results by themselves.

## Files expected to change

- Markdown and reference templates under `blue-print/` as required by source reconciliation.
- No production source/config edits are requested by this documentation task.

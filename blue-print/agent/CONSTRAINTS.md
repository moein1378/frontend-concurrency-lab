# Agent Constraints — Frontend Concurrency Lab

> Reconciled 2026-11-14 against `19640ebd8169ce625b2a093caafc1ca2483b6a84` plus the working tree. Confidence: high for source/configuration; verification results and publication require separate evidence. Sources: [root instructions](../../AGENTS.md), [package metadata](../../package.json), [router](../../apps/lab/src/router.ts), and [repository scripts](../../package.json). Recheck when those inputs or task scope change.

- Follow the root [AGENTS.md](../../AGENTS.md) and source-backed [repository map](../10-repository-map.md); current source/config/tests are authoritative when blueprint history drifts.
- Keep Vue/Vuetify presentation in `apps/lab`; packages remain framework-independent and are consumed through public exports.
- Do not add dependencies for documentation reconciliation. Future additions need a concrete capability gap, installed-version inspection, and justified cost.
- Preserve deterministic fixture operation: no runtime provider, backend, MSW layer, Hono service, or paid account is required.
- Preserve documented cancellation, freshness, FIFO ownership, permit accounting, promise cleanup, and event-order contracts. Do not turn fixture guarantees into production distributed-system claims.
- Distinguish the lower-ID cross-tab fixture election from the page’s non-atomic localStorage claim and storage-event observation. Neither provides leases, fencing, or crash recovery.
- Use existing Vuetify semantic themes and application CSS tokens. Preserve keyboard navigation, focus/skip behavior, English left-to-right language, reduced motion, persistent themes, and phone single-column usability.
- Search has timed playback with pause/resume; mutex, uploads, and single-flight reveal events manually; cross-tab renders its completed fixture trace. Do not claim identical controls across all scenarios.
- Preserve reproducible repository commands. Seed/reset/codegen currently print informational messages and do not restore external state.
- Preserve unrelated user edits and staged renames. Do not create tags, publish, deploy, send messages externally, or change production data without authorization.
- Record material architecture decisions in root `docs/adr/` when needed. Routine authorized edits do not require an additional ceremonial approval.
- Report checks actually run separately from configured coverage, historical records, and recommended release checks.

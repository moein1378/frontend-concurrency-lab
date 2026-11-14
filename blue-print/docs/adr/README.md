# Architecture Decision Records

Accepted decisions live in the [root ADR directory](../../../docs/adr/). This blueprint directory is a navigation/reference entry, not a separate decision history.

- [0002 — Progressive playback and Intro.js](../../../docs/adr/0002-progressive-playback-and-introjs-tours.md): progressive search playback remains implemented. Its statement that tours are inactive is stale relative to current `ScenarioLearning.vue`, which imports Intro.js and renders a six-step guided lesson.
- [0003 — Scenario boundaries and release hardening](../../../docs/adr/0003-scenario-boundaries-and-release-hardening.md): package ownership, HTML timelines, browser projects, and 200 KiB gzip initial-JS budget. Consult current workflows for manual dispatch and artifact behavior rather than inferring deployment is always tied to a verified SHA.
- [0004 — Vuetify presentation](../../../docs/adr/0004-vuetify-presentation-system.md): Vuetify 3.13.2 owns standard presentation, semantic themes, and explicitly registered components; preserve teaching CSS/native control contracts.

Use numbered files for new material decisions. Preserve accepted history and record supersession explicitly. Do not silently turn historical prose into current implementation evidence. The original blueprint's Tailwind execution profile is superseded by the Vuetify implementation/decision.

Verified 2026-11-14 at `19640ebd8169ce625b2a093caafc1ca2483b6a84` plus working-tree changes; confidence high for this index and source comparison. Evidence: linked ADRs, [current tour implementation](../../../apps/lab/src/components/ScenarioLearning.vue), and [workflows](../../../.github/workflows/). Recheck when accepted decisions or the referenced runtime behavior changes.

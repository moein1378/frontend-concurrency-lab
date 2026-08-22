# Handoff — Phase 2 cancellation and freshness

## Changed capabilities

- Added synchronized broken-versus-fixed search comparison with shared seed, request timing, and ordering controls.
- Added fixed cancellation using AbortController propagation and fixed freshness using monotonic latest-wins tokens.
- Extended the event model with abort and discard evidence.
- Added the semaphore public primitive and strengthened latest-wins tests while retaining single-flight and mutex responsibilities.
- Fixed CI setup ordering so pnpm exists before setup-node initializes its pnpm cache.
- Added English/Persian localization, persistent language selection, full-document RTL/LTR direction, and localized dynamic timeline evidence.
- Expanded the catalog and stale-search scenario with learning outcomes, prerequisite and mental-model guidance, glossary, invariant explanation, trade-offs, decision guidance, experience-level takeaways, and limitations.
- Replaced Driver.js with localized Intro.js tours for both the catalog and scenario workflow.
- Replaced atomic result rendering with deterministic progressive playback: each virtual-time frame reveals trace events and commit-driven visible results, with pause/resume, replay, speed, progress, and input locking.

## Decisions

- Cancellation remains a deterministic virtual-time browser-platform simulation; no network fixture or service is required.
- Both fixed strategies share one comparison surface so a reviewer can inspect the trade-off without controls drifting between runs.
- The existing broken detail URL remains compatible and renders the comparison; the catalog now links to `/scenario/search-race/compare`.
- Deterministic domain runs remain synchronous; real-time pacing is an application-layer projection so domain tests stay fast and exact. See ADR 0002.

## Verification

- Required release command: `pnpm verify`.
- Reviewer flow: catalog → synchronized comparison → cancellation abort → freshness discard → both fixed invariants pass.
- Verified locally after the playback enhancement: lint, architecture check, typecheck, 20 unit/integration tests, and production build pass.
- Documented exception: Playwright reached its web server but no Linux Chrome was installed. The pinned browser CDN returned a regional HTTP 403, so the six browser journeys (including progressive intermediate-state coverage) remain implemented but unexecuted locally. CI's stable Chrome channel is unchanged.

## Limitations

- No real fetch adapter, retry/timeout policy, persisted state, public deployment, or later-phase scenario is included.
- Abort prevents the superseded simulated response entirely; freshness allows it to arrive and records its discard.

## Next safe step

Start Phase 3 by adding the double-submit/shared-resource mutual-exclusion vertical slice without changing the Phase 2 search contracts.

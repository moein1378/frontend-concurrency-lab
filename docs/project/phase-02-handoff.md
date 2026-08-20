# Handoff — Phase 2 cancellation and freshness

## Changed capabilities

- Added synchronized broken-versus-fixed search comparison with shared seed, request timing, and ordering controls.
- Added fixed cancellation using AbortController propagation and fixed freshness using monotonic latest-wins tokens.
- Extended the event model with abort and discard evidence.
- Added the semaphore public primitive and strengthened latest-wins tests while retaining single-flight and mutex responsibilities.
- Fixed CI setup ordering so pnpm exists before setup-node initializes its pnpm cache.

## Decisions

- Cancellation remains a deterministic virtual-time browser-platform simulation; no network fixture or service is required.
- Both fixed strategies share one comparison surface so a reviewer can inspect the trade-off without controls drifting between runs.
- The existing broken detail URL remains compatible and renders the comparison; the catalog now links to `/scenario/search-race/compare`.

## Verification

- Required release command: `pnpm verify`.
- Reviewer flow: catalog → synchronized comparison → cancellation abort → freshness discard → both fixed invariants pass.
- Verified locally: lint, architecture check, typecheck, 18 unit/integration tests, and production build pass.
- Documented exception: Playwright reached its web server but no Linux Chrome was installed. The pinned browser CDN returned a regional HTTP 403 and the alternate mirror timed out, so the three browser journeys remain implemented but unexecuted locally. CI's stable Chrome channel is unchanged.

## Limitations

- No real fetch adapter, retry/timeout policy, persisted state, public deployment, or later-phase scenario is included.
- Abort prevents the superseded simulated response entirely; freshness allows it to arrive and records its discard.

## Next safe step

Start Phase 3 by adding the double-submit/shared-resource mutual-exclusion vertical slice without changing the Phase 2 search contracts.

<div align="center">
  <img src="./brand/logo-filled.svg" alt="Frontend Concurrency Lab logo" width="104" height="104" />
  <h1>Frontend Concurrency Lab</h1>
  <p><strong>Interactive race conditions, cancellation, and ordering guarantees in the browser.</strong></p>
</div>

> **Concept in one sentence:** A deterministic teaching lab that makes stale frontend writes visible before showing the coordination mechanism that prevents them.

**Engineering thesis:** Make concurrency failures visible before presenting the mechanism that prevents them.

[Live Demo](https://moein1378.github.io/frontend-concurrency-lab/) · [Scenario Index](https://moein1378.github.io/frontend-concurrency-lab/scenarios) · [Architecture](./docs/architecture/system-context.md) · [Tests](./tests/)

| Release | Reproducibility | Protected invariant |
| --- | --- | --- |
| **v0.3.0 · Phase 3** | Seeded local fixture; no network | Fresh search wins; one mutation owns a critical section and creates at most one effect |

The complete interface and guided tours are available in **English and Persian (فارسی)**. Changing language updates content, accessibility metadata, and the full LTR/RTL layout immediately; the preference is retained in the browser.

## The failure in one minute

A user searches for `ca`, then quickly searches for `cat`. The newer `cat` response arrives first, but the older `ca` response arrives last and overwrites the visible results. Both responses are individually valid; committing them in completion order violates **latest query wins**.

The second lesson submits a payment-like action or save form twice. The broken lane admits both attempts at once and can create two effects. The fixed lane queues ownership through a FIFO mutex, deduplicates the repeated intent, and visibly releases the lock after success, failure, timeout, or cancellation. This is a local serialization guarantee—not a claim that a network effect happens exactly once.

## Reproduce it

1. Open the [interactive lab](https://moein1378.github.io/frontend-concurrency-lab/scenario/search-race/compare).
2. Keep **Older “ca” arrives last** selected.
3. Choose **Cancel superseded** or **Discard stale**.
4. Run the live comparison. Follow each virtual-time step, pause when needed, and watch each commit update its lane before the invariant is evaluated.

Both lanes receive the same seed, queries, issue times, and latencies. The broken lane commits `ca`; the fixed lane preserves `cat`.

## Broken implementation

The [broken runner](./packages/scenario-engine/src/application/run-broken-search-race.ts) commits every response. It has no cancellation propagation and no freshness check before the state write.

## Observable failure

| Time | Broken lane | Fixed lane |
| ---: | --- | --- |
| `0ms` | Request `ca` | Request `ca` |
| `40ms` | Request `cat` | Request `cat`; abort `ca` when cancellation is selected |
| `220ms` | Commit `cat` | Commit `cat` |
| `600ms` | Commit stale `ca` | Discard stale `ca` when freshness is selected |
| final | **Invariant violated** | **Invariant held** |

The UI progressively renders request, abort, response, commit, discard, and invariant events as structured text. Playback exposes virtual time, progress, pause/resume, replay, and speed controls, so learners can inspect intermediate results without depending on color or animation.

Use **Guided tour** from the header or experiment panel for a localized Intro.js walkthrough. The scenario tour starts deterministic playback, then explains controls, strategies, intermediate outcomes, and the live timeline in context.

## Correct implementations

The [fixed runner](./packages/scenario-engine/src/application/run-fixed-search-race.ts) exposes two strategies:

- **Cancel superseded:** `AbortController` propagates an aborted signal when a newer operation starts, preventing obsolete work from responding.
- **Discard stale:** a monotonic latest-wins token allows both responses to arrive but rejects the obsolete response before commit.

The comparison is orchestrated by [run-search-race-comparison.ts](./packages/scenario-engine/src/application/run-search-race-comparison.ts), which locks both lanes to identical deterministic inputs.

## Invariants

- The visible results must belong to the latest issued query.
- Broken and fixed runs must use the same seed and request configuration.
- Timeline sequence IDs remain monotonic even when timestamps collide.
- A cancelled or stale operation cannot commit visible state.

## Tests

- Unit tests cover latest-wins tokens, abort propagation, semaphore bounds, deterministic time, and event kinds.
- Integration tests prove both fixed strategies preserve `cat` while the broken lane commits `ca`.
- Playwright covers cancellation, freshness discard, and the non-failing in-order control.
- `pnpm verify` runs lint, architecture boundaries, type checks, unit/integration tests, browser tests, and the production build.

## Trade-offs

- Cancellation avoids unnecessary completion work but requires AbortSignal support through every async layer.
- Freshness guards work even when a transport cannot cancel, but obsolete work still consumes resources.
- Combining both can be appropriate in production; the lab keeps them separate so each guarantee remains observable.

## When not to use these patterns

- Do not use latest-wins for operations where every result must be committed, such as an ordered mutation log.
- Do not describe cancellation as a rollback: aborting a client wait cannot undo a server-side effect that already occurred.
- Use mutual exclusion, idempotency, bounded concurrency, or single-flight when the protected invariant is not freshness.

## Run locally

Requires Node.js 24 and Corepack.

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm seed
pnpm dev
```

Open `http://localhost:4173/scenarios`. Fixture mode is local, deterministic, and requires no paid service, account, secret, or live network request.

## Project shape

```text
apps/lab/          Vue application and comparison UI
packages/          Concurrency primitives, scenario engine, and timeline
brand/             Repository-owned logo and favicon assets
docs/              Architecture, phase records, and runbooks
scripts/           Architecture, seed, reset, and verification commands
tests/             Cross-package integration and Playwright journeys
```

## Known limitations

- Cancellation uses the browser `AbortController`/`AbortSignal` contract on deterministic virtual time; no real transport adapter is active yet.
- The current public slice contains one search-race scenario; mutex, bounded-concurrency, single-flight, and cross-tab scenarios belong to later phases.
- Phone mode presents comparison lanes and timelines sequentially rather than side by side.

## Related concepts

- Request cancellation and cooperative abort propagation
- Optimistic concurrency and monotonic version checks
- Single-flight request coalescing
- Mutual exclusion and bounded concurrency
- Idempotent mutation handling

## References

- [MDN: AbortController](https://developer.mozilla.org/docs/Web/API/AbortController)
- [MDN: AbortSignal](https://developer.mozilla.org/docs/Web/API/AbortSignal)
- [Architecture boundaries](./docs/architecture/module-boundaries.md)
- [Phase 2 brief](./docs/project/phase-02-brief.md)
- [Phase 2 handoff](./docs/project/phase-02-handoff.md)

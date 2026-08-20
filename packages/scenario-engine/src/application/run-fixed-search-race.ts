import { LatestWinsCoordinator } from '@concurrency-lab/concurrency-core'
import { DeterministicClock, EventLog } from '@concurrency-lab/timeline'
import { createSearchRequests, resultFor, type SearchRaceOptions } from '../domain/search-fixture'
import type { SearchProtectionStrategy, SearchRaceRun, SearchResult } from '../domain/scenario'

export interface FixedSearchOptions extends SearchRaceOptions {
  strategy: SearchProtectionStrategy
}

export function runFixedSearchRace(options: FixedSearchOptions): SearchRaceRun {
  const requests = createSearchRequests(options)
  const clock = new DeterministicClock()
  const log = new EventLog(clock)
  const coordinator = new LatestWinsCoordinator()
  const operations = requests.map((request) => {
    clock.advanceTo(request.issuedAt)
    const operation = options.strategy === 'abort'
      ? coordinator.start()
      : { token: coordinator.issue(), signal: null }
    if (operation.signal) {
      operation.signal.addEventListener('abort', () => {
        log.record('abort', `Request “${request.query}” aborted`, {
          requestId: request.id,
          reason: String(operation.signal?.reason),
        })
      }, { once: true })
    }
    log.record('request', `Request “${request.query}” issued`, request)
    return { request, ...operation, completedAt: request.issuedAt + request.latency }
  })

  let committed: SearchResult = { query: '', items: [] }
  const completions = [...operations]
    .sort((left, right) => left.completedAt - right.completedAt || left.request.id.localeCompare(right.request.id))

  for (const completion of completions) {
    if (completion.signal?.aborted) continue
    clock.advanceTo(completion.completedAt)
    const result = resultFor(completion.request.query)
    log.record('response', `Response “${result.query}” arrived`, { requestId: completion.request.id })
    if (!coordinator.isLatest(completion.token)) {
      log.record('discard', `Stale response “${result.query}” discarded`, {
        requestId: completion.request.id,
        query: result.query,
      })
      continue
    }
    committed = result
    log.record('commit', `Results replaced by “${result.query}”`, { query: result.query })
  }

  const expected = resultFor(requests.at(-1)?.query ?? '')
  const passed = committed.query === expected.query
  log.record('invariant', passed ? 'Latest query preserved' : 'Latest query was overwritten', {
    expected: expected.query,
    actual: committed.query,
  })

  return {
    seed: options.seed,
    variant: 'fixed',
    protection: options.strategy,
    requests,
    committed,
    expected,
    invariant: {
      id: 'latest-query-wins',
      statement: 'The visible results must belong to the latest issued query.',
      passed,
    },
    events: log.all(),
  }
}

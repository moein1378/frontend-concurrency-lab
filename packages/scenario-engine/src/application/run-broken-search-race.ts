import { DeterministicClock, EventLog } from '@concurrency-lab/timeline'
import { createSearchRequests, resultFor, type SearchRaceOptions } from '../domain/search-fixture'
import type { SearchRaceRun, SearchResult } from '../domain/scenario'

export type BrokenSearchOptions = SearchRaceOptions

export function runBrokenSearchRace(options: BrokenSearchOptions): SearchRaceRun {
  const requests = createSearchRequests(options)
  const clock = new DeterministicClock()
  const log = new EventLog(clock)
  for (const request of requests) {
    clock.advanceTo(request.issuedAt)
    log.record('request', `Request “${request.query}” issued`, request)
  }

  let committed: SearchResult = { query: '', items: [] }
  const completions = requests
    .map((request) => ({ request, completedAt: request.issuedAt + request.latency }))
    .sort((left, right) => left.completedAt - right.completedAt || left.request.id.localeCompare(right.request.id))

  for (const completion of completions) {
    clock.advanceTo(completion.completedAt)
    const result = resultFor(completion.request.query)
    log.record('response', `Response “${result.query}” arrived`, { requestId: completion.request.id })
    committed = result
    log.record('commit', `Results replaced by “${result.query}”`, result)
  }

  const expected = resultFor(requests.at(-1)?.query ?? '')
  const passed = committed.query === expected.query
  log.record('invariant', passed ? 'Latest query preserved' : 'Latest query was overwritten', {
    expected: expected.query,
    actual: committed.query,
  })

  return {
    seed: options.seed,
    variant: 'broken',
    protection: 'none',
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

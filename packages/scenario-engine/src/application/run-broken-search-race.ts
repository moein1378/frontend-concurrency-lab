import { DeterministicClock, EventLog } from '@concurrency-lab/timeline'
import { SeededLatencyGenerator } from '../domain/seeded-latency'
import type { SearchRaceRun, SearchRequest, SearchResult } from '../domain/scenario'

const catalog: Record<string, readonly string[]> = {
  ca: ['Camera', 'Canvas', 'Cache'],
  cat: ['Cat', 'Catamaran', 'Catalogue'],
}

export interface BrokenSearchOptions {
  seed: string
  firstQuery?: string
  secondQuery?: string
  firstLatency?: number
  secondLatency?: number
}

export function runBrokenSearchRace(options: BrokenSearchOptions): SearchRaceRun {
  const firstQuery = options.firstQuery ?? 'ca'
  const secondQuery = options.secondQuery ?? 'cat'
  const latency = new SeededLatencyGenerator(options.seed)
  const requests: SearchRequest[] = [
    { id: 'request-1', query: firstQuery, latency: options.firstLatency ?? latency.next(), issuedAt: 0 },
    { id: 'request-2', query: secondQuery, latency: options.secondLatency ?? latency.next(), issuedAt: 40 },
  ]
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
    const result = { query: completion.request.query, items: catalog[completion.request.query] ?? [] }
    log.record('response', `Response “${result.query}” arrived`, { requestId: completion.request.id })
    committed = result
    log.record('commit', `Results replaced by “${result.query}”`, { query: result.query })
  }

  const expected = { query: secondQuery, items: catalog[secondQuery] ?? [] }
  const passed = committed.query === expected.query
  log.record('invariant', passed ? 'Latest query preserved' : 'Latest query was overwritten', {
    expected: expected.query,
    actual: committed.query,
  })

  return {
    seed: options.seed,
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

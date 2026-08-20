export interface SearchRequest {
  id: string
  query: string
  latency: number
  issuedAt: number
}

export interface SearchResult {
  query: string
  items: readonly string[]
}

export interface SearchRaceRun {
  seed: string
  variant: 'broken' | 'fixed'
  protection: 'none' | SearchProtectionStrategy
  requests: readonly SearchRequest[]
  committed: SearchResult
  expected: SearchResult
  invariant: {
    id: 'latest-query-wins'
    statement: string
    passed: boolean
  }
  events: readonly import('@concurrency-lab/timeline').TimelineEvent[]
}

export type SearchProtectionStrategy = 'abort' | 'freshness'

export interface SearchRaceComparison {
  seed: string
  strategy: SearchProtectionStrategy
  broken: SearchRaceRun
  fixed: SearchRaceRun
}

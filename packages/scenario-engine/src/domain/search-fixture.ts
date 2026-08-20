import { SeededLatencyGenerator } from './seeded-latency'
import type { SearchRequest, SearchResult } from './scenario'

const catalog: Record<string, readonly string[]> = {
  ca: ['Camera', 'Canvas', 'Cache'],
  cat: ['Cat', 'Catamaran', 'Catalogue'],
}

export interface SearchRaceOptions {
  seed: string
  firstQuery?: string
  secondQuery?: string
  firstLatency?: number
  secondLatency?: number
}

export function createSearchRequests(options: SearchRaceOptions): readonly SearchRequest[] {
  const latency = new SeededLatencyGenerator(options.seed)
  return [
    { id: 'request-1', query: options.firstQuery ?? 'ca', latency: options.firstLatency ?? latency.next(), issuedAt: 0 },
    { id: 'request-2', query: options.secondQuery ?? 'cat', latency: options.secondLatency ?? latency.next(), issuedAt: 40 },
  ]
}

export function resultFor(query: string): SearchResult {
  return { query, items: catalog[query] ?? [] }
}

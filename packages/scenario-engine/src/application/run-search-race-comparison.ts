import type { SearchRaceOptions } from '../domain/search-fixture'
import type { SearchProtectionStrategy, SearchRaceComparison } from '../domain/scenario'
import { runBrokenSearchRace } from './run-broken-search-race'
import { runFixedSearchRace } from './run-fixed-search-race'

export interface SearchRaceComparisonOptions extends SearchRaceOptions {
  strategy: SearchProtectionStrategy
}

export function runSearchRaceComparison(options: SearchRaceComparisonOptions): SearchRaceComparison {
  const broken = runBrokenSearchRace(options)
  const fixed = runFixedSearchRace(options)
  return { seed: options.seed, strategy: options.strategy, broken, fixed }
}

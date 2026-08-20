import { describe, expect, it } from 'vitest'
import { runBrokenSearchRace, runSearchRaceComparison } from '@concurrency-lab/scenario-engine'

describe('phase 1 deterministic harness', () => {
  it('connects request ordering, commits, and invariant evaluation', () => {
    const run = runBrokenSearchRace({ seed: 'integration', firstLatency: 600, secondLatency: 180 })
    expect(run.events.filter((event) => event.kind === 'request')).toHaveLength(2)
    expect(run.events.filter((event) => event.kind === 'commit').map((event) => event.detail)).toEqual([
      { query: 'cat' },
      { query: 'ca' },
    ])
    expect(run.invariant).toMatchObject({ id: 'latest-query-wins', passed: false })
  })
})

describe('phase 2 protected comparison', () => {
  it.each(['abort', 'freshness'] as const)('protects latest-query-wins with %s', (strategy) => {
    const comparison = runSearchRaceComparison({ seed: 'integration', strategy, firstLatency: 600, secondLatency: 180 })
    expect(comparison.broken.committed.query).toBe('ca')
    expect(comparison.fixed.committed.query).toBe('cat')
    expect(comparison.broken.requests).toEqual(comparison.fixed.requests)
    expect(comparison.fixed.invariant).toMatchObject({ id: 'latest-query-wins', passed: true })
  })
})

import { describe, expect, it } from 'vitest'
import { runBrokenSearchRace } from '@concurrency-lab/scenario-engine'

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

import { describe, expect, it } from 'vitest'
import { SeededLatencyGenerator } from '../domain/seeded-latency'
import { runBrokenSearchRace } from './run-broken-search-race'

describe('search race scenario', () => {
  it('replays the same latency sequence for the same seed', () => {
    const first = new SeededLatencyGenerator('concurrency-v1')
    const second = new SeededLatencyGenerator('concurrency-v1')
    expect([first.next(), first.next(), first.next()]).toEqual([second.next(), second.next(), second.next()])
  })

  it('demonstrates a stale response overwriting the latest query', () => {
    const run = runBrokenSearchRace({ seed: 'review', firstLatency: 600, secondLatency: 180 })
    expect(run.expected.query).toBe('cat')
    expect(run.committed.query).toBe('ca')
    expect(run.invariant.passed).toBe(false)
    expect(run.events.map((event) => event.sequence)).toEqual([1, 2, 3, 4, 5, 6, 7])
  })

  it('reports a passing run when responses preserve issue order', () => {
    const run = runBrokenSearchRace({ seed: 'review', firstLatency: 100, secondLatency: 500 })
    expect(run.committed.query).toBe('cat')
    expect(run.invariant.passed).toBe(true)
  })
})

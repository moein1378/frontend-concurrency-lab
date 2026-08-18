import { describe, expect, it } from 'vitest'
import { DeterministicClock } from './clock'
import { EventLog } from './event-log'

describe('deterministic timeline', () => {
  it('keeps sequence IDs monotonic when timestamps collide', () => {
    const clock = new DeterministicClock(10)
    const log = new EventLog(clock)
    log.record('request', 'first', {})
    log.record('request', 'second', {})
    expect(log.all().map(({ sequence, timestamp }) => [sequence, timestamp])).toEqual([[1, 10], [2, 10]])
  })

  it('rejects backwards time', () => {
    const clock = new DeterministicClock(10)
    expect(() => clock.advanceTo(9)).toThrow('cannot move backwards')
  })
})

import { describe, expect, it } from 'vitest'
import { LatestWinsCoordinator } from './latest-wins'
import { Mutex } from './mutex'
import { SingleFlightRegistry } from './single-flight'

describe('phase 1 concurrency primitives', () => {
  it('identifies only the newest issued token', () => {
    const coordinator = new LatestWinsCoordinator()
    const first = coordinator.issue()
    const second = coordinator.issue()
    expect(coordinator.isLatest(first)).toBe(false)
    expect(coordinator.isLatest(second)).toBe(true)
  })

  it('coalesces concurrent work by key', async () => {
    const registry = new SingleFlightRegistry()
    let calls = 0
    const operation = async () => ++calls
    const [first, second] = await Promise.all([registry.run('search', operation), registry.run('search', operation)])
    expect([first, second, calls]).toEqual([1, 1, 1])
  })

  it('serializes critical sections', async () => {
    const mutex = new Mutex()
    const order: string[] = []
    const first = mutex.runExclusive(async () => { order.push('first:start'); await Promise.resolve(); order.push('first:end') })
    const second = mutex.runExclusive(() => { order.push('second') })
    await Promise.all([first, second])
    expect(order).toEqual(['first:start', 'first:end', 'second'])
  })
})

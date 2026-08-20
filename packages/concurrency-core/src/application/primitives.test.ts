import { describe, expect, it } from 'vitest'
import { LatestWinsCoordinator } from './latest-wins'
import { Mutex } from './mutex'
import { Semaphore } from './semaphore'
import { SingleFlightRegistry } from './single-flight'

describe('phase 1 concurrency primitives', () => {
  it('identifies only the newest issued token', () => {
    const coordinator = new LatestWinsCoordinator()
    const first = coordinator.issue()
    const second = coordinator.issue()
    expect(coordinator.isLatest(first)).toBe(false)
    expect(coordinator.isLatest(second)).toBe(true)
  })

  it('aborts the previous latest operation and propagates its signal', () => {
    const coordinator = new LatestWinsCoordinator()
    const first = coordinator.start()
    const second = coordinator.start()
    expect(first.signal.aborted).toBe(true)
    expect(first.signal.reason).toBe('Superseded by a newer operation')
    expect(second.signal.aborted).toBe(false)
    expect(coordinator.isLatest(second.token)).toBe(true)
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

  it('bounds active work with a semaphore', async () => {
    const semaphore = new Semaphore(2)
    let active = 0
    let peak = 0
    const releases: Array<() => void> = []
    const operation = () => semaphore.run(async () => {
      active += 1
      peak = Math.max(peak, active)
      await new Promise<void>((resolve) => releases.push(resolve))
      active -= 1
    })
    const runs = [operation(), operation(), operation()]
    await Promise.resolve()
    expect([active, peak]).toEqual([2, 2])
    releases.shift()?.()
    await runs[0]
    await Promise.resolve()
    expect(active).toBe(2)
    releases.splice(0).forEach((release) => release())
    await Promise.all(runs)
  })

  it('rejects invalid semaphore capacities', () => {
    expect(() => new Semaphore(0)).toThrow('positive integer')
  })
})

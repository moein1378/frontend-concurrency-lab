import { DeterministicClock, EventLog } from '@concurrency-lab/timeline'; import type { SingleFlightComparison, SingleFlightRun } from '../domain/single-flight'
export interface SingleFlightOptions { seed: string; resourceId: string; subscribers: number; cancelSubscriber?: number; failFirst?: boolean; staleWhileRefresh?: boolean }
function run(variant: 'broken' | 'fixed', options: SingleFlightOptions): SingleFlightRun {
  const clock = new DeterministicClock(); const log = new EventLog(clock); const key = `profile:${options.resourceId.trim().toLowerCase()}`; const cancelled = options.cancelSubscriber && options.cancelSubscriber <= options.subscribers ? 1 : 0
  for (let i = 1; i <= options.subscribers; i++) log.record('request', `Subscriber ${i} requested ${key}`, { subscriber: i, key })
  const concurrentCalls = variant === 'broken' ? options.subscribers : 1
  if (variant === 'fixed') for (let i = 2; i <= options.subscribers; i++) log.record('queued', `Subscriber ${i} joined the in-flight promise`, { subscriber: i, key })
  if (options.cancelSubscriber) log.record('cancel', `Subscriber ${options.cancelSubscriber} stopped listening; producer ownership stayed shared`, { subscriber: options.cancelSubscriber, key })
  const staleShown = Boolean(options.staleWhileRefresh); if (staleShown) log.record('commit', 'Cached stale value shown while refresh remains in flight', { key, stale: true, source: 'cache' })
  clock.advanceBy(180)
  let producerCalls = concurrentCalls
  if (options.failFirst) { log.record('fail', 'In-flight producer rejected; registry entry was removed', { key }); clock.advanceBy(20); log.record('request', 'A later caller retried after rejection cleanup', { key, retry: true }); producerCalls += 1; clock.advanceBy(180); log.record('response', 'Retry producer completed', { key, attempt: 2 }) } else log.record('response', `${concurrentCalls} concurrent producer call${concurrentCalls === 1 ? '' : 's'} completed`, { key, concurrentCalls })
  const delivered = options.subscribers - cancelled; log.record('commit', `Fresh result fanned out to ${delivered} active subscribers`, { key, delivered, stale: false })
  const passed = variant === 'fixed'; log.record('invariant', passed ? 'At most one producer ran at a time for the key' : 'Duplicate callers started concurrent producers', { key, concurrentCalls, producerCalls, delivered })
  return { variant, producerCalls, subscribers: options.subscribers, delivered, staleShown, invariant: { passed, statement: 'At most one producer may run per normalized in-flight key; subscriber cancellation does not cancel shared ownership.' }, events: log.all() }
}
export function runSingleFlightComparison(options: SingleFlightOptions): SingleFlightComparison { if (options.subscribers < 2) throw new RangeError('At least two subscribers are required'); const key = `profile:${options.resourceId.trim().toLowerCase()}`; return { key, broken: run('broken', options), fixed: run('fixed', options) } }

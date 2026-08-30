import { DeterministicClock, EventLog } from '@concurrency-lab/timeline'
import type { MutationExample, MutationOutcome, MutualExclusionComparison, MutualExclusionRun } from '../domain/mutual-exclusion'

export interface MutualExclusionOptions { seed: string; example: MutationExample; outcome: MutationOutcome }

function run(variant: 'broken' | 'fixed', options: MutualExclusionOptions): MutualExclusionRun {
  const clock = new DeterministicClock()
  const log = new EventLog(clock)
  const label = options.example === 'payment' ? 'payment' : 'save'
  log.record('request', `First ${label} submitted`, { attempt: 1 })
  clock.advanceBy(20)
  log.record('request', `Second ${label} submitted`, { attempt: 2 })
  let effects = 0
  let peakCriticalSections: number

  if (variant === 'broken') {
    log.record('enter', 'First attempt entered the critical section', { attempt: 1, active: 1 })
    log.record('enter', 'Second attempt entered before the first released', { attempt: 2, active: 2 })
    peakCriticalSections = 2
    clock.advanceBy(100)
    effects = options.outcome === 'success' ? 2 : 1
    log.record(options.outcome === 'success' ? 'commit' : options.outcome === 'failure' ? 'fail' : options.outcome === 'timeout' ? 'timeout' : 'cancel', `First attempt ended with ${options.outcome}`, { attempt: 1 })
    log.record('commit', 'Unprotected second attempt produced another effect', { attempt: 2 })
  } else {
    log.record('acquire', 'First attempt acquired the mutex', { attempt: 1, owner: 1 })
    log.record('enter', 'First attempt entered the critical section', { attempt: 1, active: 1 })
    log.record('queued', 'Second attempt is waiting for the mutex', { attempt: 2, queueDepth: 1 })
    peakCriticalSections = 1
    clock.advanceBy(100)
    const ending = options.outcome === 'success' ? 'commit' : options.outcome === 'failure' ? 'fail' : options.outcome === 'timeout' ? 'timeout' : 'cancel'
    if (options.outcome === 'success') effects = 1
    log.record(ending, `First attempt ended with ${options.outcome}`, { attempt: 1 })
    log.record('release', 'Mutex released in finally', { attempt: 1, queueDepth: 1 })
    log.record('acquire', 'Second attempt acquired the released mutex', { attempt: 2, owner: 2 })
    if (options.outcome !== 'success') {
      effects = 1
      log.record('commit', 'Queued attempt completed after recovery', { attempt: 2 })
    } else {
      log.record('discard', 'A separate idempotency-key policy deduplicated the second effect', { attempt: 2, idempotencyKey: `${options.seed}:${label}:intent-1` })
    }
    log.record('release', 'Second attempt released the mutex', { attempt: 2, queueDepth: 0 })
  }
  const passed = peakCriticalSections <= 1 && effects <= 1
  log.record('invariant', passed ? 'At most one critical section and one effect' : 'Concurrent critical sections allowed duplicate effects', { peakCriticalSections, effects })
  return { variant, example: options.example, outcome: options.outcome, effects, peakCriticalSections, invariant: { id: 'one-critical-section', statement: 'At most one mutation may own the critical section, and one user intent creates at most one effect.', passed }, events: log.all() }
}

export function runMutualExclusionComparison(options: MutualExclusionOptions): MutualExclusionComparison {
  return { ...options, broken: run('broken', options), fixed: run('fixed', options) }
}

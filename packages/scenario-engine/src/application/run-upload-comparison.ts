import { DeterministicClock, EventLog } from '@concurrency-lab/timeline'
import type { UploadComparison, UploadRun } from '../domain/bounded-concurrency'
export interface UploadOptions { seed: string; jobs: number; capacity: number; cancelJob?: number }
interface Job { id: number; completesAt: number }
function run(variant: 'broken' | 'fixed', options: UploadOptions): UploadRun {
  const clock = new DeterministicClock(); const log = new EventLog(clock); const waitTimes: number[] = []
  const cancelledId = options.cancelJob && options.cancelJob > options.capacity && options.cancelJob <= options.jobs ? options.cancelJob : undefined
  const queue = Array.from({ length: options.jobs }, (_, index) => index + 1)
  const running: Job[] = []; let active = 0; let peakActive = 0; let maxQueueDepth = 0; let completed = 0
  for (let id = 1; id <= options.jobs; id++) log.record('request', `Upload ${id} selected`, { job: id })
  const start = (id: number, now: number) => { waitTimes.push(now); active += 1; peakActive = Math.max(peakActive, active); running.push({ id, completesAt: now + 140 + id * 15 }); log.record('acquire', `Upload ${id} started after ${now}ms wait`, { job: id, active, available: Math.max(0, options.capacity - active), wait: now }) }
  const initial = variant === 'broken' ? queue.splice(0) : queue.splice(0, options.capacity); initial.forEach((id) => start(id, 0))
  if (variant === 'fixed') queue.forEach((id, index) => { maxQueueDepth = Math.max(maxQueueDepth, index + 1); log.record('queued', `Upload ${id} queued at position ${index + 1}`, { job: id, queueDepth: index + 1 }) })
  if (cancelledId && variant === 'fixed') { const index = queue.indexOf(cancelledId); if (index >= 0) queue.splice(index, 1); log.record('cancel', `Queued upload ${cancelledId} cancelled before acquiring a permit`, { job: cancelledId, queueDepth: queue.length }) }
  if (cancelledId && variant === 'broken') { clock.advanceBy(20); const index = running.findIndex((job) => job.id === cancelledId); if (index >= 0) { running.splice(index, 1); active -= 1 }; log.record('cancel', `Active upload ${cancelledId} cooperatively cancelled`, { job: cancelledId, active, available: Math.max(0, options.capacity - active) }) }
  while (running.length) { running.sort((a, b) => a.completesAt - b.completesAt || a.id - b.id); const job = running.shift(); if (!job) break; clock.advanceTo(job.completesAt); active -= 1; completed += 1; log.record('commit', `Upload ${job.id} completed`, { job: job.id, active, available: Math.max(0, options.capacity - active) }); log.record('release', `Upload ${job.id} released a permit`, { job: job.id, active, available: Math.max(0, options.capacity - active) }); if (variant === 'fixed') { const next = queue.shift(); if (next) start(next, clock.now()) } }
  const cancelled = cancelledId ? 1 : 0; const passed = peakActive <= options.capacity
  log.record('invariant', passed ? 'Peak active uploads stayed within capacity' : 'Uploads exceeded configured capacity', { peakActive, capacity: options.capacity, completed, cancelled, available: options.capacity })
  return { variant, capacity: options.capacity, completed, cancelled, peakActive, maxQueueDepth, waitTimes, invariant: { passed, statement: 'Peak active uploads must not exceed configured capacity and every permit must be returned.' }, events: log.all() }
}
export function runUploadComparison(options: UploadOptions): UploadComparison { if (!Number.isInteger(options.jobs) || options.jobs < 1 || !Number.isInteger(options.capacity) || options.capacity < 1) throw new RangeError('Jobs and capacity must be positive integers'); return { seed: options.seed, jobs: options.jobs, capacity: options.capacity, broken: run('broken', options), fixed: run('fixed', options) } }

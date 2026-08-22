import { DeterministicClock, EventLog } from '@concurrency-lab/timeline'
import type { UploadComparison, UploadRun } from '../domain/bounded-concurrency'
export interface UploadOptions { seed: string; jobs: number; capacity: number; cancelJob?: number }
function run(variant: 'broken' | 'fixed', options: UploadOptions): UploadRun {
  const clock = new DeterministicClock(); const log = new EventLog(clock); const waitTimes: number[] = []
  const cancelled = options.cancelJob && options.cancelJob <= options.jobs ? 1 : 0
  const peakActive = variant === 'broken' ? options.jobs : Math.min(options.capacity, options.jobs)
  const maxQueueDepth = variant === 'broken' ? 0 : Math.max(0, options.jobs - options.capacity)
  for (let job = 1; job <= options.jobs; job++) { log.record('request', `Upload ${job} selected`, { job }); if (variant === 'fixed' && job > options.capacity) log.record('queued', `Upload ${job} queued`, { job, queueDepth: job - options.capacity }) }
  if (options.cancelJob) log.record('cancel', `Queued upload ${options.cancelJob} cancelled`, { job: options.cancelJob, queueDepth: Math.max(0, maxQueueDepth - 1) })
  for (let job = 1; job <= options.jobs; job++) { if (job === options.cancelJob) continue; const wave = variant === 'fixed' ? Math.floor((job - 1) / options.capacity) : 0; const wait = wave * 160; waitTimes.push(wait); clock.advanceBy(40); log.record('acquire', `Upload ${job} started`, { job, active: Math.min(peakActive, options.jobs - job + 1), available: Math.max(0, options.capacity - Math.min(options.capacity, options.jobs - job + 1)), wait }); clock.advanceBy(100); log.record('commit', `Upload ${job} completed`, { job }); log.record('release', `Upload ${job} released a permit`, { job }) }
  const completed = options.jobs - cancelled; const passed = peakActive <= options.capacity
  log.record('invariant', passed ? 'Peak active uploads stayed within capacity' : 'Uploads exceeded configured capacity', { peakActive, capacity: options.capacity, completed, cancelled })
  return { variant, capacity: options.capacity, completed, cancelled, peakActive, maxQueueDepth, waitTimes, invariant: { passed, statement: 'Peak active uploads must not exceed configured capacity and every permit must be returned.' }, events: log.all() }
}
export function runUploadComparison(options: UploadOptions): UploadComparison { if (!Number.isInteger(options.jobs) || options.jobs < 1 || !Number.isInteger(options.capacity) || options.capacity < 1) throw new RangeError('Jobs and capacity must be positive integers'); return { seed: options.seed, jobs: options.jobs, capacity: options.capacity, broken: run('broken', options), fixed: run('fixed', options) } }

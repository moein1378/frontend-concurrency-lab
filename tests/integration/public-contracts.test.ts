import { describe, expect, expectTypeOf, it } from 'vitest'
import * as core from '@concurrency-lab/concurrency-core'
import * as scenarios from '@concurrency-lab/scenario-engine'
import * as timeline from '@concurrency-lab/timeline'

describe('v1 public runtime contracts', () => {
  it('freezes deliberate concurrency-core exports', () => expect(Object.keys(core).sort()).toEqual(['IdempotencyRegistry', 'LatestWinsCoordinator', 'Mutex', 'Semaphore', 'SingleFlightRegistry']))
  it('freezes deliberate timeline exports', () => expect(Object.keys(timeline).sort()).toEqual(['DeterministicClock', 'EventLog']))
  it('freezes deliberate scenario-engine exports', () => expect(Object.keys(scenarios).sort()).toEqual(['SeededLatencyGenerator', 'runBrokenSearchRace', 'runCrossTabComparison', 'runFixedSearchRace', 'runMutualExclusionComparison', 'runSearchRaceComparison', 'runSingleFlightComparison', 'runUploadComparison']))
  it('freezes important public signatures', () => {
    expectTypeOf(core.Mutex.prototype.acquire).returns.toMatchTypeOf<Promise<() => void>>()
    expectTypeOf(core.Mutex.prototype.acquire).parameters.toEqualTypeOf<[options?: { signal?: AbortSignal }]>()
    expectTypeOf(core.Semaphore.prototype.run).parameters.toMatchTypeOf<[() => unknown]>()
    expectTypeOf(core.SingleFlightRegistry.prototype.subscribe).parameters.toMatchTypeOf<[string, () => Promise<unknown>, (AbortSignal | undefined)?]>()
    expectTypeOf(core.IdempotencyRegistry.prototype.run).toBeFunction()
    expectTypeOf(scenarios.runCrossTabComparison).parameters.toEqualTypeOf<[string]>()
    expectTypeOf(timeline.EventLog.prototype.all).returns.toMatchTypeOf<readonly timeline.TimelineEvent[]>()
  })
})

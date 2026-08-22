import { describe, expect, it } from 'vitest'
import { runMutualExclusionComparison } from './run-mutual-exclusion-comparison'

describe('mutual exclusion teaching scenario', () => {
  it.each(['payment', 'save'] as const)('shows broken overlap and fixed serialization for %s', (example) => {
    const comparison = runMutualExclusionComparison({ seed: 'phase-3', example, outcome: 'success' })
    expect(comparison.broken.peakCriticalSections).toBe(2)
    expect(comparison.broken.effects).toBe(2)
    expect(comparison.broken.invariant.passed).toBe(false)
    expect(comparison.fixed.peakCriticalSections).toBe(1)
    expect(comparison.fixed.effects).toBe(1)
    expect(comparison.fixed.invariant.passed).toBe(true)
  })

  it.each(['failure', 'timeout', 'cancellation'] as const)('releases after %s so queued work can recover', (outcome) => {
    const run = runMutualExclusionComparison({ seed: 'phase-3', example: 'payment', outcome }).fixed
    const ending = outcome === 'cancellation' ? 'cancel' : outcome === 'failure' ? 'fail' : 'timeout'
    expect(run.events.map((event) => event.kind)).toEqual(expect.arrayContaining(['queued', ending, 'release', 'acquire', 'commit']))
    expect(run.invariant.passed).toBe(true)
  })
})

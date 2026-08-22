import type { TimelineEvent } from '@concurrency-lab/timeline'

export type MutationExample = 'payment' | 'save'
export type MutationOutcome = 'success' | 'failure' | 'timeout' | 'cancellation'

export interface MutualExclusionRun {
  variant: 'broken' | 'fixed'
  example: MutationExample
  outcome: MutationOutcome
  effects: number
  peakCriticalSections: number
  invariant: { id: 'one-critical-section'; statement: string; passed: boolean }
  events: readonly TimelineEvent[]
}

export interface MutualExclusionComparison {
  seed: string
  example: MutationExample
  outcome: MutationOutcome
  broken: MutualExclusionRun
  fixed: MutualExclusionRun
}

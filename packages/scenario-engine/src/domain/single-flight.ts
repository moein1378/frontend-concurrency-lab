import type { TimelineEvent } from '@concurrency-lab/timeline'
export interface SingleFlightRun { variant: 'broken' | 'fixed'; producerCalls: number; subscribers: number; delivered: number; staleShown: boolean; invariant: { passed: boolean; statement: string }; events: readonly TimelineEvent[] }
export interface SingleFlightComparison { key: string; broken: SingleFlightRun; fixed: SingleFlightRun }

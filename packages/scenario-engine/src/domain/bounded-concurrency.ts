import type { TimelineEvent } from '@concurrency-lab/timeline'
export interface UploadRun { variant: 'broken' | 'fixed'; capacity: number; completed: number; cancelled: number; peakActive: number; maxQueueDepth: number; waitTimes: readonly number[]; invariant: { passed: boolean; statement: string }; events: readonly TimelineEvent[] }
export interface UploadComparison { seed: string; jobs: number; capacity: number; broken: UploadRun; fixed: UploadRun }

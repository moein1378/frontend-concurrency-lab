import type { Clock } from './clock'

export type TimelineEventKind = 'request' | 'abort' | 'response' | 'commit' | 'discard' | 'queued' | 'acquire' | 'enter' | 'fail' | 'timeout' | 'cancel' | 'release' | 'invariant'

export interface TimelineEvent<T = unknown> {
  sequence: number
  timestamp: number
  kind: TimelineEventKind
  label: string
  detail: T
}

export class EventLog {
  #events: TimelineEvent[] = []
  #sequence = 0

  constructor(private readonly clock: Clock) {}

  record<T>(kind: TimelineEventKind, label: string, detail: T): TimelineEvent<T> {
    const event = { sequence: ++this.#sequence, timestamp: this.clock.now(), kind, label, detail }
    this.#events.push(event)
    return event
  }

  all(): readonly TimelineEvent[] {
    return this.#events.map((event) => ({ ...event }))
  }
}

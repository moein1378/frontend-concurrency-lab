export interface Clock {
  now(): number
}

export class DeterministicClock implements Clock {
  #time: number

  constructor(startAt = 0) {
    this.#time = startAt
  }

  now(): number {
    return this.#time
  }

  advanceTo(time: number): number {
    if (time < this.#time) throw new Error('Deterministic clock cannot move backwards')
    this.#time = time
    return this.#time
  }

  advanceBy(duration: number): number {
    if (duration < 0) throw new Error('Duration must be non-negative')
    return this.advanceTo(this.#time + duration)
  }
}

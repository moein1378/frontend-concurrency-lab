function hashSeed(seed: string): number {
  let hash = 2166136261
  for (const character of seed) {
    hash ^= character.charCodeAt(0)
    hash = Math.imul(hash, 16777619)
  }
  return hash >>> 0
}

export class SeededLatencyGenerator {
  #state: number

  constructor(seed: string) {
    this.#state = hashSeed(seed) || 1
  }

  next(min = 120, max = 900): number {
    if (!Number.isInteger(min) || !Number.isInteger(max) || min < 0 || max < min) {
      throw new Error('Latency range must contain non-negative integers')
    }
    this.#state ^= this.#state << 13
    this.#state ^= this.#state >>> 17
    this.#state ^= this.#state << 5
    const ratio = (this.#state >>> 0) / 0xffffffff
    return Math.round(min + ratio * (max - min))
  }
}

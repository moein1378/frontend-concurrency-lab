export class Semaphore {
  #available: number
  #waiters: Array<(release: () => void) => void> = []

  constructor(readonly capacity: number) {
    if (!Number.isInteger(capacity) || capacity < 1) {
      throw new RangeError('Semaphore capacity must be a positive integer')
    }
    this.#available = capacity
  }

  acquire(): Promise<() => void> {
    if (this.#available > 0) {
      this.#available -= 1
      return Promise.resolve(this.#createRelease())
    }

    return new Promise((resolve) => this.#waiters.push(resolve))
  }

  async run<T>(operation: () => Promise<T> | T): Promise<T> {
    const release = await this.acquire()
    try {
      return await operation()
    } finally {
      release()
    }
  }

  #createRelease(): () => void {
    let released = false
    return () => {
      if (released) return
      released = true
      const next = this.#waiters.shift()
      if (next) next(this.#createRelease())
      else this.#available += 1
    }
  }
}

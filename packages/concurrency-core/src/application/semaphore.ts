interface SemaphoreWaiter {
  resolve: (release: () => void) => void
  reject: (error: Error) => void
  signal?: AbortSignal
  onAbort?: () => void
}

export class Semaphore {
  #available: number
  #waiters: SemaphoreWaiter[] = []

  constructor(readonly capacity: number) {
    if (!Number.isInteger(capacity) || capacity < 1) {
      throw new RangeError('Semaphore capacity must be a positive integer')
    }
    this.#available = capacity
  }

  get available(): number { return this.#available }
  get active(): number { return this.capacity - this.#available }
  get queued(): number { return this.#waiters.length }

  acquire(options: { signal?: AbortSignal } = {}): Promise<() => void> {
    if (options.signal?.aborted) return Promise.reject(new Error(String(options.signal.reason ?? 'Semaphore acquisition cancelled')))
    if (this.#available > 0) {
      this.#available -= 1
      return Promise.resolve(this.#createRelease())
    }

    return new Promise((resolve, reject) => {
      const waiter: SemaphoreWaiter = { resolve, reject, signal: options.signal }
      waiter.onAbort = () => {
        const index = this.#waiters.indexOf(waiter)
        if (index >= 0) this.#waiters.splice(index, 1)
        reject(new Error(String(options.signal?.reason ?? 'Semaphore acquisition cancelled')))
      }
      options.signal?.addEventListener('abort', waiter.onAbort, { once: true })
      this.#waiters.push(waiter)
    })
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
      if (next) {
        if (next.signal && next.onAbort) next.signal.removeEventListener('abort', next.onAbort)
        next.resolve(this.#createRelease())
      }
      else this.#available += 1
    }
  }
}

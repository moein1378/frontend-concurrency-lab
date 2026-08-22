interface MutexWaiter {
  resolve: (release: () => void) => void
  reject: (error: Error) => void
  signal?: AbortSignal
  onAbort?: () => void
}

export class Mutex {
  #locked = false
  #waiters: MutexWaiter[] = []

  get locked(): boolean { return this.#locked }
  get queued(): number { return this.#waiters.length }

  acquire(options: { signal?: AbortSignal } = {}): Promise<() => void> {
    if (options.signal?.aborted) return Promise.reject(new Error(String(options.signal.reason ?? 'Mutex acquisition cancelled')))
    if (!this.#locked) {
      this.#locked = true
      return Promise.resolve(this.#releaseHandle())
    }
    return new Promise((resolve, reject) => {
      const waiter: MutexWaiter = { resolve, reject, signal: options.signal }
      waiter.onAbort = () => {
        const index = this.#waiters.indexOf(waiter)
        if (index >= 0) this.#waiters.splice(index, 1)
        reject(new Error(String(options.signal?.reason ?? 'Mutex acquisition cancelled')))
      }
      options.signal?.addEventListener('abort', waiter.onAbort, { once: true })
      this.#waiters.push(waiter)
    })
  }

  async runExclusive<T>(operation: () => Promise<T> | T, options: { signal?: AbortSignal } = {}): Promise<T> {
    const release = await this.acquire(options)
    try {
      return await operation()
    } finally {
      release()
    }
  }

  #releaseHandle(): () => void {
    let released = false
    return () => {
      if (released) return
      released = true
      const next = this.#waiters.shift()
      if (!next) {
        this.#locked = false
        return
      }
      if (next.signal && next.onAbort) next.signal.removeEventListener('abort', next.onAbort)
      next.resolve(this.#releaseHandle())
    }
  }
}

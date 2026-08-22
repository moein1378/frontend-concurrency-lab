export class SingleFlightRegistry {
  #flights = new Map<string, Promise<unknown>>()

  get activeKeys(): readonly string[] { return [...this.#flights.keys()] }

  run<T>(key: string, operation: () => Promise<T>): Promise<T> {
    const active = this.#flights.get(key) as Promise<T> | undefined
    if (active) return active
    const flight = Promise.resolve().then(operation).finally(() => this.#flights.delete(key))
    this.#flights.set(key, flight)
    return flight
  }

  subscribe<T>(key: string, operation: () => Promise<T>, signal?: AbortSignal): Promise<T> {
    const shared = this.run(key, operation)
    if (!signal) return shared
    if (signal.aborted) return Promise.reject(new Error(String(signal.reason ?? 'Subscriber cancelled')))
    return new Promise<T>((resolve, reject) => {
      const abort = () => reject(new Error(String(signal.reason ?? 'Subscriber cancelled')))
      signal.addEventListener('abort', abort, { once: true })
      shared.then(resolve, reject).finally(() => signal.removeEventListener('abort', abort)).catch(() => {})
    })
  }
}

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
}

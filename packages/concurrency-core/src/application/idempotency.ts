export class IdempotencyRegistry {
  #completed = new Map<string, unknown>()
  async run<T>(key: string, effect: () => Promise<T> | T): Promise<{ value: T; duplicate: boolean }> {
    if (this.#completed.has(key)) return { value: this.#completed.get(key) as T, duplicate: true }
    const value = await effect(); this.#completed.set(key, value); return { value, duplicate: false }
  }
}

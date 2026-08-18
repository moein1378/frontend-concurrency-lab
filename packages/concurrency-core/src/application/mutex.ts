export class Mutex {
  #tail: Promise<void> = Promise.resolve()

  async runExclusive<T>(operation: () => Promise<T> | T): Promise<T> {
    const previous = this.#tail
    let release = () => {}
    this.#tail = new Promise<void>((resolve) => { release = resolve })
    await previous
    try {
      return await operation()
    } finally {
      release()
    }
  }
}

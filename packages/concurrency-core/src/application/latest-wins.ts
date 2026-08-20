export class LatestWinsCoordinator {
  #latest = 0
  #active: AbortController | null = null

  issue(): number {
    return ++this.#latest
  }

  start(): LatestOperation {
    this.#active?.abort('Superseded by a newer operation')
    const controller = new AbortController()
    this.#active = controller
    return { token: this.issue(), signal: controller.signal }
  }

  isLatest(token: number): boolean {
    return token === this.#latest
  }

  abort(reason: unknown = 'Operation cancelled'): void {
    this.#active?.abort(reason)
    this.#active = null
  }
}

export interface LatestOperation {
  token: number
  signal: AbortSignal
}

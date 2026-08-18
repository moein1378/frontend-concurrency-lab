export class LatestWinsCoordinator {
  #latest = 0

  issue(): number {
    return ++this.#latest
  }

  isLatest(token: number): boolean {
    return token === this.#latest
  }
}

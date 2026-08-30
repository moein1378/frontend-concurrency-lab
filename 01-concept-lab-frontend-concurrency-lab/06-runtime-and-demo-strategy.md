# Frontend Concurrency Lab — Runtime and Demo Strategy

## Rendering decision

Client-rendered SPA. SSR provides no meaningful benefit because every experiment is interactive and browser-runtime dependent.

## Execution modes

### 1. Fixture mode

- Deterministic, repository-owned data and assets.
- No secret or external account.
- Default mode for the public live demo when infrastructure is not the engineering thesis.
- Reset through `pnpm reset` and reseed through `pnpm seed`.

### 2. Primary local mode

- Start with `pnpm dev`.
- Activates the shortest end-to-end workflow that proves the project thesis.
- External providers remain mocked or use local adapters.

### 3. Full-local mode

- Start with `pnpm dev:all`.
- Activates optional APIs, signaling, GraphQL, chain, collaboration, or persistence services where listed in `04-dependencies-and-services.md`.
- Uses Docker only according to `08-docker-strategy.md`.

### 4. Hosted adapter mode

GitHub Pages static demo using deterministic local simulators and MSW fixtures.

Hosted mode is replaceable. Domain code must depend on owned ports rather than provider SDKs.

## Live-demo acceptance

- HTTPS is mandatory for camera, PWA, service-worker, wallet, and advanced browser APIs.
- The first meaningful proof appears within two interactions.
- A visible badge distinguishes Fixture, Local, and Connected modes.
- The demo has stable sample data and a reset action.
- Unsupported browser capabilities lead to a sample/replay mode rather than a dead end.
- No `VITE_*` variable contains a secret.
- The README links directly to the demo and states its limitations.

## Deployment target

GitHub Pages static demo using deterministic local simulators and MSW fixtures.

## Rollback

- Keep the previous successful deployment artifact or release.
- Deployments use a GitHub Actions concurrency group.
- A failed post-deploy smoke test triggers rollback instructions and blocks the release tag.

# Frontend Concurrency Lab — CI/CD and Delivery Strategy

## Required workflows

### `ci.yml`

Runs on pull requests and pushes:

1. Corepack and frozen pnpm install.
2. Format, lint, Markdown lint, and link check.
3. Architecture boundary check.
4. Type check.
5. Unit and integration tests.
6. Browser/E2E tests relevant to the changed packages.
7. Production build.
8. Bundle/performance budget.
9. Secret scan and dependency review.

### `deploy-demo.yml`

- Runs only after CI succeeds on `main`.
- Builds the fixture/public demo.
- Publishes according to: GitHub Pages static demo using deterministic local simulators and MSW fixtures.
- Uses a deployment concurrency group and minimal permissions.
- Performs a post-deploy smoke test against a stable route.

### Release workflow

- Application releases are tagged after the production demo passes smoke tests.
- GitHub Release notes include screenshots, architecture changes, known limitations, and migration notes for persisted data.
- Generated assets and deployment URLs are attached or linked.

### Container workflow

No container image is published because the project has no production server artifact.

## Branch and environment policy

- `main` is releasable.
- Feature branches require pull requests.
- Production provider credentials live in a protected GitHub Environment.
- Pull requests never receive production secrets.
- Dependabot/Renovate updates run the same CI and may not bypass architecture or browser tests.

## Required status checks

`lint`, `docs`, `architecture`, `typecheck`, `unit`, `integration`, `e2e`, `build`, and `security` as applicable.

## Templates

Starter workflows are stored in `templates/.github/workflows/`. Copy them into the actual implementation repository and replace only documented placeholders.

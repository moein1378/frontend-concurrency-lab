# Frontend Concurrency Lab — CI/CD and Delivery Strategy

## Required workflows

These sections describe committed workflows, not a claim that GitHub settings or the latest remote run were inspected.

### `ci.yml`

Runs on pull requests and pushes to `main`. Read-only repository permissions and a per-workflow/ref concurrency group cancel superseded runs.

The `verify` job:

1. Checks out the repository, enables Corepack, and configures Node from `.nvmrc` with pnpm caching.
2. Installs dependencies with `pnpm install --frozen-lockfile`.
3. Installs Chromium, Firefox, and WebKit with operating-system dependencies.
4. Runs `pnpm verify`: lint, package-boundary scan, Vue typecheck, Vitest unit/integration tests, Playwright E2E, production build, and the 200 KiB gzip JavaScript budget.
5. Attempts to upload `apps/lab/dist` as `release-candidate-production-build` with `if: always()`; an earlier failure may mean no build directory exists.

A separate `dependency-review` job runs on pull requests. There are no configured formatting, Markdown/link, secret-scanning, coverage, or dedicated runtime performance jobs. Screenshot comparisons require opt-in local baselines; functional browser assertions run by default.

### `deploy-demo.yml`

- Triggered by a completed `CI` workflow on `main`, subject to success, or by manual dispatch.
- Uses `contents: read`, `pages: write`, `id-token: write`, the `github-pages` environment, and a `pages` concurrency group.
- Installs dependencies and rebuilds with `VITE_BASE_PATH=/frontend-concurrency-lab/`.
- Copies the application shell to `404.html` and uploads `apps/lab/dist` with `actions/upload-pages-artifact@v4`.
- Deploys through `actions/deploy-pages@v4`, then runs `curl --fail --retry 5 --retry-delay 5` against `scenario/search-race/compare`.

Operational limits: checkout has no explicit triggering SHA/ref, and deployment rebuilds rather than consuming CI's artifact. A newer branch head can therefore differ from the revision that triggered CI. Manual dispatch also bypasses the automatic success condition. The HTTP smoke request checks response status, not application rendering or scenario invariants; a Pages deep-link fallback may return 404 despite rendering the SPA. None of these conditions causes automatic rollback in the workflow.

### Release workflow

No dedicated release/tag/package-publishing workflow is committed. Application and workspace manifests currently report `1.1.0`, and every workspace package is private. [The release runbook](docs/runbooks/release.md) documents manual validation and release preparation; it does not imply that a tag or GitHub Release exists.

### Container workflow

No Dockerfile, Compose stack, image publishing, or server deployment is configured.

## Branch and environment policy

`main` is the configured CI/deploy branch. Repository branch protection, required approvals, Pages enablement, environment protection, and hosted deployment health require a separate GitHub inspection; they cannot be inferred from YAML. No production provider credentials are required by this fixture application. No Dependabot or Renovate configuration is present.

## Required status checks

Configured job names are `verify` and pull-request-only `dependency-review`. The gate invokes several commands within one job; it does not expose independent `docs`, `security`, `unit`, or `build` jobs. Which jobs GitHub requires for merge is unknown from source alone.

## Templates

[Workflow templates](templates/.github/workflows/) mirror the committed workflows, including current limitations. Treat the root `.github/workflows/` files as authoritative, and update the copies when they change. The environment template documents optional public values; no connected service template is needed.

## Verification provenance

- Last verified: 2026-11-14; source baseline `19640ebd8169ce625b2a093caafc1ca2483b6a84` plus the inspected working tree.
- Confidence: high for source/configuration facts; command descriptions are not evidence that those commands passed.
- Evidence paths below are repository-root relative. Recheck the listed inputs after relevant changes.
- Stale-sensitive evidence: `.github/workflows/ci.yml`, `.github/workflows/deploy-demo.yml`, `package.json`, `playwright.config.ts`, `scripts/check-bundle-budget.mjs`, `packages/*/package.json`.

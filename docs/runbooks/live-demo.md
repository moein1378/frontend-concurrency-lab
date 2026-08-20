# Live demo runbook

## Public URL

`https://moein1378.github.io/frontend-concurrency-lab/`

## Deployment contract

- `.github/workflows/ci.yml` verifies every push to `main`.
- `.github/workflows/deploy-demo.yml` runs only after the `CI` workflow succeeds on `main`, or through an explicit manual dispatch.
- The demo build uses `/frontend-concurrency-lab/` as its Vite base path.
- `404.html` is a copy of the application shell so direct scenario URLs load the client-rendered SPA on GitHub Pages.
- The deployed artifact contains deterministic fixtures only and requires no secrets or hosted service.

## First-time repository setup

In GitHub repository settings, open **Pages** and select **GitHub Actions** as the build and deployment source. No branch-based `docs/` publishing is used.

## Verification

After deployment:

1. Open the public URL and confirm the **Fixture** badge is visible.
2. Open `/frontend-concurrency-lab/scenarios` directly.
3. Run the stale-search comparison with cancellation and freshness strategies.
4. Confirm the broken lane commits `ca`, the fixed lane commits `cat`, and the selected abort/discard event is visible.

## Recovery and rollback

- A failed CI run does not start a deployment.
- A failed Pages deployment leaves the previous successful deployment available.
- Re-run the failed workflow after correcting configuration or use **Run workflow** on `Deploy demo` after CI is green.
- GitHub Pages deployment history provides the previously successful artifact for rollback.

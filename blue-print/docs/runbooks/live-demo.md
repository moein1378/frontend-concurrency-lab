# Frontend Concurrency Lab — Live Demo Runbook

## Target and build

Configured public target: `https://moein1378.github.io/frontend-concurrency-lab/`. Deployment serves deterministic browser fixtures, without MSW or a backend. The public site was not inspected as part of this documentation refresh.

```bash
VITE_BASE_PATH=/frontend-concurrency-lab/ pnpm build:demo
cp apps/lab/dist/index.html apps/lab/dist/404.html
```

The output is `apps/lab/dist`. For a local preview with the same subpath:

```bash
pnpm --filter @concurrency-lab/app exec vite preview --host 127.0.0.1 --port 4175 --base /frontend-concurrency-lab/
```

Open `http://127.0.0.1:4175/frontend-concurrency-lab/scenarios`. Preview is a manual check, not a root script or a substitute for GitHub Pages deep-link verification.

## Deploy

1. Run `pnpm verify` after installing test browsers.
2. Confirm the intended revision and build inputs. `VITE_*` values are public; do not bundle secrets.
3. GitHub Pages must be configured with GitHub Actions as its source. This setting is not verified by repository files.
4. Successful `CI` on `main` triggers `Deploy demo`; manual dispatch also exists. It rebuilds rather than reusing the CI artifact and does not explicitly pin checkout to the triggering SHA. Confirm the actual deployed revision before declaring a release.
5. The workflow uploads `apps/lab/dist`, deploys, and requests the search-race deep route with `curl`. Inspect any failure before assuming the browser app is broken: Pages may serve its SPA fallback with HTTP 404.

## Browser smoke check

- Open the catalog and reload each comparison route under `/frontend-concurrency-lab/`.
- Run the stale-search default and both protection strategies; verify `ca` versus `cat`, abort/discard evidence, and the final invariant.
- Exercise mutex, bounded-concurrency, and single-flight controls; compare their final evidence.
- Use two same-origin tabs for the cross-tab lesson, reset before the run, and inspect owner/follower state. This is a teaching claim, not a production lease.
- Check phone layout, keyboard navigation, theme persistence, guided lesson cleanup, and local trace download.

Do not require a Fixture badge: current UI does not expose the old proposed execution-mode badge. The workflow HTTP smoke check does not perform these browser assertions. Rollback is manual; see [rollback](rollback.md).

## Verification provenance

- Last verified: 2026-11-14; source baseline `19640ebd8169ce625b2a093caafc1ca2483b6a84` plus the inspected working tree.
- Confidence: high for source/configuration facts; command descriptions are not evidence that those commands passed.
- Evidence paths below are repository-root relative. Recheck the listed inputs after relevant changes.
- Stale-sensitive evidence: `.github/workflows/deploy-demo.yml`, `apps/lab/vite.config.ts`, `apps/lab/src/router.ts`, `tests/e2e/search-race.e2e.ts`, `tests/e2e/cross-tab.e2e.ts`, `tests/e2e/ui-quality.e2e.ts`.

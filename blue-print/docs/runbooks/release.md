# Frontend Concurrency Lab — Release Runbook

## Scope

Current manifests are `1.1.0`. The repository ships a static teaching application; all workspace packages are private. There is no automated tag, GitHub Release, registry publishing, or npm trusted-publishing pipeline.

## Prepare and validate

1. Confirm the intended revision and a scoped diff. Review the actual source contracts and relevant tests; completed historical phase files are not an active implementation queue.
2. Use Node 24, pnpm 11.22.0, and `pnpm install --frozen-lockfile`. Install all configured Playwright browsers.
3. Run `pnpm verify`. Record the command outcome and any limitations; do not infer a passing gate from prior handoffs.
4. Review `CHANGELOG.md`, release notes, screenshots, known limitations, and public export contracts as appropriate. Update [the toolchain record](../toolchain.lock.md) if dependency inputs changed.
5. Build and verify the Pages artifact using [the live-demo runbook](live-demo.md). Confirm which revision the deployment actually contains: current YAML does not pin checkout to the CI trigger's SHA.
6. Perform browser smoke checks. The workflow's HTTP check neither proves lesson behavior nor blocks tags through an automated release gate.
7. Create a version tag or GitHub Release only within the operator's explicit publication authorization; this documentation update does not create either. Describe local simulation, cross-tab limits, and browser-storage implications in release notes.

## Recovery readiness

Record a known-good revision and, where available, a retained build artifact before publication. Confirm repository/environment access for recovery. Follow [rollback](rollback.md) if a deployed regression occurs. No database migration or public package rollback is involved in the current system.

## Verification provenance

- Last verified: 2026-11-14; source baseline `19640ebd8169ce625b2a093caafc1ca2483b6a84` plus the inspected working tree.
- Confidence: high for source/configuration facts; command descriptions are not evidence that those commands passed.
- Evidence paths below are repository-root relative. Recheck the listed inputs after relevant changes.
- Stale-sensitive evidence: `package.json`, `packages/*/package.json`, `.github/workflows/ci.yml`, `.github/workflows/deploy-demo.yml`, `tests/integration/public-contracts.test.ts`, `CHANGELOG.md`.

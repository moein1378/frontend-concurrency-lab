# Toolchain Lock — Frontend Concurrency Lab

This is a human-readable resolution record, not a replacement for `pnpm-lock.yaml`. Application and package manifests currently report `1.1.0`; all workspaces are private.

| Tool / dependency | Verified repository setting or lockfile resolution |
|---|---|
| Node.js | `.nvmrc`: `24`; engines: `>=24 <25` (no exact patch pin) |
| pnpm | `11.22.0` in root `packageManager` |
| Lockfile format | `9.0` |
| TypeScript | `5.9.3` |
| Vue | `3.5.41` |
| Vue Router | `4.6.4` (manifest range `^4.6.4`) |
| Vuetify | `3.13.2` |
| Intro.js | `8.5.0` |
| Vite | `8.2.1` |
| `@vitejs/plugin-vue` | `6.0.8` |
| `vue-tsc` | `3.3.10` |
| Vitest | `4.1.10` |
| Playwright | `1.62.1` |
| ESLint / `@eslint/js` | `10.8.1` / `10.0.1` |
| `typescript-eslint` | `8.68.0` (manifest range `^8.68.0`) |
| `eslint-plugin-vue` | `10.10.0` (manifest range `^10.10.0`) |
| `globals` | `17.11.0` (manifest range `^17.11.0`) |

`pnpm-workspace.yaml` includes `apps/*` and `packages/*`, with `esbuild` as the allowed build dependency. Dependency integrity entries are recorded in the lockfile. There is no application asset-download/checksum pipeline or generated schema/client version to record. CI installs Playwright's browsers; `PLAYWRIGHT_EXECUTABLE_PATH` can override Chromium/phone locally and does not pin that external executable.

Use frozen installs for reproduction, and update this table after manifest/lockfile changes. These are inspected repository resolutions, not a claim that a fresh install or every listed executable was run during the documentation update.

## Verification provenance

- Last verified: 2026-11-14; source baseline `19640ebd8169ce625b2a093caafc1ca2483b6a84` plus the inspected working tree.
- Confidence: high for source/configuration facts; command descriptions are not evidence that those commands passed.
- Evidence paths below are repository-root relative. Recheck the listed inputs after relevant changes.
- Stale-sensitive evidence: `package.json`, `apps/lab/package.json`, `packages/*/package.json`, `pnpm-lock.yaml`, `pnpm-workspace.yaml`, `.nvmrc`, `playwright.config.ts`.

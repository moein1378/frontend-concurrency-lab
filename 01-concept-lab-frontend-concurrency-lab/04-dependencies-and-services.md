# Frontend Concurrency Lab — Dependencies, Services, and Local Execution

> This is the authoritative dependency contract. Exact patch versions are resolved at repository kickoff, committed to the lockfile, and recorded in `docs/toolchain.lock.md`.

## Stack decision

- **Stack:** Vue 3 + Vite + TypeScript + Tailwind CSS 4; custom lab components; no SSR
- **Architecture:** Scenario-first modular monolith with framework-independent concurrency primitives and deterministic simulators.
- **Rendering:** Client-rendered SPA. SSR provides no meaningful benefit because every experiment is interactive and browser-runtime dependent.

## Runtime and development dependencies

| Dependency | Version policy | Responsibility | Boundary rule |
|---|---|---|---|
| Node.js | 24 LTS | Toolchain and CI runtime. | Pin with .nvmrc and engines; use LTS, not Current. |
| pnpm | exact via packageManager | Workspace install and scripts. | Commit pnpm-lock.yaml and enable Corepack. |
| `vue` | current Vue 3 stable | UI runtime. | Composition API and script setup; domain rules stay outside components. |
| `vite` + `@vitejs/plugin-vue` | current stable compatible with locked framework | SPA, docs, fixtures, and library development. | Use one authoritative Vite config per app; Quasar owns its generated config. |
| `typescript` | 5.x current stable at kickoff | Static contracts and project references. | Record exact version in docs/toolchain.lock.md. |
| `tailwindcss` + `@tailwindcss/vite` | 4.x | Token-driven utilities and layout. | Use @tailwindcss/vite; semantic CSS variables remain the source of truth. |
| `msw` | current stable | Browser/Node fixture API and deterministic live demo. | Fixture-only; never hide a missing production adapter. |
| `vitest` | current stable compatible with Vite | Unit, integration, fake-clock, and property tests. | Time/randomness enter through ports. |
| `@playwright/test` | current stable | Cross-browser E2E, multi-page, and visual tests. | Install browsers through the lockfile and CI cache. |
| `fast-check` | current stable | Property-based invariant testing. | Use for algorithms, date math, graph rules, and policy composition. |
| `zod` | current stable | Runtime validation at untrusted boundaries. | Schemas are centralized and inferred, not duplicated. |

## Services and external capabilities

| Service/capability | Mode | Usage and completion guarantee |
|---|---|---|
| **Deterministic browser simulator** | Required local/fixture | Seeded latency, ordering, abort, and commit events; no network required. |
| **Optional Hono latency fixture** | Optional local | Used only to prove behavior against real fetch timing. |

## Environment variables

| Variable | Safe default/requirement | Purpose |
|---|---|---|
| `VITE_DEMO_SEED` | `concurrency-v1` | Deterministic simulator seed. |

## Installation and startup

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm seed
pnpm dev          # primary local/fixture workflow
pnpm dev:all      # only when full-local services are required
pnpm verify
```

## Required root scripts

| Script | Contract |
|---|---|
| `dev` | Starts the primary reviewer/developer experience. |
| `dev:all` | Starts all full-local services without a hosted account. |
| `seed` | Downloads/checksums approved assets and restores deterministic fixtures. |
| `reset` | Deletes local state and restores the documented baseline. |
| `codegen` | Rebuilds generated schemas/clients/types when applicable. |
| `lint` | Lints source, configuration, Markdown, and generated-file boundaries. |
| `architecture:check` | Enforces package/module import rules. |
| `typecheck` | Runs TypeScript and framework-specific checks. |
| `test` | Unit and integration suites. |
| `test:e2e` | Deterministic Playwright flows. |
| `build` | Builds all production artifacts. |
| `build:demo` | Builds the public fixture/live-demo artifact. |
| `verify` | Clean-clone equivalent gate used by CI and releases. |

## Version and compatibility policy

- Node.js 24 LTS and exact pnpm are the public baseline.
- Exact dependency versions are locked when implementation starts; a blueprint does not float during a phase.
- Major framework/library upgrades require an ADR and migration phase.
- Binary/model/WASM assets are checksum pinned.
- Generated GraphQL/ABI/schema artifacts record their input version.
- Provider SDKs are isolated behind adapter packages and may be removed without changing domain contracts.

## Zero-cost and anti-lock-in checks

- [ ] Fixture mode proves the primary workflow.
- [ ] Full-local mode has documented seed/reset commands.
- [ ] No paid UI template, database, RPC, API, or observability platform is required.
- [ ] Hosted providers implement owned ports.
- [ ] CI does not require a personal cloud account for tests.
- [ ] Client-exposed environment variables contain no secrets.

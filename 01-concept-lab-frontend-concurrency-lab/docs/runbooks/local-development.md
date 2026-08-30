# Frontend Concurrency Lab — Local Development Runbook

1. Install Node.js 24 LTS and enable Corepack.
2. Run `pnpm install --frozen-lockfile`.
3. Copy `.env.example` only when connected/full-local mode is needed.
4. Run `pnpm seed`.
5. Run `pnpm dev` for the primary workflow.
6. Run `pnpm dev:all` for all optional local services.
7. Run `pnpm reset` to restore deterministic state.
8. Run `pnpm verify` before handoff.

Stack-specific notes are in `04-dependencies-and-services.md`.

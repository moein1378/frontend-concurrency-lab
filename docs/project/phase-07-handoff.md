# Phase 07 handoff — v1.0.0

The stable teaching release is implemented and tag-ready. Package versions are 1.0.0, public runtime exports are contract-tested, visible scenario evidence downloads as deterministic JSON, and release/accessibility documentation is complete.

Run `pnpm verify` on Node 24 with installed Playwright browsers. Creating and pushing the `v1.0.0` tag or GitHub Release is intentionally left to an authorized maintainer.

Local evidence on 2026-08-22: lint, architecture, strict typecheck, 44 Vitest tests, production build, and the 87,367-byte gzip JavaScript result pass. Playwright enumerates 48 journeys across Chromium, Firefox, WebKit, and phone. The execution attempt reached the Vite server but all projects stopped before test code because the host has neither stable Chrome nor Playwright-managed browser binaries; CI installs those binaries explicitly.

# Frontend Concurrency Lab — Live Demo Runbook

Deployment strategy: GitHub Pages static demo using deterministic local simulators and MSW fixtures.

- Build with `pnpm build:demo`.
- Verify no secret-bearing variable is bundled.
- Run the production artifact locally before deployment.
- Deploy only after CI succeeds.
- Run smoke tests for the README-linked route and first meaningful workflow.
- Record demo mode and known limitations in README.

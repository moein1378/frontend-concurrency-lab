# Frontend Concurrency Lab — Docker Strategy

## Decision

Docker is not required or configured. The supported development path is Node.js 24 + Corepack/pnpm; deployment publishes the static Vite output. There is no Hono fixture, API workspace, Dockerfile, Compose stack, or container publishing workflow.

## Reason for exclusion

The implemented product is a browser SPA and framework-independent TypeScript packages. A container would duplicate the existing Node/Vite workflow without supplying a missing runtime service. Current CI uses Ubuntu jobs and Playwright browser installation, with no service containers.

## Mandatory anti-complexity rule

A future Dockerfile should start a real service, reproduce a demonstrated native dependency problem, or simplify a justified multi-service workflow. Introduce it with an explicit contract and evidence; do not add it solely as portfolio decoration.

## Verification provenance

- Last verified: 2026-11-14; source baseline `19640ebd8169ce625b2a093caafc1ca2483b6a84` plus the inspected working tree.
- Confidence: high for source/configuration facts; command descriptions are not evidence that those commands passed.
- Evidence paths below are repository-root relative. Recheck the listed inputs after relevant changes.
- Stale-sensitive evidence: `package.json`, `pnpm-workspace.yaml`, `.github/workflows/ci.yml`, `.github/workflows/deploy-demo.yml`, repository file inventory.

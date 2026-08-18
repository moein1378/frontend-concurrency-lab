---
name: testing-setup
description: Inspect a Vue/Nuxt repository's actual testing stack, versions, environments, scripts, coverage, CI behavior, and browser setup, then persist a freshness-aware snapshot in .agents/context/testing.md. Use on onboarding or after meaningful testing/tooling changes.
---

# Testing Setup

Read:
- `../_shared/skill-contract.md`
- `../_shared/repository-preflight.md`
- `../_shared/version-awareness.md`
- `references/testing-context-template.md`

## Detect

Record only verified facts:
- package manager/workspace package
- Vue/Nuxt versions
- Vitest/Jest configuration
- Nuxt test-utils version/setup
- Vue Test Utils / Testing Library
- DOM environment
- browser mode
- Playwright/Cypress
- test projects/globs
- setup files
- coverage provider/thresholds
- existing accessibility/visual tooling
- CI commands/artifacts
- package scripts

Do not install or upgrade dependencies unless asked.

## Nuxt Runtime Separation

Identify whether the project separates:
- node/jsdom/happy-dom unit tests
- Nuxt runtime tests
- E2E/browser tests

Do not merge incompatible environments into a generic “test” assumption.

## Freshness

Generate fingerprint evidence using `.agents/scripts/project-fingerprint.mjs` when Node is available.

Store:
- generation timestamp
- git commit when available
- hashes for relevant package/test config files
- detected versions

## Output

Write `.agents/context/testing.md`.

If an existing snapshot contains valid project-owned notes, merge them; do not erase them blindly.

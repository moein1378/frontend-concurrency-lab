# Repository Preflight

Use this before any non-trivial Vue/Nuxt change.

## Detect

- package manager and workspace layout
- Vue/Nuxt versions
- TypeScript mode
- source/app directories
- styling system
- component/design-system locations
- state/data libraries only when relevant
- test runners/environments only when relevant
- CI scripts that define the project's real quality gates
- monorepo package boundary containing the requested change

## Source Priority

When sources disagree:

1. current source/configuration
2. current tests
3. generated context with matching fingerprint
4. repository docs
5. generic skill guidance

Project reality overrides starter conventions.

## Scope Discipline

Inspect enough to trace the affected path, not the whole repository.

Do not scan:

- `node_modules`
- build outputs
- package manager caches
- generated artifacts unrelated to the task

## Version-Sensitive APIs

For framework/tool APIs that changed across versions:

- detect the installed version first
- prefer repository usage and primary documentation for that version
- do not copy a pattern merely because it appears in a generic reference

# Toolchain lock

Verified against npm registry metadata on 2026-08-21.

- Node.js: 24 LTS
- pnpm: 11.22.0
- Vue: 3.5.41
- Vite: 8.2.1
- TypeScript: 5.9.3
- Tailwind CSS / Vite plugin: 4.3.3
- Vue Vite plugin: 6.0.8
- vue-tsc: 3.3.10
- Vitest: 4.1.10
- Playwright: 1.62.1
- ESLint: 10.8.1
- Intro.js: 8.5.0

TypeScript stays on the blueprint's supported 5.x line because the current Vue SFC typechecker does not yet support TypeScript 7's exported compiler surface.

The committed `pnpm-lock.yaml` is the authoritative transitive dependency record.

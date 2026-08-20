# Toolchain lock

Verified against npm registry metadata on 2026-08-17.

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
- Vue I18n: 11.1.12
- Driver.js: 1.8.0

TypeScript stays on the blueprint's supported 5.x line because the current Vue SFC typechecker does not yet support TypeScript 7's exported compiler surface.

Vue I18n remains on 11.1.12 because 11.2+ currently imports a Vue type absent from the latest compatible Vue 3.5.41 declaration surface. `@intlify/devtools-types` 11.1.12 is a development-only type companion required by that published declaration bundle.

The committed `pnpm-lock.yaml` is the authoritative transitive dependency record.

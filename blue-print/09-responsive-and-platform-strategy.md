# Frontend Concurrency Lab — Responsive and Platform Strategy

> Last verified: 2026-11-14 · baseline `19640ebd8169ce625b2a093caafc1ca2483b6a84` plus the inspected working tree. Confidence: high for source/configuration and test contracts; no physical-device measurement, dedicated contrast audit or public-demo performance measurement was performed; repository browser-check results are recorded in [the handoff](agent/HANDOFF.md). Stale-sensitive sources: [styles](../apps/lab/src/styles/main.css), [navigation](../apps/lab/src/components/WorkspaceNavigator.vue), [bootstrap](../apps/lab/src/main.ts), [Playwright configuration](../playwright.config.ts), [budget checker](../scripts/check-bundle-budget.mjs).

## Product decision

An adaptive teaching lab with side-by-side desktop comparisons and a complete single-column phone workflow. The former “phone playback only” proposal is superseded by current controls, live explanation, results, reset, trace download and phone section navigation.

The journey is catalog → lesson framing → predict/change controls → run → inspect broken/fixed evidence → explain the guarantee. Phone mode reflows that journey rather than introducing a separate reduced simulator.

## Rendering/platform rationale

The app is a client-rendered Vue 3 SPA built by Vite, with Vue Router HTML5 history and no SSR. Experiments require browser interactions, while core scenarios and coordination primitives remain framework-independent packages. Repository-owned fixtures make lessons reproducible without a live API.

[Vite configuration](../apps/lab/vite.config.ts) and [router](../apps/lab/src/router.ts) use the deployment base path. Asset consumers use `BASE_URL`; hosting must preserve deep-link access. This is a browser website; native apps, Telegram Mini Apps and installable PWA behavior are not implemented. Available manifest/icon artwork does not establish those integrations.

## Layout rules

[main.css](../apps/lab/src/styles/main.css) is the layout source; [design tokens](./03-design-tokens.md) documents its semantic roles.

| Width / container | Implemented behavior |
| --- | --- |
| Base layout | `body` minimum width 320px; 80rem maximum rail with fluid gutters/padding. Two-column catalog, lesson/decision grids, comparison lanes and timelines. |
| Desktop simulator | Controls and live “Why?” explanation share a row, with results below. Search controls and explanation span the workspace width. |
| Viewport ≤760px | Single-column grids/workspaces; stacked hero illustration and stepper; hidden header brand text and visually hidden event timestamps, retained in the DOM. |
| Viewport ≤760px navigation | Sticky Controls / Why? / Result buttons scroll to the relevant section and mark the last tapped item with `aria-current="location"`. Selection does not track scrolling automatically. |
| Viewport ≤440px | Action rows, headings and footer stack; catalog actions expand to full width. |
| Controls container ≤31rem | Targeted control grid/strategy picker, headings and buttons stack independently of viewport width. |

Preserve semantic regions, native control labels, keyboard focus, skip navigation, and readable invariant/event text. Hover is not the only route to an action. Primary/secondary actions and non-checkbox text/select controls use 44px minimum heights; mobile section controls are 40px and tour controls 30px. Checkbox dimensions differ as well, so a universal 44px target claim is inaccurate.

[App.vue](../apps/lab/src/app/App.vue) implements the skip link and timeline Up/Down navigation; [bootstrap](../apps/lab/src/main.ts) explicitly sets English/left-to-right. There is no language switcher or RTL product mode. Reduced motion disables smooth scrolling, reduces CSS durations and removes search playback delay; trace semantics stay deterministic.

The active six-step [guided lesson](../apps/lab/src/components/ScenarioLearning.vue) uses Intro.js tooltips with the current Vuetify class. [Tour CSS](../apps/lab/src/styles/tour.css) constrains width to the viewport and supplies opaque theme surfaces. Safe-area inset handling is not implemented; revisit it for an installed or embedded mobile surface.

## Capability policy

Current dependencies are explicit rather than a generic advanced-API platform:

- Theme persistence uses `localStorage`; the cross-tab lesson uses a shared owner record and `storage` events. These paths have no storage-denied/unavailable fallback ([header](../apps/lab/src/components/LabHeader.vue), [cross-tab page](../apps/lab/src/pages/CrossTabPage.vue)).
- Cross-tab UI ownership is a teaching demonstration, not an atomic lease or production crash-recovery system. Leases, heartbeats, fencing and recovery remain outside its guarantee. The deterministic runner's election is separate from the browser storage claim.
- Trace download uses `Blob`, object URLs and an anchor download; reduced motion uses `matchMedia`.
- Camera, wallet, file-system permissions, SharedArrayBuffer, service workers, offline cache and push notifications are not integrated. Generic permission and service-worker recovery requirements apply if those features are introduced.
- Detect future capabilities directly, document unavailable/denied behavior, and do not infer support from user-agent strings or replace real failures with silent fixture success.

[Playwright projects](../playwright.config.ts) configure Chromium, Firefox, WebKit and Pixel 7 phone emulation. [UI quality tests](../tests/e2e/ui-quality.e2e.ts) define overflow/browser-error checks for the catalog and five scenarios. [Navigation tests](../tests/e2e/workspace-navigator.e2e.ts) explicitly use 393×851 and reduced motion. [Learning tests](../tests/e2e/learning-experience.e2e.ts) cover theme persistence, lesson composition and tooltip surfaces; [search tests](../tests/e2e/search-race.e2e.ts) cover language/direction, keyboard inspection and trace download. These are configured contracts, not new passing results or proof of every physical device. The 320px CSS minimum is not evidence of exhaustive 320px browser coverage.

## Performance budgets

- Enforced JavaScript budget: **200 KiB gzip** (`200 * 1024` bytes), checked by `pnpm performance:check` after a build.
- [The checker](../scripts/check-bundle-budget.mjs) sums every `.js` file directly in `apps/lab/dist/assets`. Despite the “Initial JavaScript” log label, this is not a browser measurement of only eagerly loaded chunks. Preserve the actual enforced sum when adding splitting.
- The [router](../apps/lab/src/router.ts) imports route components eagerly. No shipped editor, vision, 3D, wallet or graph module requires an advanced-module loading policy.
- Scenario images use CSS aspect ratios; the header mark has width/height attributes. Catalog/hero images currently lack `loading="lazy"` and explicit intrinsic width/height attributes. Lazy loading is not an implemented guarantee.
- Long-task telemetry and public-demo Core Web Vitals collection are not configured in the inspected app. Measure before claiming runtime gains; field-metric targets remain future validation work where justified.
- Screenshot comparisons require `VISUAL_REGRESSION=1` and local ignored baselines for Chromium, Firefox and phone. Default E2E runs exercise functional layout contracts without screenshot files.

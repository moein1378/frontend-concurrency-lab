# Frontend Concurrency Lab — Design Tokens and UI Rules

> Current implementation reference. The earlier Tailwind/token proposal is superseded by [ADR 0004](../docs/adr/0004-vuetify-presentation-system.md).
>
> Last verified: 2026-11-14 · baseline `19640ebd8169ce625b2a093caafc1ca2483b6a84` plus the inspected working tree. Confidence: high for source/configuration facts; no dedicated rendered contrast audit was performed; repository command results are recorded in [the handoff](agent/HANDOFF.md). Stale-sensitive sources: [theme plugin](../apps/lab/src/plugins/vuetify.ts), [main styles](../apps/lab/src/styles/main.css), [tour styles](../apps/lab/src/styles/tour.css), [app dependencies](../apps/lab/package.json).

## 1. Visual direction

- **UI stack:** Vue 3 + Vite + strict TypeScript; Vuetify 3.13.2 with app-owned teaching components and CSS; client-rendered SPA.
- **Presentation:** spacious catalog and lesson framing, denser interactive workspaces, paired broken/fixed lanes, structured event evidence.
- **Typefaces:** inherited Vuetify sans-serif stack; named monospace fallbacks for machine-readable labels. Inter remains in the logo lockup asset, not the application font configuration.
- **Shape:** `--radius-control: .7rem`, `--radius-panel: 1.25rem`; Vuetify cards default to `rounded: 'xl'`.
- **Themes:** `labLight` by default; `labDark` through the header toggle. Selection persists in `localStorage` under `concurrency-lab-theme` ([header](../apps/lab/src/components/LabHeader.vue)).

## 2. Semantic color tokens

The plugin defines these Vuetify roles. Application CSS consumes aliases of `rgb(var(--v-theme-…))`; the former `--color-*` variables are not implemented.

| Vuetify role | `labLight` | `labDark` | Purpose |
| --- | --- | --- | --- |
| `primary` | `#2563eb` | `#60a5fa` | Actions, current state, selected emphasis. |
| `secondary` | `#f59e0b` | `#fbbf24` | Secondary theme emphasis. |
| `success` | `#10b981` | `#34d399` | Fixed lane, passed invariant, completed state. |
| `warning` | `#f59e0b` | `#fbbf24` | Warnings, cancellation/discard, retry states. |
| `error` | `#ef4444` | `#f87171` | Broken lane, failed invariant, invalid state. |
| `background` | `#f8fafc` | `#111827` | Page background. |
| `surface` | `#ffffff` | `#111c30` | Panels and tour tooltip. |
| `surface-variant` | `#e2e8f0` | `#1e293b` | Derived subtle surfaces. |
| `on-background`, `on-surface` | `#0f172a` | `#f8fafc` | Readable foreground. |

### State mapping

- `--ui-danger` aliases Vuetify `error`; `--ui-success` aliases `success`; `--ui-warning` aliases `warning`. Lane titles, invariant labels and state markers supplement color.
- Broken/fixed backgrounds mix danger/success at 7% into `--ui-surface`; a 4px top border distinguishes result lanes.
- The [stepper](../apps/lab/src/components/ScenarioStateStepper.vue) uses primary for current, success for completed, warning for warning/retry, danger for error, and strike-through/opacity for skipped steps.
- Neutral infrastructure uses muted text, subtle surfaces and border aliases. Preserve one shared status palette.

### Dark-mode roles

Both Vuetify theme classes define the same aliases. `data-theme` alone does not activate the palette: the header also changes Vuetify theme state.

| Alias | Implemented derivation |
| --- | --- |
| `--ui-bg`, `--ui-surface` | Vuetify `background`, `surface`. |
| `--ui-surface-subtle` | 34% `surface-variant` mixed with `--ui-bg`. |
| `--ui-text`, `--ui-text-muted` | `on-background`; then 62% text mixed with transparent. |
| `--ui-border`, `--ui-border-strong` | 15% / 28% text mixed with transparent. |
| `--ui-primary`, `--ui-on-primary` | Vuetify `primary`, generated `on-primary`. |
| `--ui-focus` | 72% primary mixed with white. |

### Starter CSS variables

Consume the existing aliases, for example:

```css
.teaching-panel {
  color: var(--ui-text);
  background: var(--ui-surface);
  border: 1px solid var(--ui-border);
  border-radius: var(--radius-panel);
  padding: var(--panel-padding);
}
```

This is a usage example, not a second set of token definitions. Edit the plugin or `main.css` for shared roles.

## 3. Typography

The app imports `vuetify/styles` without an application font-family override. Installed Vuetify 3.13.2 declares `Roboto, sans-serif`; no font files, `@font-face`, or remote font CDN are configured by the app. Actual glyphs depend on available fonts. `--font-mono` is `"JetBrains Mono", "Cascadia Code", ui-monospace, monospace`; the named fonts are fallbacks, not bundled assets.

| Surface | Current authored sizing |
| --- | --- |
| Catalog hero | `clamp(2.8rem, 7vw, 6rem)`, line height `.96`; at ≤760px, `clamp(2.8rem, 13vw, 4.2rem)`. |
| Scenario title | `clamp(2.4rem, 5vw, 4rem)`, line height `1.02`. |
| Introductory copy | `1.05rem`, line height `1.7`. |
| Card title | `1.45rem`; other panel/body type uses Vuetify and targeted CSS. |
| Event metadata | Monospace, `.72rem/1.4`, weight `650`. |
| Tour copy | `1rem/1.65`; icon controls retain accessible names. |

The former `--text-display` / `--text-h1` / `--text-body` scale is not a current CSS API. Preserve readable hierarchy without adding a competing scale casually.

## 4. Spacing scale

Vuetify spacing utilities and focused CSS coexist. The original `--space-*` scale is not implemented. Shared layout variables are:

| Token | Value |
| --- | --- |
| `--page-gutter` | `clamp(1rem, 4vw, 3rem)` |
| `--section-gap` | `clamp(2rem, 5vw, 4rem)` |
| `--panel-padding` | `clamp(1.25rem, 3vw, 2rem)` |

Reuse these for page/panel geometry and existing Vuetify utilities or justified local CSS for smaller spacing. The stylesheet contains additional authored values; complete tokenization is not a verified property.

## 5. Component sizing

| Current rule | Value / behavior |
| --- | --- |
| `--page-max` | `80rem` page rail. |
| `--header-height` | `4.5rem`; header rules also specify `72px`. |
| Main actions / text inputs / selects | Minimum height `44px`; theme button `44px` square. |
| Mobile workspace navigation | Minimum button height `40px`. |
| Guided-tour controls | `30px` square with `18px` masked icons. |
| Catalog / lesson illustrations | `16 / 8` / `16 / 9` aspect ratio, with a wide final catalog card exception. |

There is no `--control-*`, `--icon-*`, or `--content-*` token family. Do not claim a universal 44px touch target: tour and workspace-navigation controls have the exceptions above.

## 6. Radius, borders, and elevation

- Controls: `--radius-control: .7rem`; panels: `--radius-panel: 1.25rem`; badges/theme button use pill/circular shapes.
- Default border: `1px solid var(--ui-border)`; stronger borders use `--ui-border-strong`.
- Authored keyboard focus: `3px solid var(--ui-focus)` with `3px` outline offset.
- Shared shadow: `--shadow-panel: 0 .75rem 2.5rem color-mix(in srgb, black 16%, transparent)`.
- Result lanes suppress card shadows. Tooltips and selected illustrations/navigation use the shared shadow.

## 7. Motion

There is no implemented global `120ms / 200ms / 320ms` motion scale or entry/exit easing token API. Preserve deterministic evidence independently of animation.

- `main.css` defaults to smooth page scrolling.
- `prefers-reduced-motion: reduce` changes scrolling to `auto` and CSS animation/transition durations to `.01ms`.
- [WorkspaceNavigator](../apps/lab/src/components/WorkspaceNavigator.vue) selects immediate scrolling for reduced motion.
- [SearchRaceLab](../apps/lab/src/modules/search-race/SearchRaceLab.vue) uses zero playback delay for reduced motion. Other disclosure behavior is scenario-specific.

## 8. Breakpoints and layout

| Implemented query | Rule |
| --- | --- |
| Viewport ≤760px | Single-column catalog, comparisons, timelines, lesson grids and controls; compact header; sticky Controls / Why? / Result navigation; timestamps visually hidden in event rows. |
| Viewport ≤440px | Stack action rows/footer and headings; full-width catalog action. |
| Controls container ≤31rem | Stack targeted control grid / strategy picker, heading and action buttons. |

These authored queries govern lab layout, not the former `--bp-*` table. See [responsive strategy](./09-responsive-and-platform-strategy.md) for platform and validation limits.

## 9. Data visualization

Shipped visualization consists of semantic event lists with sequence, timestamp, label and kind, paired result metrics, and a live state stepper. No chart-library palette or graph renderer exists.

- Abort/discard labels use warning; invariant labels use danger in the broken lane and success in the fixed lane.
- Timelines support arrow-key inspection through [App.vue](../apps/lab/src/app/App.vue).
- “Download visible trace” exports currently revealed events, controls and invariant labels as JSON, rather than unseen future events.
- Future charts must retain equivalent readable evidence; this is a design requirement, not an implemented chart-accessibility claim.

## 10. Layer and z-index tokens

There is no `--z-*` scale. The authored skip link uses `z-index: 2500`; mobile workspace navigation uses `20`. Vuetify and Intro.js own additional overlay layers. Reuse the appropriate existing layer and verify focus/overlay ordering before adding one.

## 11. Framework mapping — current authority

1. [Vuetify plugin](../apps/lab/src/plugins/vuetify.ts): explicitly registered components, card defaults, light/dark roles.
2. [main.css](../apps/lab/src/styles/main.css): aliases, teaching presentation, responsive layout and reduced motion.
3. [tour.css](../apps/lab/src/styles/tour.css): Intro.js tooltip surfaces, icons and focus. [ScenarioLearning](../apps/lab/src/components/ScenarioLearning.vue) attaches the active Vuetify class to the six-step tour mounted outside the app.

Tailwind, `src/styles/tokens.css`, and Tailwind `@theme` are superseded proposals. Framework-independent packages must not depend on Vuetify or CSS tokens.

### Brand asset linkage

Logos contain fixed brand colors rather than dynamic CSS variables. The app serves [public/favicon.svg](../apps/lab/public/favicon.svg) in the browser/header. Dark-theme primary is lighter than the fixed logo blue. See the [brand system](./05-brand-system.md) before updating asset copies.

## 12. Token implementation checklist

Source-inspected facts:

- [x] Light/dark Vuetify roles and application aliases exist.
- [x] Authored focus, skip navigation, reduced motion and responsive rules exist.
- [x] English / left-to-right behavior is explicit in [bootstrap](../apps/lab/src/main.ts); RTL is not a current supported mode.
- [x] Broken/fixed, pending, invalid, warning and invariant outcomes have text plus visual treatments.

Validation obligations for future UI changes:

- [ ] Check contrast for text, icons, focus, status colors and disabled states in both themes; no full contrast audit was run for this refresh.
- [ ] Run relevant [UI quality](../tests/e2e/ui-quality.e2e.ts), [learning](../tests/e2e/learning-experience.e2e.ts), [navigation](../tests/e2e/workspace-navigator.e2e.ts) and [keyboard/trace](../tests/e2e/search-race.e2e.ts) tests. The handoff records this audit’s execution results; rerun affected tests for future UI changes.
- [ ] Inspect rendered desktop/phone states for token/layout changes. Screenshot comparisons require `VISUAL_REGRESSION=1` and local baselines.
- [ ] Add offline, permission or degraded-network treatments when such capabilities are introduced; current lessons run repository-owned fixtures.

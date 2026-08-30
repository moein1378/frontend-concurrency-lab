# Frontend Concurrency Lab — Design Tokens and UI Rules

> These tokens are the visual source of truth. Components must consume semantic roles, not hard-coded color values.

## 1. Visual direction

- **UI stack:** Vue 3 + Vite + TypeScript + Tailwind CSS 4; custom lab components; no SSR
- **Density:** comfortable
- **Primary typeface:** Inter
- **Display typeface:** Inter
- **Default radius:** 10px
- **Motion scale:** 120ms / 200ms / 320ms

## 2. Semantic color tokens

| Token | Value | Purpose |
| --- | --- | --- |
| `--color-brand` | `#2563EB` | Primary actions, selected states, active navigation. |
| `--color-accent` | `#F59E0B` | Secondary emphasis, diagrams, focus highlights. |
| `--color-warning` | `#F59E0B` | Warning, degraded state, half-open state, attention without failure. |
| `--color-success` | `#10B981` | Completed, healthy, connected, safe. |
| `--color-danger` | `#EF4444` | Failure, destructive action, broken scenario, risk. |
| `--color-surface` | `#F8FAFC` | Main light surface or panel background. |
| `--color-canvas` | `#0F172A` | Dark canvas, code/timeline/graph background. |
| `--color-text` | `#0F172A` | Primary readable text. |
| `--color-muted` | `color-mix(in srgb, var(--color-text) 58%, transparent)` | Secondary text. |
| `--color-border` | `color-mix(in srgb, var(--color-text) 16%, transparent)` | Borders and separators. |
| `--color-focus` | `color-mix(in srgb, var(--color-brand) 75%, white)` | Keyboard focus ring. |

### State mapping

- Broken/failing demonstrations always use `danger`; do not communicate failure by red alone—add icon, label, and pattern.
- Warning/degraded/half-open states use `warning`; queued/in-progress states use `accent`.
- Healthy/completed/synchronized states use `success`.
- Neutral infrastructure and inactive graph edges use muted text/border tokens.

### Dark-mode roles

| Token | Dark value |
| --- | --- |
| `--color-surface` | `color-mix(in srgb, #0F172A 88%, white)` |
| `--color-canvas` | `#0F172A` |
| `--color-text` | `#F8FAFC` |
| `--color-muted` | `#94A3B8` |
| `--color-border` | `rgb(148 163 184 / 0.22)` |

### Starter CSS variables

```css
:root {
  --color-brand: #2563EB;
  --color-accent: #F59E0B;
  --color-warning: #f59e0b;
  --color-success: #10B981;
  --color-danger: #EF4444;
  --color-surface: #F8FAFC;
  --color-canvas: #0F172A;
  --color-text: #0F172A;
  --color-muted: color-mix(in srgb, var(--color-text) 58%, transparent);
  --color-border: color-mix(in srgb, var(--color-text) 16%, transparent);
  --color-focus: color-mix(in srgb, var(--color-brand) 75%, white);
}

[data-theme='dark'] {
  --color-surface: color-mix(in srgb, #0F172A 88%, white);
  --color-canvas: #0F172A;
  --color-text: #f8fafc;
  --color-muted: #94a3b8;
  --color-border: rgb(148 163 184 / 0.22);
}
```

## 3. Typography

| Token | Size / line height | Weight | Use |
| --- | --- | --- | --- |
| `--text-display` | `clamp(2.25rem, 5vw, 4.5rem) / 1.02` | 700 | README/site hero only. |
| `--text-h1` | `2rem / 1.15` | 700 | Page title. |
| `--text-h2` | `1.5rem / 1.25` | 650 | Major sections. |
| `--text-h3` | `1.125rem / 1.35` | 600 | Panels and cards. |
| `--text-body` | `1rem / 1.6` | 400 | Default content. |
| `--text-small` | `0.875rem / 1.5` | 400 | Metadata and secondary labels. |
| `--text-caption` | `0.75rem / 1.4` | 500 | Timestamps, badges, chart labels. |
| `--font-mono` | `JetBrains Mono, ui-monospace` | 400–600 | Code, IDs, timings, machine states. |

Use system fallbacks and `font-display: swap`. A remote font CDN must never be required to render or run the project.

## 4. Spacing scale

Use a 4px base. No arbitrary spacing unless documented in a component token.

| Token | Value |
| --- | --- |
| `--space-0` | `0` |
| `--space-1` | `0.25rem` |
| `--space-2` | `0.5rem` |
| `--space-3` | `0.75rem` |
| `--space-4` | `1rem` |
| `--space-5` | `1.25rem` |
| `--space-6` | `1.5rem` |
| `--space-8` | `2rem` |
| `--space-10` | `2.5rem` |
| `--space-12` | `3rem` |
| `--space-16` | `4rem` |
| `--space-24` | `6rem` |

## 5. Component sizing

| Token | Value | Use |
| --- | --- | --- |
| `--control-sm` | `2rem` | Compact filters, toolbar controls. |
| `--control-md` | `2.5rem` | Default buttons and inputs. |
| `--control-lg` | `3rem` | Touch/camera/Mini App primary controls. |
| `--icon-sm` | `1rem` | Inline icons. |
| `--icon-md` | `1.25rem` | Default control icons. |
| `--icon-lg` | `1.5rem` | Status and touch actions. |
| `--content-narrow` | `42rem` | Reading/documentation column. |
| `--content-default` | `72rem` | Standard app content. |
| `--content-wide` | `96rem` | Console/editor/graph layouts. |

## 6. Radius, borders, and elevation

- Radius tokens: `0`, `4px`, `8px`, `10px`, `16px`, `999px`.
- Default border: `1px solid var(--color-border)`.
- Focus ring: `0 0 0 3px color-mix(in srgb, var(--color-focus) 45%, transparent)`.
- Elevation 1: `0 1px 2px rgb(0 0 0 / 0.08)`.
- Elevation 2: `0 8px 24px rgb(0 0 0 / 0.12)`.
- Elevation 3 is reserved for dialogs and floating inspectors: `0 18px 50px rgb(0 0 0 / 0.18)`.

## 7. Motion

- Fast feedback: first duration in `120ms / 200ms / 320ms`.
- Standard state change: second duration.
- Large panel/scene transition: third duration.
- Easing: `cubic-bezier(.2,.8,.2,1)` for entry; `cubic-bezier(.4,0,1,1)` for exit.
- Never animate a value that is the only evidence of a concurrency/failure transition.
- Honor `prefers-reduced-motion`; replace spatial movement with opacity or immediate state change.

## 8. Breakpoints and layout

| Token | Width | Rule |
| --- | --- | --- |
| `--bp-sm` | `40rem` | Small tablet. |
| `--bp-md` | `48rem` | Two-column reading/app layouts. |
| `--bp-lg` | `64rem` | Persistent sidebar/inspector. |
| `--bp-xl` | `80rem` | Wide console/editor. |
| `--bp-2xl` | `96rem` | Multi-panel diagnostic layouts. |

Use container queries for reusable widgets. Do not make component behavior depend only on viewport width.

## 9. Data visualization

- Series 1: `var(--color-brand)`
- Series 2: `var(--color-accent)`
- Healthy: `var(--color-success)`
- Failure: `var(--color-danger)`
- Grid: `var(--color-border)`
- Tooltip background: `var(--color-canvas)` with light text
- Every chart requires a textual/table representation or downloadable data.

## 10. Layer and z-index tokens

| Token | Value |
| --- | ---: |
| `--z-base` | `0` |
| `--z-sticky` | `20` |
| `--z-popover` | `40` |
| `--z-dialog` | `60` |
| `--z-toast` | `80` |
| `--z-debug` | `100` |

Do not introduce arbitrary z-index values. Canvas overlays and video landmarks stay inside their local stacking context.

## 11. Framework mapping — v3 authority

Map semantic CSS variables in `src/styles/tokens.css`; expose selected values through Tailwind `@theme`. Custom lab components consume tokens directly. Do not add a component framework.

### Brand asset linkage

- `--color-brand` drives the primary logo color.
- `--color-accent` drives the secondary logo detail.
- Favicon assets use a white solid glyph on the brand color.
- Regenerate `brand/` assets when brand/accent tokens change.

## 12. Token implementation checklist

- [ ] Light and dark semantic values exist.
- [ ] Contrast is checked for text, icons, charts, disabled controls, and focus rings.
- [ ] RTL layout is tested where text/form UI exists.
- [ ] Keyboard focus is visible on every interactive element.
- [ ] Loading, empty, error, offline, permission, and degraded states have documented visual treatment.
- [ ] Design tokens are included in screenshots and documentation examples.
- [ ] No component contains unexplained hex values, arbitrary z-indexes, or one-off spacing.

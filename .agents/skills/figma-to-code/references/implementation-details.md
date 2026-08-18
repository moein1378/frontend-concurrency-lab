# Figma Implementation Details

Load this for non-trivial screen work.

## Component Reuse

Before creating a new component:
1. inspect Code Connect mapping when available
2. search existing code components by purpose/visual contract
3. compare props/variants/slots
4. adapt via composition before duplicating a primitive

Do not distort a reusable component beyond its intended contract just to avoid a justified new component.

## Tokens

Prefer exact mapped Figma variables or repository semantic tokens.

If Figma uses an exact value the repository lacks:
- verify whether an equivalent token exists under another semantic name
- if not, propose/use the smallest policy-compatible addition
- do not silently choose a visually close but semantically wrong value

## Assets

Prefer exact design assets:
- SVG/icon from design/design system
- source image from asset endpoint/export
- repository-owned equivalent when verified identical/approved

Preserve aspect ratio, crop behavior, and intended rendering size.

## Responsive

Derive responsive behavior from:
- multiple design frames
- Auto Layout/min/max constraints where available
- repository breakpoints/layout primitives

Do not invent a full breakpoint system from one desktop screenshot.

Where only one viewport is provided, preserve fluid/safe layout but mark other breakpoints as inferred/unverified.

## RTL / Directionality

When RTL/bidirectional support is in scope:
- prefer logical CSS properties where compatible with the project
- verify icon direction semantics rather than mirroring every icon
- verify alignment/order/overflow at an RTL reference state
- do not infer RTL from locale examples unless the product/design confirms it

## Routing and Data

Design artifacts do not prove:
- route paths
- API endpoints
- loading/error semantics
- mutation behavior

Resolve those from repository/user requirements.

If the design includes loading/empty/error states, implement them only against a real state/data contract or clearly scoped static component state.

## Accessibility

Match visual design without breaking:
- semantic roles
- labels
- focus behavior
- keyboard interaction
- reduced-motion/project conventions when applicable

If the design omits an accessibility requirement, prefer accessible implementation that does not materially alter intended appearance.

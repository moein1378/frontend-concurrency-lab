# Token Model

Use this as a taxonomy guide, not a mandatory architecture.

## Levels

### Primitive
Raw scales such as palette, spacing, radius, font size.

### Semantic
Meaning independent of component:
- surface-default
- text-muted
- border-danger
- action-primary

### Component
Scoped to a reusable component:
- button-primary-bg
- input-border-focus

### State
Hover/pressed/disabled/selected/focus variants.

### Theme / Mode / Brand
A semantic token may resolve differently by:
- light/dark
- contrast mode
- brand/theme

## Audit Rule

At consumption sites prefer the highest meaningful semantic level the repository already uses. Avoid leaking primitives everywhere when a semantic layer exists.

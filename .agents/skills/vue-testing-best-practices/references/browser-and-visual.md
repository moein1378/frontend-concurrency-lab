# Browser and Visual Testing

Use browser tests for:
- real navigation
- focus/keyboard behavior difficult to emulate
- hydration/browser API behavior
- critical cross-layer journeys
- real layout/visual contracts

Visual snapshots require stable:
- browser/environment
- fonts
- viewport
- deterministic data
- animation state

A screenshot snapshot proves visual regression against a baseline, not necessarily fidelity to Figma. For design parity use `$figma-to-code`.

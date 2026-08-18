# Test Level Decision

Use this decision order.

1. What behavior would fail for a user/system if this regressed?
2. What is the narrowest boundary where that behavior is observable?
3. Does a lower-level test faithfully reproduce the relevant runtime?
4. Is the risk cross-layer, browser-specific, SSR/hydration-specific, or navigation-specific?
5. Is visual appearance itself part of the contract?

## Typical Outcomes

### Unit
Use for pure transformations, validation, parsing, state machines, and isolated domain logic.

### Component
Use when DOM interaction, emitted events, slots, props, keyboard behavior, or rendered state is the contract.

### Nuxt Runtime / Integration
Use when the behavior depends materially on Nuxt runtime context, plugins, router integration, auto-imports, runtime config, or framework lifecycle.

### E2E / Browser
Use when the real browser/network/navigation/integration path is the behavior or lower-level emulation is misleading.

### Visual
Use for exact layout/component fidelity, design-system appearance, or known visual regressions.

## Avoid Duplication

Do not repeat the same assertion at every level. Higher-level tests should prove integration/journey properties that lower-level tests cannot.

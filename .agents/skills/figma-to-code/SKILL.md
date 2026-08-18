---
name: figma-to-code
description: Implement production-ready Vue/Nuxt UI from Figma or equivalent design sources with measured visual fidelity. Use when the design is a source of truth. Require rendered visual evidence for any pixel-perfect claim, reuse real components/tokens/assets, and verify responsive states and important variants.
---

# Figma to Code

Read:
- `../_shared/skill-contract.md`
- `../_shared/repository-preflight.md`
- `../_shared/design-implementation-policy.md`
- `../_shared/evidence-and-completion.md`
- `references/figma-preflight.md`
- `references/visual-verification.md`
- `references/implementation-details.md` for non-trivial screens

## Intent

Translate design intent into maintainable Vue/Nuxt code while preserving the target repository's architecture and proving visual parity at agreed states/viewports.

## Non-Negotiable Rule

Do not call an implementation “pixel-perfect” from source inspection alone.

Pixel-perfect completion requires:
1. authoritative/reference design evidence
2. running implementation evidence
3. a direct visual comparison at known viewport/state
4. no unexplained material deviation

If those capabilities are unavailable, report `implemented-unverified` or `visually-partially-verified`, not `pixel-perfect`.

## Source Priority

Prefer:
1. Figma MCP structured design context
2. Figma reference screenshot(s)
3. Figma variables/component metadata/assets
4. exported specs/assets
5. written design requirements

Repository components/tokens define implementation constraints; design evidence defines intended appearance.

## Workflow

### Phase 1 — Capability & Repository Preflight

Determine:
- Figma access/tooling available?
- screenshot/design-context/variables/metadata capabilities?
- Code Connect mappings available?
- browser/render tooling available?
- visual diff or screenshot tooling available?
- project framework/styling/component/token system
- target route/entry point from repository evidence, never from frame naming alone

Create a compact design manifest using `references/design-manifest.md` for non-trivial screens.

### Phase 2 — Extract Design Evidence

When Figma tooling is available, prefer structured calls for:
- design context
- screenshot
- variables
- metadata for large/complex frames
- Code Connect mappings/components
- assets
- motion context when animation is part of the design

Ask for Vue-oriented output/context when the tool defaults to another framework.

For large frames, inspect relevant subtrees instead of dumping the whole file into context.

### Phase 3 — Repository Reuse Map

Before creating UI primitives, search:
- mapped Code Connect components
- existing components
- existing composables/utilities
- tokens/variables
- icons/assets
- responsive primitives/layout conventions

Do not add an icon package or placeholder asset when the design source already provides the real asset and repository policy permits using it.

### Phase 4 — Implement by Stable Boundaries

Implement in dependency order:
1. layout shell
2. reusable mapped/existing primitives
3. content/state variants
4. responsive behavior
5. interaction/accessibility
6. motion only when evidenced

Do not invent:
- routes
- API/data contracts
- missing states
- business rules

If design shows data but no source exists, use the repository's established fixture/placeholder convention only when explicitly appropriate.

### Phase 5 — Visual Verification Loop

At each required viewport/state:
1. render implementation in a stable environment
2. capture screenshot
3. compare against reference
4. classify mismatch
5. correct implementation or document justified deviation
6. re-render and re-compare

Mismatch classes:
- geometry
- spacing
- typography
- color/token
- border/radius/shadow
- asset/icon
- responsive breakpoint/layout
- state/variant
- RTL/directionality
- clipping/overflow

Use `references/visual-verification.md`.

### Phase 6 — Engineering Verification

Run relevant:
- typecheck
- lint
- targeted tests
- route/runtime check
- accessibility interaction checks
- SSR/hydration check if affected

### Phase 7 — Independent QA for High-Fidelity Work

For broad screens or explicit pixel-perfect requirements, prefer a separate `visual_qa` subagent after implementation. The implementer should not be the only judge of visual parity.

## Failure Protocol

Read `references/failure-modes.md`.

Do not silently downgrade:
- Figma unavailable → use equivalent explicit artifacts only if sufficient
- browser unavailable → implementation may continue, but no pixel-perfect claim
- exact asset unavailable → stop or document the missing asset; do not fabricate a substitute
- design and code system conflict → surface the conflict and choose according to user/project authority

## Definition of Done

A pixel-perfect task is `done` only when:
- target states/viewports are identified
- design evidence is captured
- existing component/token reuse was checked
- implementation is rendered
- visual comparison completed
- all material mismatches are resolved or documented/approved
- engineering checks relevant to changed code pass

## Final Report

Include:
- scope and target node/frame
- reused vs created components
- tokens/assets used and exceptions
- viewports/states verified
- visual evidence paths/results
- engineering checks run
- documented deviations
- final completion status

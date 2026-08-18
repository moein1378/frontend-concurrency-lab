# Design Implementation Policy

## Source Hierarchy

1. structured design source (for example Figma MCP/context)
2. reference screenshot at known dimensions
3. design variables/specs/assets
4. explicit written requirements
5. repository design system and current product conventions

When sources conflict, record the conflict. Do not silently choose the most convenient source.

## Reuse Before Creation

Search for:

- Code Connect/component mappings when available
- existing project components
- design tokens/variables
- icons/assets
- established responsive primitives

Create a new primitive only when no compatible existing abstraction exists.

## Exactness

Do not substitute “closest” visual values if exact design information is available.

When an existing semantic token is close but not equivalent:

- prefer the exact approved design value/token
- or create/propose the smallest justified token addition
- document an exception if the repository policy requires reuse over exactness

## Pixel-Perfect Meaning

“Pixel-perfect” means no unexplained visual deviation at agreed reference states/viewports.

It requires rendered evidence. Source-code inspection alone is insufficient.

The visual gate should cover, as applicable:

- geometry/alignment
- spacing/sizing
- typography
- colors/borders/shadows/radii
- assets/icons
- responsive layout
- important variants/states
- directionality
- clipping/overflow

Rasterization noise caused by OS/browser/font rendering should be handled through a stable environment and an explicit tolerance, not by ignoring structural mismatches.

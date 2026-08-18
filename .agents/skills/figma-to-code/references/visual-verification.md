# Visual Verification

## Stable Conditions

For meaningful pixel comparison, keep stable:
- viewport
- browser engine/version when possible
- device scale factor
- fonts loaded
- animations disabled or settled
- deterministic data
- locale/direction
- theme/mode
- network-loaded assets ready

## Reference States

Verify only states the design actually defines or the user explicitly requests, but do not ignore obvious responsive frames/variants present in the source.

Typical set:
- desktop
- tablet when design differs materially
- mobile
- hover/focus/selected/disabled for important controls
- loading/empty/error if provided
- RTL if the product supports it and the design/source includes it

## Comparison

Prefer automated visual comparison when the repository already has suitable tooling. Otherwise perform direct side-by-side/overlay inspection and save evidence when possible.

Do not define “pixel perfect” as literal zero different raster pixels across arbitrary environments. Font rasterization and browser/OS differences can create noise.

Instead require:
- no unexplained geometry mismatch
- no wrong typography metrics/family/weight where observable
- no wrong asset
- no wrong design token/value
- no missing/extra element
- no responsive/state mismatch
- pixel diff below the project's approved tolerance when an automated baseline exists

## Report Template

```yaml
state: default-desktop
reference_viewport: 1440x1024
reference: ...
actual: ...
diff: ...
result: pass|fail|exception
mismatches:
  - class: geometry
    detail: ...
exceptions:
  - ...
```

# Design Manifest

For non-trivial UI, capture a compact manifest before implementation.

Suggested structure:

```yaml
source:
  type: figma
  file_or_url: ...
  node: ...
reference_states:
  - name: default-desktop
    viewport: 1440x1024
  - name: default-mobile
    viewport: 390x844
components:
  - design_name: ...
    code_mapping: existing|new|unknown
tokens:
  variables_confirmed: true|false
assets:
  - ...
interactions:
  - ...
responsive:
  - ...
directionality: ltr|rtl|both|unknown
unknowns:
  - ...
```

Do not turn the manifest into a duplicate of all Figma metadata. Store only information that drives implementation/verification.

# Figma Preflight

## Capability Matrix

Record each as `available`, `unavailable`, or `unknown`:

- structured design context
- screenshot capture
- metadata/tree inspection
- variable/token extraction
- Code Connect mappings
- asset retrieval
- motion context
- browser/render tooling
- screenshot/visual-diff tooling

## Preferred Figma MCP Use

When available, prefer the current Figma MCP tools by purpose:
- `get_design_context` — structured design context; request Vue-oriented context rather than accepting framework-default output blindly
- `get_screenshot` — visual ground truth for the selected design
- `get_metadata` — sparse structure/IDs/sizes for navigating large files before requesting detailed context
- `get_variable_defs` — exact variable/style names and values used by the selection
- `get_code_connect_map` — mappings from Figma instances to real code components
- `get_motion_context` — keyframes/easing/coordination when the selection contains animation
- `download_assets` — exported assets or original source images when files must be reused in implementation
- `search_design_system` — remote design-library lookup when available and useful

Use `get_screenshot` for visual inspection and `download_assets` when the implementation needs actual exported/original files.
Do not replace a supplied image/SVG/icon with a package placeholder merely for convenience.

## Route Safety

A Figma frame name such as “Dashboard” is not evidence that `/dashboard` exists.

Resolve target route/page from:
- repository routes/pages
- explicit user instruction
- existing navigation contracts

If unresolved, implement the component/screen boundary without inventing routing.

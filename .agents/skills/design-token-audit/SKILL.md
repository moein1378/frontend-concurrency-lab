---
name: design-token-audit
description: Audit Vue/Nuxt UI for raw visual values that bypass the project's real design system, map values to verified semantic tokens, and propose the smallest justified token additions. Use for colors, spacing, typography, radii, shadows, z-index, motion, or theme consistency.
---

# Design Token Audit

Read `../_shared/skill-contract.md`, `../_shared/repository-preflight.md`, and `../_shared/design-implementation-policy.md`.

## Intent

Improve design-system consistency without replacing exact design intent with merely similar values.

## Workflow

### 1. Discover the Token System

Detect:
- token source files
- CSS variables / preprocessor variables
- Tailwind/theme config when present
- design-system package(s)
- theme/mode/brand variants
- component-level tokens
- generated tokens vs authored tokens

Do not assume Tailwind or any specific taxonomy.

### 2. Build the Token Graph

Classify available tokens where possible:

`primitive -> semantic -> component -> state -> theme/mode`

Example conceptually:

`blue-600 -> color-action-primary -> button-primary-bg -> button-primary-hover-bg`

Prefer semantic/component tokens at consumption sites when that is the project's convention.

### 3. Inventory In-Scope Raw Values

Audit only requested/changed scope unless the user asks for a repository-wide audit.

Capture:
- file/location
- raw value
- property/use
- current visual context
- exact existing token matches
- approximate matches
- theme/mode implications

### 4. Classify

For each finding:

- **valid exact token available** → reuse it
- **semantic token exists but consumption is wrong** → map to it
- **no exact token; repeated semantic concept exists** → propose smallest token addition
- **one-off intentional exception** → document, do not force a misleading token
- **approximate token only** → do not substitute automatically

### 5. Apply Safely

Preserve:
- exact rendered intent
- theme/dark-mode behavior
- component variants
- responsive states
- public CSS/API contracts

### 6. Verify

Prefer:
- static token search
- type/build/style checks
- rendered visual verification for user-facing changes
- light/dark/brand mode checks when affected

## Quality Gates

- no “closest token” substitution without an approved/documented reason
- new tokens have a coherent semantic owner
- raw values left behind are classified, not forgotten
- theme/mode regressions are checked when relevant

## Output

Return a table/report with:
- finding
- classification
- replacement/proposal
- evidence
- verification
- intentional exceptions

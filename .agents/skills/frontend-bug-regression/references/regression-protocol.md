# Regression Protocol

## Red Evidence Options

Best to weaker:
1. run test before applying fix
2. temporarily reproduce old condition in a controlled branch/worktree
3. demonstrate existing failure/reproduction and show test encodes it
4. if red proof is unsafe/impractical, state that limitation explicitly

Do not fabricate a red result.

## Regression Boundary

Choose:
- unit when pure logic owns the defect
- component when rendered interaction owns it
- Nuxt runtime when framework context owns it
- E2E when browser/cross-layer behavior owns it
- visual when appearance itself regressed

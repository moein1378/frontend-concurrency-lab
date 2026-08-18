# Figma Failure Modes

## Figma Access Fails

If screenshots/specs supplied by the user are sufficient, continue from them and state that structured Figma metadata was unavailable.

If exact spacing/typography/assets cannot be resolved, do not claim pixel-perfect completion.

## Design Context Is Too Large

Use metadata/tree navigation to identify relevant nodes and request smaller subtrees.

## Figma Returns Framework-Specific Code

Treat generated code as context, not as implementation authority. Request Vue-oriented context when possible and map to the repository's conventions.

## Code Connect Missing

Search the repository manually for equivalent components. Record that the mapping was inferred from source, not confirmed by Code Connect.

## Token Conflict

Do not force a merely close token. Escalate the mismatch or document the exact-value exception.

## Browser / Visual Tooling Missing

Implementation can proceed if the design is clear, but visual verification remains incomplete. Final status must say so.

## Missing Asset

Do not invent an icon or image that changes design intent. Use the exact asset if available; otherwise identify the missing dependency/source.

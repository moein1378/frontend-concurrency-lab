# Evidence and Completion

## Evidence Classes

### E0 — Unverified inference
Reasonable from code shape, but not executed or observed.

### E1 — Static evidence
Confirmed by source/config/type information.

### E2 — Focused runtime/test evidence
Confirmed by a relevant test, targeted command, or controlled reproduction.

### E3 — End-to-end/visual evidence
Confirmed through the running application, browser flow, screenshot comparison, or production-equivalent integration path.

Use the lowest evidence class that actually proves the requested behavior. Do not demand E3 for work E2 proves well.

## Completion Claims

Use precise language:

- `done`: required evidence achieved
- `done-with-documented-exception`: approved/justified deviation remains
- `implemented-unverified`: implementation exists but a required runtime/tool check could not run
- `blocked`: required input/capability prevents safe progress
- `reviewed`: review-only scope completed without edits

## Final Report Minimum

State:

- scope changed/reviewed
- important decisions
- evidence/checks actually run
- deviations/exceptions
- remaining uncertainty or blockers

Never list a command as “verified” if it was not executed successfully.

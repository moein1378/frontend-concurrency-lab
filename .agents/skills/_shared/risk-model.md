# Risk Model

Use risk to decide depth, tests, and review.

Score qualitatively across:

- **Impact:** cosmetic → workflow → data/security/financial
- **Reach:** isolated component → shared primitive → app-wide
- **Reversibility:** easy rollback → migration/irreversible side effect
- **Uncertainty:** well-covered/known → poorly understood/ambiguous
- **Runtime sensitivity:** pure code → async/browser/SSR/concurrency
- **History:** stable → prior regressions/flakiness/incidents

## Suggested Bands

### Low
Small isolated behavior, easy rollback, strong existing coverage.

### Medium
Shared component/composable, async integration, meaningful user workflow.

### High
Auth/permissions, financial or irreversible writes, shared architecture, security, SSR/hydration, concurrency/race, critical browser journey.

High risk does not mean “write every possible test.” It means stronger evidence and an independent review are justified.

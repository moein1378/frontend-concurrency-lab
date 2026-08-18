# Agent Kit Evals

These evals are regression scenarios for the agent instructions themselves.

They are intentionally project-agnostic. Run them against a small fixture repository or use them as review cases when changing a skill/role.

Each case defines:
- setup
- task
- expected behavior
- unacceptable behavior

A skill update should not be considered production-ready if it regresses a P0/P1 eval.

Suggested cadence:
- run skill audit on every kit change
- review targeted evals for changed skills
- run full eval suite before publishing a new version

# Parallelization Policy

Use subagents to isolate context or parallelize genuinely independent work.

Good parallel tasks:

- codebase mapping vs documentation/API verification
- visual QA vs code review after implementation
- independent test-plan analysis for separate packages
- multiple read-only audits of different concerns

Do not parallelize:

- two writers modifying the same files
- dependent implementation steps
- reviewers before the implementation is stable enough to inspect
- tasks where sharing the same evolving local state is essential

Subagents should return concise evidence, not raw logs.

# Phase 06 handoff — v0.9.0

Release-candidate hardening is implemented: keyboard timeline navigation, responsive/phone coverage, bundle budget enforcement, cross-browser CI, dependency review, architecture ADR, failure catalog, renamed build artifact, and post-deploy smoke test.

Local non-browser checks are deterministic. Cross-browser execution requires installed Playwright binaries; CI installs them explicitly. Publishing remains a GitHub-authorized workflow action.

Next: freeze public primitive contracts, complete trace downloads/accessibility evidence, and prepare v1.0.0 release notes.

# Frontend Concurrency Lab — Rollback Runbook

## Trigger and limits

Use this procedure for a verified regression in the deployed static app. The deployment workflow has no automatic rollback, revision selector, or retained-artifact restoration step. A post-deploy smoke failure can occur after the new deployment is already live; it does not automatically restore the old one.

## Recover

1. Record the failing Pages deployment URL, actual deployed revision, failing route/action, and last known-good revision. Distinguish an HTTP fallback status from a browser rendering failure.
2. Inspect Pages/Actions deployment history and confirm whether a known-good artifact remains available. Retention and redeployment controls depend on remote settings and are not verified here.
3. If a retained artifact can be restored through an approved Pages recovery path, deploy it and verify its contents. Otherwise prepare a reviewed corrective change on `main` that restores the affected behavior from the known-good revision while preserving unrelated changes, run the normal gate, and deploy it.
4. Do not treat **Run workflow** as a version rollback: the existing manual workflow rebuilds the selected ref with default checkout behavior and offers no explicit known-good SHA input. Confirm the ref and resulting revision before using it.
5. Repeat the live-demo browser smoke checks and confirm catalog/deep links, both search protections, and the affected scenario. Record the restored revision and observed outcome.

## State and follow-up

The current app has no backend database or provider migration. Browser state is limited to local theme preference and a cross-tab lesson ownership key. Use that lesson's Reset control to clear its stale claim; do not indiscriminately clear all origin storage. A static rollback does not itself clear browser storage.

Write an incident note with the trigger, affected/restored revisions, recovery evidence, and a focused prevention step. Changes to deployment pinning, deep-link smoke policy, or automatic rollback require their own implementation and verification.

## Verification provenance

- Last verified: 2026-11-14; source baseline `19640ebd8169ce625b2a093caafc1ca2483b6a84` plus the inspected working tree.
- Confidence: high for source/configuration facts; command descriptions are not evidence that those commands passed.
- Evidence paths below are repository-root relative. Recheck the listed inputs after relevant changes.
- Stale-sensitive evidence: `.github/workflows/deploy-demo.yml`, `apps/lab/src/pages/CrossTabPage.vue`, `apps/lab/src/components/LabHeader.vue`; remote Pages settings/artifact retention remain unverified.

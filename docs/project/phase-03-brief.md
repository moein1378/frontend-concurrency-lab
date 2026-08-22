# Phase 03 brief — Mutual exclusion

Status: implemented

The phase teaches payment-like double submit and overlapping save-form mutations with identical deterministic inputs. The protected invariant is: at most one mutation owns the critical section, and one user intent creates at most one effect.

The fixed lane uses FIFO mutex ownership. Waiting cancellation removes the waiter, release is idempotent, and `runExclusive` releases in `finally`. The teaching fixture shows release and queued recovery after success, failure, timeout, and cancellation. Timeout/cancellation are cooperative local endings; they do not roll back an already-completed remote effect.

Reviewer route: `/scenario/mutual-exclusion/compare`.

Evidence: concurrency-core mutex tests, scenario-engine mutual-exclusion tests, root integration test, Playwright reviewer journey, structured progressive timeline.

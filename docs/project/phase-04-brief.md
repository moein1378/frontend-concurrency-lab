# Phase 04 brief — Bounded concurrency

Status: implemented

Both lanes receive the same deterministic upload jobs and capacity. The broken lane starts every job; the fixed lane models FIFO semaphore permits. Evidence exposes active permits, queue depth, wait time, cancellation, completion, release, and the peak-capacity invariant.

The semaphore exposes active/available/queued state, grants FIFO waiters, removes aborted waiters, and returns permits through idempotent releases and `finally`.

Reviewer route: `/scenario/bounded-concurrency/compare`.

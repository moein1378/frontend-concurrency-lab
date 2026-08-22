# Phase 05 brief — Single-flight and deduplication

Status: implemented

The comparison normalizes resource cache keys and gives both lanes the same fan-out subscribers. Broken callers start one producer each; fixed callers share one in-flight promise. Subscriber cancellation stops only that subscriber and does not cancel group-owned work. Rejection and synchronous throws remove registry entries so retry is possible.

Stale-while-refresh is taught as composition: cached stale data may render immediately while single-flight coalesces only the refresh. Single-flight itself does not retain a completed value.

Reviewer route: `/scenario/single-flight/compare`.

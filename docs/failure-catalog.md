# Failure catalog

| Failure | Observable symptom | Violated invariant | Protection | Important limitation |
| --- | --- | --- | --- | --- |
| Stale search write | Older results replace current intent | Visible results belong to latest query | Abort propagation or freshness token | Abort is not server rollback |
| Double-submit mutation | Two overlapping effects | One critical-section owner and one effect per intent | FIFO mutex plus idempotency | Local locking is not network exactly-once |
| Unbounded uploads | Active work exceeds capacity | Peak active ≤ configured permits | Fair semaphore | Capacity is a product/resource trade-off |
| Duplicate fetch producers | Same key starts repeated work | One producer per in-flight key | Single-flight registry | In-flight sharing is not caching |

All demonstrations use repository-owned deterministic fixtures. Broken and fixed lanes share controls; sequence IDs resolve equal timestamps.

# Behavior Contract

Capture only affected items.

```yaml
component_api:
  props: [...]
  emits: [...]
  slots: [...]
rendered_behavior:
  accessibility: [...]
  key_dom_states: [...]
routing:
  paths: [...]
  query_params: [...]
state:
  store_or_composable_contracts: [...]
integration:
  requests_payloads: [...]
  persistence: [...]
runtime:
  ssr: [...]
  hydration: [...]
  browser_only_effects: [...]
timing:
  observable_async_ordering: [...]
```

## Characterization Tests

When behavior is poorly documented and the refactor is risky, add characterization tests around the public behavior before restructuring.

Do not freeze accidental implementation details as “contract.”

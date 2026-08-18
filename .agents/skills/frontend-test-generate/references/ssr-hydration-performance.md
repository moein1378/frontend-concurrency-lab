# SSR, Hydration, and Performance-Related Testing

## SSR / Hydration

Add focused coverage when behavior depends on:
- browser-only API usage
- server/client state divergence
- serialized payload/state
- hydration timing
- client-only rendering
- async data ownership across server/client

Possible evidence levels:
- server-rendered output
- Nuxt runtime test
- browser hydration test

Choose the cheapest level that reproduces the actual failure mode.

## Performance

Do not add performance tests by category alone.

Use them when there is:
- an explicit performance budget/SLO
- known regression
- expensive rendering/virtualization/lazy-loading contract
- user-requested performance work

Test the specific property, for example:
- virtualized list does not render the entire dataset
- lazy chunk/component is not loaded before trigger
- critical performance metric stays within an agreed threshold in a controlled environment

Avoid brittle micro-benchmarks in noisy CI unless the project has a stable benchmark harness.

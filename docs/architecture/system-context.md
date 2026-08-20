# System context

The reviewer interacts with a client-rendered Vue SPA. The app invokes repository-owned, framework-independent scenario code in the same browser runtime. The deterministic clock, latency generator, event log, latest-wins coordinator, and AbortSignal propagation perform no network, storage, worker, or provider I/O.

Phase 2 has one trust boundary: the seed, response-order, and fixed-strategy controls are user input. They select deterministic fixture behavior and are never interpreted as code or sent outside the browser. No secrets, authentication, paid service, or hosted adapter is involved.

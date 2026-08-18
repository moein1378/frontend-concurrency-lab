# System context

The reviewer interacts with a client-rendered Vue SPA. The app invokes repository-owned, framework-independent scenario code in the same browser runtime. The deterministic clock, latency generator, and event log perform no network, storage, worker, or provider I/O.

Phase 1 has one trust boundary: the seed and response-order controls are user input. They select deterministic fixture behavior and are never interpreted as code or sent outside the browser. No secrets, authentication, paid service, or hosted adapter is involved.

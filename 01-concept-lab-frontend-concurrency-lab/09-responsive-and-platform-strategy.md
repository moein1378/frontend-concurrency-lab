# Frontend Concurrency Lab — Responsive and Platform Strategy

## Product decision

Adaptive desktop-first lab; usable on tablet, with phone mode limited to single-column experiment playback.

## Rendering/platform rationale

Client-rendered SPA. SSR provides no meaningful benefit because every experiment is interactive and browser-runtime dependent.

## Layout rules

- Start with semantic layout regions and container queries for reusable modules.
- Use the project spacing, type, control-size, and breakpoint tokens from `03-design-tokens.md`.
- Mobile-first projects begin at 320px and progressively enhance.
- Desktop-first engineering tools define an explicit reduced mobile surface rather than compressing every panel.
- Safe-area insets are applied where the application runs inside Telegram, PWA, or mobile browser chrome.
- Hover is never the only route to an action.

## Capability policy

- Detect capabilities; do not infer them from user-agent strings.
- Advanced APIs have a documented fallback or sample mode.
- Camera/wallet/file-system permissions include denied, dismissed, unavailable, and revoked states.
- Service workers have an update and stale-chunk recovery strategy.
- Cross-origin isolation is enabled only when SharedArrayBuffer materially benefits a measured workload.

## Performance budgets

- Initial application shell JavaScript target: <= 200KB gzip for standard apps; heavy editor/vision modules are route- or action-lazy.
- Main-thread long tasks above 50ms are instrumented in vision/editor scenarios.
- Images and video previews specify dimensions and are lazy loaded.
- Charts, Three.js, MediaPipe, OpenCV.js, wallet clients, and graph libraries load only on their owning surfaces.
- Core Web Vitals are measured on the public demo where applicable.

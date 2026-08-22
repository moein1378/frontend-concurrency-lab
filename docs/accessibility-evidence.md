# Accessibility evidence — v1.0.0

- Keyboard: skip link, controls, tours, language/theme controls, and trace download use native interactive elements. Timelines are focus regions; Up/Down focuses individual events with a visible token-based outline.
- Structure: failures and invariants include text labels and symbols, never color alone. Timelines are ordered lists with sequence, virtual time, event label, and event kind.
- Motion: CSS honors `prefers-reduced-motion`; search playback becomes immediate in JavaScript when reduced motion is requested.
- Language: English and Persian message keys are contract-tested; document `lang`/`dir` changes and technical values remain isolated LTR.
- Responsive: Playwright includes a Pixel 7 project; phone CSS collapses comparisons and timelines into a usable single column with 44px controls.
- Download: the footer exports currently visible structured trace evidence as JSON without a network request.

Automated browser execution is configured for Chromium, Firefox, WebKit, and phone. Local execution requires installed browser binaries; CI installs them explicitly.

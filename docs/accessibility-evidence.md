# Accessibility evidence — v1.1.0

- Keyboard: skip link, scenario controls, theme control, and trace download use native interactive elements. Timelines are focus regions; Up/Down focuses individual events with a visible token-based outline.
- Structure: failures and invariants include text labels and symbols, never color alone. Timelines are ordered lists with sequence, virtual time, event label, and event kind.
- Motion: CSS honors `prefers-reduced-motion`; search playback becomes immediate in JavaScript when reduced motion is requested.
- Language: the document is explicitly English and left-to-right.
- Responsive: Playwright includes a Pixel 7 project; phone CSS collapses comparisons and timelines into a usable single column. Section navigation uses 40px-high buttons; compact tour icons retain accessible button names.
- Guided tours: opaque theme surfaces and icon-only controls retain accessible button names and visible keyboard focus.
- Mobile section navigation: the selected item has an active style and `aria-current="location"`; native buttons remain keyboard operable. Selection follows activation, not manual scrolling.
- Download: the footer exports currently visible structured trace evidence as JSON without a network request.

Automated browser execution is configured for Chromium, Firefox, WebKit, and phone. Local execution requires installed browser binaries and their system dependencies; CI installs both explicitly.

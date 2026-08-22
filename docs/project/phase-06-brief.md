# Phase 06 brief — Hardening and portfolio release candidate

Status: implemented

The release candidate hardens every scenario with focusable arrow-navigable structured timelines, phone single-column layout, reduced-motion behavior, a 200 KiB gzip JavaScript budget, and Chromium/Firefox/WebKit/phone Playwright projects. CI installs browsers and runs the full gate. GitHub Pages deploys only after CI and smoke-tests a stable route.

Architecture is recorded in ADR 0003 and user-visible concurrency failures are indexed in `docs/failure-catalog.md`.

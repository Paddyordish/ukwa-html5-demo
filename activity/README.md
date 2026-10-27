# UKWA · Spot the hazard

Open `index.html` in a modern browser, or serve this directory from any static host. No build, analytics, storage or LMS APIs. Logo and scene artwork are local. Raleway is requested from Google Fonts, with system fallbacks when unavailable. See `../docs/branding.md` for the shared identity.

## Embed

Host this directory over HTTPS and point the course iframe at its `index.html`. Use `title="UKWA warehouse hazard practice"`, `width="100%"` and an initial height of around 1000px. Allow vertical scrolling: content grows when feedback and the recap appear, particularly on mobile. If the host uses a sandbox, scripts must be allowed. There is no undocumented parent messaging or automatic height integration. Test actual course sizing and native navigation using the preserved `../embed-test.html` and sandbox checklist.

Internal progress is practice only. Reloading resets it. No Nucleus completion, SCORM communication, score reporting or durable resume is implemented.

## Content and assets

The improved `Warehouse_Operations_Rise_Development_Pack copy.zip` and original SCORM were unavailable in this execution session (not attached/mounted; no matching accessible shared source was located). This build does **not** claim to have inspected either archive. Content selection follows the existing repository's `docs/demo-plan.md`, which identifies Unit 2, page 99909 and the three hazards: climbing racking, spillage and unstable boxes. Responses and feedback are newly authored conservative practice copy and need review against the original course before course use.

`assets/warehouse.svg` is an original vector illustration created for this experiment, not extracted from either source archive. Its hazards and percentage hotspots share a 1440 × 900 coordinate system. The scene always retains that aspect ratio, with no cover cropping. Replace the illustration and recalibrate coordinates together if the supplied image is recovered.

## Interaction and access

Six native hotspot buttons; Tab and Enter/Space activate controls. Arrow keys move between all markers. Escape returns to the scene and restores marker focus. The automatic magnifier follows mouse/pen movement; marker focus magnifies the corresponding area. Touch users can hold the image for inspection or tap markers for the detail panel. Each inspection has an enlarged crop and textual description. Wrong choices allow retry; each correctly reviewed hazard counts once. All six lead to a recap and restart. Reduced motion removes animation and smooth scrolling.

## Validation — 27 October 2026

- JavaScript syntax check passed.
- DOM journey passed: wrong response and retry; three correct responses; progress deduplication; revisiting; recap; reset; marker arrow navigation; Escape; focus calls; magnifier toggle.
- SVG XML and asset references checked; no external runtime dependencies.
- `embed-test.html` is byte-for-byte unchanged from main.
- **Browser rendering, real mobile/touch, assistive technology and Nucleus embedding remain unverified.** Browser automation was unavailable in the environment; its configured HTTP proxy also refused connections. DOM checks do not establish browser layout or accessibility conformance.

Before course use, verify at desktop, tablet and 375px mobile widths, at 200% zoom, with keyboard and reduced motion, and inside the actual Nucleus block. Review learning copy against the original SCORM and replace the fallback artwork if preferred.


## Revision: six inspection areas and automatic magnification

The scene now includes three additional, newly authored practice hazards: a blocked exit, damaged racking upright and discarded strapping. Existing hazards are scaled down to encourage inspection. All six decisions and feedback require course-content review before production use.

The magnifier appears automatically for mouse/pen movement over the image and hides on exit. There is no toggle. Focus on a marker magnifies its area; arrow keys move among all six markers. Touch users can hold the image for a detail and tap markers for a larger inspection. Visible markers are 26px (24px on mobile), with 44px interactive targets. The lens never intercepts marker clicks.

## Validation of this revision

Passed JavaScript syntax and DOM journey checks for all six correct responses, incorrect response/retry, progress deduplication, recap, reset, arrow-key wrap and lens positioning. Passed SVG XML, marker/progress counts and byte comparison of the supplied logo. The browser runtime was unavailable and its installation failed, so rendered desktop/mobile layout and real pointer/touch behaviour still require visual review. Nucleus embedding remains unverified.

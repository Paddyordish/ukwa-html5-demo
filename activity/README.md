# UKWA stationary-scene activity

A lean practice block for native Nucleus course content. The official UKWA logo, colours, Raleway, six hazards and inherited feedback are preserved. No source archives or learning sections are added.

## Embed contract

After merge and a successful Pages publication, use:

https://paddyordish.github.io/ukwa-html5-demo/activity/embed-20261028-v9.html

Use the root README/hub's responsive wrapper and iframe code: **100% width; height clamp(560px, width × 5/8 + 96px, 871px)**, at least 320px available width. The host rounds that height up to whole pixels to avoid iframe viewport truncation. The scene keeps its **8:5** ratio, with 52px toolbar and 44px footer at default text size. Supported desktop examples are 943×686, 1024×736 and 1240×871; mobile stays 560px high for readable dialogs. There is no single whole-iframe aspect ratio because the controls and mobile minimum also need space.

The component's maximum height follows that same width formula (using rem for enlarged internal text), bounded by its actual iframe height. The workspace is pure white, with no border or padding. The image fills the workspace width whenever the host gives it enough height; constrained older frames scale it proportionally instead of cropping or overflowing. Widths above 1240px and spare mobile space are white. The source entry and all portable compatibility embeds are regenerated together.

No question or feedback participates in sizing the workspace. Resizing the host changes the scene dimensions once through the existing container sizing; opening or closing popups, retries, feedback, hints, completion and restart do not. The image, invisible buttons and magnifier continue to share the same local scene rectangle.

The Nucleus page can scroll normally to reach content before or after this fixed block. That moves the whole iframe in the parent page, which is expected. The activity itself must have no horizontal/vertical document scrolling in the normal supported journey. No parent messaging, auto-height manipulation or root overflow-hiding is used.

## Exploration and magnification

The picture and marker coordinates share an 8:5 scene rectangle. CSS container units fit that rectangle without reacting to question/feedback content; a ResizeObserver fitting fallback exists only for browsers without container-unit support. No transforms or scrolling move the underlying image. Invisible 44px native inspection buttons provide generous targets and visible outlines only on keyboard focus. No permanent circles, numbers, dots or halos cover the artwork.

Mouse/pen entry shows the lens automatically. Its centre follows the pointer directly, without an upward offset or trailing interpolation. The circle clamps inside the image at its edges; its background position separately samples the point under the pointer at the lens centre. The sample uses the border box and 3× scaling. It has `pointer-events: none`, so hotspot and nearby-area clicks pass through.

Only the inspection point selects an area. The nearest hazard within a 26px CSS-pixel radius turns the lens rim UKWA red and shows an outside “Inspect” label. Explored areas use a green rim and “Explored — inspect again”. A hazard merely visible elsewhere inside the glass is not selected. Clicking empty space does nothing. Overlapping circular regions resolve to the nearest centre, with array order breaking exact ties. Pointer clicks on invisible buttons use the same coordinate resolver; keyboard activation uses the focused button.

Touch users can tap an invisible inspection region, or hold the picture still for 320ms to magnify. Moving more than 10px cancels the hold and suppresses an accidental scene click. Release, cancellation, resize and window blur hide the lens. Native vertical panning and pinch zoom remain available; horizontal panning is not enabled and the picture is not draggable.

The optional “Help me find one” button outlines only the first remaining hazard for 2.6 seconds, then removes the outline. Opening a popup or restarting clears it immediately. A live-region message names that hint for nonvisual users. Reduced motion shows a static timed outline. Hints skip already explored hazards and disable once all six have been opened.

## Questions, feedback and completion

A native modal `dialog` appears centred over the workspace; its backdrop dims the still-visible warehouse. Each popup has a framed SVG close-up, hazard name/description, question and choices, retry/correct feedback, and a visible × Close button. Feedback replaces choices; it is not appended below the activity. Continue closes the popup. Empty backdrop clicks do not select another hazard.

The dialog has an accessible name/description, receives heading focus, wraps Tab/Shift+Tab at its controls, closes with Escape and returns focus to the selected marker. The rest of the iframe is inert while it is open; no surrounding course document is made inert. The magnifier stays hidden throughout the popup. The asynchronous native close event is guarded so a queued event cannot close a newly reopened dialog.

Tab, Enter/Space, wrapped arrow keys and Home/End retain marker access. All focus moves use preventScroll. Progress counts each distinct hazard when its popup opens: “6 of 6 explored”. Correct answers are tracked separately only to preserve practice feedback on reopening. Once all six have opened, closing the final popup shows “Activity complete ✓” beside progress in a reserved toolbar slot. Its polite atomic live region announces the transition once. It persists through continued exploration, and restart clears both exploration and answer state. The footer restart remains available throughout. No completion overlay covers the image; its dimensions and toolbar geometry stay unchanged.

At enlarged text or unusually small frames, the **popup itself** can scroll vertically to retain every control, rather than clipping text or shrinking it excessively. Normal supported frames are checked for no popup overflow. The source document and surrounding course are not forcibly locked with overflow-hidden styles. Reduced motion removes hint fading; pointer tracking has no animated lag.

## Build, tracking and boundaries

Run `python3 scripts/build-preview.py` after changing source, logo or scene. It creates all five identical portable files: `preview.html`, `embed-20261027.html`, `embed-20261027-v7.html`, `embed-20261027-v8.html`, and `embed-20261028-v9.html`. Build metadata is `embed-20261028-v9`. The supplied logo bytes and original embed test remain unchanged. Raleway retains the existing Google Fonts request with system fallbacks.

Activity progress is in-memory practice only. Reload resets it. There are no Nucleus, SCORM, xAPI, storage, course-completion or durable-resume API calls. Tracking limitations belong in these developer notes, not in learner-facing copy. Use native assessment/tracking blocks for supported recorded course progress.

The original SCORM and improved asset ZIP remain unavailable in this execution session. Six-hazard learning copy and artwork are inherited from the reviewed repository work. Review feedback against course content and site procedures before production use. See `../docs/branding.md` for the official identity baseline.

## Checks

- `python3 tests/check-assets.py`: independent feature anchors/marker spacing, SVG XML, original logo/embed-test hashes, release metadata, hub links and reproducible portable files.
- `npm run test:browser`: source/portable browser journeys, unchanged scene/image/marker bounds, zero normal document/popup overflow, centred/edge-clamped sampling, nearby and empty clicks, native dialog focus/close, retries, feedback, progress and restart; enlarged-text/small-height popup fallback.
- `npm run test:discovery`: invisible resting buttons, timed hints, nearest-region overlap arbitration, red/green discovery states, outside labels, keyboard Space/focus, touch tap/hold/cancellation.
- `npm run test:completion`: six openings without requiring correct answers, repeat-open deduplication, deferred completion announcement after the final popup closes, continued decisions, stable toolbar/scene and restart.
- `npm run test:fit`: exact recommended iframe wrapper at nine widths, full scene proportions/width, white spare space, all six selectable targets and unchanged bounds through dialogs.
- `npm run test:iframe`: local native-neighbour harness, modal focus containment, keyboard exit after closing, browser-generated touch gestures, parent scrolling versus iframe scrolling.

Install Playwright/Chromium for these commands, or set CHROMIUM_PATH to an installed browser. Browser checks use isolated profiles and a local server. Production font requests are intercepted for deterministic fallback typography. Screenshots/results go to ignored `work/`.

See `../docs/layout-verification.md` for measured before/after evidence and outstanding real Nucleus/device checks.

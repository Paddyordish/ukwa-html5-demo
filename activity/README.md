# UKWA stationary-scene activity

A lean practice block for native Nucleus course content. The official UKWA logo, colours, Raleway, six hazards and inherited feedback are preserved. No source archives or learning sections are added.

## Embed contract

After merge and a successful Pages publication, use:

https://paddyordish.github.io/ukwa-html5-demo/activity/embed-20261027-v8.html

Set the iframe to **100% width, 560px height, border 0, display block**, with at least 320px available width. Keep its height fixed rather than using a width-derived aspect ratio. The root README and hub include the exact code. The source entry and compatibility embed are regenerated too; the new release filename avoids stale split HTML/CSS/JS caches.

The activity fills the available iframe height up to 560px, with compact toolbar/footer tracks and one definite workspace. Tall standalone windows cap the component at 560px, rather than adding space before the scene. The warehouse sits at the top of the workspace and scales uniformly to fit its width and height. No question or feedback participates in sizing that workspace.

The Nucleus page can scroll normally to reach content before or after this fixed block. That moves the whole iframe in the parent page, which is expected. The activity itself must have no horizontal/vertical document scrolling in the normal supported journey. No parent messaging, auto-height manipulation or root overflow-hiding is used.

## Exploration and magnification

The picture and marker coordinates share an 8:5 scene rectangle. CSS container units fit that rectangle without reacting to question/feedback content; a ResizeObserver fitting fallback exists only for browsers without container-unit support. No transforms or scrolling move the underlying image. Invisible 44px native inspection buttons provide generous targets and visible outlines only on keyboard focus. No permanent circles, numbers, dots or halos cover the artwork.

Mouse/pen entry shows the lens automatically. Its centre follows the pointer directly, without an upward offset or trailing interpolation. The circle clamps inside the image at its edges; its background position separately samples the point under the pointer at the lens centre. The sample uses the border box and 3× scaling. It has `pointer-events: none`, so hotspot and nearby-area clicks pass through.

Only the inspection point selects an area. The nearest hazard within a 26px CSS-pixel radius turns the lens rim UKWA red and shows an outside “Inspect” label. Reviewed areas use a green rim and “Reviewed — inspect again”. A hazard merely visible elsewhere inside the glass is not selected. Clicking empty space does nothing. Overlapping circular regions resolve to the nearest centre, with array order breaking exact ties. Pointer clicks on invisible buttons use the same coordinate resolver; keyboard activation uses the focused button.

Touch users can tap an invisible inspection region, or hold the picture still for 320ms to magnify. Moving more than 10px cancels the hold and suppresses an accidental scene click. Release, cancellation, resize and window blur hide the lens. Native vertical panning and pinch zoom remain available; horizontal panning is not enabled and the picture is not draggable.

The optional “Help me find one” button outlines only the first remaining hazard for 2.6 seconds, then removes the outline. Opening a popup or restarting clears it immediately. A live-region message names that hint for nonvisual users. Reduced motion shows a static timed outline. Hints disable once all six are reviewed.

## Questions, feedback and completion

A native modal `dialog` appears centred over the workspace; its backdrop dims the still-visible warehouse. Each popup has a framed SVG close-up, hazard name/description, question and choices, retry/correct feedback, and a visible × Close button. Feedback replaces choices; it is not appended below the activity. Continue closes the popup. Empty backdrop clicks do not select another hazard.

The dialog has an accessible name/description, receives heading focus, wraps Tab/Shift+Tab at its controls, closes with Escape and returns focus to the selected marker. The rest of the iframe is inert while it is open; no surrounding course document is made inert. The magnifier stays hidden throughout the popup. The asynchronous native close event is guarded so a queued event cannot close a newly reopened dialog.

Tab, Enter/Space, wrapped arrow keys and Home/End retain marker access. All focus moves use preventScroll. A compact completion card and restart remain within the unchanged workspace; the scene remains visible and reviewable. Each correct decision counts once.

At enlarged text or unusually small frames, the **popup itself** can scroll vertically to retain every control, rather than clipping text or shrinking it excessively. Normal supported frames are checked for no popup overflow. The source document and surrounding course are not forcibly locked with overflow-hidden styles. Reduced motion removes hint fading; pointer tracking has no animated lag.

## Build, tracking and boundaries

Run `python3 scripts/build-preview.py` after changing source, logo or scene. It creates all four identical portable files: `preview.html`, `embed-20261027.html`, `embed-20261027-v7.html`, and `embed-20261027-v8.html`. Build metadata is `embed-20261027-v8`. The supplied logo bytes and original embed test remain unchanged. Raleway retains the existing Google Fonts request with system fallbacks.

Activity progress is in-memory practice only. Reload resets it. There are no Nucleus, SCORM, xAPI, storage, course-completion or durable-resume API calls. Tracking limitations belong in these developer notes, not in learner-facing copy. Use native assessment/tracking blocks for supported recorded course progress.

The original SCORM and improved asset ZIP remain unavailable in this execution session. Six-hazard learning copy and artwork are inherited from the reviewed repository work. Review feedback against course content and site procedures before production use. See `../docs/branding.md` for the official identity baseline.

## Checks

- `python3 tests/check-assets.py`: independent feature anchors/marker spacing, SVG XML, original logo/embed-test hashes, release metadata, hub links and reproducible portable files.
- `npm run test:browser`: source/portable browser journeys, unchanged scene/image/marker bounds, zero normal document/popup overflow, centred/edge-clamped sampling, nearby and empty clicks, native dialog focus/close, retries, feedback, progress and restart; enlarged-text/small-height popup fallback.
- `npm run test:discovery`: invisible resting buttons, timed hints, nearest-region overlap arbitration, red/green discovery states, outside labels, keyboard Space/focus, touch tap/hold/cancellation.
- `npm run test:iframe`: local native-neighbour harness, modal focus containment, keyboard exit after closing, browser-generated touch gestures, parent scrolling versus iframe scrolling.

Install Playwright/Chromium for these commands, or set CHROMIUM_PATH to an installed browser. Browser checks use isolated profiles and a local server. Production font requests are intercepted for deterministic fallback typography. Screenshots/results go to ignored `work/`.

See `../docs/layout-verification.md` for measured before/after evidence and outstanding real Nucleus/device checks.

# UKWA warehouse practice for Nucleus V2

A small practice interaction between native Nucleus introduction/objective and assessment blocks. This revision builds on PR #3's supplied official logo, Raleway, six-hazard vector scene, decisions and automatic lens. It does not replace that work with a second implementation.

## Run and embed

Serve the repository root and embed `activity/index.html` over HTTPS with a descriptive iframe title and width 100%. Keep the parent `assets/brand/` folder: the official logo is referenced from there. Start around 850px high on desktop and allow vertical scrolling; mobile decisions below the image need more height. Native sizing and navigation must be checked in Nucleus V2. Scripts are required. No automatic parent resizing or undocumented messaging is used.

`preview.html` is the same activity with the exact logo and vector scene embedded. Open it directly or serve it. Generate it with `python3 scripts/build-preview.py` after changing the activity, scene or logo. Do not edit the generated preview separately. Raleway uses the existing Google Fonts request with system fallbacks; test the font request under the host's content policy.

The production GitHub Pages copy remains controlled by the repository's existing publication route. This work is proposed on a branch; neither main nor its live site is overwritten without merge. The hosted review Page contains the same generated preview.

## Layout and controls

Initially only the understated, proportionate official logo, compact activity progress and full-width scene appear, with a single exploration hint. Six 18px markers retain 44px targets. They remain visible, brighten near the lens and have distinct keyboard focus. Feature coordinates drive both marker placement and keyboard inspection; the scene retains its 1440 × 900 aspect ratio without cover cropping. Target separation is checked down to 320px width.

Mouse/pen entry shows the lens immediately. Its position and sampled vector region ease together; reduced motion updates immediately. It is offset above the sampled detail, constrained to the image and never intercepts input. It disappears on pointer exit and while a decision is open.

Touch users hold the image still for 320ms to inspect. Movement beyond 10px, release, pointer cancellation, loss of window focus or resize cancels inspection. No touch movement is prevented and no pointer is captured: vertical scrolling and pinch zoom stay native. Tapping a marker opens its close-up directly. Physical touch-device testing is still needed.

Tab reaches every marker; arrows wrap, Home/End reach first/last. Marker focus magnifies its feature. Enter/Space opens a decision and focuses the heading without forced scrolling. Escape and Return to scene restore marker focus. Desktop decisions overlay the scene's right side without resizing it; markers are hidden while the decision is open. On smaller screens the panel follows the image. The panel has its own vertical overflow when needed on desktop; native course navigation remains reachable by Tab. There is no focus trap or scripted scrolling.

Correct decisions count once and remain reviewable. Wrong answers offer retry. All six reveal a short summary and restart. No score or assessed pass condition is shown.

## Tracking and content boundaries

Progress exists in this document's memory only. Reload resets it. It does not call Nucleus, SCORM, xAPI, storage or completion APIs, and does not record course completion or durable resume. Those limitations belong in these developer notes, not the learner interface. Use native blocks for assessed checks and supported course tracking.

The original SCORM and improved development ZIP remain unavailable in this session. Hazard selection and response copy are inherited from PR #3 and the repository's source notes, with original vector artwork rather than an extracted source image. Review all six responses against course content and site procedures before production use. Branding bytes remain unchanged; see `../docs/branding.md`.

## Validation on 27 October 2026

Passed: JavaScript syntax; DOM-driven journey through all six correct responses and retries, revisiting, progress deduplication, summary/reset, keyboard wrap/Home, focus/Escape, lens entry/movement/exit, touch hold/release/movement/cancel and suppression during decisions. DOM emulation checks logic, not browser layout.

Passed: SVG XML; independent feature/marker alignment calculations; non-overlapping 44px targets at 320, 375, 768, 1024 and 1440px; exact Git blob hashes for the supplied logo and original embed test; reproducible standalone preview generation; no forced scrolling or leftover course-page/technical tracking copy.

Not completed: rendered desktop/mobile layout, actual pointer and touchscreen gestures, font loading, reduced-motion rendering, screen-reader use or Nucleus V2 embedding. Chromium failed to launch because the sandbox rejected its crashpad socket. The configured runtime proxy also refused outbound connections. These are explicit verification limits, not passed browser checks.

Re-run static checks with `python3 tests/check-assets.py` from the repository root. For browser checks: `npm install`, `npx playwright install chromium`, then `npm run test:browser`. Set `CHROMIUM_PATH` only when using an already installed browser. The committed browser test covers five viewport widths, full journeys, marker geometry, fixed scene dimensions, overflow, keyboard focus, lens and synthetic touch events, and saves screenshots in ignored `work/`. Physical scrolling/pinch and in-course testing remain separate.

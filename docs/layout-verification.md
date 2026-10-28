# Full-width scene fit (v9)

Built on latest main `d54a303` (merged PR #7); no open PRs were present. This targeted change preserves the discovery/dialog implementation. No new screenshot was attached to the request; current-main source and the available earlier screenshots informed diagnosis, followed by new local browser screenshots.

The old 560px height left only 464px for the scene, which constrained its 8:5 width even inside wider hosts. The component now uses a width-derived maximum height: 5/8 of available width plus 6rem of controls, bounded between 560px and 871px at default text size. The recommended host wrapper uses the same formula with 96px controls and rounds UP to a whole CSS pixel: fractional iframe outer heights otherwise produce an integer-rounded inner viewport in Chromium. Workspace and document backgrounds are pure #FFFFFF. There is no new crop, stretch, artwork change, padding or border.

The component still contains the entire scene in shorter legacy frames. At mobile widths the 560px minimum retains readable decisions; unused lower space is white. Above 1240px, the existing maximum scene width is retained and spare sides are white. Popups, hints, feedback and completion do not size the scene. The existing coordinate-based lens, invisible targets and hint outlines are unchanged.

## v9 checks

Isolated Chromium 154.0.8037.57, Linux; deterministic fallback fonts:

- Full six-hazard wrong/retry/correct/review/close/completion/restart journeys at 943×686, 1024×736, 1240×871, 768×576, 375×560, 320×560, legacy 943×530 and tall standalone 943×1600. Scene/image/button bounds remained unchanged in normal states, with no document or popup scrolling. Keyboard trapping, Escape, restored focus, centred/edge lens sampling and point activation passed.
- Exact recommended responsive iframe wrapper at 320, 375, 599, 600, 768, 943, 1024, 1240 and 1440px widths: every hazard button fits inside the visible complete image; all six dialogs open/close without resizing it. Scene fills available width up to 1240px. Live host resizing also checks pointer discovery and sampled coordinates.
- Example measured scene bounds: 943px host → x=0, y=52, 943×589.375; 1024px → 1024×640; 1240px → 1240×775; 375px → 375×234.375. A 1440px host retains the 1240px scene with white 100px sides. Full desktop and mobile screenshots were visually inspected; no navy workspace bands remain.
- Dedicated discovery checks passed at 943/375/320px, including 35 overlapping-region samples at 320px, actual overlap click arbitration, explored states, hints, focus outlines, keyboard Space and touch tap/hold/cancellation.
- 200% text and short-frame popup fallback, five identical/reproducible portable files and updated hub code/links. Source scene SVG, logo bytes and original embed test are preserved.
- The iframe/native-neighbour harness checks stable surrounding controls, modal focus trapping/exit, and browser-generated touch gestures. Native parent panning is expected; iframe document scroll and local scene coordinates remain fixed.

The completion follow-up separates distinct popup openings from correct-answer practice. Desktop 943×686 and mobile 375/320×560 checks (including 200% text at 320px) open all six without correct answers, repeat one opening, exercise incorrect feedback in the final popup, and assert the polite “Activity complete ✓” remains absent until closing it. Continued decisions and restart work; toolbar and scene rectangles remain unchanged. A fixed toolbar slot replaces the old completion card, with “6 of 6 explored” progress and footer restart.

Run `npm run test:completion`, `npm run test:static`, `npm run test:browser`, `npm run test:fit`, `npm run test:discovery`, and `npm run test:iframe`. The fractional iframe probe identified the subpixel sizing issue and passed with the rounded host formula. An enlarged-text completion check caught footer row overflow; responsive wrapping now passes with unchanged header and scene bounds, no clipped completion text, and zero document overflow at 200%.

Real Nucleus authoring/learner views, host CSS/HTML sanitisation, physical devices, Safari/Firefox, screen readers and production Google Fonts loading remain unverified. If the LMS accepts only a URL and fixed height, use the size table in README; existing 560px desktop blocks must have their host height updated to gain full image width. The activity cannot resize a cross-origin parent iframe itself.

The following sections retain the prior discovery and layout root-cause records; their older fixed-height recommendations and measurements are historical.

# Magnifier-led discovery (v8)

Built on latest main `02dfe90` (merged PR #6); no open PRs were present. Permanent marker artwork is removed. Invisible buttons retain the existing hazard anchors; the same nearest-centre 26px resolver handles pointer highlights and clicks, including overlaps at narrow widths. Keyboard focus alone outlines its 44px button. Touch holds now also work directly over those invisible buttons.

A 44px footer accommodates the optional hint control, and the scene fits the remaining fixed workspace before the journey begins. Dialog, feedback, recap and restart do not resize it. The lens rim and outside label provide discovery and reviewed states; hint outlines expire after 2.6 seconds even with reduced motion. The portable source, compatibility files, v8 file and hub are regenerated together.

The verification commands are `npm run test:static`, `npm run test:browser`, `npm run test:discovery` and `npm run test:iframe`. Chromium checks cover six journeys and responsive bounds, 320px nearest-region overlap arbitration, hints, rim/label states, invisible targets, keyboard and touch. Real Nucleus, physical devices, Safari/Firefox, screen readers and production font loading remain unverified.

The following is the retained v7 root-cause and measurement record; its numeric rectangles describe that earlier toolbar/footer layout.

# Stationary scene and compact dialogs

The change starts from main commit `1f7ee3abbf13c89c05671ecebf987964e4413671`. Main and open PRs were rechecked after the popup request; no open PRs contained another implementation to preserve.

## Reproduced cause before editing

The last main commit appended a second CSS block overriding the viewport-fit frame with content height, a flow-sized image, state-specific workspace minimums and a scrollable panel. The tests had also been changed to permit vertical scrolling and scroll controls into view, so they no longer proved the requested stationary behaviour.

Local Chromium measurements before editing:

| Frame | Exploration activity height | Open-question activity height | Document result |
| --- | ---: | ---: | --- |
| 943 × 530 | 671.375px | 671.375px | 671px document; native scroll moved the scene by 141px |
| 320 × 560 | 282px | 562px | Document grew beyond the viewport when opening a question |
| 375 × 530 | 316.375px | 562px | Document grew by about 246px when opening a question |

These probes did not reproduce intrinsic horizontal overflow in headless Chromium: document scrollWidth equalled clientWidth. The state-dependent vertical overflow can also change available width on systems with a non-overlay scrollbar, but that lateral-scrollbar mechanism was not directly observed on the headless platform. The fix removes the content-height change and normal scrollbars rather than masking horizontal overflow.

## Implementation

One definite frame, with zero page margins, 100% inline sizing (not 100vw), bounded grid tracks and no state-specific minimum height, owns the image. CSS container units preserve the picture's 8:5 proportions in the available width/height. Image dimensions, marker positions and focus calls are independent of question/feedback content. Normal body overflow is not hidden.

A native modal, plus explicit Tab boundary wrapping, occupies the top layer over the unchanged image. Its content is compact and responsive, and an exceptional small-frame/enlarged-text case scrolls the popup rather than cutting off controls. Close-up viewBoxes include independently specified hazard anchors. Normal questions, retries and feedback must fit without a scrollbar.

The lens is centred on the pointer with no deliberate offset or trailing interpolation. Its circle and sampled coordinates are handled independently at edges. Only the inspection-point radius selects a hazard; the lens's visible footprint does not activate everything it contains.

## Verification record

Passed in isolated Chromium **154.0.8037.57** on Linux:

- Full six-hazard journeys at 943×530, 1024×560, 768×560, 375×560, 320×560 and 943×1600. Every question/retry/correct/return/recap/restart state had unchanged scene, image and marker bounds, zero document scroll offsets, no horizontal/vertical document overflow, and no normal popup overflow.
- All point-based activation areas, direct marker activation, empty clicks, a hazard appearing elsewhere in the lens without activation, centred/edge-clamped 3× sampling, pointer-events pass-through, keyboard focus/wrapping, Escape and visible Close action.
- Enlarged text (200% at 320×560) and a short frame (375×360) retained all controls through the popup's scrolling fallback, with unchanged underlying scene bounds.
- Three portable routes and the hub's release URL/code. The official logo, scene SVG and original embed-test files are unchanged.
- A 943×560 iframe/native-neighbour harness retained its outer height and following-control position through all decisions. Focus stayed in the modal until closing, then could leave to a native-style control.
- Browser-generated Chromium touch gestures: sideways dragging moved neither inner document nor scene. A vertical gesture scrolled the parent harness by about 80px while the iframe's scroll offset remained zero. This is emulation, not a physical-device result.

The same diagnostic probe after the fix measured:

| Frame | Activity height in every measured state | Scene rectangle in every measured state | Native scroll extent |
| --- | ---: | --- | --- |
| 943 × 530 | 530px | x=111.5, y=52, 720×450 | x=0, y=0 |
| 320 × 560 | 560px | x=0, y=52, 320×200 | x=0, y=0 |
| 375 × 530 | 530px | x=0, y=52, 375×234.375 | x=0, y=0 |

Desktop/mobile screenshots were visually inspected. Font requests were intercepted for deterministic fallback typography; reduced-motion source journeys and default-preference portable entry points were exercised. The committed tests assert all four scene/image rectangle components, all six marker rectangles, document scroll offsets and dimensions at every normal journey state. They do not scroll controls into view during normal checks. Enlarged-text fallback checks explicitly exercise the popup scroller.

The iframe test distinguishes normal parent-course movement from activity movement: it records parent scroll separately from the iframe's scroll and local scene coordinates. A vertical course gesture may move the iframe as a whole while its own scene remains fixed; a sideways gesture must not pan its scene.

This is a local iframe/native-neighbour harness, not the actual Nucleus authoring or learner application. Real Nucleus configuration, Safari/Firefox, physical touch hardware, screen-reader operation and production font loading remain target-environment checks. Chromium-emulated touch gestures are identified as emulation rather than physical-device testing.

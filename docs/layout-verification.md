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

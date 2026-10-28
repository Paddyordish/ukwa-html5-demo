# Mandatory Nucleus embed standard

Patrick confirmed on 28 October 2026 that **no internal scrolling is allowed in any Nucleus course embed**. This applies to new work and revisions.

- The surrounding native Nucleus page is the only scrolling surface.
- No horizontal/vertical scrolling inside the iframe, dialogs, transcript, feedback or other nested panes.
- Hidden scrollbars are not sufficient: all text, controls and focus targets must fit without clipping.
- Text reveals, feedback, completion and replay must not resize or shift the scene unexpectedly.
- Reserve an appropriate parent iframe height and adapt the layout within it. If the frame is too small, increase the native block's frame height or redesign the content; do not introduce internal scrolling.
- Supply the exact supported embed code and dimensions. Verify the real Nucleus block rather than assuming it supports automatic parent resizing.
- Test document overflow AND actual element bounds in all interaction states, including mobile, text-only and error states. Test that a wheel/trackpad gesture over the embed scrolls the parent page instead.
- Keep keyboard focus and text accessible. Any accessibility-related host resizing must also preserve this no-internal-scroll rule; do not add a scrolling fallback.

## Intro v02

The iframe fills its available frame using a fixed grid: photo/text scene, player controls and status. Show all text exposes the full transcript in the existing reserved text positions; the redundant expandable transcript section is removed. Narration and cue timings are unchanged.

Recommended iframe: width 100%, aspect ratio 16:11, minimum height 640px, maximum height 850px; fallback height 760px. For URL-only authoring controls use 760px, then verify the real native page at the intended desktop/mobile widths. No parent messaging integration is assumed.

Older versioned releases remain historical snapshots. Use current hub code for Nucleus builds.

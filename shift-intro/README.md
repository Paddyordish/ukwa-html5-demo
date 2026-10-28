# UKWA animated shift introduction

Current build: **shift-intro-v02**. Current release: `intro-20261028-v02.html`.

The approved UK female narration is unchanged (`../assets/audio/U00_Intro_Female_UK_v01.mp3`, 19.644 seconds). The supplied warehouse hero stays still. The official UKWA logo and approved text are retained.

Paragraphs fade in using the audio playback position, including pause and seek. Replay resets the sequence. Show all text reveals the complete transcript in the reserved text positions, without expanding the embed. Reduced motion shows all text immediately. Playback starts from a learner gesture. Leaving the tab/page pauses audio.

## Mandatory no-internal-scroll layout

Only the surrounding native course page may scroll. This applies to all Nucleus embeds; see `../docs/nucleus-embed-standard.md`.

The intro fills the iframe using three grid rows: scene, audio controls and status. There is no expandable transcript or other nested scrolling surface. The text positions are reserved during animation; revealing paragraphs does not change layout height. Tests check actual text/control bounds as well as overflow, so merely hiding a scrollbar is not treated as success.

Use current code from the hub, or:

```html
<iframe src="https://paddyordish.github.io/ukwa-html5-demo/shift-intro/intro-20261028-v02.html" title="UKWA: Your shift is about to begin" width="100%" height="760" scrolling="no" style="display:block;width:100%;height:auto;aspect-ratio:16/11;min-height:640px;max-height:850px;border:0" loading="lazy"></iframe>
```

For URL-only authoring controls set iframe height to **760px**, then test at the intended course widths. Do not reduce the frame below its supported height or solve a host-sizing problem by introducing scrolling. No automatic parent resizing is assumed. The real Nucleus block must be checked to ensure it retains the supplied iframe styles or an adequate configured height.

This block plays its own audio to keep the animation synchronised. Use it without a duplicate native player playing the same clip. There is no LMS score, completion or durable resume integration.

## Cue timings

- Heading: 0.00s.
- Paragraph 1: 2.23s.
- Paragraph 2: 11.13s.
- Paragraph 3: 15.29s.

The supplied script and detected narration pauses establish these timings. Listening review in the real course remains useful. If the recording changes, retime the cues.

## Validation

`tests/intro-frame.cjs` passed in headless Chromium at 1240, 943, 768, 600, 375 and 320px widths, using the actual recommended iframe inside a longer parent page. Checks cover idle, full-text, revealed narration and audio-error states: no document or nested overflow, complete text and controls within frame bounds, and wheel scrolling delivered to the parent page while the iframe remains stationary. Desktop and mobile screenshots were reviewed.

`tests/shift-intro.cjs` checks actual MP3 playback, all cue boundaries, pause/seek, text-only mode, ending, replay, keyboard activation/Escape, missing-audio handling, reduced motion and JavaScript-disabled text access. Google Fonts is blocked during browser checks to test readable fallbacks.

Physical touch, Safari/VoiceOver, enlarged-text host sizing and the real Nucleus embed remain to be tested. They must preserve the same no-internal-scroll requirement; a scrolling fallback is not permitted.

Regenerate the release with `python3 scripts/build-shift-intro.py`. Run either test file with Playwright installed; `CHROMIUM_PATH`, `CHROMIUM_ARGS` (JSON array) and `PLAYWRIGHT_MODULE` can select an existing test browser. Older versioned releases remain historical snapshots; use the current hub release.

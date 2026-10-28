# UKWA animated shift introduction

Build: shift-intro-v01. This is a small standalone HTML5 introduction for embedding in a native Nucleus course.

The approved UK female narration is the exact original MP3 in `../assets/audio/U00_Intro_Female_UK_v01.mp3` (19.644 seconds). The supplied new warehouse hero has been optimised to JPEG; the photo stays still. UKWA's official supplied logo is reused without recolouring.

The heading and three paragraphs fade in while narration plays. Timing follows `audio.currentTime`, including pause and seek, rather than independent timers. All text remains visible at the end. Replay resets the sequence. Show all text and a full transcript support reading without audio. Reduced motion shows every paragraph immediately. Audio pauses when the browser tab is hidden or the page is left. No autoplay is attempted.

## Cue timings

- Heading: 0.00s.
- Paragraph 1: 2.23s, just before speech resumes at approximately 2.33s.
- Paragraph 2: 11.13s, just before speech resumes at approximately 11.23s.
- Paragraph 3: 15.29s, just before speech resumes at approximately 15.39s.

Paragraph boundaries were aligned using the supplied script and detected narration pauses. Fine timing and voice/text alignment should still be reviewed by listening in the actual browser.

## Embed

Use the published `/shift-intro/` URL. Start with an iframe width of 100% and height of about 850px, with scrolling available for smaller screens, transcript expansion or enlarged text. The frame uses content height, not the host viewport. There is no automatic parent resizing or completion/resume integration. No global keyboard interception is used; Escape pauses playback while focus is inside this document.

Example:

```html
<iframe src="https://paddyordish.github.io/ukwa-html5-demo/shift-intro/" title="UKWA: Your shift is about to begin" width="100%" height="850" style="border:0" loading="lazy"></iframe>
```

This block plays its own audio to keep animation synchronised. Do not simultaneously play the same narration through a separate native audio block.

## Maintenance

Update the cue times whenever narration changes. Update the build marker and CSS/JS query versions with each revision. The scene and approved text are not a replacement for the native course overview, knowledge checks or LMS progression.

## Validation

Headless Chromium checks passed at widths 1240, 943, 600, 375 and 320px: image/text layout, no horizontal overflow or clipped hero text, actual MP3 playback, all paragraph cue boundaries, pause/seek, text-only mode, ending, replay, keyboard activation/Escape, and a real missing-audio response. Reduced-motion and JavaScript-disabled cases passed. Desktop and mobile screenshots were visually reviewed. Google Fonts was blocked for those checks to verify readable system fallbacks.

Fine narration-to-paragraph alignment still needs a listening review. Physical touch, Safari/VoiceOver and the real Nucleus iframe have not been tested here.

Run `node tests/shift-intro.cjs` from the repository with Playwright and its Chromium browser installed. `CHROMIUM_PATH`, `CHROMIUM_ARGS` (JSON array) and `PLAYWRIGHT_MODULE` can select an existing test browser. Regenerate this release with `python3 scripts/build-shift-intro.py` after edits.

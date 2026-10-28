# Warehouse guide practice question

A single untracked question built from `docs/guide-question-build-brief.md`. It uses the three supplied Unit 1 question/correct/retry MP3s and their exact companion transcript text. A is correct; B and C lead to the same supportive retry. It is a new practice treatment, not an original SCORM scored question.

## Learner behaviour

The opening guide appears neutral with the question; correct feedback uses a pleased expression, and retry uses a thoughtful, encouraging expression. The generated expression sheet is an edit of `shift-intro/assets/warehouse-hero.jpg`, preserving the woman's identity, PPE and tablet; the original photo is untouched. The 2046×768 PNG contains three 682px-wide portraits, rendered through separate SVG viewBoxes and faded between states. No lip sync is implied. Portrait and content frame bounds stay fixed across question, feedback and retry; reduced motion removes fades.

The full question and choices are visible from the outset. Nothing plays automatically on page load. Play question, Replay or submitting an answer are explicit learner actions. Submission shows the full feedback text immediately and starts the relevant narration. One audio element owns all clips, so previous playback stops before another source loads. Mute persists across question/feedback/retry within the session. Play/Pause, Replay, Mute/Unmute, Try again and Practise again are keyboard/touch accessible.

Feedback and narration failures never hide readable content. Replay reloads failed media and allows recovery. Pending play promises are cancelled logically during transitions so stale failures cannot overwrite the new state. Escape, document visibility changes, pagehide and window blur pause playback. Native radio controls support Arrow keys and Space; focus moves to the feedback heading on submission and back to the first radio on retry.

There is no SCORM, xAPI, Nucleus, score, resume, analytics or persistent-storage integration. Correct ends this local practice only. The authoring hub's GitHub API publication checks are separate code and never load in the learner block.

## Source, release and sizing

Source: `index.html`, `style.css`, `app.js`. Run `python3 scripts/build-guide-question.py` to regenerate `guide-question-20261028-v01.html`; it inlines this activity's CSS/JS but shares the exact official logo, PNG and supplied MP3s by relative URL. Do not edit the generated file directly.

Proposed learner URL, awaiting verified publication:

```text
https://paddyordish.github.io/ukwa-html5-demo/guide-question/guide-question-20261028-v01.html
```

```html
<div style="container-type:inline-size;width:100%">
  <iframe
    src="https://paddyordish.github.io/ukwa-html5-demo/guide-question/guide-question-20261028-v01.html"
    title="UKWA: Why safety matters — guide practice"
    width="100%" height="1120"
    style="display:block;width:100%;height:round(up,max(45rem,calc(78rem - 40cqw)),1px);border:0"
    loading="lazy"
  ></iframe>
</div>
```

The parent wrapper makes cqw relative to the available native block width. At the default 16px root font the supported heights are:

| Width | Height |
| --- | --- |
| 1240px | 752px |
| 943px | 871px |
| 768px | 941px |
| 600px | 1008px |
| 375px | 1098px |
| 320px | 1120px |

The minimum height at very wide widths is 720px. Rem-based sizing grows with browser text enlargement; at 320px and 200% text the supported iframe height is 2368px. The host is intentionally tall enough for full text, choices and controls. No document, transcript, feedback or other nested scroller is used, and overflow is not hidden to make tests pass. Short fixed frames and host CSS sanitisation must be corrected in Nucleus. The native course page owns scrolling; the activity does not resize its parent or claim native completion.

## Publication

The hub card stays awaiting publication with Open/Copy disabled until a successful newest-main Pages deployment, exact HTTP 200 version/build marker and successful character/all-three-MP3 HEAD checks. A later failed recheck disables the links again.

`.github/workflows/verify-guide-publication.yml` runs after relevant main pushes or manual dispatch on main. It waits for a successful Pages deployment of that exact commit, requests the exact learner URL, checks its build marker and compares SHA-256 hashes of the deployed PNG, logo and all three MP3s with the checked-out repository files. Only then does it produce `work/guide-publication.json`, an artifact and a successful verification run. No production-ready link may be reported before this evidence exists. A PR alone is not publication; previous user instructions prohibit automatic merging.

## Validation

- `npm run test:guide`: real MP3 decoding, question/correct/retry durations with MP3 padding tolerance, all A/B/C answers, exact visible feedback transcripts, replay/end/pause/mute, rapid transitions, network error/recovery, focus, reduced motion and fixed text/control bounds at the sizes above including 200% text.
- `npm run test:guide-frame`: exact responsive iframe, fixed neighbouring native blocks, native keyboard exit and resulting blur pause, parent wheel scrolling, blocked-play fallback/recovery, visibility/pagehide handling and emulated mobile touch.
- `npm run test:guide-hub`: pending/failed/old deployment, wrong/missing page, missing portrait/audio, correct release, URL/embed copy/fallback and revocation.
- `npm run test:guide-publication`: verification fails for old/failed deployments, wrong/missing HTML and mismatched media bytes; matching HTTP/build/media succeeds.
- Existing activity static/publication checks remain available. Supplied narration, intro and hazard activity files are untouched.

Browser checks use isolated Chromium 154.0.8037.57 on Linux, a local range-capable server and deterministic fallback fonts. Existing narration assets are unchanged: supplied file durations are question 6.191s, correct 13.479s, retry 10.841s. Actual Nucleus authoring/learner views, host sanitisation, physical devices, Safari/Firefox, screen readers, human listening review and production font loading require target-environment checks. Chromium audio playback/decoding tests do not claim physical speaker output.

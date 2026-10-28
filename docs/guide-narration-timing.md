# Guide narration start timing v02

The approved v01 used one audio element, preloading metadata for only the question. Every feedback submission assigned a new src and called load, so the correct/retry clip first downloaded and decoded after the visible reaction. Returning to the question discarded that feedback source again. There was no intentional timer or wait for the expression fade, but focus could force layout before play was requested.

## Approved MP3 inspection

Decoded the original files with FFmpeg `silencedetect=noise=-45dB:d=0.02`. Quiet lead-in ended at approximately:

| Clip | Initial quiet interval |
| --- | --- |
| Question | 43.6ms |
| Correct | 96.8ms |
| Retry | 122.4ms |

This is a threshold-based measurement, not word recognition. There is no long leading blank explaining the delay. The short natural lead-ins were preserved to avoid cutting quiet consonants or breaths. No audio trimming, re-encoding, voice changes or wording changes were made; approved MP3s and transcripts are byte-identical to v01.

## Playback changes

Each approved clip has a native audio element with preload=auto, but none autoplays on load. A single controller selects the active clip and pauses every inactive clip. Submission uses the existing buffered element without changing src or calling load. Playback is requested in the Submit gesture before focus work; text and expression changes remain immediate and independent of media readiness. No timer, fade callback or canplaythrough wait delays playback.

Only genuine media failures reload a source. Replay rewinds ready media without refetching; mute applies to every clip so it survives track changes. Generation guards ignore stale play promise results, and inactive metadata/error/ended events cannot change current feedback or controls. Retry, pause, visibility/page exit and rapid repeated actions cancel pending/active playback. A learner submitting before buffering finishes still sees feedback immediately; the clip starts as soon as the browser has enough data. Browser/network preload policies still apply.

The v01 HTML, design/CSS, character PNG, approved transcript copy, narration bytes, question decisions and responsive iframe settings remain unchanged. The current source generates only the new v02 versioned file.

## Controlled measurements

Isolated Chromium 154.0.8037.57 on Linux. Each MP3 request is delayed by 700ms. The original release must start its feedback request after Submit. The new release preloads before the learner submits. Tests measure native playing events and the first AudioContext analyser RMS above -50dB, not merely resolution of a mocked play promise or physical speaker output.

The final consolidated measured run:

| Outcome / width | v01 Submit → playing | v01 Submit → first signal | v02 Submit → playing | v02 Submit → first signal |
| --- | ---: | ---: | ---: | ---: |
| Correct / 943px | 757ms | 872ms | 13ms | 123ms |
| Correct / 375px | 758ms | 854ms | 17ms | 120ms |
| Retry / 943px | 746ms | 876ms | 9ms | 140ms |
| Retry / 375px | 735ms | 876ms | 11ms | 137ms |

New feedback made zero additional MP3 requests on Submit. Text/expression DOM state changed within 6–12ms in that run. Results depend on browser load, hardware and network; the comparison demonstrates removing the cold request, not a universal latency promise. `npm run test:guide-timing` writes full current measurements to ignored `work/guide-timing/results.json`.

## Checks

- First feedback for both outcomes at 943px desktop and 375px mobile, decoded original MP3s and actual analyser signal.
- Truly cold/pending feedback with 1800ms network delay: retry or pause before it arrives, wait for download completion and verify that cancelled narration stays silent and cannot overwrite the current stage/status.
- Six alternating B/C retries and double replays, then muted correct feedback: no overlap, stale playing event, further fetch or layout movement.
- All A/B/C journeys at 1240×752, 943×871, 768×941, 600×1008, 375×1098, 320×1120 and 320×2368 at 200% text. Exact approved feedback text, no internal scrolling/clipping, fixed portrait/content/player bounds, audio end/replay/error recovery and keyboard access.
- Existing iframe tests cover real parent wheel scrolling, Tab exit/blur pause, denied-play recovery, visibility and emulated touch. The hub and post-deployment verifier target v02 and retain their fail-closed checks.

Publish only after the exact v02 Pages URL returns HTTP 200, the build marker and HTML hash match the tested v02 release, and deployed media hashes match the originals. The existing publication workflow records that receipt after a successful deployment of the relevant commit. Actual Nucleus authoring/learner views, physical-device listening, Safari/Firefox, screen readers and production font loading remain target-environment checks.

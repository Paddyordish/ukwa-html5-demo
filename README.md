# UKWA warehouse hazard practice

Release **embed-20261028-v11** keeps the warehouse stationary beneath compact question dialogs. Permanent markers are removed: the magnifier reveals red/green discovery states and an outside label. A timed hint and keyboard focus outlines support discovery; six practice decisions, retry feedback and restart stay inside the activity. A reserved, bottom-centred live status counts distinct popup openings (“6 of 6 hazards found”); after the final popup closes it reads “6 of 6 hazards found · Activity complete ✓”. Popups use hazard names, with only “Already explored” on revisits; there is no sequence numbering or progress bar. Correct answers are optional for this internal completion state.

After this PR is merged and GitHub Pages deployment succeeds, use the version-specific URL:

https://paddyordish.github.io/ukwa-html5-demo/activity/embed-20261028-v11.html

```html
<div style="container-type:inline-size;width:100%">
  <iframe
    src="https://paddyordish.github.io/ukwa-html5-demo/activity/embed-20261028-v11.html"
    title="UKWA warehouse hazard practice"
    width="100%" height="672"
    style="display:block;width:100%;height:max(42rem,round(up,calc(62.5cqw + 6rem),1px));border:0"
    loading="lazy"
  ></iframe>
</div>
```

The artwork remains **8:5** and fills the entire available block width. There is no scene maximum width, no iframe height cap and no scene side padding. The wrapper makes `cqw` relative to the actual embed block. Frame height is **max(42rem, width × 5/8 + 6rem)**, rounded up to whole pixels. At the default 16px root font, the minimum is 672px and controls use 96px. The rem minimum grows with browser text enlargement: 200% text uses at least 1344px.

| Available width | Default iframe height |
| --- | --- |
| 320–921px | 672px |
| 943px | 686px |
| 1024px | 736px |
| 1240px | 871px |
| 1440px | 996px |
| 1920px | 1296px |

There is no internal document or popup scrolling at the supported sizes, including all six question/retry/correct states. Popup text is neither hidden nor clipped; the frame reserves the required room. The previous scrolling fallback has been removed. For URL-only blocks use the matching height above, and enlarge the host for enlarged text; a short fixed iframe cannot fit arbitrarily enlarged text. Minimum supported width is 320px. Surrounding Nucleus course scrolling is normal and separate from activity scrolling.

The root [interaction hub](index.html) copies this same URL and iframe code and shows the build and GitHub publication status. Activity Open/Copy controls stay disabled until the latest main Pages deployment succeeds and fetching the exact activity URL returns HTTP 200, without redirection, with the expected build metadata and activity markup. Missing URLs, old builds, pending/failed runs and verification errors stay “Not ready”; a failed recheck revokes a previous ready state. Unmerged work is not automatically available at the public URL. The PR's review Page is separate from the public LMS embed.

`activity/index.html` is the source entry point. `python3 scripts/build-preview.py` regenerates `preview.html`, the compatibility files `activity/embed-20261027.html` and `activity/embed-20261027-v7.html` and `activity/embed-20261027-v8.html`, and `activity/embed-20261028-v9.html` and `activity/embed-20261028-v10.html` and `activity/embed-20261028-v11.html` from the same source and exact official logo/scene bytes. Never edit portable copies independently.

See [activity developer notes](activity/README.md) and [layout verification](docs/layout-verification.md). The original `embed-test.html` is preserved.

## Warehouse guide practice question

The opening guide's narrated question, feedback, retry, replay and mute are available as a separate block. See [guide build and sizing notes](guide-question/README.md). The authoring hub includes its versioned URL and responsive iframe code with an independent publication/media readiness gate. Existing hazard and introduction releases are preserved.

Current guide release (publication verified by the hub and deployment check): `guide-question/guide-question-20261028-v02.html`. Build with `npm run build:guide`; test with `npm run test:guide`, `npm run test:guide-frame`, `npm run test:guide-hub` and `npm run test:guide-publication`. The new publication workflow verifies the exact deployed page and media hashes before a link can be called ready.

Guide v02 preloads feedback and reuses its buffers for prompt narration after Submit. The approved recordings, text, design and historical v01 file are unchanged. See [timing findings and measurements](docs/guide-narration-timing.md); use `npm run test:guide-timing` and `npm run test:guide-races` for timing/cancellation checks.

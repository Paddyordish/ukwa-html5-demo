# UKWA warehouse hazard practice

Release **embed-20261028-v10** keeps the warehouse stationary beneath compact question dialogs. Permanent markers are removed: the magnifier reveals red/green discovery states and an outside label. A timed hint and keyboard focus outlines support discovery; six practice decisions, retry feedback and restart stay inside the activity. A reserved, bottom-centred live status counts distinct popup openings (“6 of 6 hazards found”); after the final popup closes it reads “6 of 6 hazards found · Activity complete ✓”. Popups use hazard names, with only “Already explored” on revisits; there is no sequence numbering or progress bar. Correct answers are optional for this internal completion state.

After this PR is merged and GitHub Pages deployment succeeds, use the version-specific URL:

https://paddyordish.github.io/ukwa-html5-demo/activity/embed-20261028-v10.html

```html
<div style="container-type:inline-size;width:100%">
  <iframe
    src="https://paddyordish.github.io/ukwa-html5-demo/activity/embed-20261028-v10.html"
    title="UKWA warehouse hazard practice"
    width="100%" height="871"
    style="display:block;width:100%;height:clamp(560px,round(up,calc(62.5cqw + 96px),1px),871px);border:0"
    loading="lazy"
  ></iframe>
</div>
```

The **artwork is 8:5**, with **96px extra for controls**. The wrapper makes `cqw` relative to the embed's available width. Frame height is **max(560px, min(width × 5/8 + 96px, 871px))** at default text size, rounded up to whole pixels so the iframe viewport cannot lose a fractional pixel. This fills desktop widths up to 1240px with the complete scene and reserves readable mobile popup space. Do not use 8:5 for the whole iframe: that excludes its controls. Minimum available width is 320px.

| Available width | Recommended iframe height |
| --- | --- |
| 320–742px | 560px |
| 768px | 576px |
| 943px | 686px (rounded up) |
| 1024px | 736px |
| 1240px and wider | 871px |

For URL-only LMS blocks, enter the corresponding height above. If the LMS strips the responsive wrapper or inline CSS, use a fixed height for the widest expected block; extra space stays white. An old 560px desktop embed still fits without scrolling, but scales the scene down. Native Nucleus blocks supply introduction and assessment. Surrounding course scrolling is expected and separate from activity scrolling.

The root [interaction hub](index.html) copies this same URL and iframe code and shows the build and GitHub publication status. Unmerged work is not automatically available at the public URL. The PR's review Page is separate from the public LMS embed.

`activity/index.html` is the source entry point. `python3 scripts/build-preview.py` regenerates `preview.html`, the compatibility files `activity/embed-20261027.html` and `activity/embed-20261027-v7.html` and `activity/embed-20261027-v8.html`, and `activity/embed-20261028-v9.html` and `activity/embed-20261028-v10.html` from the same source and exact official logo/scene bytes. Never edit portable copies independently.

See [activity developer notes](activity/README.md) and [layout verification](docs/layout-verification.md). The original `embed-test.html` is preserved.

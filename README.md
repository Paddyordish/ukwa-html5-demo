# UKWA warehouse hazard practice

Release **embed-20261027-v8** keeps the warehouse stationary beneath compact question dialogs. Permanent markers are removed: the magnifier reveals red/green discovery states and an outside label. A timed hint and keyboard focus outlines support discovery; six practice decisions, retry feedback, progress and restart stay inside the activity.

After this PR is merged and GitHub Pages deployment succeeds, use the version-specific URL:

https://paddyordish.github.io/ukwa-html5-demo/activity/embed-20261027-v8.html

```html
<iframe
  src="https://paddyordish.github.io/ukwa-html5-demo/activity/embed-20261027-v8.html"
  title="UKWA warehouse hazard practice"
  width="100%"
  height="560"
  style="display:block;width:100%;height:560px;border:0"
  loading="lazy"
></iframe>
```

Use **560px height** and **100% width**, with at least **320px** available width. Do not replace the fixed height with an iframe aspect ratio: mobile decisions need readable vertical space. Native Nucleus blocks supply the introduction and assessment.

The root [interaction hub](index.html) copies this same URL and iframe code and shows the build and GitHub publication status. Unmerged work is not automatically available at the public URL. The PR's review Page is separate from the public LMS embed.

`activity/index.html` is the source entry point. `python3 scripts/build-preview.py` regenerates `preview.html`, the compatibility files `activity/embed-20261027.html` and `activity/embed-20261027-v7.html`, and `activity/embed-20261027-v8.html` from the same source and exact official logo/scene bytes. Never edit portable copies independently.

See [activity developer notes](activity/README.md) and [layout verification](docs/layout-verification.md). The original `embed-test.html` is preserved.

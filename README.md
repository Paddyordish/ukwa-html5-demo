# UKWA warehouse safety practice

The LMS embeds a hosted HTML page. It does not read the pull-request branch automatically.

Viewport-fit build: `activity/embed-20261027.html` (build marker `embed-20261027-v5`). After this PR is merged and GitHub Pages deployment succeeds, use:

https://paddyordish.github.io/ukwa-html5-demo/activity/embed-20261027.html

This filename is new, so it cannot serve the cached three-hazard document. Do not use the GitHub source/blob URL in an iframe. Until deployment, the new public URL is unavailable; the review preview in the PR is a separate ChatGPT Page, not an LMS hosting URL.

For a URL-only block, paste the URL above and set its height to **560px** if configurable. The activity fills the iframe viewport. The browser test also covers 943 × 530px, matching the supplied authoring screenshot. Native Nucleus blocks provide the introduction, objectives and assessment.

```html
<iframe
  src="https://paddyordish.github.io/ukwa-html5-demo/activity/embed-20261027.html"
  title="UKWA warehouse hazard practice"
  style="display:block;width:100%;height:560px;border:0"
></iframe>
```

`activity/index.html`, the version-specific embed and `preview.html` are built from the same source. Developer notes, tracking limits and checks are in [activity/README.md](activity/README.md). `embed-test.html` is preserved as the original technical test.

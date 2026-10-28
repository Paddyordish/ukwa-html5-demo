# UKWA build instructions

## Project workflow

Patrick wants an authoring hub included with every new course build using this workflow. Maintain the hub whenever activities or releases change. The reusable standard is in `docs/build-hub-standard.md`.

For this project the hub is the root `index.html`. Individual learner blocks live in separate folders. Preserve the hub, learner activities, original source assets and unrelated changes when editing.

## Mandatory Nucleus embed behaviour

Read `docs/nucleus-embed-standard.md`. No internal scrolling is allowed inside Nucleus embeds, popups, transcript views or feedback panels. The native course page must own scrolling. Do not treat hiding scrollbars or clipping content as a fix. Supply adequate parent sizing and verify full content/control bounds across the supported sizes.

The authoring hub itself is a normal webpage and may scroll.

## Release and link verification

- Update hub launch links, version labels and copyable iframe code with each release.
- Do not call a link live until the matching GitHub Pages deployment succeeds and an HTTP request to that exact URL returns 200 with the expected build marker.
- Until then label the release awaiting publication; never send an unverified URL as ready.
- Distinguish deployed releases from main-branch changes and open pull requests.
- Preserve working historical versioned URLs where practical.
- Test the actual Nucleus block separately; never infer native completion, scores or resume from the embedded activity.
- Explain steps in plain language. Patrick is learning GitHub; provide the exact verified link and next action.

Use the same hub convention when starting subsequent course projects; carry the reusable standard into their repository instructions. Do not overwrite an existing course homepage to add a hub; use a separate `hub/` directory when the root already launches the learner course.

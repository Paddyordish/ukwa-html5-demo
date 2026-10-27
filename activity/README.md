# UKWA viewport-fit warehouse activity

This practice block is sized by the LMS iframe, not by its content length. The surrounding introduction, objectives and assessed check stay in native Nucleus V2 blocks. It builds on the merged official branding, six-hazard scene and automatic lens.

## LMS URL and sizing

After merging this change and confirming GitHub Pages deployment succeeds, paste this **new filename** into the LMS URL field:

https://paddyordish.github.io/ukwa-html5-demo/activity/embed-20261027.html

Set the embed height to **560px** if Nucleus exposes a height setting. The activity uses the iframe's viewport height, with a compact toolbar and footer hint. The supplied screenshot's 943 × 530px size is also covered by the browser checks. No change to the LMS itself or undocumented host resizing is required.

The six-hazard scene, question, retry feedback, correct feedback and summary share the same workspace. A selected hazard replaces the exploration view, and feedback replaces the answer choices. Nothing is appended below the block. The panel does not have a nested scrollbar and the script does not scroll the page. At very short iframe heights below 480px the document deliberately allows overflow instead of clipping controls; use the recommended height. Browser text enlargement and assistive-technology needs may similarly require extra space.

The scene is fitted inside the available rectangle without cropping. Marker coordinates are applied to the actual image rectangle, including any surrounding blank space. Official logo proportions and bytes are preserved. Raleway uses the existing Google Fonts request with system fallbacks.

## Publication and old versions

The old URL `/activity/` loads `activity/index.html` from the last successful **main** deployment, not from an unmerged branch. PR #3 was merged while this sizing fix was being developed; its Pages deployment succeeded. The screenshot supplied by the user showed the earlier three-hazard release.

The version-specific embed is a portable single file with the logo, scene, script and styles embedded. Using a new filename avoids stale HTML and independently cached older CSS/JS. Its hidden build metadata is `embed-20261027-v5`. It is identical to `preview.html`. Neither a cache parameter nor the preview Page publishes an unmerged commit to GitHub Pages.

`python3 scripts/build-preview.py` generates both portable files from `activity/index.html`, `style.css`, `app.js`, the SVG and exact official PNG. Edit source files, not generated copies. The version file is a new release filename; choose another for a future distinct release.

## Interaction and access

Six visible 18px markers retain 44px targets. Tab reaches each; arrow keys wrap; Home/End reach first/last. Enter/Space opens a decision. Escape and Return restore exploration and marker focus; after the final hazard, focus moves to the compact summary. There is no focus trap. Revisited correct responses retain feedback and never add progress twice.

Mouse/pen entry shows the 3× vector lens automatically; it follows smoothly, disappears on exit and stays hidden during decisions. Reduced-motion mode updates the lens immediately. It never intercepts clicks.

Touch inspection is a 320ms still hold. Movement beyond 10px, release or pointer cancellation cancels it; no pointer capture or movement prevention interferes with native scrolling/pinch. Tapping a marker opens its close-up directly. Physical finger gestures remain a device check.

## Tracking and source boundaries

Progress exists only in this document's memory. Reload resets it. There are no Nucleus, SCORM, xAPI, storage or completion API calls, and no durable resume or course-completion reporting. Keep assessed tracking in supported native blocks. These technical limits are not displayed to learners.

Responses and SVG artwork are inherited from the existing six-hazard prototype. The original SCORM and improved source ZIP remain unavailable in this execution session. Review learning copy against course content/site procedures before production use. See `../docs/branding.md` for the authoritative supplied identity.

## Verification

Run `python3 tests/check-assets.py` for SVG XML, independent feature-anchor checks, non-overlapping 44px targets, exact official logo/original embed-test Git hashes, build metadata and byte-identical portable outputs.

Run `npm install`, `npx playwright install chromium`, then `npm run test:browser`. Use `CHROMIUM_PATH` for an installed browser. The test serves local files from a temporary localhost server in an isolated browser profile. It exercises every hazard's choices, retry and correct feedback; completion/restart; keyboard/focus; lens and synthetic touch cancellation. The complete journey passed in Chromium at 943×530, 1024×560, 768×560, 375×600, 320×560 and 943×480. Every choices/retry/correct/summary state had no document or panel overflow and all controls stayed inside the frame. Desktop and mobile screenshots were visually inspected; screenshots and measurements are saved in ignored `work/`.

The earlier file-URL launch restriction was resolved by using localhost serving and the permitted isolated browser execution. Real Nucleus authoring/learner views, actual finger scrolling/pinch, screen-reader use and the production Google Fonts request still need checks in the target environment. The browser tests intercept font requests so fallback text layout is deterministic.

`npm run test:iframe` also passed in a 943×530 iframe with neighbouring native-style controls: all six decisions and completion retained the outer page height and following control position, no iframe document overflow occurred, and Tab exited to the following control. This is a local iframe harness, not a claim of testing inside the real Nucleus application.

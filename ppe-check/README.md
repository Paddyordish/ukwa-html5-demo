# Ready for your shift? — PPE game

Release: `ppe-check-20261113-v01`. Source authority: UKWA L2 PowerPoint slide 30; original poster bytes preserved in `assets/ppe-check/poster.png`.

Build: `python3 scripts/build-ppe-check.py` (`npm run build:ppe`). Edit `source.html`; regenerate `index.html` and the self-contained versioned release. Do not edit generated releases independently. The original poster is unchanged, including labels and all PPE examples. It illustrates equipment, not hidden defects. Scenarios explicitly describe each problem.

Six decisions cover a damaged helmet, dirty goggles, missing required high visibility, unsuitable gloves, poor PPE fit and untied shoelaces. Options shuffle; only a correct safe decision resolves a check. Wrong choices allow retry without penalty. Opening every item does not complete the game. Completion requires all six correct decisions. Revisit and replay supported; replay/reload resets all practice progress. No timer, audio, network calls, personal data, persistence, SCORM/xAPI, native LMS scores/completion or cross-tab resume.

Keyboard: Tab/Shift+Tab and Enter/Space. Matching helmet, goggles, vest, gloves, trousers and boot icons replace numeric markers on the poster and kit buttons. Resolved items retain their PPE icon with a small tick. Poster icons and text buttons access the same checks. Text view hides the poster without removing any scenario or action. Reduced-motion preference respected. Standalone page uses normal document scrolling on small screens; no nested scrolling panes.

## V2 embed

The V2 Embed block observed in this build offers a URL/title and a fixed 16:9 frame. Full mobile-sized game content cannot fit a short iframe. Therefore this release detects embedding and shows a compact launch panel. The panel opens the full game in a new tab (`rel=noopener`). It does not clip, shrink essential game text or introduce internal scrollbars. `?embed=1` previews the same launch panel standalone. Embed the versioned URL; do not embed the authoring hub.

Launcher tested at 320×180, 375×211, 768×432 and 860×484: no document overflow and all visible text/control/image bounds fit. Standalone widths tested at 320, 375, 768, 1024 and 1440px: no horizontal overflow or out-of-width controls. Full learner/browser/device QA details are recorded with the course; actual deployed LMS fit must be tested separately before replacement of the native activity.

## Publication

Awaiting publication until the branch is reviewed/merged, the matching Pages deployment succeeds and the exact versioned URL returns 200 with `meta[name=ukwa-build]` equal to `ppe-check-20261113-v01`. The updated authoring hub gates launch/copy controls on these checks. Do not auto-merge. Historical activities and versions stay unchanged.

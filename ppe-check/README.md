# Ready for your shift? — PPE game

Release: `ppe-check-20261113-v01`. Source authority: UKWA L2 PowerPoint slide 30; original poster bytes preserved in `assets/ppe-check/poster.png`.

Build: `python3 scripts/build-ppe-check.py` (`npm run build:ppe`). Edit `source.html`; regenerate `index.html` and the self-contained versioned release. Do not edit generated releases independently. The original poster is unchanged, including labels and all PPE examples. It illustrates equipment, not hidden defects. Scenarios explicitly describe each problem.

Six decisions cover a damaged helmet, dirty goggles, missing required high visibility, unsuitable gloves, poor PPE fit and untied shoelaces. Options shuffle; only a correct safe decision resolves a check. Wrong choices allow retry without penalty. Opening every item does not complete the game. Completion requires all six correct decisions. Revisit and replay supported; replay/reload resets all practice progress. No timer, audio, network calls, personal data, persistence, SCORM/xAPI, native LMS scores/completion or cross-tab resume.

Keyboard: Tab/Shift+Tab and Enter/Space. The original poster is displayed unchanged, with no added markers or overlay icons. Matching helmet, goggles, vest, gloves, trousers and boot icons appear only on the kit buttons. Resolved buttons retain their PPE icon with a small tick. The kit buttons open the checks. Text view hides the poster without removing any scenario or action. Reduced-motion preference respected. Standalone page uses normal document scrolling on small screens; no nested scrolling panes.

## V2 course launch (verified)

Use a native **Button** with the versioned game URL. Actual learner preview rendered the native button with `target=_self`: the full game opens in the same tab. Course instructions tell learners to use browser Back. This launch and return to the saved course page were tested successfully; the superseded native Hotspot was removed.

The V2 Embed frame is 16:9. Its sandbox was observed as `allow-forms allow-presentation allow-scripts`, without `allow-popups`; therefore the otherwise correctly sized embedded launch panel cannot open its new-tab game link. Do not use that panel as the V2 launch route. The authoring hub now offers the verified native course button URL instead. Other hosts must be tested separately before using embedded launch links.

The standalone game uses normal page scrolling on narrow screens, with no nested scrolling panes. Launcher geometry was checked, but geometry alone did not prove functional host permission. Verify link activation in actual learner preview.

## Publication

Published after Patrick explicitly authorised publication. PR13 merged as `7174b30ef43341717464b605ce47b51177a1221d`; Pages run43425636357 succeeded. The exact versioned URL returned200, the expected `ppe-check-20261113-v01` marker and bytes identical to the final local release. The updated authoring hub gates launch/copy controls on these checks. Do not auto-merge. Historical activities and versions stay unchanged.

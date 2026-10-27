# UKWA HTML5 demonstration

## Agreed scope
A 2–3 minute three-hazard activity for Tommy, built from Unit 2, "What is a Hazard?" in Warehouse Operative L2 Course. Source page ID: 99909; source content file: assets/data.1.json.
Source ZIP: scorm-96-20261025074659-b751aab3-c982-40ef-a4ed-5be6ca5d81b0.zip.

Learning outcome: recognise the selected warehouse hazards and choose an appropriate safe response.

Use three source hazards: working at height on racking, spillage, and unstable boxes. The source's separate unsafe-ladder hotspot has an empty explanation and is excluded pending content review.

Proposed learner flow:
1. Native introduction.
2. One HTML5 warehouse interaction: select a marked area, choose a response, receive feedback; show 0–3 activity progress.
3. Native knowledge check and takeaway, subject to confirming the tool's available options.

Visual direction: polished warehouse imagery, UKWA navy (#10273c) and red (#b10023), clear type, restrained animation, keyboard operation, mobile layout and reduced-motion support. No FIELDWORK branding. A scene magnifier can be explored in the polished build.

## Evidence and boundaries
The inspected source has 29 pages across five units and a recap, 43 images, four videos and six quiz blocks. The manifest declares SCORM 1.2 and six launchable SCOs.
The old player contains lesson-location, suspend-data, score, status and session-time code. These are static code findings, not verified runtime results or evidence for the new authoring tool.
Its completion check does not require every hotspot or card to be explored.
The user previously embedded FIELDWORK successfully, but internal progress reporting is unconfirmed.

## First deliverable
embed-test.html is a dependency-free technical test, not the finished demo. It detects whether it is framed, provides two buttons and a local completion counter, and deliberately has no persistence or LMS communication.
No undocumented integration messages or SCORM API probing are included.

## Decisions after the sandbox test
Confirm embedding method, sizing, native completion trigger and native resume behavior.
Keep recorded assessment in native blocks if supported. If the embed has no supported state/completion connection, treat it as short practice with an explicit restart-on-return expectation. Do not claim its internal clicks are tracked.
Do not delay course delivery or involve platform developers unless Patrick chooses to pursue deeper integration.

## GitHub workflow
main is the reviewed version. Work is proposed on a branch through a pull request.
This setup does not publish a website or change repository visibility.
Agree a hosting route before using a URL embed; a private GitHub file URL is not a runnable embed URL.
Keep the original ZIP out of the repository. Add only the assets needed for the approved demo.

## Updated asset source
Patrick supplied Warehouse_Operations_Rise_Development_Pack copy.zip on 27 October 2026 and requested that its improved assets take priority.
Prefer this pack for visuals; retain the original SCORM as the content reference.
- 01_Reference_Images/M01_Warehouse_Hero.png: visually reviewed; selected for the demo introduction.
- 01_Reference_Images/M02_Hazard_Spotting_Warehouse.jpeg: visually reviewed; selected for the three-hazard activity. SHA-256 comparison confirms it is identical to original assets/99909_0.jpeg.
- 01_Reference_Images/M03_FLT_Pedestrian_Risk.png: visually reviewed; available for a future scenario, outside the current three-hazard scope.
The pack README is stale: it says the new hero and other portfolio assets are not included, but those files are present.
The archive contains two manual-handling videos, ten MHE images, ten reference images and four additional source images. Not every asset has received visual/content QA.
Do not assume all images depict safe practice. Use the selected hazard scene explicitly as an unsafe scenario.
No original organisation branding is included in the new pack. Use UKWA colours already evidenced by the SCORM and keep Patrick's portfolio branding separate.
Add selected, web-optimised assets with the polished build after embedding is established; do not upload the entire source archives.

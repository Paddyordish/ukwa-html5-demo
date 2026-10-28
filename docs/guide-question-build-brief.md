# Warehouse guide practice question — build brief

Status: Interaction implemented in `guide-question/`; v02 adds feedback preloading and safe playback cancellation. Use the hub/publication workflow for the current deployment status. See `guide-question/README.md` for release, sizing and verification details.

## Content
Based on the supplied SCORM Unit 1, Why Safety Matters: protecting people, meeting responsibilities, and reducing business disruption. This question is a new practice treatment, not an original scored question.

Question: Why does health and safety matter in a warehouse?
A (correct): It protects people, helps everyone meet their responsibilities and reduces disruption to the business.
B: It is mainly about avoiding damage to goods and equipment.
C: It is mainly the responsibility of managers.

Use the three U01_Q01_*_Female_UK_v01.mp3 files and companion transcripts in assets/audio.
Question 6.191 seconds; correct 13.479 seconds; retry 10.841 seconds.

## Interaction
Untracked practice only. No claims of native score/completion integration.
Use the woman from shift-intro/assets/warehouse-hero.jpg consistently. Prepare neutral, pleased and thoughtful/concerned poses without replacing her identity or PPE; do not invent a sad/punishing response.
Start with a learner-initiated play control. Selecting an option and submitting changes the pose and shows complete text feedback immediately. Correct completes the practice; incorrect offers a retry.
Stop previous audio before another clip starts; respect mute, provide replay, pause on page exit, handle failed audio with readable text. No lip sync required. Use gentle fades; respect reduced motion.
Follow AGENTS.md and docs/nucleus-embed-standard.md: no internal scrolling or clipped content in any state. Reserve feedback space.
Use official assets/brand/ukwa-logo.png.
Build a versioned learner URL, test desktop/mobile, keyboard, audio transitions, retries, replay, errors, full bounds and parent wheel scrolling. Add to hub only with accurate deployment status. Verify Pages success and exact HTTP 200 build marker before calling ready.

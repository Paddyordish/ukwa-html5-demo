# Course build hub standard

Requested by Patrick Ordish, 28 October 2026.

## Purpose

Every new course build should include a small authoring hub: one bookmarked page for the project's published blocks, previews and embed codes. It is a custom page maintained with the course repository, not a built-in GitHub or Nucleus feature.

One hub belongs to one course/project and is maintained across revisions. A course with multiple HTML5 blocks lists them together.

## Required contents

1. Clear project name and branding.
2. A card for every activity, animated scene or other published learner block.
3. Open the latest verified release, copy its URL and copy its iframe code.
4. Visible version/build identifier, with the release date where maintained.
5. Frame sizing instructions that match the tested layout. For Nucleus, no internal scrolling is permitted.
6. Publication status distinguishing live, awaiting publication and failed/unverified checks.
7. Links to the repository, publishing history and proposed changes.
8. Relevant supporting assets or narration links where useful to the author.

Keep the hub useful and concise. It is for building/reviewing the course; embed an individual learner block in Nucleus rather than the whole hub.

## Location

- A new collection of embedded interactions can use the repository root as the hub, as UKWA does.
- If an existing root page launches the learner course, keep it and place the hub at `/hub/`.
- Give the author one stable bookmark, then keep its release links current.
- Follow the existing repository's structure and branding rather than rebuilding approved learner screens.

## Release procedure

1. Build and test the changed learner block.
2. Create a versioned release where appropriate and update the hub's card, version and iframe code.
3. Honour the task's branch/PR/merge instructions.
4. After publication, verify a successful deployment of the relevant commit.
5. Request the exact published URL, require HTTP 200 and check the expected build marker.
6. Only then call the URL live. Keep it marked awaiting publication until verified.
7. Check copy buttons, iframe dimensions and links; report any real Nucleus testing still needed.

A public API outage or rate limit is an unknown status, not proof of a successful or failed deployment. A merged PR is not itself a published page.

## Important distinction

Updating the hub does not automatically edit an existing Nucleus course. If a version-specific embed URL changes, the author may need to replace the old course embed with the hub's updated code.

The hub does not independently know what link is currently embedded in Nucleus, nor whether a learner has completed anything. Do not invent those statuses.

## Carry forward

Include this standard and a short reference to it in the repository instructions of every new course build using this workflow. For future projects, adapt project names and links; preserve the requirements for verified URLs and Nucleus embeds without internal scrolling.

The current UKWA implementation is an example to reuse, not an installation or dependency that must be copied unchanged.

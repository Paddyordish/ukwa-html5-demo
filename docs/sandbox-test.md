# Nucleus sandbox test — record observed results

This is a technical test, not learner content. All Nucleus capabilities below remain unconfirmed until tested.

## Prepare
Use a disposable sandbox course, with a native page before the embed and a native page after it. Record the course URL, browser, date and embed settings.
Use a learner account for progress checks; editor preview alone is insufficient.
Identify what the embed field accepts: a hosted URL/iframe, pasted HTML, or file upload. Do not assume it executes scripts.

## Load the test
- If the tool supports a complete HTML file or document, use embed-test.html.
- If it accepts a hosted URL/iframe, arrange hosting first. Do not paste the GitHub blob URL: it displays source rather than running the activity.
- If it accepts a fragment of HTML only, have the test adapted for that field.
No live hosting URL is included in this setup.

## Observe
| Test | Action | Record |
| --- | --- | --- |
| Loads | Open as a learner | Does the test render and say JavaScript running? |
| Script restrictions | Press Step 1, then Step 2 | Do buttons and counter work? |
| Native completion trigger | Check native progress before any clicks, after Step 1 and after Step 2 | When, if ever, does Nucleus mark the block/page complete? |
| Navigation gating | Try native Next before starting and after Step 2 | Is completion required to continue? |
| Sizing | Try desktop and narrow/mobile widths | Any clipping, double scrolling or unreachable buttons? |
| Keyboard | Tab through, activate using Enter/Space | Visible focus; no trap; can reach native navigation? |
| Native resume | Leave at Step 1, close course and reopen | Which native page resumes? What does the embed display? |
| Reload | Reload the embed/course | Test is designed to reset unless the host preserves its frame |
| Learner separation | Open as another test learner | Native progress must be checked independently |
| Reporting | Inspect the learner's Nucleus record | What status, score or other evidence is actually stored? |

## Interpret carefully
"Activity finished" is an on-screen state only. It does not notify Nucleus.
This version does not save answers. A host retaining a frame temporarily is not proof of durable resume support.
Browser-local storage, if considered later, is not LMS tracking or cross-device resume.
A page being marked complete on opening does not prove the internal interaction was finished.

## Result
- Embedding method:
- Native completion trigger:
- Native page resume:
- Embedded activity state on return:
- Responsive/keyboard issues:
- Recorded reporting:
- Chosen hosting route:
- Decision: short untracked practice / supported integration / revise approach.

Resolve these observations before the polished demo. Any integration claim needs a supported platform contract or verified sandbox evidence.

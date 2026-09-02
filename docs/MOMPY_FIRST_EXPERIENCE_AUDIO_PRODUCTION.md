# Mompy — first-experience voice production list

Scope frozen from the current `en-US` product flow after the `v0.1.6` release: first visit, Lesson 1 and Mission 1 only. This document is a recording plan; it does not enable or implement any new audio.

## Recording convention

- Keep the established format and path: mono Vorbis `.ogg` files under `frontend/assets/audio/mompy/en/`.
- The approved reference files use 44.1 kHz mono audio. Deliver clean voice without music, interface effects or long leading/trailing silence.
- Speak the text exactly as written below. Do not read the filename, ID, `MOMPY //` label or interface punctuation aloud.
- Lesson files `001–003` already exist and are enabled. Files `004–007` exist but are disabled and must be re-recorded only after the script is approved. Files `008–017` do not exist yet.
- For all Lesson 1 lines, use the current six-frame, forward-facing, locked-chassis speech animation. Mouth movement follows the audio energy map and returns to the neutral closed-mouth frame during silence.

## Production order

1. Approve the exact Lesson 1 script `004–017` below.
2. Keep `001–003` unless a final voice-consistency review finds a real mismatch.
3. Re-record `004–007` and record `008–017` as one consistent session.
4. Produce the Mission 1 mandatory branch lines.
5. Produce onboarding and optional interaction lines only after the main lesson/mission voice is approved.

## A. First visit and presentation

These strings already exist in the onboarding interface. The current onboarding shows Mompy front-facing but has no voice hook yet, so they are not blockers for the Lesson 1 recording batch.

| ID / suggested file | Context | Trigger | Exact EN-US line | Direction | Priority | Existing animation/state |
|---|---|---|---|---|---|---|
| `mompy_intro_001_en.ogg` | First-visit terminal | Onboarding opens and its first terminal line appears | Welcome to Mompy | Warm, calm, concise | Recommended | Front-facing Mompy; neutral face |
| `mompy_intro_002_en.ogg` | Name prompt | Terminal reaches the `input` prompt and enables the name field | What's your first name? | Curious, welcoming | Recommended | Front-facing Mompy; neutral face |
| `mompy_intro_name_required_en.ogg` | Name validation | User presses Continue with an empty name | Type your first name. | Gentle correction; no scolding | Optional | Front-facing Mompy; attentive/neutral |
| `mompy_intro_003_en.ogg` | Profile confirmation | A valid name is submitted | Profile saved. Loading workspace... | Confirming, lightly upbeat | Recommended | Front-facing Mompy; then existing workspace transition |

## B. Lesson 1 — complete main speech sequence

The order below is the real order of Mompy-visible steps in `briefing_001`. IDs remain stable even though question screens appear between some entries.

| Order | ID / file | Screen / step | Trigger | Exact EN-US line | Direction | Priority | Status |
|---:|---|---|---|---|---|---|---|
| 1 | `mompy_001_en.ogg` | `opening` | Lesson 1 opening becomes visible | We are starting from zero. You do not need any programming experience. | Calm, reassuring; medium pace | Mandatory | Existing and enabled; keep |
| 2 | `mompy_002_en.ogg` | `what-is-python` | “What is Python?” step reaches the Mompy line | Programming means explaining precisely what the machine should do. | Clear, confident, explanatory | Mandatory | Existing and enabled; keep |
| 3 | `mompy_003_en.ogg` | `guido` | Guido origin step reaches the Mompy line | The origin had a concrete goal: start from what already existed and build a new language. Now let us mark when it became public. | Historical explanation; natural pause before “Now” | Mandatory | Existing and enabled; keep |
| 4 | `mompy_004_en.ogg` | `timeline` | Timeline step reaches the Mompy line | Keep the sequence, not the numbers: a personal project, a public announcement, and a foundation that holds the project's rights. | Calm mnemonic emphasis | Mandatory | Re-record after approval; current file disabled |
| 5 | `mompy_005_en.ogg` | `python-name-story` | Name-origin step reaches the Mompy line | Identity resolved: Guido started the project, the public announcement came in 1991, and the name came from Monty Python scripts. | Light, satisfied conclusion | Mandatory | Re-record after approval; current file disabled |
| 6 | `mompy_006_en.ogg` | `uses` | Python-use preview reaches the Mompy line | This preview showed code becoming action. Now we will look at the central step in that path: the interpreter that reads the code. | Observant, transitioning to the next concept | Mandatory | Re-record after approval; current file disabled |
| 7 | `mompy_007_en.ogg` | `instruction` | Code/execution/output step reaches the Mompy line | Code is what you write. Execution is Python carrying it out. Output is what the program produces. | Precise; three clearly separated definitions | Mandatory | Re-record after approval; current file disabled |
| 8 | `mompy_008_en.ogg` | `interpreter` | Interpreter animation reaches the Mompy line | Watch the middle of the path: code enters, the interpreter conducts execution, and output appears afterward. | Demonstrative, attentive | Mandatory | Record after approval |
| 9 | `mompy_009_en.ogg` | `code-flow` | Code-flow step reaches the Mompy line | For the interpreter to recognize an instruction, its writing must follow rules. That is the next concept: syntax. | Explanatory, slight emphasis on “syntax” | Mandatory | Record after approval |
| 10 | `mompy_010_en.ogg` | `syntax-intro` | Syntax step reaches the Mompy line | Now we know that writing has rules. Next, we will identify exactly where a piece of text begins and ends. | Confident transition | Mandatory | Record after approval |
| 11 | `mompy_011_en.ogg` | `text-intro` | String/text step reaches the Mompy line | We have the message. Next, we need to tell Python to show it. | Encouraging, anticipatory | Mandatory | Record after approval |
| 12 | `mompy_012_en.ogg` | `print-purpose` | Function/print step reaches the Mompy line | First came the idea of a function; now it has a name: print. Watch the call produce output without extra setup. | Teaching tone; emphasize “function” and “print” naturally | Mandatory | Record after approval |
| 13 | `mompy_013_en.ogg` | `first-print` | First print demonstration reaches the Mompy line | Reveal the code, give it to the interpreter, and compare the instruction with the output. Next, we will see what changes when there are two lines. | Guiding a live demonstration | Mandatory | Record after approval |
| 14 | `mompy_014_en.ogg` | `two-lines-demo` | Two-line execution step reaches the Mompy line | Trace one line at a time: finish the first and move to the second. Next, we will take the complete call apart symbol by symbol. | Measured, procedural | Mandatory | Record after approval |
| 15 | `mompy_015_en.ogg` | `print-anatomy` | Print anatomy step reaches the Mompy line | These are two independent pairs: parentheses delimit the call; quotes delimit the text inside it. | Precise, with a short pause at the semicolon | Mandatory | Record after approval |
| 16 | `mompy_016_en.ogg` | `syntax-pairs` | Pair-check step reaches the Mompy line | Check the two pairs separately. When call and text are closed, the instruction is ready to run. | Calm verification | Mandatory | Record after approval |
| 17 | `mompy_017_en.ogg` | `summary` | Lesson 1 summary reaches the Mompy line | You started with Python's origin, followed the interpreter, and reached a complete print call. Now use the missions to prove that every symbol and every line has a purpose. | Proud, encouraging, forward-moving | Mandatory | Record after approval |

## C. Mission 1 — required interaction branches

Mission 1 currently uses the standard main-screen Mompy states: `talking` during guidance, `error` for a failed run, `success` for a correct run and `complete` for the final prompt. These files are not present and are not integrated yet.

| ID / suggested file | Context | Trigger | Exact EN-US line | Direction | Priority | Existing animation/state |
|---|---|---|---|---|---|---|
| `mompy_mission_001_intro_en.ogg` | Mission 01 — First Output | Mission 1 opens after Lesson 1 | First step: make the program write a message to the console. Write a print() that shows exactly: Hello, Mompy! | Clear mission briefing; supportive | Mandatory | `talking` while mission copy types |
| `mompy_mission_001_help_en.ogg` | Mission help | User presses Help during Mission 1 | Use quotes inside print: print("Hello, Mompy!") | Patient, practical explanation | Mandatory | `talking`; Help modal remains visible |
| `mompy_mission_001_empty_en.ogg` | Empty-editor error | User presses Run without Python code | The editor does not contain any Python code yet. Use quotes inside print: print("Hello, Mompy!") | Gentle correction; slow enough to follow | Mandatory | `error`; diagnostic appears on Mompy's screen |
| `mompy_mission_001_output_error_en.ogg` | Wrong output | Code runs but does not print the required text | Python ran the code successfully, but printed a different result. Check the values and text passed to print(). | Analytical, never disappointed | Mandatory | `error`; diagnostic highlights the relevant result/line |
| `mompy_mission_001_syntax_error_en.ogg` | Syntax error | Python cannot parse the submitted line | Python found a syntax error on this line. Check parentheses, quotes, colons, and indentation. | Concerned but calm; corrective | Mandatory | `error`; diagnostic highlights the source line |
| `mompy_mission_001_success_en.ogg` | Correct solution | Backend accepts the code and output | Correct. The code ran and produced the expected output. Mission completed. | Celebratory, controlled | Mandatory | `success`; existing success SFX plays first |
| `mompy_mission_001_complete_en.ogg` | Completion choice | Success animation settles and Retry / Next mission appears | Mission complete. Continue? | Warm confirmation; upward inflection on the question | Mandatory | `complete`; completion choices shown on Mompy's screen |
| `mompy_mission_001_retry_en.ogg` | Retry confirmation | User chooses Retry after completing Mission 1 | Mission restarted. Try again. | Encouraging reset | Recommended | Return to `idle`; starter code restored |
| `mompy_mission_001_first_transmission_en.ogg` | First achievement | First successful Mission 1 completion unlocks the achievement | First Transmission. Unlocked. | Short celebratory announcement | Optional | Existing full-screen reward capsule; keep its SFX |

## Intentional exclusions

- Lesson 1 review/investigation success, error and hint text is not in this recording batch because those screens explicitly use `mompyVisible: false`. They remain text plus existing success/error SFX.
- Dynamic diagnostic details such as line numbers, received output and Python exception text are not static voice files. The fixed Mission 1 summaries above are sufficient; the variable detail remains readable on screen.
- Button labels, settings, achievement collection navigation and Lessons 2–8 / Missions 2–40 are outside the first-experience scope.
- Ambient loops, clicks, run, success, error, machinery and reward sounds are effects rather than Mompy voice and already have their own asset system.

## Source of truth

- Lesson order and exact `en-US` Mompy lines: `backend/data/classroom_lessons.json`, lesson `briefing_001`.
- Current voice IDs, durations and waveform-driven mouth maps: `frontend/js/app.js`, `MOMPY_VOICE_MANIFEST`.
- Onboarding lines and triggers: `frontend/js/app.js`, `onboardingIntroLines` and `submitOnboardingName`.
- Mission 1 copy: `backend/missions.py`, mission `mission_001`, mirrored in `frontend/js/app.js`.
- Mission state, Help, validation and completion triggers: `frontend/js/app.js`, `playMissionIntro`, `showMissionExplanation`, `runCode`, `completeMission` and `renderMompyCompletionPrompt`.

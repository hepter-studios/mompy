# Contributing to Mompy

Thank you for your interest in improving Mompy.

Mompy is maintained by Hepter Studio. Contributions are welcome when they are focused, testable and aligned with the current product direction.

## Where To Help

| Area | Good contributions |
| --- | --- |
| Lessons | Clearer explanations, better sequencing, missing examples. |
| Missions | Beginner-safe challenges, validation fixes, improved feedback. |
| Python backend | Validation, progress, XP, safe execution and tests. |
| Interface | Small polish, accessibility, layout fixes and visual consistency. |
| Packaging | Windows installer improvements, future macOS and Linux packages. |
| Documentation | Setup notes, troubleshooting, release instructions and screenshots. |

## Before Opening A Pull Request

Please open or comment on an issue before large changes.

Good issues include:

- reproducible bug reports;
- interface alignment or usability problems;
- mission ideas with the target learning block;
- lesson improvements tied to a specific concept;
- accessibility improvements;
- packaging and installation problems;
- documentation corrections.

## Pull Request Rules

When submitting a pull request:

1. Keep the change focused.
2. Explain what changed and why.
3. Preserve the current CRT/industrial visual identity unless the design change was discussed first.
4. Do not add online accounts, passwords, telemetry, cloud sync or server dependencies without an approved plan.
5. Do not commit generated builds, installers, virtual environments, temporary files or local progress data.
6. Test the app locally before submitting.

## Development Setup

Clone the repository:

```bash
git clone https://github.com/hepter-studios/mompy.git
cd mompy
```

Create and activate a virtual environment:

```bash
python -m venv .venv
.venv\Scripts\activate
```

On macOS/Linux:

```bash
source .venv/bin/activate
```

Install dependencies:

```bash
python -m pip install -r requirements.txt
```

Run the desktop app:

```bash
python main.py
```

Run the browser preview for development:

```bash
python main.py --serve --port 8770
```

Then open:

```txt
http://127.0.0.1:8770/frontend/index.html
```

## Test Checklist

Before opening a pull request, run the checks that match your change:

```bash
python -m unittest discover -s tests
python main.py --check
node --check frontend/js/app.js
```

For packaging changes on Windows:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/build_windows.ps1 -Zip
powershell -ExecutionPolicy Bypass -File scripts/build_windows_installer.ps1 -SkipAppBuild
```

## Code Style

- Keep Python modules small, readable and easy to test.
- Keep mission logic understandable for Python contributors.
- Prefer clear names over clever abstractions.
- Keep HTML, CSS and JavaScript readable.
- Preserve stable layout measurements unless the task is specifically visual.
- Use relative paths for assets and project files.
- Keep local-first behavior as the default.

## Learning Design Rule

No mission should require a concept that has not already been introduced in a guided lesson.

The current learning order is:

1. First commands.
2. Variables and values.
3. Decisions.
4. Repetition.
5. Lists.
6. Functions.

If a mission uses `if`, `for`, lists or functions, make sure it lives in the correct block.

## Release Rule

Source code, documentation and small project assets belong in the repository.

Generated artifacts belong in GitHub Releases, not in commits:

- `.exe`
- `.zip`
- `.msi`
- `.dmg`
- `.AppImage`
- `dist/`
- `build/`
- virtual environments
- local progress files

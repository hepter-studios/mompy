<p align="center">
  <a href="https://github.com/hepter-studios/mompy">
    <img src="assets/branding/mompy-cover.webp" alt="Mompy retro CRT monitor preview" width="520">
  </a>
</p>

<h1 align="center">Mompy</h1>

<p align="center">
  <strong>A retro Python training app with guided lessons, coding missions, XP, and CRT-style feedback.</strong>
</p>

<p align="center">
  Mompy helps beginners learn Python through short lessons, focused missions, instant validation, local progress, and a friendly old-computer interface.
</p>

<p align="center">
  <a href="https://mompy.co"><strong>Website</strong></a>
  ·
  <a href="https://github.com/hepter-studios/mompy"><strong>Repository</strong></a>
  ·
  <a href="https://github.com/hepter-studios/mompy/releases"><strong>Download</strong></a>
  ·
  <a href="https://github.com/hepter-studios/mompy/issues"><strong>Issues</strong></a>
  ·
  <a href="CONTRIBUTING.md"><strong>Contributing</strong></a>
  ·
  <a href="SUPPORT.md"><strong>Support</strong></a>
</p>

<p align="center">
  <a href="https://github.com/hepter-studios/mompy/releases/tag/v0.1.0"><img alt="Latest release" src="https://img.shields.io/badge/release-v0.1.0-8cff3a?style=for-the-badge"></a>
  <a href="https://github.com/hepter-studios/mompy/releases"><img alt="Download" src="https://img.shields.io/badge/download-GitHub%20Releases-1f6feb?style=for-the-badge&logo=github"></a>
  <a href="https://github.com/hepter-studios/mompy/blob/main/LICENSE"><img alt="License" src="https://img.shields.io/badge/license-Hepterakt-lightgrey?style=for-the-badge"></a>
  <a href="https://github.com/hepter-studios/mompy/stargazers"><img alt="Stars" src="https://img.shields.io/github/stars/hepter-studios/mompy?style=for-the-badge&logo=github"></a>
</p>

<p align="center">
  <img alt="Python" src="https://img.shields.io/badge/Python-learning-3776ab?style=for-the-badge&logo=python&logoColor=white">
  <img alt="Backend" src="https://img.shields.io/badge/backend-Python-14354C?style=for-the-badge&logo=python&logoColor=white">
  <img alt="Frontend" src="https://img.shields.io/badge/frontend-HTML%20%7C%20CSS%20%7C%20JS-f7df1e?style=for-the-badge&logo=javascript&logoColor=black">
  <img alt="Desktop" src="https://img.shields.io/badge/desktop-pywebview-8cff3a?style=for-the-badge">
  <img alt="Local first" src="https://img.shields.io/badge/local--first-no%20account-8cff3a?style=for-the-badge">
</p>

> [!NOTE]
> Mompy is in active development. The first Windows package is available in [GitHub Releases](https://github.com/hepter-studios/mompy/releases), and the source code remains the canonical reference for every feature listed here.

## Demo

<p align="center">
  <a href="assets/media/mompy-demo.gif">
    <img src="assets/media/mompy-demo.gif" alt="Mompy boot and app demo" width="760">
  </a>
</p>

## Download

Download the latest official build from the [GitHub Releases page](https://github.com/hepter-studios/mompy/releases).

Latest release:

- [Mompy v0.1.0](https://github.com/hepter-studios/mompy/releases/tag/v0.1.0)
- [Mompy-windows-x64.zip](https://github.com/hepter-studios/mompy/releases/download/v0.1.0/Mompy-windows-x64.zip)

Current platform status:

| Platform | Status | Link |
| --- | --- | --- |
| Windows | Available in Releases | [Download v0.1.0](https://github.com/hepter-studios/mompy/releases/tag/v0.1.0) |
| macOS | Planned | [Roadmap](#roadmap) |
| Linux | Planned | [Roadmap](#roadmap) |

## Screenshots

| Start Screen | First Access |
| --- | --- |
| [![Mompy start screen](assets/media/mompy-start-screen.webp)](assets/media/mompy-start-screen.webp) | [![Mompy first access](assets/media/mompy-first-access.webp)](assets/media/mompy-first-access.webp) |

| Mission Editor | Guided Lesson |
| --- | --- |
| [![Mompy mission editor](assets/media/mompy-mission-editor.webp)](assets/media/mompy-mission-editor.webp) | [![Mompy guided lesson](assets/media/mompy-lesson-mission.webp)](assets/media/mompy-lesson-mission.webp) |

<p align="center">
  <a href="assets/media/mompy-preview-grid.webp">
    <img src="assets/media/mompy-preview-grid.webp" alt="Mompy interface preview grid" width="780">
  </a>
</p>

Media files:

- [Demo GIF](assets/media/mompy-demo.gif)
- [Preview grid](assets/media/mompy-preview-grid.webp)
- [Start screen](assets/media/mompy-start-screen.webp)
- [First access](assets/media/mompy-first-access.webp)
- [Mission editor](assets/media/mompy-mission-editor.webp)
- [Guided lesson](assets/media/mompy-lesson-mission.webp)

## What Is Mompy?

Mompy is a desktop-first learning app for people taking their first real steps in [Python](https://www.python.org/).

Instead of opening with a blank editor, Mompy uses a retro CRT training console:

- guided lessons before each block of missions;
- 30 beginner-friendly missions;
- real Python validation in the backend;
- learner-code execution in a separate process with conservative limits;
- progress, XP and level handled by Python;
- a local-first desktop shell powered by [pywebview](https://pywebview.flowrl.com/);
- a CRT/industrial interface where Mompy reacts to success, errors and actions.

The visual layer stays in HTML/CSS/JavaScript. The app logic, mission data, validation, progress, XP and desktop shell are Python.

## Why It Exists

Many beginner tools jump too quickly into concepts such as `if`, loops or functions. Mompy is designed around a gentler learning curve:

1. Show text.
2. Store values.
3. Make decisions.
4. Repeat actions.
5. Work with multiple values.
6. Organize code with functions.

Each mission should only ask for concepts that were already introduced in a previous guided lesson.

## Learning Path

| Block | Missions | Topic | Concepts |
| --- | --- | --- | --- |
| 01 | 01-05 | First commands | `print`, strings, quotes, parentheses, terminal output, simple syntax errors |
| 02 | 06-10 | Variables and values | variable names, assignment with `=`, strings, numbers, printing variables |
| 03 | 11-15 | Decisions | booleans, `if`, `else`, comparisons, `==`, indentation |
| 04 | 16-20 | Repetition | `for`, `range`, loop variable, indentation |
| 05 | 21-25 | Lists | brackets, items, commas, indexes, iterating over lists |
| 06 | 26-30 | Functions | `def`, calls, parameters, `return`, indentation |

## Features

| Area | What Mompy Does |
| --- | --- |
| Lessons | Shows a clean guided lesson before each mission block. |
| Missions | Provides focused challenges ordered by real beginner difficulty. |
| Editor | Lets the learner write Python directly in the mission screen. |
| Validation | Checks mission answers through Python backend rules. |
| Execution | Runs learner code in a separate Python process for safer feedback. |
| Progress | Stores local XP, level and completed missions through the backend. |
| Desktop | Opens as a Python desktop app through pywebview. |
| Releases | Publishes installable builds through GitHub Releases. |

## Architecture

```txt
mompy/
  frontend/
    index.html
    css/
    js/
    assets/

  backend/
    api.py
    briefings.py
    code_runner.py
    lessons.py
    missions.py
    profile.py
    progress.py
    storage.py
    validator.py
    xp.py

  data/
    progress.example.json

  tests/
  scripts/
    build_windows.ps1

  main.py
  requirements.txt
```

Important files:

- [main.py](main.py) starts the desktop app or development server.
- [backend/api.py](backend/api.py) exposes app logic to the frontend.
- [backend/missions.py](backend/missions.py) stores mission data.
- [backend/lessons.py](backend/lessons.py) stores guided lesson data.
- [backend/validator.py](backend/validator.py) validates mission answers.
- [backend/code_runner.py](backend/code_runner.py) runs learner code with process limits.
- [backend/progress.py](backend/progress.py) manages progress and completion.
- [backend/xp.py](backend/xp.py) calculates XP and level data.
- [frontend/index.html](frontend/index.html) contains the UI surface.
- [frontend/js/app.js](frontend/js/app.js) controls frontend interaction.
- [frontend/css/styles.css](frontend/css/styles.css) controls the CRT/industrial layout.
- [scripts/build_windows.ps1](scripts/build_windows.ps1) builds the Windows desktop package.

## Run From Source

Requirements:

- [Python](https://www.python.org/downloads/)
- Dependencies from [requirements.txt](requirements.txt)

Install dependencies:

```bash
python -m pip install -r requirements.txt
```

Open as a desktop app:

```bash
python main.py
```

Check the backend without opening a window:

```bash
python main.py --check
```

Run the browser preview for development:

```bash
python main.py --serve --port 8770
```

Then open:

```txt
http://127.0.0.1:8770/frontend/index.html
```

## Build For Windows

Mompy uses [PyInstaller](https://pyinstaller.org/) to create a Windows desktop package.

Generate a Windows desktop build:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/build_windows.ps1
```

Generate a zip package for a GitHub Release:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/build_windows.ps1 -Zip
```

Build output:

```txt
dist/Mompy/Mompy.exe
dist/Mompy-windows-x64.zip
```

Build artifacts such as `.exe`, `.zip`, `.msi`, `.dmg` or `.AppImage` should not be committed directly to the repository. They should be attached to a [GitHub Release](https://github.com/hepter-studios/mompy/releases).

## Tests

Run the backend test suite:

```bash
python -m unittest discover -s tests
```

Check frontend JavaScript syntax:

```bash
node --check frontend/js/app.js
```

Check backend startup:

```bash
python main.py --check
```

The `v0.1.0` Windows package was locally checked with:

- `python -m unittest discover -s tests`
- `python main.py --check`
- `node --check frontend/js/app.js`
- `dist/Mompy/Mompy.exe --check`
- desktop executable startup smoke test

## Trust And Verification

Mompy is intended to be easy to verify:

- source code is public in the [repository](https://github.com/hepter-studios/mompy);
- official downloads are attached to [GitHub Releases](https://github.com/hepter-studios/mompy/releases);
- the latest release is [Mompy v0.1.0](https://github.com/hepter-studios/mompy/releases/tag/v0.1.0);
- release assets are stored by GitHub, not pasted into the repository;
- issue tracking happens in [GitHub Issues](https://github.com/hepter-studios/mompy/issues);
- security guidance is in [SECURITY.md](SECURITY.md);
- contribution rules are in [CONTRIBUTING.md](CONTRIBUTING.md);
- license information is in [LICENSE](LICENSE);
- support guidance is in [SUPPORT.md](SUPPORT.md).

## Releases

Official builds are distributed through [GitHub Releases](https://github.com/hepter-studios/mompy/releases).

Current official release:

- [Mompy v0.1.0](https://github.com/hepter-studios/mompy/releases/tag/v0.1.0)
- [Windows x64 zip asset](https://github.com/hepter-studios/mompy/releases/download/v0.1.0/Mompy-windows-x64.zip)

Release rule:

- Commit source code, documentation and small assets to the repository.
- Do not commit generated `dist/`, `build/`, `.exe`, `.zip` or `.spec` files.
- Attach tested desktop packages to the release page.
- Keep release notes honest about what was tested.

## Roadmap

| Phase | Status |
| --- | --- |
| 10.1 - organize and freeze stable project | Done |
| 10.2 - frontend + Python backend architecture | Done |
| 10.3 - connect frontend to Python backend with pywebview | Done |
| 10.4 - migrate mission validation to Python | Done |
| 10.5 - safer learner-code execution | Done |
| 10.6 - progress, XP and levels through Python | Done |
| 10.7 - package as installable Python desktop app | Done for Windows v0.1.0 |
| macOS package | Planned |
| Linux package | Planned |
| more lessons and missions | Planned |

## Project Links

| Link | Destination |
| --- | --- |
| Website | [mompy.co](https://mompy.co) |
| Repository | [github.com/hepter-studios/mompy](https://github.com/hepter-studios/mompy) |
| Releases | [GitHub Releases](https://github.com/hepter-studios/mompy/releases) |
| Latest release | [Mompy v0.1.0](https://github.com/hepter-studios/mompy/releases/tag/v0.1.0) |
| Issues | [GitHub Issues](https://github.com/hepter-studios/mompy/issues) |
| Contributors | [Contributors graph](https://github.com/hepter-studios/mompy/graphs/contributors) |
| License | [LICENSE](LICENSE) |
| Contributing | [CONTRIBUTING.md](CONTRIBUTING.md) |
| Security | [SECURITY.md](SECURITY.md) |
| Support | [SUPPORT.md](SUPPORT.md) |
| Build script | [scripts/build_windows.ps1](scripts/build_windows.ps1) |

## Community

- [Website](https://mompy.co)
- [GitHub](https://github.com/hepter-studios/mompy)
- [Issues](https://github.com/hepter-studios/mompy/issues)
- [Contributors](https://github.com/hepter-studios/mompy/graphs/contributors)
- Discord: coming soon
- X/Twitter: coming soon
- YouTube: coming soon
- Instagram: coming soon
- TikTok: coming soon

Official social links are intentionally not listed until they exist.

## Contributors

<a href="https://github.com/hepter-studios/mompy/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=hepter-studios/mompy" alt="Mompy contributors" />
</a>

## Star History

<a href="https://www.star-history.com/?repos=hepter-studios%2Fmompy&type=date&legend=top-left">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/chart?repos=hepter-studios/mompy&type=date&theme=dark&legend=top-left" />
    <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/chart?repos=hepter-studios/mompy&type=date&legend=top-left" />
    <img alt="Mompy Star History Chart" src="https://api.star-history.com/chart?repos=hepter-studios/mompy&type=date&legend=top-left" />
  </picture>
</a>

## License

License information is available in [LICENSE](LICENSE).

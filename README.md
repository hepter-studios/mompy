<p align="center">
  <img src="assets/branding/mompy-cover.webp" alt="Mompy monitor showing GitHub logo" width="420">
</p>

# Mompy: Learn Python with a Retro Training Console

[![Status](https://img.shields.io/badge/status-in%20development-8cff3a?style=for-the-badge)](#project-status)
[![Platform](https://img.shields.io/badge/platform-Windows-0b5fff?style=for-the-badge&logo=windows&logoColor=white)](#desktop-app)
[![Built with](https://img.shields.io/badge/built%20with-HTML%20%7C%20CSS%20%7C%20JS-f7df1e?style=for-the-badge&logo=javascript&logoColor=black)](#technology-stack)
[![Desktop](https://img.shields.io/badge/desktop-Electron-47848f?style=for-the-badge&logo=electron&logoColor=white)](#desktop-app)
[![Python Training](https://img.shields.io/badge/python-training-3776ab?style=for-the-badge&logo=python&logoColor=white)](#what-mompy-does)

[English](https://zdoc.app/en/macksonvictor/mompy) | [Português](https://zdoc.app/pt/macksonvictor/mompy)

**Mompy** is a retro CRT-style desktop app that teaches Python through guided missions, instant feedback, local progress, sound effects, and a friendly monitor mascot.

---

## What Mompy does

Mompy helps beginners learn Python by turning programming practice into small missions.

The app is designed to:

- teach Python step by step;
- give the user small coding challenges;
- validate the code written by the user;
- show output and feedback immediately;
- save progress locally;
- react with animations and sounds;
- make learning feel like using an old intelligent training terminal.

The goal is simple: **open Mompy, complete missions, learn Python, and keep progressing.**

---

## Core learning loop

1. Open the app.
2. Wait for the CRT-style loading screen.
3. Start or continue training.
4. Read the mission.
5. Write Python code.
6. Run the code.
7. Receive feedback from Mompy.
8. Complete the mission and unlock the next one.

---

## Visual identity

Mompy uses a retro-futuristic visual style inspired by old terminals, CRT monitors, and industrial control panels.

Main characteristics:

- dark industrial interface;
- green CRT glow;
- terminal-style typography;
- pixel/scanline effects;
- metallic panels;
- retro monitor mascot;
- old-computer atmosphere.

---

## Current features

- Retro CRT interface
- Loading screen
- Start screen
- Mission screen
- Code editor area
- Output panel
- Help button
- Run button
- Back button
- Settings modal
- Local user profile
- Local progress planning
- Mompy mascot states
- Mission completion flow
- Audio system planning
- Electron desktop packaging planning

---

## Planned features

### Learning system

- Python beginner missions
- Step-by-step challenges
- Mission validation
- Mission hints
- Mission progress
- Repeat mission
- Next mission
- Level system

### Mompy character

- Idle state
- Talking animation
- Happy state
- Sad/error state
- CRT shutdown animation
- Terminal animation on the start screen
- Mission completion messages inside Mompy's screen

### Audio

- Button click sound
- Run sound
- Success sound
- Error sound
- CRT shutdown sound
- Calm CRT ambient sound for the start screen

### User profile

- First-name setup
- Local profile
- Language preference
- Audio settings
- Progress reset
- Future optional cloud sync

### Desktop app

- Electron app
- Windows `.exe`
- Local-first storage
- GitHub Releases
- Official website/download page

---

## Local-first philosophy

Mompy is designed to work without requiring an online account.

For the first version, the following data should stay on the user's computer:

- first name;
- language preference;
- current mission;
- completed missions;
- audio settings;
- interface settings;
- progress state.

No server, password, or cloud account is required for the first desktop version.

---

## Desktop app

Mompy is being built with web technologies, but the final goal is to make it feel like a real installed desktop app.

```txt
HTML + CSS + JavaScript
↓
Electron
↓
Mompy.exe
```

The website will be used mainly as the official page for information and downloads.

```txt
Mompy app = installable desktop app
mompy.com.br = official website / download page
GitHub Releases = app installer downloads
```

---

## Technology stack

Current / planned stack:

- HTML
- CSS
- JavaScript
- LocalStorage
- Electron
- Electron Builder
- Git
- GitHub
- GitHub Releases

Possible future additions:

- Node.js helpers
- Local file storage
- Cloud sync
- Online accounts
- Mission editor
- AI-assisted hints

---

## Project structure

Planned structure:

```txt
mompy/
  src/
    index.html
    styles.css
    main.js

    assets/
      images/
      audio/
      icons/
      branding/

  electron/
    main.js
    preload.js

  README.md
  package.json
  .gitignore
```

The structure may change while the project is still in development.

---

## Development

After installing dependencies:

```bash
npm install
```

Run the app in development:

```bash
npm run dev
```

Or, depending on the current setup:

```bash
npm start
```

---

## Build

When Electron is configured, the app should be built with:

```bash
npm run build
```

The generated installer or executable should not be committed directly into the repository.

Installers should be published later through **GitHub Releases**.

---

## GitHub Releases

The repository contains the source code.

GitHub Releases will be used for downloadable versions of the app.

Example future release:

```txt
Mompy v1.0.0
Mompy-Setup.exe
```

Users will be able to download the installer without touching the source code.

---

## Audio files

Expected audio files:

```txt
assets/audio/click.wav
assets/audio/run.wav
assets/audio/success.wav
assets/audio/error.wav
assets/audio/shutdown.wav
assets/audio/mompy_crt_ambient_loop_minimal.wav
```

Audio behavior:

- Loading screen: no sound
- Start screen: ambient sound only
- Mission screen: sound effects only
- Run: run sound
- Correct answer: success sound
- Wrong answer: error sound
- CRT shutdown animation: shutdown sound

---

## Roadmap

### Phase 1 — Main Layout

Fix the main mission screen layout, alignment, panels, editor, output, and top bar.

### Phase 2 — Buttons

Add and organize Settings, Exit, Back, Help, and Run buttons.

### Phase 3 — Button Functions

Implement modals, shortcuts, confirmation dialogs, and mission completion behavior.

### Phase 4 — Start Screen

Create the entry screen with Mompy, Start, Continue, user information, level, and missions completed.

### Phase 5 — Loading Screen

Create the CRT-style loading screen with Mompy and a real animated progress bar.

### Phase 6 — Mompy Animations

Implement Mompy states, talking animation, happy/sad states, terminal animation, and CRT shutdown interaction.

### Phase 7 — Audio

Implement sound effects and ambient sound behavior.

### Phase 8 — Progress and Missions

Implement local mission data, validation, progress saving, Start, Continue, Reset Progress, and level updates.

### Phase 9 — Polish and Testing

Fix bugs, improve alignment, test screens, test audio, test progress, and create a test checklist.

### Phase 10 — Desktop App and GitHub

Configure Electron, prepare the Windows desktop app, organize the repository, and push the project to GitHub.

---

## Test checklist

Before release:

### Loading

- [ ] Loading screen appears
- [ ] Loading progress works
- [ ] Loading has no sound
- [ ] Loading transitions to start screen

### Start screen

- [ ] Start button works
- [ ] Continue button works
- [ ] User name is loaded from local profile
- [ ] Level appears correctly
- [ ] Missions completed count appears correctly
- [ ] Ambient sound works only here

### Mission screen

- [ ] Run button works
- [ ] Correct code completes mission
- [ ] Wrong code shows hint
- [ ] Help opens mission help
- [ ] Back asks confirmation
- [ ] Output updates correctly
- [ ] Mompy reacts correctly

### Completion flow

- [ ] Mission completed message appears on Mompy screen
- [ ] Back, Help, and Run disable after completion
- [ ] Repeat works
- [ ] Next Mission works
- [ ] Settings and Exit still work

### GitHub

- [ ] `.gitignore` exists
- [ ] `node_modules` is not committed
- [ ] Build folders are not committed
- [ ] README is updated
- [ ] Project pushes correctly
- [ ] Main branch is stable
- [ ] Dev branch is used for changes

---

## Git workflow

Recommended workflow:

```txt
main = stable version
dev = development version
```

Before major changes:

```bash
git add .
git commit -m "Save current working version"
git push
```

After a successful feature:

```bash
git add .
git commit -m "Add Mompy audio system"
git push
```

Files that should not be pushed:

```txt
node_modules/
dist/
build/
release/
out/
.env
*.exe
*.log
```

---

## Official website

Planned official website:

```txt
mompy.com.br
```

The website can be used for:

- project presentation;
- screenshots;
- download button;
- GitHub link;
- release notes;
- future documentation.

---

## Português

**Mompy** é um aplicativo retrô de treinamento em Python, criado para ajudar iniciantes a aprender programação por meio de pequenas missões interativas.

Ele funciona como um console antigo de treinamento: o usuário lê uma missão, escreve código, executa, recebe feedback e avança para a próxima etapa.

A ideia é unir:

- visual de computador antigo;
- interface CRT verde;
- mascote amigável;
- missões de Python;
- feedback visual e sonoro;
- progresso salvo localmente;
- aplicativo instalável para Windows.

O objetivo é fazer o aprendizado de programação parecer mais divertido, focado e memorável.

---

## Author

Created by **Mackson Victor**.

GitHub:

```txt
github.com/macksonvictor
```

---

## Project status

Mompy is currently in active development.

This repository may change frequently while the interface, mission system, audio, and desktop packaging are being completed.

---

## License

License not defined yet.

Until a license is chosen, all rights are reserved by the author.

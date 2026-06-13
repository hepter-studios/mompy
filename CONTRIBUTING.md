# Contributing to Mompy

Thank you for your interest in Mompy.

Mompy is still in active development, so contributions should stay focused, simple, and aligned with the project direction.

## Project direction

Mompy is a retro CRT-style Python training app for beginners.

The project priorities are:

- clear beginner-friendly Python missions;
- a polished retro/CRT interface;
- local-first progress and profile storage;
- simple desktop packaging;
- no unnecessary server, login, or cloud dependency for the first version.

## Before contributing

Please open an issue before making large changes.

Good issues include:

- bug reports;
- interface problems;
- mission ideas;
- accessibility improvements;
- documentation improvements;
- packaging improvements.

## Pull request guidelines

When submitting a pull request:

1. Keep the change focused.
2. Do not redesign the interface without discussion.
3. Do not add online accounts, passwords, or cloud sync unless there is an approved plan.
4. Do not commit generated builds, installers, `node_modules`, or temporary files.
5. Test the app locally before submitting.
6. Explain what changed and why.

## Development setup

```bash
git clone https://github.com/macksonvictor/mompy.git
cd mompy
npm install
npm run dev
```

The commands may change while the Electron structure is being completed.

## Code style

- Keep HTML, CSS, and JavaScript readable.
- Prefer clear names over clever names.
- Keep UI behavior simple and predictable.
- Preserve the current Mompy visual identity unless a visual change is requested.

## Local-first rule

For the first desktop version, user data should stay local whenever possible.

Do not add server dependencies unless the project explicitly moves to an online/cloud phase.

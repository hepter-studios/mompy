# Security Policy

Mompy is a local-first Python desktop app. Security work focuses on protecting the learner's machine, local files, progress data and installable releases.

## Supported Versions

Security notes and fixes apply to the latest public release and to the current development version on the `main` branch.

| Version | Supported |
| --- | --- |
| Latest release | Yes |
| `main` branch | Yes |
| Older test builds | Best effort only |

## Reporting A Vulnerability

Please do not open public issues for serious security problems.

Use the safest private contact path available through the GitHub repository or Hepter Studio channels. If private GitHub security advisories are enabled, use them.

When reporting, include:

- what the issue is;
- how it can be reproduced;
- what files, features or releases are affected;
- screenshots, logs or sample input when useful;
- whether the issue exposes user data, local files or command execution.

## Security Scope

High-priority reports include:

- unsafe learner-code execution;
- access to local files outside expected limits;
- installer or release package tampering;
- dependency vulnerabilities with practical impact;
- exposed tokens, credentials or private files;
- broken update, packaging or build assumptions.

## Local-First Security Goals

Mompy should:

- avoid online accounts by default;
- avoid passwords unless a real account system exists;
- store profile and progress locally;
- avoid sending learner progress to external services;
- avoid telemetry by default;
- keep user code execution isolated from the UI process where possible;
- avoid committing private files, tokens, installers or build folders.

## Dependency Safety

Before adding a new dependency, check whether it is actually needed.

Prefer simple local code when it is enough for the feature. When a dependency is required, keep it documented in `requirements.txt` and make sure the app still runs from source.

## Release Verification

Official builds should be attached to GitHub Releases and matched to the source state used to create them.

Do not trust executable files sent through issues, comments or unofficial mirrors.

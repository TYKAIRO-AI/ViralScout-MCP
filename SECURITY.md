# Security Policy

## Supported version

ViralScout MCP is currently pre-1.0. Security fixes target the latest release on `main`.

## Security model

- No API keys are required for the cloud-safe core.
- No shared subscriber credential is required.
- No secrets should be committed to the repository.
- User-supplied URLs are treated as references only by the cloud-safe core.
- The hosted core does not execute arbitrary shell commands.
- Transcript size and selected numeric inputs are bounded.
- Tool descriptions explicitly state data-source limitations.

## Reporting

Please open a GitHub issue for non-sensitive security problems.

For a vulnerability that should not be public, contact the publisher privately before disclosure.

Publisher: **Mahmoud Hisham**

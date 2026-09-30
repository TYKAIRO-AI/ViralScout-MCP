# ViralScout MCP


> **A TYKAIRO AI product** — Founded by **Mahmoud Hisham**
**Free short-form video analysis toolkit for TikTok, Reels, and YouTube Shorts.**

ViralScout MCP turns supplied transcripts and video metadata into structured hook analysis, pacing suggestions, original remix angles, short-form script frameworks, content-gap hypotheses, and complete creator packs.

> Publisher: **Mahmoud Hisham**

## Why ViralScout?

Creators often know a video worked but not *why* it worked. ViralScout breaks short-form content into reusable communication patterns without copying distinctive source wording or footage.

### 8 focused MCP tools

| Tool | What it does |
|---|---|
| `analyze_video` | Full transcript-based short-form breakdown |
| `normalize_transcript` | Clean pasted captions/transcripts |
| `analyze_hook` | Classify and improve the opening pattern |
| `analyze_retention` | Suggest pacing and pattern interrupts |
| `generate_remix_ideas` | Produce original angles inspired by a topic |
| `generate_short_script` | Create a ready-to-record script framework |
| `generate_content_gaps` | Generate underserved-angle hypotheses |
| `create_creator_pack` | One-call complete creator workflow |

## Cloud-safe by design

The hosted core requires:

- **No API key**
- **No paid external processing service**
- **No subscriber credential**
- **No shared secret**
- **No account setup**

This avoids unnecessary onboarding friction on MCP hosts such as MCPize.

The cloud-safe version does **not** pretend to have live TikTok search-volume data and does not claim to download protected/private platform media. If a tool is given a URL, the URL is treated as source metadata unless an explicitly documented local workflow is used.

## Quick start

### Requirements

- Node.js 20+
- npm

### Install and run

```bash
npm install
npm run build
npm start
```

### Development

```bash
npm run dev
```

### Test

```bash
npm run check
```

`npm run check` builds the production server and runs both unit tests and an end-to-end STDIO MCP smoke test.

## Example prompts

```text
Analyze this transcript and explain the hook, structure, and retention opportunities.
```

```text
Create five original remix ideas about fitness tips without copying the source wording.
```

```text
Create a complete TikTok creator pack from this transcript.
```

## MCP client configuration

After building locally:

```json
{
  "mcpServers": {
    "viralscout": {
      "command": "node",
      "args": ["/absolute/path/to/ViralScout-MCP/dist/index.js"]
    }
  }
}
```

## MCPize deployment

MCPize supports direct GitHub deployment for MCP repositories using STDIO.

Recommended listing configuration:

- **Name:** ViralScout — Short-Form Video Analysis Toolkit
- **Slug:** `viralscout`
- **Category:** Creator Tools / Marketing
- **Pricing:** Free
- **Credentials:** None
- **Visibility:** Public
- **Repository:** this public GitHub repository

Before publishing, verify all tools in the MCPize Playground and confirm the listing does not request a workspace key, API key, or subscriber secret.

## Limitations

ViralScout intentionally distinguishes deterministic analysis from live platform analytics.

`generate_content_gaps` returns **content-angle hypotheses**, not measured TikTok search demand. Validate trend and search assumptions using current platform-native insights.

The hosted core expects the user to provide a transcript/captions. Optional local media extraction may be added separately so the lightweight hosted server remains reliable.

## Safety & originality

ViralScout is intended for inspiration, analysis, and original content creation. Do not use it to reproduce another creator's distinctive script, footage, branding, or copyrighted creative expression.

## Privacy

See [PRIVACY.md](./PRIVACY.md).

## Security

See [SECURITY.md](./SECURITY.md).

## License and ownership

Copyright © 2026 **Mahmoud Hisham**.

Use is permitted under the source-available terms in [LICENSE](./LICENSE). Republishing, reselling, redistributing, rebranding, or modified re-upload as another standalone commercial product is prohibited without written permission.

---

**ViralScout MCP — by Mahmoud Hisham**

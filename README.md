# 🎬 ViralScout MCP

> **A TYKAIRO AI product** — Founded by **Mahmoud Hisham**

**Free MCP toolkit that turns short-form video transcripts into hook analysis, retention ideas, original remix angles, and ready-to-record creator packs.**

[![TypeScript](https://img.shields.io/badge/TypeScript-MCP-informational)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20%2B-informational)](https://nodejs.org/)
[![No API Key](https://img.shields.io/badge/API%20key-not%20required-informational)](#cloud-safe-by-design)
[![TYKAIRO AI](https://img.shields.io/badge/by-TYKAIRO%20AI-informational)](https://github.com/TYKAIRO-AI)

ViralScout helps creators understand **why a short-form video works** and turn those patterns into original ideas without copying distinctive source wording or footage.

## ⚡ Quick start

```bash
git clone https://github.com/TYKAIRO-AI/ViralScout-MCP.git
cd ViralScout-MCP
npm install
npm run build
npm start
```

Run the full validation suite:

```bash
npm run check
```

`npm run check` builds the production server and runs unit tests plus an end-to-end STDIO MCP smoke test.

## 8 focused MCP tools

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

## Cloud-safe by design

The hosted core requires:

- **No API key**
- **No paid external processing service**
- **No subscriber credential**
- **No shared secret**
- **No account setup**

The cloud-safe version does **not** claim to provide live TikTok search-volume data or download protected/private platform media. URLs are treated as source metadata unless an explicitly documented local workflow is used.

## What ViralScout is good at

ViralScout focuses on reusable communication structure:

```text
Transcript / captions
        ↓
Hook + structure analysis
        ↓
Retention opportunities
        ↓
Original remix angles
        ↓
Script framework / creator pack
```

It is useful for creators, social teams, marketers, agencies, and developers building MCP-powered content workflows.

## MCPize deployment

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

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md). Issues and feature ideas are welcome.

If ViralScout helps your workflow, consider starring the repository so more creators and MCP builders can discover it.

## Privacy

See [PRIVACY.md](./PRIVACY.md).

## Security

See [SECURITY.md](./SECURITY.md).

## License and ownership

Copyright © 2026 **Mahmoud Hisham**.

Use is permitted under the source-available terms in [LICENSE](./LICENSE). Republishing, reselling, redistributing, rebranding, or modified re-upload as another standalone commercial product is prohibited without written permission.

---

**ViralScout MCP — by Mahmoud Hisham / TYKAIRO AI**

/**
 * ViralScout MCP smoke test
 * Developer: Mahmoud Hisham
 * Developer fingerprint: MH-VIRALSCOUT-2026
 */
import { afterEach, describe, expect, it } from "vitest";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

let client: Client | undefined;

afterEach(async () => {
  if (client) {
    await client.close();
    client = undefined;
  }
});

describe("ViralScout MCP server", () => {
  it("starts over STDIO, exposes all expected tools, and executes a tool", async () => {
    const transport = new StdioClientTransport({
      command: process.execPath,
      args: ["dist/index.js"],
      stderr: "pipe"
    });

    client = new Client({
      name: "viralscout-smoke-test",
      version: "1.0.0"
    });

    await client.connect(transport);

    const listed = await client.listTools();
    const names = listed.tools.map((tool) => tool.name).sort();

    expect(names).toEqual([
      "analyze_hook",
      "analyze_retention",
      "analyze_video",
      "create_creator_pack",
      "generate_content_gaps",
      "generate_remix_ideas",
      "generate_short_script",
      "normalize_transcript"
    ].sort());

    const result = await client.callTool({
      name: "normalize_transcript",
      arguments: {
        transcript: "Hello   world. This is a short-form video transcript for the smoke test.",
        removeSpeakerLabels: false
      }
    });

    expect(result.isError).not.toBe(true);
    expect(JSON.stringify(result.content)).toContain("Hello world");
  }, 15_000);
});

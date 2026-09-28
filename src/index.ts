#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import {
  analyzeStructure,
  classifyHook,
  cleanTranscript,
  contentGaps,
  firstWords,
  keywords,
  remixIdeas,
  retentionSuggestions,
  scriptTemplate
} from "./core.js";

const server = new McpServer({
  name: "viralscout-mcp",
  version: "0.1.0"
});

function ok(data: unknown) {
  return {
    content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }],
    structuredContent: data as Record<string, unknown>
  };
}

function requireTranscript(transcript: string) {
  const cleaned = cleanTranscript(transcript);
  if (cleaned.length < 20) {
    throw new Error("Transcript is too short. Provide at least 20 characters of spoken content.");
  }
  if (cleaned.length > 100_000) {
    throw new Error("Transcript is too large. Maximum supported length is 100,000 characters.");
  }
  return cleaned;
}

server.tool(
  "analyze_video",
  "Analyze short-form video content from a supplied transcript and optional metadata. Does not claim to fetch private or unsupported platform data.",
  {
    transcript: z.string().describe("Transcript or captions copied from the video."),
    title: z.string().max(300).optional(),
    niche: z.string().max(120).optional(),
    platform: z.enum(["tiktok", "instagram-reels", "youtube-shorts", "other"]).optional(),
    durationSeconds: z.number().positive().max(3600).optional(),
    sourceUrl: z.string().url().optional()
  },
  async (input) => {
    const transcript = requireTranscript(input.transcript);
    const hook = classifyHook(transcript);
    const topic = input.niche ?? keywords(transcript, 3).join(" / ") ?? "the topic";
    return ok({
      source: { title: input.title, platform: input.platform, sourceUrl: input.sourceUrl },
      hook,
      structure: analyzeStructure(transcript),
      keywords: keywords(transcript),
      retention: retentionSuggestions(transcript, input.durationSeconds),
      remixIdeas: remixIdeas(topic || "the topic", hook.hook, 5),
      note: "Analysis is based only on the transcript and metadata supplied by the user."
    });
  }
);

server.tool(
  "normalize_transcript",
  "Clean a pasted transcript or caption block for downstream short-form content analysis.",
  { transcript: z.string(), removeSpeakerLabels: z.boolean().default(false) },
  async ({ transcript, removeSpeakerLabels }) => {
    let cleaned = cleanTranscript(transcript);
    if (removeSpeakerLabels) cleaned = cleaned.replace(/\b[A-Z][A-Z0-9 _-]{1,20}:\s*/g, "");
    return ok({ transcript: cleaned, characters: cleaned.length, words: cleaned.split(/\s+/).filter(Boolean).length });
  }
);

server.tool(
  "analyze_hook",
  "Break down the opening words of a short-form transcript and classify the hook pattern.",
  { transcript: z.string() },
  async ({ transcript }) => {
    const cleaned = requireTranscript(transcript);
    return ok({
      ...classifyHook(cleaned),
      rewritePrinciples: [
        "Lead with the viewer's problem, desired outcome, or unresolved question.",
        "Make the promise specific enough to understand immediately.",
        "Do not copy distinctive wording from the source; preserve only the underlying communication pattern."
      ]
    });
  }
);

server.tool(
  "analyze_retention",
  "Generate pacing and retention suggestions from transcript length, structure, and optional duration.",
  {
    transcript: z.string(),
    durationSeconds: z.number().positive().max(3600).optional()
  },
  async ({ transcript, durationSeconds }) => ok(retentionSuggestions(requireTranscript(transcript), durationSeconds))
);

server.tool(
  "generate_remix_ideas",
  "Create original short-form content angles inspired by a topic and optional source hook without copying the source wording.",
  {
    topic: z.string().min(2).max(160),
    sourceHook: z.string().max(500).optional(),
    count: z.number().int().min(1).max(7).default(5)
  },
  async ({ topic, sourceHook, count }) => ok({
    topic,
    ideas: remixIdeas(topic, sourceHook ?? `A video about ${topic}`, count),
    originalityRule: "Use the source as structural inspiration only. Do not reproduce distinctive wording, footage, branding, or creative expression."
  })
);

server.tool(
  "generate_short_script",
  "Generate a concise ready-to-record short-form script framework for a topic.",
  {
    topic: z.string().min(2).max(160),
    tone: z.enum(["direct", "educational", "story", "energetic", "calm"]).default("direct"),
    targetSeconds: z.number().int().min(10).max(120).default(30)
  },
  async ({ topic, tone, targetSeconds }) => ok({
    topic,
    targetSeconds,
    script: scriptTemplate(topic, tone),
    recordingNotes: [
      "Open on the result, problem, or most visually interesting moment.",
      "Use short spoken sentences.",
      "Add B-roll only when it clarifies the claim.",
      "Keep one primary CTA."
    ]
  })
);

server.tool(
  "generate_content_gaps",
  "Generate underserved content-angle hypotheses around a niche. These are ideation hypotheses, not claims of live TikTok search-volume data.",
  {
    topic: z.string().min(2).max(160),
    audience: z.string().min(2).max(120).default("creators")
  },
  async ({ topic, audience }) => ok({
    topic,
    audience,
    gapHypotheses: contentGaps(topic, audience),
    limitation: "This tool does not claim access to live TikTok search volume or private trend data. Validate hypotheses with current platform search insights before publishing."
  })
);

server.tool(
  "create_creator_pack",
  "Create a complete short-form creator pack from a transcript: hook analysis, structure, pacing, keywords, remix ideas, script framework, captions, and CTA prompts.",
  {
    transcript: z.string(),
    topic: z.string().max(160).optional(),
    audience: z.string().max(120).default("general viewers"),
    platform: z.enum(["tiktok", "instagram-reels", "youtube-shorts", "other"]).default("tiktok"),
    durationSeconds: z.number().positive().max(3600).optional()
  },
  async ({ transcript, topic, audience, platform, durationSeconds }) => {
    const cleaned = requireTranscript(transcript);
    const hook = classifyHook(cleaned);
    const key = keywords(cleaned);
    const resolvedTopic = topic ?? key.slice(0, 3).join(" / ") || "the topic";
    return ok({
      platform,
      topic: resolvedTopic,
      audience,
      originalHook: hook,
      structure: analyzeStructure(cleaned),
      retention: retentionSuggestions(cleaned, durationSeconds),
      keywords: key,
      remixIdeas: remixIdeas(resolvedTopic, hook.hook, 5),
      script: scriptTemplate(resolvedTopic, "direct"),
      captionStarters: [
        `The part most people miss about ${resolvedTopic}.`,
        `A simpler way to think about ${resolvedTopic}.`,
        `Save this before your next ${resolvedTopic} video.`
      ],
      ctaOptions: [
        "Save this for your next video.",
        "Which angle should I break down next?",
        "Try this structure and compare your retention."
      ],
      contentGapHypotheses: contentGaps(resolvedTopic, audience).slice(0, 5),
      sourcePreview: firstWords(cleaned, 30),
      limitations: [
        "No live platform trend or search-volume data is inferred.",
        "No copyrighted source footage is downloaded or reproduced by this cloud-safe workflow.",
        "Creative outputs should be reviewed and adapted by the creator before publishing."
      ]
    });
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);

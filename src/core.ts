/**
 * ViralScout MCP Core
 * Developer: Mahmoud Hisham
 * Copyright © 2026 Mahmoud Hisham. All rights reserved.
 * Developer fingerprint: MH-VIRALSCOUT-2026
 */
export type TranscriptInput = {
  transcript: string;
  title?: string;
  niche?: string;
  platform?: string;
  durationSeconds?: number;
};

export function cleanTranscript(input: string): string {
  return input
    .replace(/\[(music|applause|laughter)\]/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function firstWords(text: string, count = 18): string {
  return cleanTranscript(text).split(" ").slice(0, count).join(" ");
}

export function sentences(text: string): string[] {
  return cleanTranscript(text)
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

export function keywords(text: string, limit = 10): string[] {
  const stop = new Set([
    "the","and","that","this","with","from","your","you","are","for","was","have","has",
    "but","not","they","their","into","about","just","can","will","what","when","how",
    "في","من","على","إلى","عن","هذا","هذه","التي","الذي","مع","كان","أنا","انت","هو","هي"
  ]);
  const counts = new Map<string, number>();
  const words = cleanTranscript(text).toLowerCase().match(/[\p{L}\p{N}][\p{L}\p{N}-]{2,}/gu) ?? [];
  for (const word of words) {
    if (stop.has(word)) continue;
    counts.set(word, (counts.get(word) ?? 0) + 1);
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, limit)
    .map(([word]) => word);
}

export function classifyHook(transcript: string) {
  const hook = firstWords(transcript, 24);
  const lower = hook.toLowerCase();
  const types: string[] = [];
  if (/\?/.test(hook) || /^(why|how|what|did|do|can|هل|ليه|ازاي|إزاي|كيف|ماذا)/i.test(hook)) types.push("question");
  if (/\b(secret|mistake|warning|never|stop|wrong|problem|صدمة|غلط|سر|مشكلة|اوعى|أوعى)\b/iu.test(lower)) types.push("tension");
  if (/\b(3|5|7|10|three|five|seven|ten|خطوات|طرق|أسباب)\b/iu.test(lower)) types.push("list");
  if (/\b(result|before|after|made|earned|grew|نتيجة|قبل|بعد|كسبت|وصلت)\b/iu.test(lower)) types.push("result-first");
  if (!types.length) types.push("statement");
  return { hook, types };
}

export function analyzeStructure(transcript: string) {
  const all = sentences(transcript);
  const total = all.length || 1;
  return {
    opening: all.slice(0, Math.max(1, Math.ceil(total * 0.2))),
    body: all.slice(Math.ceil(total * 0.2), Math.max(Math.ceil(total * 0.2) + 1, Math.ceil(total * 0.8))),
    payoff: all.slice(Math.ceil(total * 0.8)),
    sentenceCount: all.length,
    wordCount: cleanTranscript(transcript).split(/\s+/).filter(Boolean).length
  };
}

export function retentionSuggestions(transcript: string, durationSeconds?: number) {
  const wc = cleanTranscript(transcript).split(/\s+/).filter(Boolean).length;
  const estimatedSeconds = durationSeconds ?? Math.max(10, Math.round((wc / 150) * 60));
  const cutEvery = estimatedSeconds <= 20 ? 2 : estimatedSeconds <= 45 ? 3 : 4;
  return {
    estimatedDurationSeconds: estimatedSeconds,
    recommendedPatternInterruptEverySeconds: cutEvery,
    suggestions: [
      "Show the payoff or strongest visual promise in the opening seconds.",
      `Introduce a visual or framing change roughly every ${cutEvery}-${cutEvery + 2} seconds.`,
      "Put captions on high-value nouns, numbers, claims, and transitions rather than captioning every word identically.",
      "Remove setup sentences that do not change the viewer's understanding.",
      "End with one clear payoff or next action instead of multiple CTAs."
    ]
  };
}

export function remixIdeas(topic: string, baseHook: string, count = 5) {
  const angles = [
    ["Contrarian", `Most people approach ${topic} backwards — start with the result, then reveal the reason.`],
    ["Beginner", `Explain ${topic} as if the viewer has only 20 seconds and zero background knowledge.`],
    ["Mistakes", `Turn the idea into the top mistakes people make with ${topic}, then show the correction.`],
    ["Experiment", `Test the main claim around ${topic} on-screen and reveal what happened.`],
    ["Before/After", `Show the before state, the change, and the after state for ${topic}.`],
    ["Story", `Tell a short first-person story that reaches the same lesson about ${topic} without copying the source wording.`],
    ["Checklist", `Convert ${topic} into a fast checklist viewers can save.`]
  ];
  return angles.slice(0, Math.max(1, Math.min(count, angles.length))).map(([angle, concept], i) => ({
    id: i + 1,
    angle,
    concept,
    sampleHook: i === 0 ? `Don't copy this hook: "${baseHook}". Use the underlying tension and rewrite it for ${topic}.` : concept
  }));
}

export function scriptTemplate(topic: string, tone = "direct") {
  return {
    tone,
    hook: `If you're trying to improve ${topic}, start here.`,
    beats: [
      `Show the viewer the problem around ${topic} immediately.`,
      "Give one concrete reason the common approach underperforms.",
      "Demonstrate one practical change the viewer can apply today.",
      "Show or state the payoff clearly."
    ],
    cta: "Save this and test the idea in your next short."
  };
}

export function contentGaps(topic: string, audience = "creators") {
  return [
    `${topic} mistakes beginners make`,
    `${topic} myths vs reality`,
    `${topic} with a zero-budget workflow`,
    `${topic} before-and-after breakdown`,
    `${topic} checklist for ${audience}`,
    `What nobody explains about ${topic}`,
    `${topic} in under 30 seconds`,
    `A failed ${topic} attempt and what changed`,
    `Three ways to simplify ${topic}`,
    `The smallest useful ${topic} setup`
  ];
}

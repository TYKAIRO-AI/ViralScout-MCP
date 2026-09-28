import { describe, expect, it } from "vitest";
import {
  cleanTranscript,
  classifyHook,
  contentGaps,
  keywords,
  remixIdeas,
  retentionSuggestions
} from "../src/core.js";

describe("ViralScout core", () => {
  it("cleans transcript whitespace and stage markers", () => {
    expect(cleanTranscript("Hello   [Music]   world")).toBe("Hello world");
  });

  it("classifies question hooks", () => {
    expect(classifyHook("How do you make better short videos? Here is the answer.").types).toContain("question");
  });

  it("extracts repeated keywords", () => {
    const result = keywords("video hook video retention video creator retention");
    expect(result[0]).toBe("video");
  });

  it("limits remix ideas", () => {
    expect(remixIdeas("AI agents", "Most people get this wrong", 3)).toHaveLength(3);
  });

  it("returns ten content gap hypotheses", () => {
    expect(contentGaps("AI agents", "beginners")).toHaveLength(10);
  });

  it("returns bounded pacing guidance", () => {
    const result = retentionSuggestions("one two three four five six seven eight nine ten", 20);
    expect(result.recommendedPatternInterruptEverySeconds).toBe(2);
  });
});

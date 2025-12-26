import { describe, expect, it } from "vitest";
import { runCli } from "../src/cli";
import { transliterate } from "../src/converter";

describe("transliterate", () => {
  it("handles a greeting phrase", () => {
    expect(transliterate("dkssudgktpdy")).toBe("안녕하세요");
  });

  it("auto-inserts ㅇ for vowel-leading syllables", () => {
    expect(transliterate("k")).toBe("아");
  });

  it("composes combined vowels", () => {
    expect(transliterate("rhk")).toBe("과");
  });

  it("supports tense consonants via uppercase", () => {
    expect(transliterate("RkRk")).toBe("까까");
  });

  it("forms and keeps complex final consonants", () => {
    expect(transliterate("sjrt")).toBe("넋");
  });

  it("moves final consonant to next syllable before a vowel", () => {
    expect(transliterate("rksk")).toBe("가나");
  });
});

describe("CLI", () => {
  it("prints usage on --help", () => {
    const out: string[] = [];
    const code = runCli(["--help"], { out: (msg) => out.push(msg), err: () => undefined });
    expect(code).toBe(0);
    expect(out.join("\n")).toContain("Usage: dubelsik");
  });

  it("errors when input is missing", () => {
    const errors: string[] = [];
    const code = runCli([], { out: () => undefined, err: (msg) => errors.push(msg) });
    expect(code).toBe(1);
    expect(errors.join("\n")).toContain("No input provided");
  });

  it("prints converted text", () => {
    const out: string[] = [];
    const code = runCli(["rksk"], { out: (msg) => out.push(msg), err: () => undefined });
    expect(code).toBe(0);
    expect(out.join("\n")).toBe("가나");
  });
});

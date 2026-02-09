import { describe, expect, it } from "vitest";
import { runCli } from "../src/cli";
import { HangulSyllableStateMachine } from "../src/core/stateMachine/HangulSyllableStateMachine";
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

  describe("compound vowels coverage", () => {
    it("composes ㅘ (ㅗ + ㅏ)", () => {
      expect(transliterate("hk")).toBe("와");
    });

    it("composes ㅙ (ㅗ + ㅐ or ㅘ + ㅣ)", () => {
      expect(transliterate("rho")).toBe("괘");
    });

    it("composes ㅚ (ㅗ + ㅣ)", () => {
      expect(transliterate("ehl")).toBe("되");
    });

    it("composes ㅝ (ㅜ + ㅓ)", () => {
      expect(transliterate("fnj")).toBe("뤄");
    });

    it("composes ㅞ (ㅜ + ㅔ or ㅝ + ㅣ)", () => {
      expect(transliterate("wnp")).toBe("줴");
    });

    it("composes ㅟ (ㅜ + ㅣ)", () => {
      expect(transliterate("xnl")).toBe("튀");
    });

    it("composes ㅢ (ㅡ + ㅣ)", () => {
      expect(transliterate("cml")).toBe("츼");
    });
  });

  describe("complex final consonants", () => {
    it("handles ㄳ as final and splits correctly before a vowel", () => {
      expect(transliterate("sjrt")).toBe("넋");
      expect(transliterate("sjrtk")).toBe("넉사");
    });

    it("handles ㄵ as final and splits correctly before a vowel", () => {
      expect(transliterate("dksw")).toBe("앉");
      expect(transliterate("dkswk")).toBe("안자");
    });

    it("handles ㄶ as final and splits correctly before a vowel", () => {
      expect(transliterate("dksg")).toBe("않");
      expect(transliterate("dksgk")).toBe("안하");
    });

    it("handles ㄺ as final and splits correctly before a vowel", () => {
      expect(transliterate("dlfr")).toBe("읽");
      expect(transliterate("dlfrk")).toBe("일가");
    });

    it("handles ㄻ as final and splits correctly before a vowel", () => {
      expect(transliterate("dlfa")).toBe("읾");
      expect(transliterate("dlfak")).toBe("일마");
    });

    it("handles ㄼ as final and splits correctly before a vowel", () => {
      expect(transliterate("dlfq")).toBe("읿");
      expect(transliterate("dlfqk")).toBe("일바");
    });

    it("handles ㄽ as final and splits correctly before a vowel", () => {
      expect(transliterate("dlft")).toBe("잀");
      expect(transliterate("dlftk")).toBe("일사");
    });

    it("handles ㄾ as final and splits correctly before a vowel", () => {
      expect(transliterate("dlfx")).toBe("잁");
      expect(transliterate("dlfxk")).toBe("일타");
    });

    it("handles ㄿ as final and splits correctly before a vowel", () => {
      expect(transliterate("dlfv")).toBe("잂");
      expect(transliterate("dlfvk")).toBe("일파");
    });

    it("handles ㅀ as final and splits correctly before a vowel", () => {
      expect(transliterate("dlfg")).toBe("잃");
      expect(transliterate("dlfgk")).toBe("일하");
    });

    it("handles ㅄ as final and splits correctly before a vowel", () => {
      expect(transliterate("djqt")).toBe("없");
      expect(transliterate("djqtk")).toBe("업사");
    });
  });

  describe("uppercase vowel handling", () => {
    it("maps O to ㅒ", () => {
      expect(transliterate("rO")).toBe("걔");
    });

    it("maps P to ㅖ", () => {
      expect(transliterate("rP")).toBe("계");
    });

    it("treats other uppercase vowels the same as lowercase", () => {
      expect(transliterate("rL")).toBe("기");
    });
  });

  describe("non-Hangul passthrough", () => {
    it("preserves numbers while flushing pending syllables first", () => {
      expect(transliterate("rksk123")).toBe("가나123");
    });

    it("resets state so a following vowel starts with ㅇ", () => {
      expect(transliterate("r1k")).toBe("ㄱ1아");
    });

    it("preserves symbols while flushing pending syllables first", () => {
      expect(transliterate("rkt!")).toBe("갓!");
    });

    it("preserves whitespace while flushing pending syllables first", () => {
      expect(transliterate("rksk rP")).toBe("가나 계");
    });
  });

  describe("final split policy", () => {
    it("locks in expected splits when a vowel follows a complex final", () => {
      expect(transliterate("sjrtp")).toBe("넉세");
    });
  });

  describe("invalid final consonants", () => {
    it("flushes the syllable and starts a new one for ㄸ", () => {
      expect(transliterate("rkEk")).toBe("가따");
    });

    it("flushes the syllable and starts a new one for ㅃ", () => {
      expect(transliterate("rkQk")).toBe("가빠");
    });

    it("flushes the syllable and starts a new one for ㅉ", () => {
      expect(transliterate("rkWk")).toBe("가짜");
    });
  });
});

describe("state machine defensive branch", () => {
  it("falls back to a vowel-leading syllable on inconsistent composite state", () => {
    const machine = new HangulSyllableStateMachine();
    machine.setCurrentState(machine.initialMedialFinalCompositeConsonantState, {
      initial: "ㄱ",
      medial: "ㅏ",
      // Force an inconsistent state: composite state with a non-splittable final.
      final: "ㄲ",
    });

    machine.inputVowel("ㅏ");
    machine.emit(machine.currentState.syllableState);

    expect(machine.output).toBe("가까");
  });
});

describe("CLI", () => {
  it("prints usage on --help", () => {
    const out: string[] = [];
    const code = runCli(["--help"], {
      out: (msg) => out.push(msg),
      err: () => undefined,
    });
    expect(code).toBe(0);
    expect(out.join("\n")).toContain("Usage: dubelsik");
  });

  it("errors when input is missing", () => {
    const errors: string[] = [];
    const code = runCli([], {
      out: () => undefined,
      err: (msg) => errors.push(msg),
    });
    expect(code).toBe(1);
    expect(errors.join("\n")).toContain("No input provided");
  });

  it("prints converted text", () => {
    const out: string[] = [];
    const code = runCli(["rksk"], {
      out: (msg) => out.push(msg),
      err: () => undefined,
    });
    expect(code).toBe(0);
    expect(out.join("\n")).toBe("가나");
  });
});

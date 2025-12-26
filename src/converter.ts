const CHOSEONG = [
  "ㄱ",
  "ㄲ",
  "ㄴ",
  "ㄷ",
  "ㄸ",
  "ㄹ",
  "ㅁ",
  "ㅂ",
  "ㅃ",
  "ㅅ",
  "ㅆ",
  "ㅇ",
  "ㅈ",
  "ㅉ",
  "ㅊ",
  "ㅋ",
  "ㅌ",
  "ㅍ",
  "ㅎ",
];

const JUNGSEONG = [
  "ㅏ",
  "ㅐ",
  "ㅑ",
  "ㅒ",
  "ㅓ",
  "ㅔ",
  "ㅕ",
  "ㅖ",
  "ㅗ",
  "ㅘ",
  "ㅙ",
  "ㅚ",
  "ㅛ",
  "ㅜ",
  "ㅝ",
  "ㅞ",
  "ㅟ",
  "ㅠ",
  "ㅡ",
  "ㅢ",
  "ㅣ",
];

const JONGSEONG = [
  "",
  "ㄱ",
  "ㄲ",
  "ㄳ",
  "ㄴ",
  "ㄵ",
  "ㄶ",
  "ㄷ",
  "ㄹ",
  "ㄺ",
  "ㄻ",
  "ㄼ",
  "ㄽ",
  "ㄾ",
  "ㄿ",
  "ㅀ",
  "ㅁ",
  "ㅂ",
  "ㅄ",
  "ㅅ",
  "ㅆ",
  "ㅇ",
  "ㅈ",
  "ㅊ",
  "ㅋ",
  "ㅌ",
  "ㅍ",
  "ㅎ",
];

const keyToJamo: Record<string, string> = {
  q: "ㅂ",
  Q: "ㅃ",
  w: "ㅈ",
  W: "ㅉ",
  e: "ㄷ",
  E: "ㄸ",
  r: "ㄱ",
  R: "ㄲ",
  t: "ㅅ",
  T: "ㅆ",
  a: "ㅁ",
  s: "ㄴ",
  d: "ㅇ",
  f: "ㄹ",
  g: "ㅎ",
  z: "ㅋ",
  x: "ㅌ",
  c: "ㅊ",
  v: "ㅍ",
  h: "ㅗ",
  j: "ㅓ",
  k: "ㅏ",
  l: "ㅣ",
  y: "ㅛ",
  u: "ㅕ",
  i: "ㅑ",
  o: "ㅐ",
  O: "ㅒ",
  p: "ㅔ",
  P: "ㅖ",
  b: "ㅠ",
  n: "ㅜ",
  m: "ㅡ",
  // Uppercase vowel letters map to their lowercase counterparts for resilience,
  // except where shift already has meaning (O, P).
  H: "ㅗ",
  J: "ㅓ",
  K: "ㅏ",
  L: "ㅣ",
  Y: "ㅛ",
  U: "ㅕ",
  I: "ㅑ",
  B: "ㅠ",
  N: "ㅜ",
  M: "ㅡ",
};

const vowelCombinations: Record<string, string> = {
  ㅗㅏ: "ㅘ",
  ㅗㅐ: "ㅙ",
  ㅗㅣ: "ㅚ",
  ㅜㅓ: "ㅝ",
  ㅜㅔ: "ㅞ",
  ㅜㅣ: "ㅟ",
  ㅡㅣ: "ㅢ",
  ㅘㅣ: "ㅙ",
  ㅝㅣ: "ㅞ",
};

const finalCombinations: Record<string, string> = {
  ㄱㅅ: "ㄳ",
  ㄴㅈ: "ㄵ",
  ㄴㅎ: "ㄶ",
  ㄹㄱ: "ㄺ",
  ㄹㅁ: "ㄻ",
  ㄹㅂ: "ㄼ",
  ㄹㅅ: "ㄽ",
  ㄹㅌ: "ㄾ",
  ㄹㅍ: "ㄿ",
  ㄹㅎ: "ㅀ",
  ㅂㅅ: "ㅄ",
};

const finalSplits: Record<string, [string, string]> = {
  ㄳ: ["ㄱ", "ㅅ"],
  ㄵ: ["ㄴ", "ㅈ"],
  ㄶ: ["ㄴ", "ㅎ"],
  ㄺ: ["ㄹ", "ㄱ"],
  ㄻ: ["ㄹ", "ㅁ"],
  ㄼ: ["ㄹ", "ㅂ"],
  ㄽ: ["ㄹ", "ㅅ"],
  ㄾ: ["ㄹ", "ㅌ"],
  ㄿ: ["ㄹ", "ㅍ"],
  ㅀ: ["ㄹ", "ㅎ"],
  ㅄ: ["ㅂ", "ㅅ"],
};

const VOWELS = new Set(
  Object.values(keyToJamo).filter((j) => isHangulJungseong(j)),
);

function isHangulJungseong(jamo: string): boolean {
  return (
    jamo >= "ㅏ" &&
    jamo <= "ㅣ" &&
    ![
      "ㄱ",
      "ㄲ",
      "ㄴ",
      "ㄷ",
      "ㄸ",
      "ㄹ",
      "ㅁ",
      "ㅂ",
      "ㅃ",
      "ㅅ",
      "ㅆ",
      "ㅇ",
      "ㅈ",
      "ㅉ",
      "ㅊ",
      "ㅋ",
      "ㅌ",
      "ㅍ",
      "ㅎ",
    ].includes(jamo)
  );
}

function isVowel(jamo: string): boolean {
  return VOWELS.has(jamo);
}

function combineVowels(prev: string, next: string): string | null {
  return vowelCombinations[prev + next] ?? null;
}

function combineFinal(prev: string, next: string): string | null {
  return finalCombinations[prev + next] ?? null;
}

function composeSyllable(
  initial: string,
  medial: string,
  final: string,
): string {
  const initialIndex = CHOSEONG.indexOf(initial);
  const medialIndex = JUNGSEONG.indexOf(medial);
  const finalIndex = JONGSEONG.indexOf(final);

  if (initialIndex === -1 || medialIndex === -1 || finalIndex === -1) {
    return `${initial}${medial}${final}`;
  }

  const codePoint =
    0xac00 + (initialIndex * 21 + medialIndex) * 28 + finalIndex;
  return String.fromCharCode(codePoint);
}

function flushBuffer(state: SyllableState): string {
  const { initial, medial, final } = state;
  if (!initial && !medial && !final) {
    return "";
  }

  if (initial && medial) {
    return composeSyllable(initial, medial, final);
  }

  return `${initial}${medial}${final}`;
}

interface SyllableState {
  initial: string;
  medial: string;
  final: string;
}

function asJamo(inputChar: string): string | null {
  return keyToJamo[inputChar] ?? null;
}

/**
 * Transliterate a string typed with a two-set (두벌식) keyboard layout into composed Hangul.
 */
export function transliterate(input: string): string {
  const state: SyllableState = { initial: "", medial: "", final: "" };
  let output = "";

  const pushState = () => {
    output += flushBuffer(state);
    state.initial = "";
    state.medial = "";
    state.final = "";
  };

  for (const ch of input) {
    const jamo = asJamo(ch);

    if (!jamo) {
      pushState();
      output += ch;
      continue;
    }

    if (isVowel(jamo)) {
      if (!state.initial && !state.medial && !state.final) {
        state.initial = "ㅇ";
        state.medial = jamo;
        continue;
      }

      if (state.initial && !state.medial) {
        state.medial = jamo;
        continue;
      }

      if (state.initial && state.medial && !state.final) {
        const combined = combineVowels(state.medial, jamo);
        if (combined) {
          state.medial = combined;
        } else {
          pushState();
          state.initial = "ㅇ";
          state.medial = jamo;
        }
        continue;
      }

      if (state.initial && state.medial && state.final) {
        const split = finalSplits[state.final];
        if (split) {
          const [stay, move] = split;
          const prev = composeSyllable(state.initial, state.medial, stay);
          output += prev;
          state.initial = move;
          state.medial = jamo;
          state.final = "";
        } else {
          const prev = composeSyllable(state.initial, state.medial, "");
          output += prev;
          state.initial = state.final;
          state.medial = jamo;
          state.final = "";
        }
      }

      continue;
    }

    // Consonant
    if (!state.initial && !state.medial && !state.final) {
      state.initial = jamo;
      continue;
    }

    if (state.initial && !state.medial) {
      output += state.initial;
      state.initial = jamo;
      continue;
    }

    if (state.initial && state.medial && !state.final) {
      state.final = jamo;
      continue;
    }

    if (state.initial && state.medial && state.final) {
      const combined = combineFinal(state.final, jamo);
      if (combined) {
        state.final = combined;
      } else {
        pushState();
        state.initial = jamo;
      }
    }
  }

  pushState();
  return output;
}

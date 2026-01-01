import { keyToJamo } from "./jamo-data";

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

const VOWELS = new Set(
  Object.values(keyToJamo).filter((j) => isHangulJungseong(j)),
);

export function isVowel(jamo: string): boolean {
  return VOWELS.has(jamo);
}

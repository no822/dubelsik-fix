import { CHOSEONG, JONGSEONG, JUNGSEONG } from "./jamo-data";
import { SyllableBuffer } from "./SyllableBuffer";

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

export function flushSyllableBuffer(state: SyllableBuffer): string {
  const { initial, medial, final } = state;
  if (!initial && !medial && !final) {
    return "";
  }

  if (initial && medial) {
    return composeSyllable(initial, medial, final);
  }

  return `${initial}${medial}${final}`;
}

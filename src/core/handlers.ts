import { combineFinal, combineVowels, splitFinal } from "./combinators";
import { composeSyllable } from "./syllable";

export interface SyllableState {
  initial: string;
  medial: string;
  final: string;
}

export function handleVowel(
  vowel: string,
  state: SyllableState,
  emitAndResetFn: (nextState?: Partial<SyllableState>) => void,
): void {
  if (!state.initial && !state.medial && !state.final) {
    state.initial = "ㅇ";
    state.medial = vowel;
    return;
  }

  if (state.initial && !state.medial) {
    state.medial = vowel;
    return;
  }

  if (state.initial && state.medial && !state.final) {
    const combined = combineVowels(state.medial, vowel);
    if (combined) {
      state.medial = combined;
    } else {
      emitAndResetFn({ initial: "ㅇ", medial: vowel });
    }
    return;
  }

  if (state.initial && state.medial && state.final) {
    const split = splitFinal(state.final);
    if (split) {
      const [stay, move] = split;
      state.final = stay;
      emitAndResetFn({ initial: move, medial: vowel });
    } else {
      const move = state.final;
      state.final = "";
      emitAndResetFn({ initial: move, medial: vowel });
    }
  }
}

export function handleConsonant(
  consonant: string,
  state: SyllableState,
  emitAndResetFn: (nextState?: Partial<SyllableState>) => void,
): void {
  if (!state.initial && !state.medial && !state.final) {
    state.initial = consonant;
    return;
  }

  if (state.initial && !state.medial) {
    emitAndResetFn({ initial: consonant });
    return;
  }

  if (state.initial && state.medial && !state.final) {
    state.final = consonant;
    return;
  }

  if (state.initial && state.medial && state.final) {
    const combined = combineFinal(state.final, consonant);
    if (combined) {
      state.final = combined;
    } else {
      emitAndResetFn({ initial: consonant });
    }
  }
}

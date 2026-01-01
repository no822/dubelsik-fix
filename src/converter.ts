import { keyToJamo } from "./core/jamo-data";
import { isVowel } from "./core/predicates";
import { handleConsonant, handleVowel, SyllableState } from "./core/handlers";
import { flushBuffer } from "./core/syllable";

function asJamo(inputChar: string): string | null {
  return keyToJamo[inputChar] ?? null;
}

function emitAndReset(
  state: SyllableState,
  emit: (s: string) => void,
  nextState: Partial<SyllableState> = {},
): void {
  const syllable = flushBuffer(state);
  if (syllable) {
    emit(syllable);
  }
  state.initial = nextState.initial ?? "";
  state.medial = nextState.medial ?? "";
  state.final = nextState.final ?? "";
}

/**
 * Transliterate a string typed with a two-set (두벌식) keyboard layout into composed Hangul.
 */
export function transliterate(input: string): string {
  const state: SyllableState = { initial: "", medial: "", final: "" };
  let output = "";

  const emitAndResetFn = (nextState?: Partial<SyllableState>): void => {
    const emit = (s: string): void => {
      output += s;
    };
    emitAndReset(state, emit, nextState);
  };

  for (const ch of input) {
    const jamo = asJamo(ch);

    if (!jamo) {
      emitAndResetFn();
      output += ch;
      continue;
    }

    if (isVowel(jamo)) {
      handleVowel(jamo, state, emitAndResetFn);
    } else {
      handleConsonant(jamo, state, emitAndResetFn);
    }
  }

  emitAndResetFn();
  return output;
}

import { keyToJamo } from "./core/jamo-data";
import { isVowel } from "./core/predicates";
import { HangulSyllableStateMachine } from "./core/stateMachine/HangulSyllableStateMachine";

function asJamo(inputChar: string): string | null {
  return keyToJamo[inputChar] ?? null;
}

/**
 * Transliterate a string typed with a two-set (두벌식) keyboard layout into composed Hangul.
 */
export function transliterate(input: string) {
  const stateMachine = new HangulSyllableStateMachine();

  for (const ch of input) {
    const jamo = asJamo(ch);

    if (!jamo) {
      stateMachine.emit(stateMachine.currentState.syllableState);
      stateMachine.output += ch;
      stateMachine.setCurrentState(stateMachine.emptySyllableState, {
        initial: "",
        medial: "",
        final: "",
      });
      continue;
    }

    if (isVowel(jamo)) {
      stateMachine.inputVowel(jamo);
    } else {
      stateMachine.inputConsonant(jamo);
    }
  }

  // 마지막 음절 반영
  stateMachine.emit(stateMachine.currentState.syllableState);

  return stateMachine.output;
}

import { SyllableBuffer } from "../SyllableBuffer";
import { HangulSyllableStateMachine } from "./HangulSyllableStateMachine";

export interface SyllableMachineState {
  syllableState: SyllableBuffer;

  syllableMachine: HangulSyllableStateMachine;

  setSyllableState(state: SyllableBuffer): void;

  inputConsonant(s: string): void;
  inputVowel(s: string): void;
}

import { SyllableBuffer } from "../SyllableBuffer";
import { flushSyllableBuffer } from "../SyllableComposer";

import { EmptySyllableState } from "./EmptySyllableState";
import { SyllableMachineState } from "./SyllableMachineState";
import { InitialMedialCompositeVowelState } from "./InitialMedialCompositeVowelState";
import { InitialMedialFinalCompositeConsonantState } from "./InitialMedialFinalCompositeConsonantState";
import { InitialMedialFinalState } from "./InitialMedialFinalState";
import { InitialMedialState } from "./InitialMedialState";
import { InitialOnlyState } from "./InitialOnlyState";

export class HangulSyllableStateMachine {
  output: string = "";

  initialOnlyState: SyllableMachineState;
  initialMedialState: SyllableMachineState;
  initialMedialCompositeVowelState: SyllableMachineState;
  initialMedialFinalState: SyllableMachineState;
  initialMedialFinalCompositeConsonantState: SyllableMachineState;
  emptySyllableState: SyllableMachineState;

  currentState: SyllableMachineState;

  constructor() {
    this.emptySyllableState = new EmptySyllableState(this);
    this.initialOnlyState = new InitialOnlyState(this);
    this.initialMedialState = new InitialMedialState(this);
    this.initialMedialCompositeVowelState =
      new InitialMedialCompositeVowelState(this);
    this.initialMedialFinalState = new InitialMedialFinalState(this);
    this.initialMedialFinalCompositeConsonantState =
      new InitialMedialFinalCompositeConsonantState(this);

    this.currentState = this.emptySyllableState;
  }

  setCurrentState(state: SyllableMachineState, nextState: SyllableBuffer): void {
    this.currentState = state;
    this.currentState.setSyllableState(nextState);
  }

  emit(state: SyllableBuffer) {
    const syllable = flushSyllableBuffer(state);
    if (syllable) {
      this.output += syllable;
    }
    state.initial = "";
    state.medial = "";
    state.final = "";
  }

  inputConsonant(s: string): void {
    this.currentState.inputConsonant(s);
  }

  inputVowel(s: string): void {
    this.currentState.inputVowel(s);
  }
}

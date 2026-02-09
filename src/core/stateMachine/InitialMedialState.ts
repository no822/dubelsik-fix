import { combineVowels } from "../combinators";
import { JONGSEONG } from "../jamo-data";
import { SyllableBuffer } from "../SyllableBuffer";
import { HangulSyllableStateMachine } from "./HangulSyllableStateMachine";
import { SyllableMachineState } from "./SyllableMachineState";

export class InitialMedialState implements SyllableMachineState {
  syllableState: SyllableBuffer = { initial: "", medial: "", final: "" };

  constructor(public syllableMachine: HangulSyllableStateMachine) {}

  setSyllableState(state: SyllableBuffer) {
    this.syllableState = state;
  }

  inputConsonant(s: string): void {
    if (this.isValidFinalConsonant(s)) {
      this.syllableMachine.setCurrentState(
        this.syllableMachine.initialMedialFinalState,
        { ...this.syllableState, final: s },
      );
    } else {
      this.syllableMachine.emit(this.syllableState);
      this.syllableMachine.setCurrentState(
        this.syllableMachine.initialOnlyState,
        { initial: s, medial: "", final: "" },
      );
    }
  }

  inputVowel(s: string): void {
    const combined = combineVowels(this.syllableState.medial, s);
    if (combined) {
      this.syllableMachine.setCurrentState(
        this.syllableMachine.initialMedialCompositeVowelState,
        {
          ...this.syllableState,
          medial: combined,
        },
      );
    } else {
      this.syllableMachine.emit(this.syllableState);
      this.syllableMachine.setCurrentState(
        this.syllableMachine.initialMedialState,
        { initial: "ㅇ", medial: s, final: "" },
      );
    }
  }

  private isValidFinalConsonant(s: string): boolean {
    return JONGSEONG.includes(s);
  }
}

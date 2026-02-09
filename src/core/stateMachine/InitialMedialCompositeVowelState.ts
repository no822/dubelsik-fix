import { SyllableBuffer } from "../SyllableBuffer";
import { HangulSyllableStateMachine } from "./HangulSyllableStateMachine";
import { SyllableMachineState } from "./SyllableMachineState";

export class InitialMedialCompositeVowelState implements SyllableMachineState {
  syllableState: SyllableBuffer = { initial: "", medial: "", final: "" };

  constructor(public syllableMachine: HangulSyllableStateMachine) {}

  setSyllableState(state: SyllableBuffer) {
    this.syllableState = state;
  }

  inputConsonant(s: string): void {
    this.syllableMachine.setCurrentState(
      this.syllableMachine.initialMedialFinalState,
      { ...this.syllableState, final: s },
    );
  }

  inputVowel(s: string): void {
    this.syllableMachine.emit(this.syllableState);
    this.syllableMachine.setCurrentState(
      this.syllableMachine.initialMedialState,
      { initial: "ㅇ", medial: s, final: "" },
    );
  }
}

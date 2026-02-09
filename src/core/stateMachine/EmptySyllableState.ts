import { SyllableBuffer } from "../SyllableBuffer";
import { HangulSyllableStateMachine } from "./HangulSyllableStateMachine";
import { SyllableMachineState } from "./SyllableMachineState";

export class EmptySyllableState implements SyllableMachineState {
  syllableState: SyllableBuffer = { initial: "", medial: "", final: "" };

  constructor(public syllableMachine: HangulSyllableStateMachine) {}

  setSyllableState(state: SyllableBuffer) {
    this.syllableState = state;
  }

  inputConsonant(s: string): void {
    this.syllableMachine.setCurrentState(
      this.syllableMachine.initialOnlyState,
      { initial: s, medial: "", final: "" },
    );
  }

  inputVowel(s: string): void {
    this.syllableMachine.setCurrentState(
      this.syllableMachine.initialMedialState,
      { initial: "ㅇ", medial: s, final: "" },
    );
  }
}

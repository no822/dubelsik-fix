import { combineFinal } from "../combinators";
import { SyllableBuffer } from "../SyllableBuffer";
import { HangulSyllableStateMachine } from "./HangulSyllableStateMachine";
import { SyllableMachineState } from "./SyllableMachineState";

export class InitialMedialFinalState implements SyllableMachineState {
  syllableState: SyllableBuffer = { initial: "", medial: "", final: "" };

  constructor(public syllableMachine: HangulSyllableStateMachine) {}

  setSyllableState(state: SyllableBuffer) {
    this.syllableState = state;
  }

  inputConsonant(s: string): void {
    const combined = combineFinal(this.syllableState.final, s);
    if (combined) {
      this.syllableMachine.setCurrentState(
        this.syllableMachine.initialMedialFinalCompositeConsonantState,
        { ...this.syllableState, final: combined },
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
    const final = this.syllableState.final;
    this.syllableMachine.emit({ ...this.syllableState, final: "" });
    this.syllableMachine.setCurrentState(
      this.syllableMachine.initialMedialState,
      { initial: final, medial: s, final: "" },
    );
  }
}

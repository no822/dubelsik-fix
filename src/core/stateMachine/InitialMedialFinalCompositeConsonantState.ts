import { SyllableMachineState } from "./SyllableMachineState";
import { HangulSyllableStateMachine } from "./HangulSyllableStateMachine";
import { SyllableBuffer } from "../SyllableBuffer";
import { splitFinal } from "../combinators";

export class InitialMedialFinalCompositeConsonantState implements SyllableMachineState {
  syllableState: SyllableBuffer = { initial: "", medial: "", final: "" };

  constructor(public syllableMachine: HangulSyllableStateMachine) {}

  setSyllableState(state: SyllableBuffer) {
    this.syllableState = state;
  }

  inputConsonant(s: string): void {
    this.syllableMachine.emit(this.syllableState);
    this.syllableMachine.setCurrentState(
      this.syllableMachine.initialOnlyState,
      { initial: s, medial: "", final: "" },
    );
  }

  inputVowel(s: string): void {
    const splitted = splitFinal(this.syllableState.final);
    if (splitted) {
      const a = splitted[0];
      const b = splitted[1];
      this.syllableMachine.emit({ ...this.syllableState, final: a });
      this.syllableMachine.setCurrentState(
        this.syllableMachine.initialMedialState,
        { initial: b, medial: s, final: "" },
      );
    } else {
      const final = this.syllableState.final;
      this.syllableMachine.emit({ ...this.syllableState, final: "" });
      this.syllableMachine.setCurrentState(
        this.syllableMachine.initialMedialState,
        { initial: final, medial: s, final: "" },
      );
    }
  }
}

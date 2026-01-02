import {
  finalCombinations,
  finalSplits,
  vowelCombinations,
} from "./jamo-data";

export function combineVowels(prev: string, next: string): string | null {
  return vowelCombinations[prev + next] ?? null;
}

export function combineFinal(prev: string, next: string): string | null {
  return finalCombinations[prev + next] ?? null;
}

export function splitFinal(final: string): [string, string] | null {
  return finalSplits[final] ?? null;
}

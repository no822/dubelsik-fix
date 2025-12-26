#!/usr/bin/env node
import { transliterate } from "./index";

interface CliIO {
  out: (message: string) => void;
  err: (message: string) => void;
}

const USAGE = `Usage: dubelsik <text>

Transliterates a two-set (두벌식) keyboard input string into composed Hangul.

Examples:
  dubelsik rkskekfk   # -> 한글입력
  dubelsik "hello world"
`;

export function runCli(argv: string[], io: CliIO = { out: console.log, err: console.error }): number {
  if (argv.includes("--help") || argv.includes("-h")) {
    io.out(USAGE);
    return 0;
  }

  if (argv.length === 0) {
    io.err("No input provided. Use --help for usage.");
    return 1;
  }

  const input = argv.join(" ");
  const output = transliterate(input);
  io.out(output);
  return 0;
}

if (require.main === module) {
  const code = runCli(process.argv.slice(2));
  process.exit(code);
}

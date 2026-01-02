# dubelsik-converter

Transliterates two-set (두벌식) keyboard input into composed Hangul. Works as both a CLI (`dubelsik`) and a library function.

## Install

- Library: `npm install dubelsik-converter`
- CLI (one-off): `npx dubelsik-converter -- "rkskekfk"`
- CLI (global): `npm install -g dubelsik-converter`

## CLI

```
Usage: dubelsik <text>

Transliterates a two-set (두벌식) keyboard input string into composed Hangul.
```

Examples:
- `dubelsik rkskekfk` → `한글입력`
- `dubelsik "hello world"` → `hello world` (non-Hangul is passed through)
- `dubelsik --help` to print usage; exits with code 1 when input is missing.

## Library

```ts
import { transliterate } from "dubelsik-converter";

transliterate("dkssudgktpdy"); // "안녕하세요"
transliterate("RkRk"); // "까까" (uppercase consonants for tense sounds)
transliterate("sjrtk"); // "넉사" (splits complex finals before vowels)
```

## Keymap (두벌식)

- Consonants: `q` ㅂ, `Q` ㅃ, `w` ㅈ, `W` ㅉ, `e` ㄷ, `E` ㄸ, `r` ㄱ, `R` ㄲ, `t` ㅅ, `T` ㅆ, `a` ㅁ, `s` ㄴ, `d` ㅇ, `f` ㄹ, `g` ㅎ, `z` ㅋ, `x` ㅌ, `c` ㅊ, `v` ㅍ
- Vowels: `k` ㅏ, `o` ㅐ (`O` ㅒ), `i` ㅑ, `p` ㅔ (`P` ㅖ), `u` ㅕ, `y` ㅛ, `j` ㅓ, `h` ㅗ, `n` ㅜ, `b` ㅠ, `m` ㅡ, `l` ㅣ (other uppercase vowels behave like lowercase)
- Double vowels: ㅗ+ㅏ=ㅘ, ㅗ+ㅐ=ㅙ, ㅗ+ㅣ=ㅚ, ㅜ+ㅓ=ㅝ, ㅜ+ㅔ=ㅞ, ㅜ+ㅣ=ㅟ, ㅡ+ㅣ=ㅢ (also ㅘ+ㅣ=ㅙ, ㅝ+ㅣ=ㅞ)
- Complex finals: ㄱ+ㅅ=ㄳ, ㄴ+ㅈ=ㄵ, ㄴ+ㅎ=ㄶ, ㄹ+ㄱ=ㄺ, ㄹ+ㅁ=ㄻ, ㄹ+ㅂ=ㄼ, ㄹ+ㅅ=ㄽ, ㄹ+ㅌ=ㄾ, ㄹ+ㅍ=ㄿ, ㄹ+ㅎ=ㅀ, ㅂ+ㅅ=ㅄ (split before following vowels)

## Behavior notes

- Auto-inserts `ㅇ` for vowel-leading syllables and composes/keeps double vowels and complex finals.
- Before a vowel, complex finals split so the trailing consonant moves to the next syllable.
- Uppercase consonants produce tense sounds; uppercase vowels are accepted for resilience (only `O`/`P` change to ㅒ/ㅖ).
- Non-Hangul characters flush any pending syllable then pass through unchanged.

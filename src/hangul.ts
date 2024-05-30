// src/hangul.ts
export function decomposeHangul(text: string): string[][] {
  const baseCode = "가".charCodeAt(0);
  const consonantsBase = 588;
  const vowelsBase = 28;

  const initialConsonants = [..."ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ"];
  const vowels = [..."ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ"];
  const finalConsonants = [
    ..."",
    "ㄱ",
    "ㄲ",
    "ㄳ",
    "ㄴ",
    "ㄵ",
    "ㄶ",
    "ㄷ",
    "ㄹ",
    "ㄺ",
    "ㄻ",
    "ㄼ",
    "ㄽ",
    "ㄾ",
    "ㄿ",
    "ㅀ",
    "ㅁ",
    "ㅂ",
    "ㅄ",
    "ㅅ",
    "ㅆ",
    "ㅇ",
    "ㅈ",
    "ㅊ",
    "ㅋ",
    "ㅌ",
    "ㅍ",
    "ㅎ",
  ];

  return text.split("").map((char) => {
    if (char < "가" || char > "힣") {
      return [char]; // Non-Korean characters are returned as is
    }
    const code = char.charCodeAt(0) - baseCode;
    const finalConsonant = code % vowelsBase;
    const vowel = ((code - finalConsonant) / vowelsBase) % vowels.length;
    const initialConsonant =
      ((code - finalConsonant) / vowelsBase - vowel) / initialConsonants.length;
    return [
      initialConsonants[initialConsonant],
      vowels[vowel],
      finalConsonants[finalConsonant],
    ];
  });
}

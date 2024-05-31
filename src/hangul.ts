const baseCode = "가".charCodeAt(0);
const consonantsBase = 588;
const vowelsBase = 28;

const initialConsonants = "ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ";
const vowels = "ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ";
const finalConsonants = [
  "",
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

export function decomposeHangul(text: string): string[][] {
  return text.split("").map((char) => {
    if (char < "가" || char > "힣") {
      return [char]; // Non-Korean characters are returned as is
    }
    const code = char.charCodeAt(0) - baseCode;
    const finalConsonant = code % vowelsBase;
    const vowel = ((code - finalConsonant) / vowelsBase) % vowels.length;
    const initialConsonant = Math.floor(
      (code - finalConsonant) / vowelsBase / vowels.length
    );
    return [
      initialConsonants[initialConsonant],
      vowels[vowel],
      finalConsonants[finalConsonant],
    ];
  });
}

export function composeHangul(decomposed: string[][]): string {
  return decomposed
    .map((jamos) => {
      if (jamos.length === 1) {
        return jamos[0]; // Return non-Korean characters or single elements as they are
      }
      const initial = initialConsonants.indexOf(jamos[0]);
      const medial = vowels.indexOf(jamos[1]);
      const final = finalConsonants.indexOf(jamos[2]);

      const charCode =
        baseCode + initial * consonantsBase + medial * vowelsBase + final;
      return String.fromCharCode(charCode);
    })
    .join("");
}

import { generate } from "random-words";
import { IGenConfigs } from "../types/type";
import { compareString } from "./helper";
const { round, random, floor } = Math;

// get and set the positions for the caret
function getOffsets(elem: HTMLElement | null) {
  if (!elem) return { x: 0, y: 0 };
  const { offsetLeft, offsetTop } = elem;
  return { x: Math.floor(offsetLeft), y: Math.floor(offsetTop) };
}
function placeCaret(
  caretElem: HTMLDivElement | null,
  { x, y }: { x: number; y: number }
) {
  if (!caretElem) return;
  caretElem.style.left = x - 1 + "px";
  caretElem.style.top = y + "px";
}
// style letter wrong, correct or rest
function resetStyle(elem: HTMLElement | null) {
  if (!elem) return;
  elem.style.color = "";
  elem.style.borderBottomColor = "transparent";
}
function styleWrong(elem: HTMLElement) {
  if (elem) {
    elem.style.color = "#7e2a33";
    elem.style.borderBottomColor = "#7e2a33";
  }
}
function styleCorrect(elem: HTMLElement) {
  if (elem) elem.style.color = "#d1d0c5";
}
// get random punctuation
function getPunctuation() {
  const punctuations = [
    `"`,
    `'`,
    ".",
    ",",
    "!",
    "?",
    ":",
    "-",
    ";",
    "$",
    "@",
    "#",
    "&",
    "(",
    ")",
  ];

  return punctuations[0 + floor(random() * punctuations.length)];
}
// get data for chart
function getErrArr(errors: { [key: string]: number[] }) {
  const values: number[][] = Object.values(errors);
  let arr: number[] = [];
  for (const value of values) {
    if (Array.isArray(value)) {
      arr = [...arr, ...value];
    }
  }
  return arr;
}
function getNumerics() {
  const randLength = floor(1 + random() * 6);
  let numStr = "";
  for (let i = 0; i <= randLength; i++) {
    const num = floor(0 + random() * 10);
    numStr += `${num}`;
  }
  return numStr;
}
function genMatter({
  number = false,
  punctuation = false,
  cases = false,
  join = " ",
  exactly = 30,
  min = 0,
  max = 0,
}: IGenConfigs) {
  let final: string[] = Array.from(
    min > 0
      ? generate({
          min: min <= 1000 ? min : 1000,
          max: max || min + 20,
          maxLength: 5,
        })
      : generate({ exactly, maxLength: 5 })
  );

  if (number) {
    final = final.map((word) => (round(random()) > 0.5 ? getNumerics() : word));
  }
  if (punctuation) {
    final = final.map((word) =>
      round(random()) > 0.5 ? word + getPunctuation() : word
    );
  }
  if (cases) {
    final = final.map((word) =>
      round(random()) > 0.5 ? word[0].toUpperCase() + word.slice(1) : word
    );
  }
  return join ? final.join(join) : final.join(" ");
}
function getResult(
  timeInSec: number,
  valuePerSecond: string[],
  matter: string
) {
  const wrongCharCounts: (number | null)[] = [];
  const firstWrongIndexes: (number | null)[] = [];
  const lastValue = valuePerSecond[valuePerSecond.length - 1];

  // wpm speed and raw wpm only
  const wpmSpeed: number[] = [];
  const rawSpeed: number[] = [];
  valuePerSecond.forEach((value, second) => {
    const { correctCharCount, charCount } = compareString(value, matter);
    wpmSpeed.push(Math.floor((correctCharCount / 5 / (second + 1)) * 60));
    rawSpeed.push(
      Math.floor((charCount / 5 / (second + 2)) * 60) < 4
        ? 0
        : Math.floor((charCount / 5 / (second + 2)) * 60)
    );
  });

  // errors
  let prevCheckValueLength = 0;
  valuePerSecond.forEach((value) => {
    const { wrongCharCount, wrongCharIndexes } = compareString(
      value.slice(prevCheckValueLength),
      matter.slice(prevCheckValueLength)
    );
    wrongCharCounts.push(wrongCharCount || null);
    firstWrongIndexes.push(
      wrongCharCount === 0 ? null : prevCheckValueLength + wrongCharIndexes[0]
    );
    prevCheckValueLength = value.length;
  });

  // wpm, raw, acc, correct, incorrect
  const { correctCharCount, wrongCharCount } = compareString(
    lastValue.split(" ").join(""),
    matter.split(" ").join("")
  );

  const wpm = floor((correctCharCount / 5) * (60 / timeInSec));
  const raw = floor((lastValue.length / 5) * (60 / timeInSec));
  const acc = floor((wpm / raw) * 100);

  return {
    timeInSec,
    wpm,
    raw,
    acc,
    correctCharCount,
    wrongCharCount,
    wrongCharCounts,
    firstWrongIndexes,
    wpmSpeed,
    rawSpeed,
  };
}
export {
  getResult,
  genMatter,
  getOffsets,
  placeCaret,
  resetStyle,
  styleWrong,
  getErrArr,
  styleCorrect,
};

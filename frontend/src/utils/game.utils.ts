import { generate } from "random-words";
import { IGenConfigs } from "../types/type";
import { compareString } from "./helper";
const { round, random, floor } = Math;

// get and set the positions for the caret
function getOffsets(elem: HTMLElement) {
  const x = round(elem.offsetLeft);
  const y = round(elem.offsetTop);
  return { x, y };
}
function placeCaret(
  caretElem: HTMLDivElement,
  { x, y }: { x: number; y: number }
) {
  if (caretElem) {
    caretElem.style.left = x - 1 + "px";
    caretElem.style.top = y + "px";
  }
}
// style letter wrong, correct or rest
function resetStyle(elem: HTMLElement) {
  if (elem) {
    elem.style.color = "";
    elem.style.borderBottomColor = "transparent";
  }
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
      ? generate({ min, max: max || min + 20,maxLength: 5})
      : generate({ exactly, maxLength: 5})
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
  const seconds = valuePerSecond.length;

  const wrongCharCounts: (number | null)[] = [];
  const firstWrongIndexes: (number | null)[] = [];

  const wpmSpeed: number[] = [];
  const rawSpeed: number[] = [];

  valuePerSecond.forEach((value, second) => {
    const { correctCharCount, wrongCharCount, wrongCharIndexes } =
      compareString(value, matter.slice(0, value.length));

    wrongCharCounts.push(wrongCharCount || null);
    firstWrongIndexes.push(
      wrongCharIndexes[0] &&
        !firstWrongIndexes.some((index) => index === wrongCharIndexes[0])
        ? wrongCharIndexes[0]
        : null
    );

    wpmSpeed.push(Math.floor((correctCharCount / (5 * (second + 1))) * 60));
    rawSpeed.push(
      Math.floor(
        (value.length / (5 * (second + 2))) * 60 < 4
          ? 0
          : (value.length / (5 * (second + 2))) * 60
      )
    );

    const isLast = second === valuePerSecond.length - 1;
    if (!isLast) return;
  });

  const lastValue = valuePerSecond[seconds - 1];

  const wpm = Math.floor(
    (compareString(lastValue, matter).correctCharCount / 5) * (60 / seconds)
  );
  const raw = Math.floor((lastValue.length / 5) * (60 / seconds));
  const acc = Math.floor((wpm / raw) * 100);

  return {
    timeInSec,
    wpm,
    raw,
    acc,
    wpmSpeed,
    rawSpeed,
    wrongCharCounts,
    firstWrongIndexes,
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

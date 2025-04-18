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
    min > 0 ? generate({ min, max: max || min + 20 }) : generate({ exactly })
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
function getResult(valuePerSecond: string[], matter: string) {
  const seconds = valuePerSecond.length;
  const timeInMinutes = 60 / seconds;
  const last = valuePerSecond[valuePerSecond.length - 1];
  // const words = last.split(" ");
  // const avgWordLength =
  //   words.reduce((acc, curr) => acc + curr.length, 0) / words.length;

  // speed
  const wpmSpeed: number[] = [];
  const rawSpeed: number[] = [];
  const errorsCountArr: (number[] | null)[] = [];

  let lastCheckedStringLength: number = 0;
  let totalCorrectChars = 0;
  valuePerSecond.forEach((value) => {
    // newly typed value at each second
    const stringToCheck = value.slice(lastCheckedStringLength);

    // get correct and incorrect chars count
    const { correctCount, incorrectCount, errorIndexes } = compareString(
      stringToCheck,
      matter.slice(lastCheckedStringLength)
    );

    // second : errorCounts
    const actualErrorIndexes = errorIndexes.map(
      (index) => index + lastCheckedStringLength
    );
    errorsCountArr.push(actualErrorIndexes || null);

    // calculating speed
    wpmSpeed.push(
      Math.floor(
        correctCount === 0
          ? (wpmSpeed[wpmSpeed.length - 1] * 60) / 100
          : Math.floor((correctCount / 5) * timeInMinutes) * 60
      )
    );
    rawSpeed.push(
      Math.floor(
        stringToCheck.length === 0
          ? (rawSpeed[rawSpeed.length - 1] * 60) / 100
          :  Math.floor((stringToCheck.length / 5) * timeInMinutes) * 60
      )
    );

    totalCorrectChars += correctCount;

    lastCheckedStringLength = value.length;
    return [correctCount, stringToCheck.length, incorrectCount];
  });

  const wpm = Math.floor((totalCorrectChars / 5) * timeInMinutes);
  const raw = Math.floor((last.length / 5) * timeInMinutes);
  const acc = Math.floor((wpm * 100) / raw);

  return { acc, wpm, raw, rawSpeed, wpmSpeed, errorsCountArr };
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

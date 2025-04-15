import { generate } from "random-words";
import { IGenConfigs } from "../types/type";
const { round, random, floor } = Math;

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
function getNumerics() {
  const randLength = floor(1 + random() * 6);
  let numStr = "";
  for (let i = 0; i <= randLength; i++) {
    const num = floor(0 + random() * 10);
    numStr += `${num}`;
  }
  return numStr;
}
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
function calcWPM(time: number, actual: string, expected: string) {
  let correct = 0;
  const [actualWords, expectedWords] = [actual.split(" "), expected.split(" ")];
  for (let i = 0; i < actualWords.length; i++) {
    if (expectedWords[i] === actualWords[i]) correct++;
  }

  return (60 / time) * correct;
}
function calcAccuracy(actual: string, expected: string) {
  let correct = 0;
  const [actualWords, expectedWords] = [actual.split(" "), expected.split(" ")];
  for (let i = 0; i < actualWords.length; i++) {
    if (expectedWords[i] === actualWords[i]) correct++;
  }
  const final = (correct / actualWords.length) * correct;
  console.log(final);
  return final;
}
function calcErrors(actual: string, expected: string) {
  const errors: { [key: string]: number[] } = {};
  const [actualWords, expectedWords] = [
    actual.replaceAll(" ", ""),
    expected.replaceAll(" ", ""),
  ];

  for (let i = 0; i < actualWords.length; i++) {
    console.log(actualWords[i], expectedWords[i]);
    if (actualWords[i] !== expectedWords[i]) {
      if (actualWords[i] in errors) errors[actualWords[i]].push(i);
      else errors[actualWords[i]] = [i];
    }
  }
  const final = errors;
  console.log(final);
  return final;
}
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
function calcRaw(time: number, actual: string) {
  const final = round(60 / time) * actual.split(" ").length;
  console.log(final);
  return final;
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

export {
  calcWPM,
  calcAccuracy,
  calcErrors,
  calcRaw,
  genMatter,
  getOffsets,
  placeCaret,
  resetStyle,
  styleWrong,
  getErrArr,
  styleCorrect,
};

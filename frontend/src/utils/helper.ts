function formatTime({ h, m, s }: { h: number; m: number; s: number }) {
  const timeInSec = h * 3600 + m * 60 + s;
  const hours = Math.floor(timeInSec / 3600);
  const minutes = Math.floor((timeInSec % 3600) / 60);
  const seconds = Math.floor(timeInSec % 60);

  return { hours, minutes, seconds, timeInSec };
}

function getNumArr(length: number) {
  return Array.from({ length }, (_, i) => i + 1);
}
function getWpmSpeed(
  startTime: number,
  wordTimingMap: { [key: string]: number },
  expected: string
): number[] {
  const expectedWords: string[] = expected.split(" ");
  const typedWords: string[] = Object.keys(wordTimingMap);
  const timings: number[] = Object.values(wordTimingMap);
  const timingsOfCorrectWords: number[] = [];

  typedWords.forEach((typedWord, i) => {
    if (expectedWords.includes(typedWord)) {
      timingsOfCorrectWords.push(timings[i]);
    }
  });

  const durationsOfWords: number[] = timingsOfCorrectWords.map((timing, i) => {
    const duration =
      i === 0 ? timing - startTime : timing - timingsOfCorrectWords[i - 1];
    return Math.round((duration / 1000) * 60);
  });

  return durationsOfWords;
}
function getRawSpeed(
  startTime: number,
  timingMap: { [key: string]: number }
): number[] {
  const timings: number[] = Object.values(timingMap);

  return timings.map((timing, i) => {
    const duration = i === 0 ? timing - startTime : timing - timings[i - 1];
    return Math.round((duration / 1000) * 60);
  });
}

function getErrors(
  startTime: number,
  errors: { [key: string]: number }
): number[] {
  const timings: number[] = Object.values(errors);
  return timings.map((timing) => Math.round(timing));
}

function fillGaps(data: number[][], session: number) {
  const filledData = [];
  for (let i = 1; i <= session; i++) {
    const found = data.find((item) => item[0] === i);
    filledData.push([i, found ? found[1] : 0]);
  }
  return filledData;
}

function compareString(actual: string, original: string) {
  const wrongCharIndexes: number[] = [];
  let correctCharCount = 0;
  let wrongCharCount = 0;
  for (let i = 0; i < actual.length; i++) {
    if (actual[i] === original[i]) correctCharCount++;
    else {
      wrongCharIndexes.push(i);
      wrongCharCount++;
    }
  }

  return { correctCharCount, wrongCharCount, wrongCharIndexes };
}
export {
  formatTime,
  getNumArr,
  getWpmSpeed,
  getRawSpeed,
  getErrors,
  fillGaps,
  compareString,
};

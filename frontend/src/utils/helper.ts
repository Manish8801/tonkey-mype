function formatTime({ h, m, s }: { h: number; m: number; s: number }) {
  const timeInSec = h * 3600 + m * 60 + s;
  const hours = Math.floor(timeInSec / 3600);
  const minutes = Math.floor((timeInSec % 3600) / 60);
  const seconds = Math.floor(timeInSec % 60);
  const formatted = `${hours < 10 ? "0" + hours : hours}: ${
    minutes < 10 ? "0" + minutes : minutes
  }: ${seconds < 10 ? "0" + seconds : seconds}`;

  return { hours, minutes, seconds, timeInSec, formatted };
}

function getNumArr(length: number) {
  return Array.from({ length }, (_, i) => i + 1);
}

function compareString(actual: string, original: string) {
  const wrongCharIndexes: number[] = [];
  let charCount = 0;
  let correctCharCount = 0;
  let wrongCharCount = 0;
  for (let i = 0; i < actual.length; i++) {
    charCount++;
    if (actual[i] !== " ") {
      if (actual[i] === original[i]) correctCharCount++;
      else {
        wrongCharIndexes.push(i);
        wrongCharCount++;
      }
    }
  }
  return { correctCharCount, wrongCharCount, charCount, wrongCharIndexes };
}

export { formatTime, getNumArr, compareString };

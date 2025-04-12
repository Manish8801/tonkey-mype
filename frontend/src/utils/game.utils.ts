function calcWPM(time: number, typedValue: string) {
  const totalWords = typedValue.split(" ").length;
  return Math.round(60 / time) * totalWords;
}
function calcAccuracy(expected: string, actual: string) {
  let correct = 0;
  for (let i = 0; i < actual.length; i++) {
    if (expected[i] === actual[i]) correct++;
  }
  return Math.round(correct / actual.length) * 100;
}
function calcErrors(expected: string, actual: string) {
  const errors: Record<string, number[]> = {};
  for (let i = 0; i < actual.length; i++) {
    if (expected[i] !== actual[i]) {
      if (expected[i] in errors) errors[expected[i]].push(i);
      else errors[expected[i]] = [i];
    }
  }
  return errors;
}

export { calcWPM, calcAccuracy, calcErrors };

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
export { formatTime, getNumArr };

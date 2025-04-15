import { useEffect, useState } from "react";
import useGameStore from "../../../zustand/useGameStore";

const Timer = () => {
  const { mode, time, isFocused, matter, toggleResult } = useGameStore();
  const [timeLeft, setTimeLeft] = useState(time);

  // reset time
  useEffect(() => {
    setTimeLeft(time);
  }, [matter]);

  useEffect(() => {
    if (!isFocused || mode !== "time") return;
    if (timeLeft === 0) {
      toggleResult();
      return;
    }

    let timer: NodeJS.Timeout | undefined;
    if (timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      }, 1000);
      return () => {
        clearInterval(timer);
      };
    }
  }, [isFocused, timeLeft, mode, toggleResult]);

  if (mode === "words") return null;

  return (
    <div className="place-self-start text-content-main text-3xl">
      {timeLeft}
    </div>
  );
};

export default Timer;

// reset timer whenever time or matter changes
// If mode is time only then show the timer -- done
// if typing input is focused and time left only then play the timer
// once the timer finishes navigate show result section
// if users comeback set every thing to default

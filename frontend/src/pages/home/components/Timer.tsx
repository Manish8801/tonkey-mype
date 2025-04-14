import { useEffect, useState } from "react";
import useGameStore from "../../../zustand/useGameStore";

const Timer = () => {
  const { mode, matter, time, isFocused, isGameOver,overGame } =
    useGameStore();
  const [timeLeft, setTimeLeft] = useState(time);

  useEffect(() => {
    if (isFocused) {
      if (timeLeft === 0) overGame();
      else {
        const timer = setInterval(() => {
          setTimeLeft((timeLeft) => timeLeft - 1);
        }, 999);
        return () => {
          clearInterval(timer);
        };
      }
    }
  }, [isFocused, timeLeft]);

  useEffect(() => {
    setTimeLeft(time);
  }, [time, isGameOver, matter]);

  if (mode === "words") return null;
  return (
    <div className="place-self-start text-content-main text-3xl">
      {timeLeft}
    </div>
  );
};

export default Timer;

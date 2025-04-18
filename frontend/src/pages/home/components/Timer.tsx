import { useEffect, useState } from "react";
import useGameStore from "../../../zustand/useGameStore";

const Timer = () => {
  const { mode, session, isFocused, isTypingStarted, matter } =
    useGameStore();

  const [timeLeft, setTimeLeft] = useState(session);

  // reset time
  useEffect(() => {
    setTimeLeft(session);
  }, [matter]);

  useEffect(() => {
    if (!isFocused || mode !== "session" || !isTypingStarted) return;
    let timer: NodeJS.Timeout | undefined;
    if (timeLeft >= 1) {
      timer = setInterval(
        () => {
          setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
        },
        session ? 1000 : 0
      );
      return () => {
        clearInterval(timer);
      };
    }
  }, [isFocused, timeLeft, mode, isTypingStarted]);

  if (mode === "words") return null;

  return (
    <div className="place-self-start text-content-main text-3xl">
      {timeLeft}
    </div>
  );
};

export default Timer;
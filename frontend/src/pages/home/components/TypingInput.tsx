import useGameStore from "../../../zustand/useGameStore";
import { ChangeEvent, useEffect, useRef } from "react";
import Timer from "./Timer";
import {
  getOffsets,
  placeCaret,
  resetStyle,
  styleCorrect,
  styleWrong,
} from "../../../utils/game.utils";
import { FaEarthAmericas } from "react-icons/fa6";
import { GiArrowCursor } from "react-icons/gi";
import { GrRefresh } from "react-icons/gr";
import TypingSetting from "./TypingSetting";

const TypingInput = () => {
  const {
    isGameReset,
    isTypingStarted,
    matter,
    isFocused,
    session,
    wordCount,
    number,
    punctuation,
    cases,
    mode,
    isGameOver,
    overGame,
    setResult,
    showResult,
    genMatter,
    toggleIsFocused,
    toggleIsTypingStarted,
  } = useGameStore();
  const charRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const paragraphRef = useRef<HTMLDivElement | null>(null);
  const caretRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const lastCorrectIndex = useRef<number>(0);
  const value = useRef<string>("");
  const yCoordFirstLine = useRef<number>(0);
  const valuePerSecond = useRef<string[]>([]);
  const timer = useRef<NodeJS.Timeout | undefined>(undefined);
  const elapsed = useRef<number>(0);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const valueLength = e.target.value.length;
    if (valueLength === matter.length) overGame();
    // if value length is greater than or equal length of matter
    if (valueLength >= matter.length + 1) {
      e.preventDefault();
      e.target.value = value.current;
      return;
    }

    if (
      !isTypingStarted &&
      (e.target.value.length > 0 || valuePerSecond.current.length > 0)
    ) {
      toggleIsTypingStarted();
    }

    value.current = e.target.value;
    if (valueLength === 0) {
      const { x, y } = getOffsets(charRefs.current[0]!);
      if (caretRef.current) placeCaret(caretRef.current, { x, y });
      resetStyle(charRefs.current[0]!);
    }

    // last char typed
    const lastCharTyped = value.current[valueLength - 1];

    if (lastCharTyped === charRefs.current[valueLength - 1]?.textContent) {
      // if it's correct
      styleCorrect(charRefs.current[valueLength - 1]!);
      if (charRefs.current[valueLength - 1]?.textContent !== " ") {
        // the index of last correct char
        lastCorrectIndex.current = valueLength;
      }
    } else {
      // if wrong otherwise
      styleWrong(charRefs.current[valueLength - 1]!);
    }

    if (valueLength === 0) {
      // if there's no value
      resetStyle(charRefs.current[0]!);
      // then the index of last correct char is zero
      lastCorrectIndex.current = 0;
    } else {
      // if not zero reset the style of next char
      resetStyle(charRefs.current[valueLength]!);
    }

    if (charRefs.current[valueLength]) {
      const currSpan = charRefs.current[valueLength];
      if (
        getOffsets(currSpan).y - yCoordFirstLine.current >=
        currSpan.offsetHeight * 2
      ) {
        if (paragraphRef.current) {
          paragraphRef.current.scrollBy(0, 50);
          yCoordFirstLine.current += 50;
        }
      } else if (getOffsets(currSpan).y < yCoordFirstLine.current) {
        if (paragraphRef.current) {
          paragraphRef.current.scrollBy(0, -50);

          yCoordFirstLine.current -= 50;
        }
      }
      const { x, y } = getOffsets(charRefs.current[valueLength]);
      if (caretRef.current) placeCaret(caretRef.current, { x, y });
    }
  };

  useEffect(() => {
    if (isGameReset) {
      toggleIsTypingStarted();
      toggleIsFocused();
    }
  }, [isGameReset]);

  useEffect(() => {
    if (!isGameOver) return;

    setResult(elapsed.current, valuePerSecond.current, matter);
    showResult();
  }, [isGameOver]);

  useEffect(() => {
    if (!isTypingStarted) return;

    const timer = setInterval(() => {
      valuePerSecond.current.push(value.current);
      elapsed.current++;
      if (mode === "session" && elapsed.current === session) overGame();
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [isTypingStarted, isFocused]);

  // don't touch it
  useEffect(() => {
    if (isFocused) inputRef.current?.focus();
  }, [isFocused]);

  // just generates the matter
  useEffect(() => {
    genMatter();
  }, [cases, mode, number, punctuation, session, wordCount]);

  useEffect(() => {
    // reset the values
    if (inputRef.current) inputRef.current.value = "";
    if (paragraphRef.current) paragraphRef.current.scrollTo(0, 0);
    valuePerSecond.current = [];
    lastCorrectIndex.current = 0;
    timer.current = undefined;
    value.current = "";
    elapsed.current = 0;

    // replace the caret to the start
    if (charRefs.current[0]) {
      const { x, y } = getOffsets(charRefs.current[0]);
      yCoordFirstLine.current = y;
      if (caretRef.current) placeCaret(caretRef.current, { x, y });
    }
    charRefs.current?.forEach((span) => {
      if (span) resetStyle(span);
    });
  }, [matter]);
  return (
    <div className="flex flex-col justify-between">
      <div className="flex items-center flex-col gap-6 text-content-secondary">
        <TypingSetting />
        <div className="flex items-center gap-1.5 text-sm font-roboto font-semibold hover:text-content-primary duration-200 cursor-pointer">
          <FaEarthAmericas className="text-lg" />
          english
        </div>
        <Timer />
        <div
          className={`relative font-roboto`}
          tabIndex={0}
          onFocus={() => toggleIsFocused()}
        >
          <div
            className={`px-2 relative h-[145px] overflow-hidden ${
              !isFocused ? "blur-[10px]" : ""
            } ] text-left select-none scroll-smooth`}
            ref={paragraphRef}
          >
            {matter &&
              [...matter.split(""), " "].map((char, index) => (
                <span
                  style={{
                    borderBottomWidth: "2px",
                    borderBottomStyle: "solid",
                    borderColor: "transparent",
                  }}
                  className={`leading-[50px] duration-75 ease-in text-[30px]`}
                  key={index}
                  ref={(e) => {
                    charRefs.current[index] = e;
                  }}
                >
                  {char}
                </span>
              ))}
            <div
              ref={caretRef}
              className={`duration-[90ms] delay-0 bg-content-main absolute h-10 w-[3.5px] ease-linear rounded-full`}
            />
          </div>
          {!isFocused && (
            <div
              className="select-none absolute cursor-default top-1/3 left-1/2 -translate-x-1/2 text-base flex items-center justify-center gap-1 text-content-primary"
              onClick={() => toggleIsFocused()}
            >
              <GiArrowCursor />
              Click here or press any where to focus
            </div>
          )}
        </div>

        <button
          onClick={(e) => {
            genMatter();
            toggleIsFocused();

            const prevRotation = parseInt(e.currentTarget.style.rotate);
            e.currentTarget.style.rotate = (prevRotation || 0) + 360 + "deg";
          }}
          className="button hover:text-content-primary duration-200 text-lg ease-linear cursor-pointer"
        >
          <GrRefresh />
        </button>
      </div>
      <input
        onBlur={() => toggleIsFocused()}
        type="text"
        id="typing-input"
        className="size-0"
        autoComplete="off"
        ref={inputRef}
        onChange={handleInputChange}
        onKeyDown={(e) => {
          if (!isFocused) {
            e.preventDefault();
            return;
          }
          if (e.ctrlKey && e.key === "Backspace") {
            e.preventDefault();
          }
          if (
            ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)
          ) {
            e.preventDefault();
            return;
          }
          if (e.key === "Backspace") {
            if (lastCorrectIndex.current === value.current.length) {
              e.preventDefault();
              return;
            }
          }
        }}
      />
    </div>
  );
};

export default TypingInput;

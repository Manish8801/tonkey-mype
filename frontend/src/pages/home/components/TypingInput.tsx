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
    isTypingStarted,
    matter,
    isFocused,
    session,
    wordCount,
    number,
    punctuation,
    cases,
    mode,
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
  const startTime = useRef<number>(0);
  const valuePerSecond = useRef<string[]>([]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const valueLength = e.target.value.length;
    // if value length is greater than or equal length of matter
    if (valueLength >= paragraphRef.current!.children.length + 1) {
      e.preventDefault();
      e.target.value = value.current;
      return;
    }

    if (startTime.current === 0) {
      startTime.current = Math.round(performance.now());
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
    let timer: NodeJS.Timeout;
    let elapsed = 0;

    if (isTypingStarted) {
      timer = setInterval(() => {
        const isGameOver =
          (mode === "session" && elapsed === session) ||
          (mode === "words" && valuePerSecond.current.length === wordCount);
        if (isGameOver) {
          clearInterval(timer);
          console.log(valuePerSecond.current, matter);
          setResult(valuePerSecond.current);
          showResult();
        }
        if (isFocused) elapsed++;
        valuePerSecond.current.push(value.current);
      }, 1000);
    }
  }, [isTypingStarted, isFocused, session]);

  // don't touch it
  useEffect(() => {
    if (isFocused) inputRef.current?.focus();
  }, [isFocused]);

  useEffect(() => {
    genMatter();
  }, [mode, session, wordCount, number, punctuation, cases]);

  useEffect(() => {
    // reset the values
    if (inputRef.current) inputRef.current.value = "";
    if (paragraphRef.current) paragraphRef.current.scrollTo(0, 0);
    lastCorrectIndex.current = 0;
    startTime.current = 0;

    // reset the styles
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
            className={`px-2 relative h-[145px] overflow-y-hidden ${
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

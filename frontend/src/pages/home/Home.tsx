import { IoSettingsSharp } from "react-icons/io5";
import { FaAt } from "react-icons/fa";
import { FaHashtag } from "react-icons/fa6";
import { FaClock } from "react-icons/fa";
import { FaFont } from "react-icons/fa";
import { FaQuoteLeft } from "react-icons/fa";
import { BiSolidPyramid } from "react-icons/bi";
import { PiWrenchFill } from "react-icons/pi";
import { FaTools } from "react-icons/fa";
import { GrRefresh } from "react-icons/gr";
import { generate } from "random-words";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { FaEarthAmericas } from "react-icons/fa6";
import { GiArrowCursor } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { calcAccuracy, calcErrors, calcWPM } from "../../utils/game.utils";


function resetColor(elem: HTMLElement) {
  elem.style.color = "";
  elem.style.borderBottomColor = "transparent";
}
function getCoords(elem: HTMLElement) {
  const { x, y } = elem.getBoundingClientRect();
  return { x: Math.round(x), y: Math.round(y) };
}
function placeCaret(
  caretElem: HTMLDivElement,
  { x, y }: { x: number; y: number }
) {
  if (caretElem) {
    caretElem.style.left = x - 2 + "px";
    caretElem.style.top = y + "px";
  }
}
function colorWrong(elem: HTMLElement) {
  if (elem) {
    elem.style.color = "#7e2a33";
    elem.style.borderBottomColor = "#7e2a33";
  }
}
function colorCorrect(elem: HTMLElement) {
  if (elem) elem.style.color = "#d1d0c5";
}

const Home = () => {
  const [mode, setMode] = useState<"time" | "word">("word");
  const [timer, setTimer] = useState<number>(0);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [option, setOption] = useState<number | null>(null);
  const [words, setWords] = useState<string[] | null>(null);

  const navigate = useNavigate();
  const result = useRef<{
    wpm: number;
    accuracy: number;
    raw: number;
    time: number;
    errors: Record<string, number[]>;
  } | null>(null);
  const firstLineYCoord = useRef<number>(0);
  const value = useRef<string>("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const charRefs = useRef<(HTMLSpanElement | null)[]>([]); // array of all span elements
  const caretRef = useRef<HTMLDivElement | null>(null);
  const paragraphRef = useRef<HTMLDivElement | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length >= paragraphRef.current!.children.length + 1) {
      e.preventDefault();
      e.target.value = value.current;
      return;
    }

    value.current = e.target.value;
    const valueLength = value.current.length;

    if (valueLength === 0) {
      const { x, y } = getCoords(charRefs.current[0]!);
      if (caretRef.current) placeCaret(caretRef.current, { x, y });
      resetColor(charRefs.current[0]!);
      return;
    }
    const lastCharTyped = value.current[valueLength - 1];
    if (lastCharTyped === charRefs.current[valueLength - 1]?.textContent) {
      colorCorrect(charRefs.current[valueLength - 1]!);
    } else {
      colorWrong(charRefs.current[valueLength - 1]!);
    }

    if (valueLength === 0) {
      resetColor(charRefs.current[0]!);
    } else {
      resetColor(charRefs.current[valueLength]!);
    }

    if (charRefs.current[valueLength]) {
      const currSpan = charRefs.current[valueLength];
      if (
        getCoords(currSpan).y - firstLineYCoord.current >=
        currSpan.offsetHeight * 2
      ) {
        if (paragraphRef.current) {
          paragraphRef.current.scrollBy(0, 50);
          firstLineYCoord.current = getCoords(paragraphRef.current).y;
        }
      } else if (getCoords(currSpan).y < firstLineYCoord.current) {
        if (paragraphRef.current) {
          paragraphRef.current.scrollBy(0, -50);

          firstLineYCoord.current = getCoords(paragraphRef.current).y;
        }
      }
      const { x, y } = getCoords(charRefs.current[valueLength]);
      if (caretRef.current) placeCaret(caretRef.current, { x, y });
    }
  };

  useEffect(() => {
    setMode("word");
    setOption(30);
    setTimer(30);
    setWords(Array.from(generate({ exactly: 30 })));

    return () => {
      setMode("word");
      setOption(null);
      setTimer(0);
      setWords(null);
    };
  }, []);

  useEffect(() => {
    if (option) {
      if (mode === "word") setWords(Array.from(generate({ exactly: option })));
      if (mode === "time") {
        setTimer(option);
        setWords(
          Array.from(generate({ min: 5 * option, max: 5 * option + 20 }))
        );
      }
    }
  }, [mode, option]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [isFocused]);

  useEffect(() => {
    if (inputRef.current) inputRef.current.value = "";
    if (paragraphRef.current) paragraphRef.current.scrollTo(0, 0);

    charRefs.current.forEach((span) => {
      if (span) resetColor(span);
    });
    result.current = null;
  }, [words]);

  useEffect(() => {
    if (isFocused && option) {
      if (mode === "time") {
        if (timer === 0) {
          if (words) {
            result.current = {
              wpm: calcWPM(option, value.current),
              accuracy: calcAccuracy(
                words.join(" ").split("").join(""),
                value.current.trim()
              ),
              raw: value.current.trim().length,
              time: option,
              errors: calcErrors(
                words.join(" ").split("").join(""),
                value.current.trim()
              ),
            };
          }
        }
      }
      if (timer > 0) {
        {
          const interval = setInterval(() => {
            setTimer(timer - 1);
          }, 999);

          return () => {
            clearInterval(interval);
          };
        }
      }
    }
  }, [isFocused, mode, option, timer]);

  useEffect(() => {
    const defaultSpan = charRefs.current[0];
    if (!defaultSpan) return;
    const { x, y } = getCoords(defaultSpan);
    firstLineYCoord.current = y;
    if (caretRef.current) placeCaret(caretRef.current, { x, y });
  }, [isFocused, mode, words]);

  return timer === 0 ? (
    <></>
  ) : (
    <>
      <main className="flex-1 flex flex-col gap-10">
        <div className="mt-6 text-config flex items-center justify-center mx-auto px-4 bg-[rgba(0,0,0,.13)] w-fit rounded-lg text-content-secondary  leading-4">
          {/* small screen */}
          <div className="sm:hidden py-2.5 px-2 flex items-center justify-center  gap-4 mx-auto hover:text-content-primary text-[.65rem] duration-200 ease-out">
            <IoSettingsSharp />
            <div className="font-semibold tracking-wide font-roboto text-sm">
              Test settings
            </div>
          </div>

          {/* medium screen */}
          <div className="hidden sm:flex max-w-full sm:text-[0.7rem] md:text-[0.75rem] lg:text-[0.8rem] items-center justify-between sm:gap-1.5 md:gap-2 lg:gap-2.5 ">
            <button className="gap-0.5 py-2.5 flex  justify-center hover:text-content-primary duration-200 ease-out">
              <FaAt className="sm:text-sm md:text-base" />
              <div className="font-semibold pb-1">punctuation</div>
            </button>
            <button className="gap-0.5 py-2.5 flex  justify-center hover:text-content-primary duration-200 ease-out">
              <FaHashtag className="sm:text-sm md:text-base" />
              <div className="font-semibold pb-1">numbers</div>
            </button>
            <div
              className="h-7 rounded-full sm:w-[2px] md:w-[3px] lg:w-[4px] bg-base-primary"
              aria-hidden={true}
            />
            <button
              className={`py-2.5 flex items-center justify-center gap-0.5 ${
                mode === "time"
                  ? "text-content-main"
                  : "hover:text-content-primary"
              } duration-200 ease-out`}
              onClick={() => setMode("time")}
            >
              <FaClock className="sm:text-sm md:text-base" />
              <div className="font-semibold">time</div>
            </button>
            <button
              className={`py-2.5 flex items-center justify-center gap-0.5 ${
                mode === "word"
                  ? "text-content-main"
                  : "hover:text-content-primary"
              } duration-200 ease-out`}
              onClick={() => setMode("word")}
            >
              <FaFont className="sm:text-sm md:text-base" />
              <div className="font-semibold">words</div>
            </button>
            <button className="py-2.5 flex items-center justify-center gap-0.5 hover:text-content-primary duration-200 ease-out">
              <FaQuoteLeft className="sm:text-sm md:text-base" />
              <div className="font-semibold">quote</div>
            </button>
            <button className="py-2.5 flex items-center justify-center gap-0.5 hover:text-content-primary duration-200 ease-out">
              <BiSolidPyramid className="sm:text-lg md:text-xl" />
              <div className="font-semibold">zen</div>
            </button>
            <button className="py-2.5 flex items-center justify-center gap-0.5 hover:text-content-primary duration-200 ease-out">
              <PiWrenchFill className=" sm:text-sm md:text-base" />
              <div className="font-semibold">custom</div>
            </button>
            <div
              className="h-7 rounded-full sm:w-[2px] md:w-[3px] lg:w-[4px] bg-base-primary"
              aria-hidden={true}
            />
            <button
              className={`${
                option === 15
                  ? "text-content-main"
                  : "hover:text-content-primary"
              } duration-200 ease-out font-semibold`}
              onClick={() => setOption(15)}
            >
              15
            </button>
            <button
              className={`${
                option === 30
                  ? "text-content-main"
                  : "hover:text-content-primary"
              } duration-200 ease-out font-semibold`}
              onClick={() => setOption(30)}
            >
              30
            </button>
            <button
              className={`${
                option === 60
                  ? "text-content-main"
                  : "hover:text-content-primary"
              } duration-200 ease-out font-semibold`}
              onClick={() => setOption(60)}
            >
              60
            </button>
            <button
              className={`${
                option === 120
                  ? "text-content-main"
                  : "hover:text-content-primary"
              } duration-200 ease-out font-semibold`}
              onClick={() => setOption(120)}
            >
              120
            </button>
            <button className="sm:text-sm md:text-base hover:text-content-primary duration-200 ease-out">
              <FaTools />
            </button>
          </div>
        </div>
        <div className="flex items-center flex-col gap-6 text-content-secondary">
          <div className="flex items-center gap-1.5 text-sm font-roboto font-semibold hover:text-content-primary duration-200 cursor-pointer">
            <FaEarthAmericas className="text-lg" />
            english
          </div>
          <div className="place-self-start text-content-main text-3xl">
            {mode === "time" ? timer : ""}
          </div>
          <div
            className={`relative font-roboto`}
            tabIndex={0}
            onFocus={() => {
              if (!isFocused) setIsFocused(true);
            }}
          >
            <div
              className={`h-[145px] overflow-hidden ${
                !isFocused ? "blur-[10px]" : ""
              } ] text-left select-none scroll-smooth`}
              ref={paragraphRef}
            >
              {words &&
                [...words.join(" ").split(""), " "].map((char, index) => (
                  <span
                    style={{
                      borderBottomWidth: "2px",
                      borderBottomStyle: "solid",
                      borderColor: "transparent",
                    }}
                    className={`leading-[50px] duration-100 ease-in text-[30px]`}
                    key={index}
                    ref={(e) => {
                      charRefs.current[index] = e;
                    }}
                  >
                    {char}
                  </span>
                ))}
            </div>
            {!isFocused && (
              <div
                className="absolute cursor-default top-1/3 left-1/2 -translate-x-1/2 text-base flex items-center justify-center gap-1 text-content-primary"
                onClick={() => {
                  if (!isFocused) setIsFocused(true);
                }}
              >
                <GiArrowCursor />
                Click here or press any where to focus
              </div>
            )}
          </div>

          <button
            onClick={(e) => {
              setWords(Array.from(generate({ min: 50, max: 200 })));
              if (!isFocused) setIsFocused(true);

              const prevRotation = parseInt(e.currentTarget.style.rotate);
              e.currentTarget.style.rotate = (prevRotation || 0) + 360 + "deg";
            }}
            className="button hover:text-content-primary duration-200 text-lg ease-linear cursor-pointer"
          >
            <GrRefresh />
          </button>
        </div>
        <input
          onBlur={() => {
            if (isFocused) setIsFocused(false);
          }}
          type="text"
          id="typing-input"
          className="size-0"
          autoComplete="off"
          ref={inputRef}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === "Control") {
              e.preventDefault();

              return;
              console.log(e.key);
            }
          }}
        />
        <div
          ref={caretRef}
          className={`${
            isFocused ? "block" : "hidden"
          } duration-100 delay-0 bg-content-main absolute h-10 w-[3.5px] ease-linear rounded-full`}
        />
      </main>
    </>
  );
};

export default Home;

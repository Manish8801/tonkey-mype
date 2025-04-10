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

const Home = () => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [words, setWords] = useState<string[]>(
    Array.from(generate({ min: 50, max: 200 }))
  ); // array of random words
  const charRefs = useRef<(HTMLSpanElement | null)[]>([]); // array of all span elements
  const inputRef = useRef<HTMLInputElement | null>(null); // inputRef

  const caretRef = useRef<HTMLDivElement | null>(null);
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value; // current value
    const lastCharTyped = value.charAt(value.length - 1); // last character typed
    let currCharIndex = value.length; // current character index
    const activeSpan = charRefs.current[currCharIndex - 1]; // expected active span

    if (!activeSpan) return; // if there's no active span return

    const expectedChar = activeSpan?.textContent; // expected character

    if (caretRef.current) {
      const coordsOfActiveSpan = activeSpan.getBoundingClientRect();
      caretRef.current.style.top = coordsOfActiveSpan.y + 4+ "px";
       
      caretRef.current.style.left = coordsOfActiveSpan.x+15 + "px";
    }
    if (lastCharTyped === expectedChar) {
      activeSpan.classList.add("text-content-primary");
      currCharIndex++;
    } else {
      activeSpan.textContent = lastCharTyped;
      activeSpan.classList.add("text-red-500");
    }
  };

  useEffect(() => {
    if (isFocused) {
      inputRef.current?.focus();
    }
  }, [isFocused, words]);

  return (
    <main className="flex-1 flex flex-col gap-10">
      <div className="mt-6 text-config flex items-center justify-center mx-auto px-4 bg-[rgba(0,0,0,.13)] w-fit rounded-lg text-content-secondary  leading-4">
        {/* small screen */}
        <div className="sm:hidden py-2.5 px-2 flex items-center justify-center  gap-4 mx-auto hover:text-content-primary duration-200 ease-out">
          <IoSettingsSharp />
          <div className="font-semibold tracking-wide font-roboto text-sm">
            Test settings
          </div>
        </div>

        {/* medium screen */}
        <div className="hidden sm:flex items-center  gap-6">
          <button className=" py-2 flex items-center justify-center gap-2  hover:text-content-primary duration-200 ease-out">
            <FaAt className="text-sm" />
            <div className="text-sm font-semibold pb-1">punctuation</div>
          </button>
          <button className=" py-2.5 flex items-center justify-center gap-2  hover:text-content-primary duration-200 ease-out">
            <FaHashtag className="text-sm" />
            <div className="text-sm  font-semibold pb-1">numbers</div>
          </button>
          <div
            className="h-7 rounded-full w-2 bg-base-primary"
            aria-hidden={true}
          />
          <button className=" py-2.5 flex items-center justify-center gap-2  hover:text-content-primary duration-200 ease-out">
            <FaClock className="text-sm" />
            <div className="text-sm  font-semibold pb-1">time</div>
          </button>
          <button className=" py-2.5 flex items-center justify-center gap-2  hover:text-content-primary duration-200 ease-out">
            <FaFont className="text-sm" />
            <div className="text-sm  font-semibold pb-1">words</div>
          </button>
          <button className=" py-2.5 flex items-center justify-center gap-2  hover:text-content-primary duration-200 ease-out">
            <FaQuoteLeft className="text-sm" />
            <div className="text-sm  font-semibold pb-1">quote</div>
          </button>
          <button className=" py-2.5 flex items-center justify-center gap-2  hover:text-content-primary duration-200 ease-out">
            <BiSolidPyramid className="text-lg" />
            <div className="text-sm  font-semibold pb-1">zen</div>
          </button>
          <button className=" py-2.5 flex items-center justify-center gap-2  hover:text-content-primary duration-200 ease-out">
            <PiWrenchFill className=" text-md" />
            <div className="text-sm  font-semibold pb-1">custom</div>
          </button>
          <div
            className="h-7 rounded-full w-2 bg-base-primary"
            aria-hidden={true}
          />
          <button className="text-sm font-semibold hover:text-content-primary duration-200 ease-out">
            10
          </button>
          <button className="text-sm font-semibold hover:text-content-primary duration-200 ease-out">
            25
          </button>
          <button className="text-sm font-semibold hover:text-content-primary duration-200 ease-out">
            50
          </button>
          <button className="text-sm font-semibold hover:text-content-primary duration-200 ease-out">
            100
          </button>
          <button className="text-sm hover:text-content-primary duration-200 ease-out">
            <FaTools />
          </button>
        </div>
      </div>
      <div className="flex items-center flex-col gap-6 text-content-secondary">
        <div className="flex items-center  gap-1.5 text-sm font-roboto font-semibold hover:text-content-primary duration-200 cursor-pointer">
          <FaEarthAmericas className="text-lg" />
          english
        </div>
        <div
          className={`relative font-roboto`}
          tabIndex={0}
          onFocus={() => setIsFocused(true)}
        >
          <div
            className={`h-[145px] overflow-hidden ${
              !isFocused ? "blur-[10px]" : ""
            } [text-align-last:center] text-justify select-none text-[30px]`}
          >
            {words
              .join(" ")
              .split("")
              .map((char, index) => (
                <span
                  className={`leading-[50px]`}
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
                setIsFocused(true);
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
            setIsFocused(true);

            const prevRotation = parseInt(e.currentTarget.style.rotate);
            e.currentTarget.style.rotate = (prevRotation || 0) + 360 + "deg";
          }}
          className="button hover:text-content-primary duration-200 text-lg ease-out cursor-pointer"
        >
          <GrRefresh />
        </button>
      </div>
      <input
        onBlur={() => setIsFocused(false)}
        type="text"
        id="typing-input"
        className="size-0"
        autoComplete="off"
        ref={inputRef}
        onChange={handleInputChange}
      />
      <div
        ref={caretRef}
        className={`duration-75 bg-content-main absolute h-8 w-1 rounded-full`}
      />
    </main>
  );
};

export default Home;

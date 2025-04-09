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
import { useEffect, useState } from "react";
import { FaEarthAmericas } from "react-icons/fa6";
import { GiArrowCursor } from "react-icons/gi";

const Home = () => {
  const [lastCorrectWordIndex, setLastCorrectWordIndex] = useState<number>(0);
  const [fixedWords, setFixedWords] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [userInput, setUserInput] = useState<string[]>([]);
  const [words, setWords] = useState<string[]>(
    Array.from(generate({ min: 50, max: 200 }))
  );

  useEffect(() => {
    userInput.slice(fixedWords.length).forEach((word, index) => {
      if (words[fixedWords.length + index] === word) {
        setLastCorrectWordIndex(fixedWords.length + index);
        setFixedWords([...userInput.slice(0, fixedWords.length + index + 1), " "]);
      }
      
    });
  }, [userInput]);

  return (
    <main className="flex-1 flex flex-col gap-10">
      <div className="mt-6 text-config flex items-center justify-center mx-auto px-4 bg-[rgba(0,0,0,.13)] w-fit rounded-lg text-content-secondary  leading-4">
        {/* small screen */}
        <div className="sm:hidden py-2.5 px-2 flex items-center justify-center  gap-4 mx-auto hover:text-content-primary duration-200 ease-outry">
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
        <label
          htmlFor="user-input"
          className={`relative font-roboto whitespace-wrap`}
          onFocus={() => setIsFocused(true)}
          onBlurCapture={() => setIsFocused(false)}
        >
          <input
            id="user-input"
            type="text"
            className="opacity-0 z-[-10]"
            onChange={(e) => {
              setUserInput(e.currentTarget.value.split(" "));
            }}
            onKeyDown={(e) => {
              if (e.key === "Backspace") {
                if (fixedWords.join(" ") === userInput.join(" ")) {
                  e.preventDefault();
                }
              }
            }}
          />
          <div
            className={`flex flex-wrap gap-5 h-[150px] overflow-hidden leading-[30px] ${
              !isFocused ? "blur-[7px]" : ""
            } [text-align-last:center] text-justify select-none text-[30px]`}
            tabIndex={0}
          >
            {words.map((word, index) => (
              <div key={word + index}>{word}</div>
            ))}
          </div>
          {!isFocused && (
            <div
              className="absolute cursor-default top-1/3 left-1/2 -translate-x-1/2  text-base items-center justify-center flex gap-1 text-content-primary"
              onClick={() => {
                setIsFocused(true);
              }}
            >
              <GiArrowCursor />
              Click here or press any where to focus
            </div>
          )}
        </label>

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
    </main>
  );
};

export default Home;

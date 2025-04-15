import useGameStore from "../../../zustand/useGameStore";
import { useEffect } from "react";
import useDialogStore from "../../../zustand/useDialogStore";
import { IoSettingsSharp } from "react-icons/io5";
import { FaAt } from "react-icons/fa6";
import { FaClock, FaFont, FaHashtag, FaTools } from "react-icons/fa";

const TypingSetting = () => {
  const {
    cases,
    mode,
    number,
    punctuation,
    time,
    wordCount,
    toggleCases,
    genMatter,
    setTime,
    setWordCount,
    toggleMode,
    toggleNumber,
    togglePunctuation,
  } = useGameStore();

  const { toggleDurationDialog, toggleWordCountDialog } = useDialogStore();

  useEffect(() => {
    genMatter();
  }, [number, punctuation, cases, mode, time, wordCount, genMatter]);

  return (
    <div className="bg-[rgba(0,0,0,.13)] text-config flex items-center justify-center mx-auto px-4 C w-fit rounded-lg text-content-secondary  leading-4">
      {/* small screen */}
      <div className="sm:hidden py-2.5 px-2 flex items-center justify-center  gap-4 mx-auto hover:text-content-primary text-[.65rem] duration-200 ease-out">
        <IoSettingsSharp />
        <div className="font-semibold tracking-wide font-roboto text-sm">
          Test settings
        </div>
      </div>

      {/* medium screen */}
      <div className="hidden sm:flex max-w-full sm:text-[0.7rem] md:text-[0.75rem] lg:text-[0.8rem] items-center justify-between sm:gap-1.5 md:gap-2 lg:gap-2.5 ">
        <button
          className={`${
            punctuation ? "text-content-main" : "hover:text-content-primary"
          } gap-0.5 py-2.5 flex  justify-center hover:text-content-primary duration-200 ease-out`}
          onClick={() => togglePunctuation()}
        >
          <FaAt className="sm:text-sm md:text-base" />
          <div className="font-semibold pb-1">punctuation</div>
        </button>
        <button
          className={`${
            number ? "text-content-main" : "hover:text-content-primary"
          } gap-0.5 py-2.5 flex  justify-center hover:text-content-primary duration-200 ease-out`}
          onClick={() => toggleNumber()}
        >
          <FaHashtag className="sm:text-sm md:text-base" />
          <div className="font-semibold pb-1">numbers</div>
        </button>
        <button
          className={`${
            cases ? "text-content-main" : "hover:text-content-primary"
          } gap-1 py-2.5 flex justify-center hover:text-content-primary duration-200 ease-out`}
          onClick={() => toggleCases()}
        >
          <div className="relative z-auto top-[.5px] sm:text-xs md:text-sm font-semibold">
            Aa
          </div>
          <div className="font-semibold pb-1 bg">Cases</div>
        </button>
        <div
          className="h-7 rounded-full sm:w-[2px] md:w-[3px] lg:w-[4px] bg-base-primary"
          aria-hidden={true}
        />
        <button
          className={`py-2.5 flex items-center justify-center gap-0.5 ${
            mode === "time" ? "text-content-main" : "hover:text-content-primary"
          } duration-200 ease-out`}
          onClick={() => toggleMode()}
        >
          <FaClock className="sm:text-sm md:text-base" />
          <div className="font-semibold">time</div>
        </button>
        <button
          className={`py-2.5 flex items-center justify-center gap-0.5 ${
            mode === "words"
              ? "text-content-main"
              : "hover:text-content-primary"
          } duration-200 ease-out`}
          onClick={() => toggleMode()}
        >
          <FaFont className="sm:text-sm md:text-base" />
          <div className="font-semibold">words</div>
        </button>

        <div
          className="h-7 rounded-full sm:w-[2px] md:w-[3px] lg:w-[4px] bg-base-primary"
          aria-hidden={true}
        />
        <button
          className={`${
            (mode === "time" && time === 15) ||
            (mode === "words" && wordCount === 10)
              ? "text-content-main"
              : "hover:text-content-primary duration-200"
          }  ease-out font-semibold`}
          onClick={() => {
            if (mode === "time") setTime(15);
            else setWordCount(10);
          }}
        >
          {mode === "time" ? 15 : 10}
        </button>
        <button
          className={`${
            (mode === "time" && time === 30) ||
            (mode === "words" && wordCount === 20)
              ? "text-content-main"
              : "hover:text-content-primary duration-200"
          }  ease-out font-semibold`}
          onClick={() => {
            if (mode === "time") setTime(30);
            setWordCount(20);
          }}
        >
          {mode === "time" ? 30 : 20}
        </button>
        <button
          className={`${
            (mode === "time" && time === 60) ||
            (mode === "words" && wordCount === 50)
              ? "text-content-main"
              : "hover:text-content-primary duration-200"
          } ease-out font-semibold`}
          onClick={() => {
            if (mode === "time") setTime(60);
            setWordCount(50);
          }}
        >
          {mode === "time" ? 60 : 50}
        </button>
        <button
          className={`${
            (mode === "time" && time === 120) ||
            (mode === "words" && wordCount === 100)
              ? "text-content-main"
              : "hover:text-content-primary duration-200"
          } ease-out font-semibold`}
          onClick={() => {
            if (mode === "time") setTime(120);
            setWordCount(100);
          }}
        >
          {mode === "time" ? 120 : 100}
        </button>
        <button
          className="sm:text-sm md:text-base hover:text-content-primary duration-200 ease-out"
          onClick={() => {
            if (mode === "time") toggleDurationDialog();
            if (mode === "words") toggleWordCountDialog();
          }}
        >
          <FaTools />
        </button>
      </div>
    </div>
  );
};

export default TypingSetting;

import useGameStore from "../../../zustand/useGameStore";
import useDialogStore from "../../../zustand/useDialogStore";
import { IoSettingsSharp } from "react-icons/io5";
import { FaAt } from "react-icons/fa6";
import { FaClock, FaFont, FaHashtag, FaTools } from "react-icons/fa";
import { TbLetterCase } from "react-icons/tb";

import Button from "./Button";

const TypingSetting = () => {
  const {
    cases,
    mode,
    number,
    punctuation,
    session,
    wordCount,
    toggleCases,
    setSession,
    setWordCount,
    setMode,
    toggleNumber,
    togglePunctuation,
  } = useGameStore();

  const {
    toggleDurationDialog,
    toggleTypingSettingDialog,
    toggleWordCountDialog,
  } = useDialogStore();



  return (
    <div className="bg-sub-alt-color text-config flex items-center justify-center mx-auto w-fit rounded-[7px] text-content-secondary overflow-hidden leading-4">
      {/* small screen */}
      <button
        onClick={() => toggleTypingSettingDialog()}
        className="cursor-pointer hover:text-base-primary active:bg-content-secondary hover:bg-content-primary sm:hidden py-2.5 px-2 flex items-center justify-center  gap-4 mx-auto text-[.65rem] duration-75 ease-linear"
      >
        <IoSettingsSharp />
        <div className="font-semibold tracking-wide font-roboto text-sm">
          Test settings
        </div>
      </button>

      {/* medium screen */}
      <div className="hidden sm:flex max-w-full sm:text-[0.7rem] md:text-[0.75rem] lg:text-[0.8rem] items-center justify-between sm:gap-3.5 md:gap-4.5 lg:gap-6 px-7">
        <Button
          Icon={FaAt}
          isActive={punctuation}
          text="punctuation"
          onClick={() => togglePunctuation()}
        />
        <Button
          Icon={FaHashtag}
          isActive={number}
          text="numbers"
          onClick={() => toggleNumber()}
        />
        <Button
          Icon={TbLetterCase}
          isActive={cases}
          text="cases"
          onClick={() => toggleCases()}
        />

        <div
          className="h-7 rounded-full sm:w-[3px] md:w-[4px] lg:w-[5px] bg-base-primary"
          aria-hidden={true}
        />

        <Button
          Icon={FaClock}
          isActive={mode === "session"}
          text="time"
          onClick={() => setMode("session")}
        />

        <Button
          Icon={FaFont}
          isActive={mode === "words"}
          text="words"
          onClick={() => setMode("words")}
        />

        <div
          className="h-7 rounded-full sm:w-[3px] md:w-[4px] lg:w-[5px] bg-base-primary"
          aria-hidden={true}
        />

        <Button
          isActive={mode === "session" ? session === 15 : wordCount === 10}
          text={mode === "session" ? "15" : "10"}
          onClick={() => {
            if (mode === "session") setSession(15);
            else setWordCount(10);
          }}
        />
        <Button
          isActive={mode === "session" ? session === 30 : wordCount === 20}
          text={mode === "session" ? "30" : "20"}
          onClick={() => {
            if (mode === "session") setSession(30);
            else setWordCount(20);
          }}
        />
        <Button
          isActive={mode === "session" ? session === 60 : wordCount === 50}
          text={mode === "session" ? "45" : "30"}
          onClick={() => {
            if (mode === "session") setSession(60);
            else setWordCount(50);
          }}
        />

        <Button
          isActive={mode === "session" ? session === 120 : wordCount === 100}
          text={mode === "session" ? "120" : "100"}
          onClick={() => {
            if (mode === "session") setSession(120);
            else setWordCount(100);
          }}
        />

        <Button
          Icon={FaTools}
          isActive={false}
          text=""
          onClick={() => {
            if (mode === "session") toggleDurationDialog();
            else toggleWordCountDialog();
          }}
        />
      </div>
    </div>
  );
};

export default TypingSetting;

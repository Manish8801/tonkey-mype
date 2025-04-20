import { useEffect, useRef } from "react";
import useGameStore from "../../../zustand/useGameStore";
import useDialogStore from "../../../zustand/useDialogStore";

const TypingSettingModal = () => {
  const {
    mode,
    number,
    punctuation,
    cases,
    setMode,
    toggleNumber,
    togglePunctuation,
    toggleCases,
  } = useGameStore();
  const { isTypingSettingModalOpen, toggleTypingSettingDialog } =
    useDialogStore();
  const { session, wordCount, setSession, setWordCount } = useGameStore();
  const dialogRef = useRef<HTMLDivElement | null>(null);

  const handleOutSideClick = (e: MouseEvent) => {
    if (dialogRef.current) {
      if (!dialogRef.current.contains(e.target as Node))
        toggleTypingSettingDialog();
    }
  };

  useEffect(() => {
    window.addEventListener("mousedown", handleOutSideClick);
    return () => window.removeEventListener("mousedown", handleOutSideClick);
  }, [isTypingSettingModalOpen]);

  return (
    <div className="h-screen w-screen flex items-center justify-center p-8 select-none">
      <div
        className="border-sub-alt-color border-3 bg-base-primary max-w-[300px] w-full rounded-lg flex flex-col gap-8 p-5"
        ref={dialogRef}
      >
        <div className="flex flex-col gap-2 items-stretch">
          <button
            onClick={() => toggleNumber()}
            className={`${
              number
                ? "bg-content-main text-base-primary"
                : "bg-sub-alt-color text-content-primary hover:text-base-primary hover:bg-content-primary"
            } py-1 text-lg  text-center duration-75 ease-out rounded-md`}
          >
            punctuation
          </button>
          <button
            onClick={() => togglePunctuation()}
            className={`${
              punctuation
                ? "bg-content-main text-base-primary"
                : "bg-sub-alt-color text-content-primary hover:text-base-primary hover:bg-content-primary"
            } py-1 text-lg  text-center duration-75 ease-out rounded-md`}
          >
            numbers
          </button>
          <button
            onClick={() => toggleCases()}
            className={`${
              cases
                ? "bg-content-main text-base-primary"
                : "bg-sub-alt-color text-content-primary hover:text-base-primary hover:bg-content-primary"
            } py-1 text-lg  text-center duration-75 ease-out rounded-md`}
          >
            cases
          </button>
        </div>
        <div className="flex flex-col gap-2 items-stretch">
          <button
            onClick={() => setMode("session")}
            className={`py-1 text-lg ${
              mode === "session"
                ? "bg-content-main text-base-primary"
                : "bg-sub-alt-color text-content-primary  hover:text-base-primary hover:bg-content-primary"
            } text-center duration-75 ease-out rounded-md`}
          >
            time
          </button>
          <button
            onClick={() => setMode("words")}
            className={`py-1 text-lg ${
              mode === "words"
                ? "bg-content-main text-base-primary"
                : "bg-sub-alt-color text-content-primary  hover:text-base-primary hover:bg-content-primary"
            } text-center duration-75 ease-out rounded-md`}
          >
            words
          </button>
        </div>
        <div className="flex flex-col gap-2 items-stretch">
          <button
            onClick={() => {
              if (mode === "session") setSession(15);
              else setWordCount(10);
            }}
            className={`${
              (mode === "session" && session === 15) ||
              (mode === "words" && wordCount) === 10
                ? "bg-content-main text-base-primary"
                : "bg-sub-alt-color text-content-primary hover:text-base-primary hover:bg-content-primary"
            } py-1 text-lg text-center  duration-75 ease-out rounded-md`}
          >
            {mode === "words" ? "10" : "15"}
          </button>
          <button
            onClick={() => {
              if (mode === "session") setSession(30);
              else setWordCount(20);
            }}
            className={`${
              (mode === "session" && session === 30) ||
              (mode === "words" && wordCount) === 20
                ? "bg-content-main text-base-primary"
                : "bg-sub-alt-color text-content-primary hover:text-base-primary hover:bg-content-primary"
            } py-1 text-lg text-center  duration-75 ease-out rounded-md`}
          >
            {mode === "words" ? "20" : "30"}
          </button>
          <button
            onClick={() => {
              if (mode === "session") setSession(60);
              else setWordCount(50);
            }}
            className={`${
              (mode === "session" && session === 60) ||
              (mode === "words" && wordCount) === 50
                ? "bg-content-main text-base-primary"
                : "bg-sub-alt-color text-content-primary hover:text-base-primary hover:bg-content-primary"
            } py-1 text-lg text-center  duration-75 ease-out rounded-md`}
          >
            {mode === "words" ? "50" : "60"}
          </button>
          <button
            onClick={() => {
              if (mode === "session") setSession(120);
              else setWordCount(100);
            }}
            className={`${
              (mode === "session" && session === 120) ||
              (mode === "words" && wordCount) === 100
                ? "bg-content-main text-base-primary"
                : "bg-sub-alt-color text-content-primary hover:text-base-primary hover:bg-content-primary"
            } py-1 text-lg text-center  duration-75 ease-out rounded-md`}
          >
            {mode === "words" ? "100" : "120"}
          </button>
          <button className="bg-sub-alt-color py-1 text-content-primary text-lg active:bg-content-main text-center hover:text-base-primary hover:bg-content-primary duration-75 ease-out rounded-md">
            custom
          </button>
        </div>
      </div>
    </div>
  );
};

export default TypingSettingModal;

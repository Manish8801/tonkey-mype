import { FormEvent, useEffect, useRef, useState } from "react";
import useGameStore from "../../../zustand/useGameStore";
import useDialogStore from "../../../zustand/useDialogStore";

const SetWordCount = () => {
  const { isWordCountModalOpen, toggleWordCountDialog } = useDialogStore();
  const { wordCount, setWordCount } = useGameStore();
  const [value, setValue] = useState<number>(wordCount);
  const dialogRef = useRef<HTMLFormElement | null>(null);

  const handleOutSideClick = (e: MouseEvent) => {
    if (dialogRef.current && !dialogRef.current.contains(e.target as Node)) {
      toggleWordCountDialog();
    }
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setWordCount(value);
    toggleWordCountDialog();
  };

  useEffect(() => {
    window.addEventListener("mousedown", handleOutSideClick);
    return () => window.removeEventListener("mousedown", handleOutSideClick);
  }, [isWordCountModalOpen]);

  return (
    <div className="h-screen w-screen flex items-center justify-center p-8 select-none ">
      <form
        onSubmit={handleSubmit}
        className="modal p-4 md:p-8 max-w-[500px] w-full rounded-xl bg-base-primary border-3 border-[rgba(0,0,0,.25)] flex flex-col gap-8"
        ref={dialogRef}
      >
        <div className="title text-content-secondary text-2xl ">
          Custom word count
        </div>

        <input
          type="number"
          className="outline-none px-2 py-1.5 text-content-primary bg-[rgba(0,0,0,.25)] rounded-lg"
          value={value === 0 ? "" : value}
          onChange={(e) => setValue(+e.target.value)}
        />
        <div className="text-content-primary text-xs">
          You can start an infinite test by inputting 0. Then, to stop the test,
          use the Bail Out feature (
          <span className="bg-content-secondary text-base-primary text-xs px-1 text-center rounded-xs inline-flex font-semibold ">
            esc
          </span>
          or
          <span className="bg-content-secondary text-base-primary text-xs px-1 text-center rounded-xs inline-flex font-semibold ">
            ctrl/cmd
          </span>
          +
          <span className="bg-content-secondary text-base-primary text-xs px-1 text-center rounded-xs inline-flex font-semibold ">
            shift
          </span>
          +
          <span className="bg-content-secondary text-base-primary text-xs px-1 text-center rounded-xs inline-flex font-semibold ">
            p
          </span>{" "}
          &gt; Bail Out)
        </div>
        <button
          className="active:bg-content-secondary hover:text-base-primary hover:bg-content-primary bg-[rgba(0,0,0,.25)] duration-100 ease-out rounded-lg flex items-center justify-center text-content-primary py-2"
          type="submit"
        >
          ok
        </button>
      </form>
    </div>
  );
};

export default SetWordCount;

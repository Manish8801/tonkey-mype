import { FormEvent, useEffect, useRef, useState } from "react";
import useDialogStore from "../../../zustand/useDialogStore";
import useGameStore from "../../../zustand/useGameStore";
import { formatTime } from "../../../utils/helper";


const SetDuration = () => {
  const { isDurationModalOpen, toggleDurationDialog } = useDialogStore();
  const { session, setSession } = useGameStore();
  const [value, setValue] = useState<string>(String(session));
  const descriptionRef = useRef<HTMLDivElement | null>(null);
  const timeInSec = useRef<number>(0);
  const dialogRef = useRef<HTMLFormElement | null>(null);

  const handleOutSideClick = (e: MouseEvent) => {
    if (dialogRef.current) {
      if (!dialogRef.current.contains(e.target as Node)) toggleDurationDialog();
    }
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSession(timeInSec.current);
    timeInSec.current = 0;
    toggleDurationDialog();
  };

  useEffect(() => {
    if (descriptionRef.current) {
      if (value === "0" || !value) {
        descriptionRef.current.textContent = "Infinite test";
      } else if (
        !value.includes("h") &&
        !value.includes("m") &&
        !value.includes("s")
      ) {
        descriptionRef.current.textContent = `${value} seconds`;
      } else {
        const hIdx = value.indexOf("h");
        const mIdx = value.indexOf("m");
        const sIdx = value.indexOf("s");

        let h = 0;
        let m = 0;
        let s = 0;

        if (hIdx !== -1) h = +value.slice(0, hIdx);
        if (mIdx !== -1) m = +value.slice(hIdx + 1, mIdx);
        if (sIdx !== -1) s = +value.slice(mIdx + 1, sIdx);

        const result = formatTime({ h, m, s });

        descriptionRef.current.textContent = `${result.hours} ${
          result.hours === 1 ? "hour" : "hours"
        }, ${result.minutes} ${result.minutes === 1 ? "minute" : "minutes"}, ${
          result.seconds
        } ${result.seconds === 1 ? "second" : "seconds"}`;

        timeInSec.current = result.timeInSec;
      }
    }
  }, [value]);

  useEffect(() => {
    window.addEventListener("mousedown", handleOutSideClick);
    return () => window.removeEventListener("mousedown", handleOutSideClick);
  }, [isDurationModalOpen]);

  return (
    <div className="h-screen w-screen flex items-center justify-center p-8 select-none ">
      <form
        onSubmit={handleSubmit}
        className="modal p-4 md:p-8 max-w-[500px] w-full rounded-xl bg-base-primary border-3 border-[rgba(0,0,0,.25)] flex flex-col gap-8"
        ref={dialogRef}
      >
        <div className="title text-content-secondary text-2xl ">
          Test duration
        </div>
        <div className="text-xs text-content-primary" ref={descriptionRef}>
          15 seconds
        </div>
        <input
          type="text"
          className="outline-none px-2 py-1.5 text-content-primary bg-[rgba(0,0,0,.25)] rounded-lg"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <div className="text-content-primary text-xs">
          You an use "h" for hours and "m" for minutes, for example "1h30m".
        </div>
        <div className="text-content-primary text-xs">
          You can start an infinite test by inputting 0.Then to stop the test,
          use the Bail Out feature (
          <span className="bg-content-secondary text-base-primary text-xs px-1 text-center rounded-xs inline-flex font-semibold ">
            esc
          </span>
          or{" "}
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

export default SetDuration;

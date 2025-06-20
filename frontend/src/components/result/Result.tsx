import { FaChevronRight } from "react-icons/fa";
import { RiLoopLeftLine } from "react-icons/ri";
import { IoWarning } from "react-icons/io5";
import { HiMiniBackward } from "react-icons/hi2";
import { HiMiniPhoto } from "react-icons/hi2";
import { formatTime } from "../../utils/helper";
import useGameStore from "../../zustand/useGameStore";
import Graph from "./components/Graph";
import { FaCrown } from "react-icons/fa";
import html2canvas from "html2canvas";
import Tooltip from "./components/Tooltip";
import Button from "./components/Button";
import { useCallback } from "react";

const Result = () => {
  const { number, punctuation, cases, result, session } =
    useGameStore();

  const takeScreenshot = useCallback(() => {
    const elemToCapture = document.getElementById("main-container");
    if (elemToCapture) {
      html2canvas(elemToCapture).then((canvas) => {
        document.body.append(canvas);
      });
    }
  }, []);


  return (
    <div className="w-full grid grid-cols-1 gap-6 md:grid-cols-[auto_1fr] sm:gap-5 md:gap-6">
      {/* first row */}
      <div className="w-fit mx-auto justify-self-center h-fit xs:justify-self-auto flex flex-col xs:w-full xs:flex-row xs:justify-evenly md:flex-col md:justify-start md:gap-4">
        <div>
          <div className="text-content-secondary text-3xl sm:text-4xl flex items-center justify-center gap-2">
            wpm
            <div className="bg-content-main text-base-primary inline-block text-xs sm:text-base p-1 sm:p-1.5 md:2 rounded-full">
              <FaCrown className="" />
            </div>
          </div>
          <div className="text-content-main text-5xl sm:text-6xl">
            {result?.wpm}
          </div>
        </div>
        <div>
          <div className="text-content-secondary text-3xl sm:text-4xl">acc</div>
          <div className="text-content-main text-5xl sm:text-6xl">
            {result?.acc || 0}%
          </div>
        </div>
      </div>
      <div className="h-fit">
        <Graph />
      </div>
      {/* second row */}
      <div className="justify-self-center md:justify-self-auto font-lexend">
        <div className="text-content-secondary">test type</div>
        <div className="text-content-main ">time {session}</div>
        <div className="text-content-main ">english</div>
        {cases && <div className="text-content-main ">cases</div>}
        {number && <div className="text-content-main ">number</div>}
        {punctuation && <div className="text-content-main ">punctuation</div>}
      </div>
      <div className="font-roboto">
        <div className="flex-1 flex justify-around text-center xs:grid-cols-2 xs:gap-y-2 md:grid-cols-4">
          <div>
            <div className="text-content-secondary text-lg">raw</div>
            <div className="text-content-main text-3xl">{result?.raw}</div>
          </div>
          <div>
            <div className="text-content-secondary text-lg">characters</div>
            <div className="text-content-main text-3xl">
              {result?.correctCharCount}/{result?.wrongCharCount}
            </div>
          </div>
          <div>
            <div className="text-content-secondary text-lg">time</div>
            <div className="text-content-main text-3xl">
              {result?.timeInSec}s
            </div>
            <div className="text-[10px] text-content-secondary tracking-wider">
              {formatTime({ h: 0, m: 0, s: result?.timeInSec || 0 }).formatted}
            </div>
          </div>
        </div>
        <div className="text-content-secondary flex items-center justify-center gap-16 text-lg mt-4">
          <Button onClick={() => hideResult()}>
            <FaChevronRight />
            <Tooltip text=" Next test" />
          </Button>

          <Button onClick={() => console.log("Restart test button clicked")}>
            <RiLoopLeftLine />
            <Tooltip text="  Restart test" />
          </Button>

          <Button onClick={() => console.log("Practice words button clicked")}>
            <IoWarning />
            <Tooltip text="Practice words" />
          </Button>

          <Button onClick={() => console.log("Watch replay button clicked")}>
            <HiMiniBackward />
            <Tooltip text=" Watch replay" />
          </Button>

          <Button onClick={takeScreenshot}>
            <HiMiniPhoto />
            <Tooltip text="Save screenshot" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Result;

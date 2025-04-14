import Graph from "./Graph";
import { FaCrown } from "react-icons/fa";

const Result = () => {
  return (
    <div className="grid grid-cols-10 space-x-4 font-roboto pt-6">
      <div className="">
        <div className="">
          <div className="text-content-secondary text-4xl flex items-center justify-between">
            wpm
            <div className="bg-content-main text-base-primary text-base p-1.5 rounded-xl inline-block">
              <FaCrown className="" />
            </div>
          </div>
          <div className="text-content-main text-6xl">56</div>
        </div>
        <div className="">
          <div className="text-content-secondary text-4xl">acc</div>
          <div className="text-content-main text-6xl">98%</div>
        </div>
      </div>
      <Graph />
      {/* text-type */}
          <div className="">
              <div className="text-content-secondary">test type</div>
              <div className="text-content-main font-lexand">time 15</div>
              <div className="text-content-main font-lexand">english</div>
              <div className="text-content-main font-lexand">punctuation</div>
      </div>
      {/* details */}
      <div className="col-span-9 flex justify-around items-center text-center">
        <div>
          <div className="text-content-secondary text-base">raw</div>
          <div className="text-content-main text-3xl">56</div>
        </div>
        <div>
          <div className="text-content-secondary text-base">characters</div>
          <div className="text-content-main text-3xl">70/0/0/0</div>
        </div>
        <div>
          <div className="text-content-secondary text-base">consistency</div>
          <div className="text-content-main text-3xl">52%</div>
        </div>
        <div>
          <div className="text-content-secondary text-base">time</div>
          <div className="text-content-main text-3xl">15s</div>
          <div className="text-xs text-content-secondary">00:00:15 session</div>
        </div>
      </div>
    </div>
  );
};

export default Result;

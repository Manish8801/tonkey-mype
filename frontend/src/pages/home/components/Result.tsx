import useGameStore from "../../../zustand/useGameStore";
import Graph from "./Graph";
import { FaCrown } from "react-icons/fa";

const Result = () => {
  const { result, time, number, punctuation, cases } = useGameStore();
  return (
    <div className="flex-1 grid grid-cols-1 gap-6 md:grid-cols-[auto_1fr] sm:gap-5 md:gap-6">
      {/* first row */}
      <div className="w-fit mx-auto justify-self-center xs:justify-self-auto flex flex-col xs:w-full xs:flex-row xs:justify-evenly md:flex-col md:justify-start md:gap-4">
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
            {result?.accuracy}%
          </div>
        </div>
      </div>

      <div className="">
        <Graph />
      </div>
      {/* second row */}
      <div className="justify-self-center md:justify-self-auto font-lexend">
        <div className="text-content-secondary">test type</div>
        <div className="text-content-main ">time {time}</div>
        <div className="text-content-main ">english</div>
        {cases && <div className="text-content-main ">cases</div>}
        {number && <div className="text-content-main ">number</div>}
        {punctuation && <div className="text-content-main ">punctuation</div>}
      </div>
      <div>
        <div className="flex-1 grid text-center xs:grid-cols-2 justify-items-center-safe  xs:gap-y-2 md:grid-cols-4">
          <div>
            <div className="text-content-secondary text-base">raw</div>
            <div className="text-content-main text-3xl">{result?.raw}</div>
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
            <div className="text-[10px] text-content-secondary tracking-wider">
              00:00:15 session
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;
//  <div className="flex flex-wrap w-full font-roboto gap-4">
//       {/* mota result */}
//       <div className="w-fit bg-gray-200">
//         <div className="">
//           <div className="text-content-secondary text-3xl sm:text-4xl flex gap-2 items-center justify-between">
//             wpm
//             <div className="bg-content-main text-base-primary inline-block text-xs sm:text-base p-1.5 rounded-full">
//               <FaCrown className="" />
//             </div>
//           </div>
//           <div className="text-content-main text-5xl sm:text-6xl">56</div>
//         </div>
//         <div className="">
//           <div className="text-content-secondary text-3xl sm:text-4xl">acc</div>
//           <div className="text-content-main text-5xl sm:text-6xl">98%</div>
//         </div>
//       </div>
//       {/* graph */}
//       <Graph />
//       {/* text-type */}
//       <div className="w-fit">
//
//       </div>
//       {/* details */}

//
//     </div>

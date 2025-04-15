import { create } from "zustand";
import {
  calcAccuracy,
  calcErrors,
  calcRaw,
  calcWPM,
  genMatter,
} from "../utils/game.utils";
import type { IGenConfigs, IGraphData, IResult } from "../types/type";
import {
  getNumArr,
  getWpmSpeed,
  getRawSpeed,
  getErrors,
} from "../utils/helper";

type TStore = {
  errors: { [key: string]: number };
  startTime: number;
  isTypingStarted: boolean;
  wordTimingMap: { [key: string]: number } | null;
  actual: string;
  isFocused: boolean;
  cases: boolean;
  matter: string;
  mode: "words" | "time";
  number: boolean;
  punctuation: boolean;
  result: IResult | null;
  time: number;
  wordCount: number;
  isGameOver: boolean;
  resultShown: boolean;
  graphData: IGraphData | null;
  toggleIsTypingStarted: () => void;
  setWordTimingMap: (
    startTime: number,
    timingMap: {
      [key: string]: number;
    }
  ) => void;
  setErrors: (errors: { [key: string]: number }) => void;
  setStartTime: (startTime: number) => void;
  setActual: (actual: string) => void;
  toggleResult: () => void;
  overGame: () => void;
  restartGame: () => void;
  toggleIsFocused: () => void;
  genMatter: () => void;
  toggleMode: () => void;
  toggleCases: () => void;
  toggleNumber: () => void;
  togglePunctuation: () => void;
  setTime: (time: number) => void;
  setWordCount: (wordCount: number) => void;
  setResult: () => void;
  getGraphData: () => void;
};

const useGameStore = create<TStore>()((set, get) => ({
  errors: {},
  startTime: 0,
  isTypingStarted: false,
  wordTimingMap: null,
  actual: "",
  isFocused: false,
  cases: false,
  matter: "",
  mode: "time",
  number: false,
  punctuation: false,
  result: null,
  time: 15,
  wordCount: 20,
  isGameOver: false,
  resultShown: false,
  graphData: null,
  setErrors: (errors) => set({ errors }),
  setStartTime: (startTime) => set({ startTime }),
  toggleIsTypingStarted: () => set({ isTypingStarted: !get().isTypingStarted }),
  setActual: (actual) => set({ actual }),
  setWordTimingMap: (startTime, timingMap) => set({ wordTimingMap: timingMap }),
  toggleResult: () => set({ resultShown: !get().resultShown }),
  overGame: () => set({ isGameOver: true }),
  restartGame: () => set({ isGameOver: false }),
  toggleIsFocused: () => set({ isFocused: !get().isFocused }),
  setTime: (time) => set({ time }),
  setResult: () => {
    const { matter, actual, time } = get();
    const wpm = calcWPM(time, actual, matter);
    const raw = calcRaw(time, actual);
    const acc = calcAccuracy(actual, matter);
    const errors = calcErrors(actual, matter);
    set({ result: { time, wpm, raw, acc, errors } });
  },
  toggleCases: () => set({ cases: !get().cases }),
  toggleNumber: () => set({ number: !get().number }),
  setWordCount: (wordCount) => set({ wordCount }),
  togglePunctuation: () => set({ punctuation: !get().punctuation }),
  toggleMode: () => set({ mode: get().mode === "words" ? "time" : "words" }),
  genMatter: () => {
    const { number, punctuation, cases, mode, time, wordCount } = get();

    const configs: IGenConfigs = { number, punctuation, cases };

    if (mode === "words") configs.exactly = wordCount;
    else configs.min = time * 5;

    set({ matter: genMatter(configs) });
  },
  getGraphData: () => {
    const { startTime, time, wordTimingMap, errors, matter, result } = get();
    if (!result || !wordTimingMap) return;
    const testTime = getNumArr(time);
    const wpmSpeeds = getWpmSpeed(startTime, wordTimingMap, matter);
    const rawSpeeds = getRawSpeed(startTime, wordTimingMap);
    const errorIndexes = getErrors(startTime, errors);
    console.log({ testTime, wpmSpeeds, rawSpeeds, errorIndexes });
    set({ graphData: { testTime, wpmSpeeds, rawSpeeds, errorIndexes } });
  },
}));

export default useGameStore;

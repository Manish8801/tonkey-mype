import { create } from "zustand";
import { genMatter } from "../utils/game.utils";
import type { IGenConfigs, IResult } from "../types/type";

type TStore = {
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
  setResult: (result: IResult | null) => void;
};

const useGameStore = create<TStore>()((set, get) => ({
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
  setActual: (actual) => set({ actual }),
  toggleResult: () => set({ resultShown: !get().resultShown }),
  overGame: () => set({ isGameOver: true }),
  restartGame: () => set({ isGameOver: false }),
  toggleIsFocused: () => set({ isFocused: !get().isFocused }),
  setTime: (time) => set({ time }),
  setResult: (result) => {
    console.log(result);
    set({ result });
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
}));

export default useGameStore;

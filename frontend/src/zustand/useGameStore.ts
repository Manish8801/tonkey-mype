import { create } from "zustand";
import { genMatter } from "../utils/game.utils";
import type { IGenConfigs, IResult } from "../types/type";

type TStore = {
  isFocused: boolean;
  cases: boolean;
  matter: string;
  mode: "words" | "time";
  number: boolean;
  punctuation: boolean;
  result: IResult | null;
  time: number;
  totalWords: number;
  isGameOver: boolean;
  overGame: () => void;
  restartGame: () => void;
  toggleIsFocused: () => void;
  genMatter: () => void;
  toggleMode: () => void;
  toggleCases: () => void;
  toggleNumber: () => void;
  togglePunctuation: () => void;
  setTime: (time: number) => void;
  setTotalWords: (totalWords: number) => void;
  setResult: (result: IResult | null) => void;
};

const useGameStore = create<TStore>()((set, get) => ({
  isFocused: false,
  cases: false,
  matter: "",
  mode: "time",
  number: false,
  punctuation: false,
  result: null,
  time: 15,
  totalWords: 20,
  isGameOver: false,
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
  setTotalWords: (totalWords) => set({ totalWords }),
  togglePunctuation: () => set({ punctuation: !get().punctuation }),
  toggleMode: () => set({ mode: get().mode === "words" ? "time" : "words" }),
  genMatter: () => {
    const { number, punctuation, cases, mode, time, totalWords } = get();

    const configs: IGenConfigs = { number, punctuation, cases };

    if (mode === "words") configs.exactly = totalWords;
    else configs.min = time * 5;

    set({ matter: genMatter(configs) });
  },
}));

export default useGameStore;

import { create } from "zustand";
import { genMatter, getResult } from "../utils/game.utils";
import type { IGenConfigs, IResult } from "../types/type";

type TStore = {
  actual: string;
  cases: boolean;
  errors: { [key: string]: number };
  isFocused: boolean;
  isGameOver: boolean;
  isTypingStarted: boolean;
  matter: string;
  mode: "words" | "session";
  number: boolean;
  punctuation: boolean;
  result: IResult | null;
  resultShown: boolean;
  session: number;
  wordCount: number;
  setResult: (timeInSec: number, valuePerSecond: string[]) => void;
  toggleIsTypingStarted: () => void;
  setErrors: (errors: { [key: string]: number }) => void;
  setActual: (actual: string) => void;
  showResult: () => void;
  overGame: () => void;
  restartGame: () => void;
  toggleIsFocused: () => void;
  genMatter: () => void;
  setMode: (mode: "words" | "session") => void;
  toggleCases: () => void;
  toggleNumber: () => void;
  togglePunctuation: () => void;
  setSession: (session: number) => void;
  setWordCount: (wordCount: number) => void;
};

const useGameStore = create<TStore>()((set, get) => ({
  errors: {},
  isTypingStarted: false,
  actual: "",
  isFocused: false,
  cases: false,
  matter: "",
  mode: "session",
  number: false,
  punctuation: false,
  result: null,
  session: 15,
  wordCount: 20,
  isGameOver: false,
  resultShown: false,
  graphData: null,
  genMatter: () => {
    const { number, punctuation, cases, mode, session, wordCount } = get();
    const configs: IGenConfigs = { number, punctuation, cases };
    if (mode === "words") configs.exactly = wordCount;
    else if (!session) configs.min = 1000;
    else configs.min = session * 5;
    const matter = genMatter(configs);
    set({ matter });
  },
  overGame: () => set({ isGameOver: true }),
  restartGame: () => set({ isGameOver: false }),
  setActual: (actual) => set({ actual }),
  setErrors: (errors) => set({ errors }),
  setMode: (mode) => set({ mode }),
  setResult: (timeInSec, valuePerSecond) => {
    const { matter } = get();
    const result = getResult(timeInSec, valuePerSecond, matter);
    set({ result });
  },
  setSession: (session) => set({ session }),
  setWordCount: (wordCount) => set({ wordCount }),
  showResult: () => set({ resultShown: true }),
  toggleCases: () => set({ cases: !get().cases }),
  toggleIsFocused: () => set({ isFocused: !get().isFocused }),
  toggleIsTypingStarted: () => set({ isTypingStarted: !get().isTypingStarted }),
  toggleNumber: () => set({ number: !get().number }),
  togglePunctuation: () => set({ punctuation: !get().punctuation }),
}));

export default useGameStore;

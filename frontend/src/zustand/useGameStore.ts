import { create } from "zustand";
import { genMatter, getResult } from "../utils/game.utils";
import type { IGenConfigs, IResult } from "../types/type";

type TStore = {
  errors: { [key: string]: number };
  isTypingStarted: boolean;
  actual: string;
  isFocused: boolean;
  cases: boolean;
  matter: string;
  mode: "words" | "session";
  number: boolean;
  punctuation: boolean;
  result: IResult | null;
  session: number;
  wordCount: number;
  isGameOver: boolean;
  resultShown: boolean;
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
  setErrors: (errors) => set({ errors }),
  toggleIsTypingStarted: () => set({ isTypingStarted: !get().isTypingStarted }),
  setActual: (actual) => set({ actual }),
  showResult: () => set({ resultShown: true }),
  setResult: (timeInSec, valuePerSecond) => {
    const { matter } = get();
    set({ result: getResult(timeInSec, valuePerSecond, matter) });
  },
  overGame: () => set({ isGameOver: true }),
  restartGame: () => set({ isGameOver: false }),
  toggleIsFocused: () => set({ isFocused: !get().isFocused }),
  setSession: (session) => set({ session }),
  toggleCases: () => set({ cases: !get().cases }),
  toggleNumber: () => set({ number: !get().number }),
  setWordCount: (wordCount) => set({ wordCount }),
  togglePunctuation: () => set({ punctuation: !get().punctuation }),
  setMode: (mode) => set({ mode }),
  genMatter: () => {
    const { number, punctuation, cases, mode, session, wordCount } = get();

    const configs: IGenConfigs = { number, punctuation, cases };

    if (mode === "words") configs.exactly = wordCount;
    else configs.min = session * 5;

    set({ matter: genMatter(configs) });
  },
}));

export default useGameStore;

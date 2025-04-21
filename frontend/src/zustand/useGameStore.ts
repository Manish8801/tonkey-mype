import { create } from "zustand";
import { genMatter, getResult } from "../utils/game.utils";
import type { IGenConfigs, IResult } from "../types/type";

type TStore = {
  cases: boolean;
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
  hideResult: () => void;
  setResult: (
    timeInSec?: number,
    valuePerSecond?: string[],
    matter?: string
  ) => void;
  reset: () => void;
  toggleIsTypingStarted: () => void;
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
  isTypingStarted: false,
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
  hardReset: () =>
    set({
      mode: "session",
      session: 15,
      wordCount: 20,
      number: false,
      punctuation: false,
      cases: false,
      isTypingStarted: false,
      isFocused: false,
      result: null,
    }),
  reset: () =>
    set({
      isTypingStarted: false,
      isFocused: false,
      mode: get().mode,
      session: get().session,
      wordCount: get().wordCount,
    }),
  genMatter: () => {
    const { number, punctuation, cases, mode, session, wordCount } = get();
    const configs: IGenConfigs = { number, punctuation, cases };
    if (mode === "words") configs.exactly = wordCount;
    else if (!session) configs.min = 1000;
    else configs.min = session * 5;
    const matter = genMatter(configs);
    set({ matter });
  },
  hideResult: () => set({ resultShown: false }),
  overGame: () => set({ isGameOver: true }),
  restartGame: () => set({ isGameOver: false }),
  setMode: (mode) => set({ mode }),
  setResult: (timeInSec, valuePerSecond, matter) => {
    if (!(timeInSec && valuePerSecond && matter)) set({ result: null });
    else {
      const { matter } = get();
      const result = getResult(timeInSec, valuePerSecond, matter);
      set({ result });
    }
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

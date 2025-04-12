import { generate } from "random-words";
import { create } from "zustand";

type TResult = {
  wpm: number;
  accuracy: number;
  raw: number;
  time: number;
  errors: Record<string, number[]>;
} | null;
type TStore = {
  timer: number;
  result: TResult;
  mode: "words" | "time";
  option: number;
  words: string[];
  setResult: (result: TResult) => void;
  setTimer: (timer: number) => void;
  setOption: (option: number) => void;
  genWords: () => void;
  setMode: (mode: "words" | "time") => void;
};

const useGameStore = create<TStore>()((set, get) => ({
  timer: 30,
  result: null,
  mode: "words",
  option: 30,
  words: Array.from(generate({ exactly: 30 })),
  setResult: (result) => set({ result }),
  setOption: (option) => set({ option }),
  setMode: (mode) => set({ mode }),
  setTimer: (timer) => set({ timer }),
  genWords: () => {
    const { mode, option } = get();
    if (mode === "words")
      set({ words: Array.from(generate({ exactly: option })) });
    if (mode === "time")
      set({
        words: Array.from(generate({ min: 5 * option, max: 5 * option + 20 })),
      });
  },
}));

export default useGameStore;

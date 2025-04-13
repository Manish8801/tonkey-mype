import { create } from "zustand";

type TStore = {
  isDurationDialogOpen: boolean;
  isWordCountDialogOpen: boolean;
  toggleDurationDialog: () => void;
  toggleWordCountDialog: () => void;
};
const useDialogStore = create<TStore>()((set, get) => ({
  isDurationDialogOpen: false,
  isWordCountDialogOpen: false,
  toggleDurationDialog: () =>
    set({ isDurationDialogOpen: !get().isDurationDialogOpen }),
  toggleWordCountDialog: () =>
    set({ isWordCountDialogOpen: !get().isWordCountDialogOpen }),

}));

export default useDialogStore;

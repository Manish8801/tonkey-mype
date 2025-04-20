import { create } from "zustand";

type TStore = {
  isDurationModalOpen: boolean;
  isWordCountModalOpen: boolean;
  isTypingSettingModalOpen: boolean;
  toggleTypingSettingDialog: () => void;
  toggleDurationDialog: () => void;
  toggleWordCountDialog: () => void;
};
const useDialogStore = create<TStore>()((set, get) => ({
  isDurationModalOpen: false,
  isWordCountModalOpen: false,
  isTypingSettingModalOpen: false,
  toggleTypingSettingDialog: () =>
    set({ isTypingSettingModalOpen: !get().isTypingSettingModalOpen }),
  toggleDurationDialog: () =>
    set({ isDurationModalOpen: !get().isDurationModalOpen }),
  toggleWordCountDialog: () =>
    set({ isWordCountModalOpen: !get().isWordCountModalOpen }),
}));

export default useDialogStore;

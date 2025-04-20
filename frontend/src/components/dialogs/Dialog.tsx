import useDialogStore from "../../zustand/useDialogStore";
import SetDuration from "./components/SetDuration";
import SetWordCount from "./components/SetWordCount";
import TypingSettingModal from "./components/TypingSettingModal";

const Dialogs = () => {
  const {
    isDurationModalOpen,
    isWordCountModalOpen,
    isTypingSettingModalOpen,
  } = useDialogStore();
  return (
    <div className="font-roboto fixed z-[9999] bg-[rgba(0,0,0,.5)]">
      {isDurationModalOpen && <SetDuration />}
      {isWordCountModalOpen && <SetWordCount />}
      {isTypingSettingModalOpen && <TypingSettingModal />}
    </div>
  );
};

export default Dialogs;

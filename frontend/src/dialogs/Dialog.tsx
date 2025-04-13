import useDialogStore from "../zustand/useDialogStore";
import SetDuration from "./components/SetDuration";
import SetWordCount from "./components/SetWordCount";

const Dialogs = () => {
  const { isDurationDialogOpen, isWordCountDialogOpen } = useDialogStore();
  return (
    <div className="font-roboto fixed z-[9999] bg-[rgba(0,0,0,.5)]">
      {isDurationDialogOpen && <SetDuration />}
      {isWordCountDialogOpen && <SetWordCount />}
    </div>
  );
};

export default Dialogs;
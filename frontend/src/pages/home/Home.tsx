import useGameStore from "../../zustand/useGameStore";
import Result from "./components/Result";
import Input from "./components/TypingInput";
import TypingSetting from "./components/TypingSetting";
import "./Home.css";
const Home = () => {
  const { resultShown } = useGameStore();
  return resultShown ? (
    <main className="flex-1 flex flex-col gap-10">
      <Result />
    </main>
  ) : (
    <main className="flex-1 flex flex-col gap-10">
      <TypingSetting />
      <Input />
    </main>
  );
};

export default Home;

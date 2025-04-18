import useGameStore from "../../zustand/useGameStore";
import Result from "./components/Result";
import TypingInput from "./components/TypingInput";
import "./Home.css";

const Home = () => {
  const { resultShown } = useGameStore();
  return (
    <main className="flex-1 flex flex-col gap-10">
      {resultShown ? <Result /> : <TypingInput />}
    </main>
  );
};

export default Home;

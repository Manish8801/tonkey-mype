import Graph from "./components/Graph";
import Result from "./components/Result";
import Input from "./components/TypingInput";
import TypingSetting from "./components/TypingSetting";

const Home = () => {
  return (
    <main className="flex-1 flex flex-col gap-10">
      <Result />
      {/* <TypingSetting />
      <Input /> */}
    </main>
  );
};

export default Home;

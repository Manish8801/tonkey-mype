import Input from "./components/TypingInput";
import TypingSetting from "./components/TypingSetting";

const Home = () => {
  return (
       <main className="flex-1 flex flex-col gap-10">
      <TypingSetting />
      <Input />
    </main>
  );
};

export default Home;

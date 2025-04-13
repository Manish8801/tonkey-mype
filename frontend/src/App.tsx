import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/home/Home";
import Settings from "./pages/settings/Settings";
import Login from "./pages/login/Login";
import About from "./pages/about/About";
import Leaderboard from "./pages/leaderboard/Leaderboard";
import Footer from "./components/Footer";
import { useEffect } from "react";
import useAuthStore from "./zustand/useAuthStore";
import Profiles from "./pages/profile/Profiles";
import Dialogs from "./dialogs/Dialog";
const App = () => {
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <>
      <Dialogs />
      <div className="bg-base-primary">
        <div className="min-h-screen flex gap-10 flex-col justify-between mx-auto sm:w-[640px] md:w-3xl lg:w-5xl xl:w-7xl p-4 pt-8 ">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/profile" element={<Profiles />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default App;

import { Outlet } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { useEffect } from "react";
import useAuthStore from "./zustand/useAuthStore";
import Dialogs from "./components/dialogs/Dialog";
const App = () => {
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  return (
      <div className="bg-base-primary">
        <Dialogs />
        <div className="min-h-screen flex gap-10 flex-col justify-between mx-auto sm:w-[640px] md:w-3xl lg:w-5xl xl:w-7xl p-4 pt-8 ">
          <Header />
          <Outlet />
          <Footer />
        </div>
      </div>
  );
};

export default App;

import { Link } from "react-router-dom";
import { FaKeyboard } from "react-icons/fa";
import { FaCrown } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { FaBell } from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";
import useAuthStore from "../zustand/useAuthStore";

const Header = () => {
  const { user } = useAuthStore();

  return (
    <header className="w-full flex items-center gap-4 mx-auto">
      <Link to="/" className="logo-container flex gap-2 relative">
        <img
          src="/svgs/logo.svg"
          alt="logo"
          className="min-w-8 size-8 md:size-10"
        />
        <p className="absolute hidden md:block -top-2 left-12  font-semibold text-content-secondary text-xs">
          monkey see
        </p>
        <h1 className="hidden md:block text-2xl lg:text-[2rem] leading-8  text-content-primary font-lexend">
          monkeytype
        </h1>
      </Link>

      <div className="flex-1 flex gap-0.5 justify-between text-content-secondary">
        <div className="flex items-center ">
          <FaKeyboard className="box-content p-2 cursor-pointer ease-out duration-200 hover:text-content-primary text-xl" />
          <Link
            to="/leaderboard"
            className="p-3 ease-out duration-200 hover:text-content-primary text-xl"
          >
            <FaCrown />
          </Link>
          <Link
            to="/about"
            className="p-2 ease-out duration-200 hover:text-content-primary font-lexend font-extrabold leading-5 text-xl"
          >
            i
          </Link>
          <Link
            to="/settings"
            className="p-2 ease-out duration-200 hover:text-content-primary text-xl"
          >
            <IoSettingsSharp />
          </Link>
        </div>
        <div className="flex gap-0.5 items-center">
          <button className="p-2 cursor-pointer ease-out duration-200 hover:text-content-primary text-xl">
            <FaBell />
          </button>
          <Link
            to={user ? "/profile" : "/login"}
            className="p-2 ease-out duration-200 hover:text-content-primary text-xl"
          >
            <IoPersonSharp />
          </Link>
        </div>
      </div>
    </header>
  );
};
export default Header;

import { Link } from "react-router-dom";
import useAuthStore from "../../zustand/useAuthStore";
import { FaBell, FaCrown, FaKeyboard } from "react-icons/fa6";
import { IoPersonSharp, IoSettingsSharp } from "react-icons/io5";
import AccountButtonOptions from "./components/AccountButtonOptions";

import { FaInfo } from "react-icons/fa";
import IconButton from "./../globals/IconButton";
import NavLinkButton from "./components/NavLinkButton";
import Tooltip from "./components/Tooltip";

const Header = () => {
  const { isLoggedIn, user } = useAuthStore();
  return (
    <header className="w-full flex items-center gap-4 mx-auto">
      <Link to="/" className="logo-container flex gap-2 relative">
        <img
          src="/svgs/logo.svg"
          alt="logo"
          className="min-w-8 size-8 md:size-10"
        />
        <p className="absolute hidden md:block -top-2 left-12  font-semibold text-content-secondary text-xs">
          tonkey see
        </p>
        <h1 className="hidden md:block text-2xl lg:text-[2rem] leading-8  text-content-primary font-lexend">
          tonkeymype
        </h1>
      </Link>

      <nav className="flex-1 flex gap-0.5 justify-between text-content-secondary">
        <div className="flex items-center gap-1.5">
          <IconButton
            onClick={() => {
              console.log("Keyboard key pressed");
            }}
          >
            <FaKeyboard />
            <Tooltip title="start test" />
          </IconButton>

          <NavLinkButton to="/leaderboards">
            <FaCrown />
            <Tooltip title="leaderboards" />
          </NavLinkButton>

          <NavLinkButton to="/about">
            <FaInfo />
            <Tooltip title="about" />
          </NavLinkButton>

          <NavLinkButton to="/settings">
            <IoSettingsSharp />
            <Tooltip title="settings" />
          </NavLinkButton>
        </div>
        <div className="flex gap-1.5 items-center">
          <IconButton onClick={() => console.log("navigate notifications")}>
            <FaBell />
          </IconButton>

          <div className="group relative">
            <NavLinkButton to={isLoggedIn ? "/account" : "/login"}>
              <IoPersonSharp />
              {isLoggedIn && (
                <span className="font-roboto text-xs">{user?.fullName}</span>
              )}
            </NavLinkButton>
            {isLoggedIn && <AccountButtonOptions />}
          </div>
        </div>
      </nav>
    </header>
  );
};
export default Header;

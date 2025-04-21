import { FaSignOutAlt } from "react-icons/fa";
import { GiProgression } from "react-icons/gi";
import { IoMdSettings } from "react-icons/io";
import { IoEarth } from "react-icons/io5";
import { Link,  useNavigate } from "react-router-dom";
import useAuthStore from "../../../zustand/useAuthStore";

const AccountButtonOptions = () => {
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  
  const handleLogoutButton = async () => {
    logout();
    navigate("/login");
  };

  return (
    <ul className="absolute bg-sub-alt-color overflow-hidden bottom-0 translate-y-full right-0 group-hover:flex hidden border-base-primary rounded-xl border-6 flex-col items-stretch text-xs font-roboto">
      <li>
        <button className="w-full flex text-nowrap justify-start items-center gap-2 py-1.5 px-2.5 text-content-primary hover:bg-content-primary active:bg-content-secondary hover:text-base-secondary ease-linear">
          <GiProgression className="text-sm" />
          User stats
        </button>
      </li>
      <li>
        <button className="w-full flex text-nowrap justify-start items-center gap-2 py-1.5 px-2.5 text-content-primary hover:bg-content-primary active:bg-content-secondary hover:text-base-secondary ease-linear">
          <IoEarth className="text-sm" />
          Public profile
        </button>
      </li>
      <li>
        <button className="w-full flex text-nowrap justify-start items-center gap-2 py-1.5 px-2.5 text-content-primary hover:bg-content-primary active:bg-content-secondary hover:text-base-secondary ease-linear">
          <IoMdSettings className="text-sm" />
          Account settings
        </button>
      </li>
      <li>
        <Link
          to="/login"
          onClick={handleLogoutButton}
          className="w-full flex text-nowrap justify-start items-center gap-2 py-1.5 px-2.5 text-content-primary hover:bg-content-primary active:bg-content-secondary hover:text-base-secondary ease-linear"
        >
          <FaSignOutAlt className="text-sm" />
          Sign out
        </Link>
      </li>
    </ul>
  );
};

export default AccountButtonOptions;

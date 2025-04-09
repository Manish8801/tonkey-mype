import { MdMail } from "react-icons/md";
import { FaDonate } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa";
import { FaSheetPlastic } from "react-icons/fa6";
import { FaShieldAlt } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { FaPalette } from "react-icons/fa6";
import { FaCodeBranch } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="mt-20 flex flex-col gap-3 items-center  tracking-wide text-content-secondary">
      {/* first part */}
      <div className="flex gap-3 items-center  leading-4 text-xs font-roboto ">
        <span className="px-2 py-0.5 bg-content-secondary rounded-xs text-base-primary">
          tab
        </span>
        <span>+</span>
        <span className="px-2 py-0.5 bg-content-secondary rounded-xs text-base-primary">
          enter
        </span>
        <span>-</span>
        <span>restart test</span>
      </div>

      {/* second part */}
      <div className="flex gap-3 items-center t leading-4 text-xs font-roboto ">
        <span className="px-2 py-0.5 bg-content-secondary rounded-xs text-base-primary">
          esc
        </span>
        <span>or</span>
        <span className="px-2 py-0.5 bg-content-secondary rounded-xs text-base-primary">
          ctrl
        </span>
        <span>+</span>
        <span className="px-2 py-0.5 bg-content-secondary rounded-xs text-base-primary">
          shift
        </span>
        <span>+</span>
        <span className="px-2 py-0.5 rounded-xs bg-content-secondary text-base-primary">
          p
        </span>
        <span>-</span>
        <span>command line</span>
      </div>

      {/* third part */}
      <div className=" w-full flex items-center justify-between text-sm">
        <div className="grid lg:flex items-center grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 space-x-4">
          <div className="flex items-center gap-2 hover:text-content-primary duration-200 ease-out">
            <MdMail className="text-base" />
            contact
          </div>
          <div className="flex items-center gap-2 hover:text-content-primary duration-200 ease-out">
            <FaDonate />
            support
          </div>
          <div className="flex items-center gap-2 hover:text-content-primary duration-200 ease-out">
            <div className="tracking-tight font-extrabold">{"</>"}</div>
            github
          </div>
          <div className="flex items-center gap-2 hover:text-content-primary duration-200 ease-out">
            <FaDiscord className="text-base" />
            discord
          </div>
          <div className="flex items-center gap-2 hover:text-content-primary duration-200 ease-out">
            <div className="text-xl leading-8 font-bold">x</div>x.com
          </div>
          <div className="flex items-center gap-2 hover:text-content-primary duration-200 ease-out">
            <FaSheetPlastic />
            terms
          </div>
          <div className="flex items-center gap-2 hover:text-content-primary duration-200 ease-out">
            <FaShieldAlt />
            security
          </div>
          <div className="flex items-center gap-2 hover:text-content-primary duration-200 ease-out">
            <FaLock />
            privacy
          </div>
        </div>
        <div className="flex items-center justify-center gap-4">
          <div className="flex items-center gap-2 hover:text-content-primary duration-200 ease-out">
            <FaPalette />
            serika dark
          </div>
          <div className="flex items-center gap-2 hover:text-content-primary duration-200 ease-out">
            <FaCodeBranch />
            25.13.0
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

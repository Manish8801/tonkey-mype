import { IconType } from "react-icons/lib";
import { clsx } from "clsx";

type ButtonProps = {
  Icon?: IconType;
  isActive: boolean;
  text: string;
  onClick: () => void;
};
const Button = ({ Icon, isActive, text, onClick }: ButtonProps) => {
  const classname = clsx(
    isActive ? "text-content-main" : "hover:text-content-primary",
    "gap-1 py-2.5 flex justify-center items-center duration-200 ease-out font-semibold "
  );

  return (
    <button className={classname} onClick={() => onClick()}>
      {Icon && <Icon />}
      <span>{text}</span>
    </button>
  );
};

export default Button;

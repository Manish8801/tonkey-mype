import { PropsWithChildren } from "react";

type ButtonProps = {
  onClick: () => void;
} & PropsWithChildren;

const Button = ({ onClick, children }: ButtonProps) => {
  return (
    <button
      onClick={() => onClick()}
      className="cursor-pointer relative group duration-200 ease-in-out hover:text-content-primary"
    >
      {children}
    </button>
  );
};

export default Button;

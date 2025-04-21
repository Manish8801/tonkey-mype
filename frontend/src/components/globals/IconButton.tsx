import { PropsWithChildren } from "react";

type IconButtonProps = {
  onClick: () => void;
} & PropsWithChildren;

const IconButton = ({ onClick, children }: IconButtonProps) => {
  return (
    <button
      onClick={() => onClick()}
      className="relative group cursor-pointer px-2 hover:text-content-primary"
    >
      {children}
    </button>
  );
};

export default IconButton;

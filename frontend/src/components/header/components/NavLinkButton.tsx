import { PropsWithChildren } from "react";
import { NavLink } from "react-router-dom";

type NavLinkButtonProps = {
  to: string;
} & PropsWithChildren;

const NavLinkButton = ({ to, children }: NavLinkButtonProps) => {
  return (
    <NavLink
      to={to}
      className="relative group cursor-pointer px-2 hover:text-content-primary flex items-center justify-center gap-2"
    >
      {children}
    </NavLink>
  );
};

export default NavLinkButton;

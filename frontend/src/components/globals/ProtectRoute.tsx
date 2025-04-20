import { PropsWithChildren, useEffect } from "react";
import useAuthStore from "../../zustand/useAuthStore";
import {  useNavigate } from "react-router-dom";

type ProtectRouteProps = PropsWithChildren;

const ProtectRoute = ({ children }: ProtectRouteProps) => {
  const { isLoggedIn } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) navigate("/login", { replace: true });
  }, [isLoggedIn]);

  return <div>{children}</div>;
};

export default ProtectRoute;

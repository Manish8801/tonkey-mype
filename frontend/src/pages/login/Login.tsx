import { useNavigate } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import { useEffect } from "react";
import useAuthStore from "../../zustand/useAuthStore";

const Login = () => {
  const { isLoggedIn } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) navigate("/");
  }, [isLoggedIn]);
  return (
    <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-around gap-14 font-roboto text-content-secondary">
      <SignupForm />
      <LoginForm />
    </div>
  );
};

export default Login;

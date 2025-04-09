import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";

const Login = () => {
  return (
    <div
      className="flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-around gap-14 font-roboto text-content-secondary"
    >
      <SignupForm />
      <LoginForm />
    </div>
  );
};

export default Login;

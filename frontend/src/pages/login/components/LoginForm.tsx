import { FormEvent, useState } from "react";
import { ILoginData } from "../../../types/type";
import useAuthStore from "../../../zustand/useAuthStore";
import RiseLoader from "./../../../../node_modules/react-spinners/esm/RiseLoader";
import { IoLogInSharp } from "react-icons/io5";
import { FaCheck, FaGithub, FaGoogle } from "react-icons/fa";

const initialLoginData = {
  usernameOrEmail: "",
  password: "",
  rememberMe: false,
};

const LoginForm = () => {
  const { isLoading, login } = useAuthStore();
  const [loginData, setLoginData] = useState<ILoginData>(initialLoginData);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!loginData.usernameOrEmail && !loginData.password) return;
    login(loginData);
    setLoginData(initialLoginData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset
        className="flex flex-col gap-1 font-roboto select-none"
        disabled={isLoading}
      >
        <legend className="flex gap-2 items-center font-semibold text-xl pb-2">
          <div className="text-2xl">
            <IoLogInSharp />
          </div>
          login
        </legend>
        <div className="flex items-center justify-center gap-4">
          <button
            type="button"
            className=" bg-[rgba(0,0,0,.15)] active:bg-content-secondary flex justify-center py-2 text-content-primary w-full sm:px-12 rounded-md hover:text-base-primary hover:bg-content-primary duration-200 ease-out cursor-pointer"
          >
            <FaGoogle />
          </button>
          <button
            type="button"
            className="bg-[rgba(0,0,0,.15)] active:bg-content-secondary flex justify-center py-2 text-content-primary w-full sm:px-12 rounded-md hover:text-base-primary hover:bg-content-primary duration-200 ease-out cursor-pointer"
          >
            <FaGithub />
          </button>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-1 flex-1 bg-[rgba(0,0,0,.15)]"></div>
          <div className="text-content-primary">or</div>
          <div className="h-1 flex-1 bg-[rgba(0,0,0,.15)]"></div>
        </div>

        <div className="flex flex-col gap-2">
          <input
            autoComplete="new-email"
            className="bg-[rgba(0,0,0,0.15)] placeholder:text-content-secondary text-content-primary pl-2 py-1 rounded-md"
            placeholder="email or username"
            type="text"
            value={loginData.usernameOrEmail}
            onChange={(e) =>
              setLoginData({ ...loginData, usernameOrEmail: e.target.value })
            }
          />
          <input
            autoComplete="new-password"
            className="bg-[rgba(0,0,0,0.15)] placeholder:text-content-secondary text-content-primary pl-2 py-1 rounded-md"
            placeholder="password"
            type="password"
            value={loginData.password}
            onChange={(e) =>
              setLoginData({ ...loginData, password: e.target.value })
            }
          />
          <label htmlFor="remember-me" className="flex items-center gap-2">
            <input
              id="remember-me"
              type="checkbox"
              name="remember-me"
              className="hidden"
              onChange={(e) =>
                setLoginData({ ...loginData, rememberMe: e.target.checked })
              }
            />
            <div className="size-4.5 bg-[rgba(0,0,0,0.15)] flex items-center justify-center rounded-sm">
              {loginData.rememberMe && (
                <FaCheck className="text-content-main text-xs" />
              )}
            </div>
            rememeber me
          </label>
          <button
            type="submit"
            className="flex active:bg-content-secondary hover:text-base-primary hover:bg-content-primary gap-2 items-center justify-center font-semibold  text-content-primary w-full bg-[rgba(0,0,0,0.15)] py-1 rounded-md text-lg"
          >
            {isLoading ? (
              <div>
                <RiseLoader color="#e2b714" size={6} />
              </div>
            ) : (
              <>
                <div className="text-2xl">
                  <IoLogInSharp />
                </div>
                sign in
              </>
            )}
          </button>
          <button
            className="text-xs place-self-end border-b border-transparent hover:border-content-primary hover:text-content-primary duration-200 ease-out"
            type="button"
          >
            forgot password
          </button>
        </div>
      </fieldset>
    </form>
  );
};

export default LoginForm;

import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { ISignupData } from "../../../types/type";
import type { FormEvent } from "react";
import { ImCross } from "react-icons/im";
import { FaCheck } from "react-icons/fa";
import useAuthStore from "../../../zustand/useAuthStore";
import RiseLoader from "react-spinners/esm/RiseLoader";

const initialState: ISignupData = {
  username: "",
  fullName: "",
  email: "",
  verifyEmail: "",
  password: "",
  verifyPassword: "",
  preferences: {
    theme: "dark",
  },
};

const SignupForm = () => {
  const {
    isLoading,
    user,
    signup,
    checkUsernameAvailability,
    isUsernameAvailable,
  } = useAuthStore();
  const [signupData, setSignupData] = useState<ISignupData>(initialState);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormValid) return;
    signup(signupData);
    setSignupData(initialState);
  };

  useEffect(() => {
    if (signupData.username.length > 3) {
      (async () => {
        await checkUsernameAvailability(signupData.username);
      })();
    }
    if (
      isUsernameAvailable &&
      /^[A-Za-z\s]+$/.test(signupData.fullName) &&
      /^[^\s@]+@gmail\.com$/.test(signupData.email) &&
      signupData.email === signupData.verifyEmail &&
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!#%*?&])[A-Za-z\d@$!#%*?&]{8,}$/.test(
        signupData.password
      ) &&
      signupData.password === signupData.verifyPassword
    ) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [
    signupData,
    user,
    isUsernameAvailable,
    isFormValid,
    setIsFormValid,
    checkUsernameAvailability,
  ]);

  return (
    <form onSubmit={handleSubmit}>
      <fieldset className="flex flex-col gap-2" disabled={isLoading}>
        <legend className="flex items-center gap-4 text-xl font-semibold pb-1">
          <div className="relative">
            <div className="text-lg">
              <FaUser />
            </div>
            <div className="absolute -top-[3px] left-[15px] text-sm ">+</div>
          </div>
          register
        </legend>
        <label className="relative flex items-center sm:w-68 bg-[rgba(0,0,0,0.15)] rounded-lg ">
          <input
            onChange={(e) =>
              setSignupData({ ...signupData, fullName: e.target.value })
            }
            autoComplete="new-fullName"
            type="text"
            value={signupData.fullName}
            placeholder="fullName"
            className="outline-none flex-1  pl-2 py-1.5  placeholder:text-content-secondary text-content-primary"
          />

          {signupData.fullName.length > 3 &&
            (/^[A-Za-z\s]+$/.test(signupData.fullName) ? (
              <div className="text-green-500 p-2.5">
                <FaCheck />
              </div>
            ) : (
              <div className="text-red-500 p-2.5 group">
                <ImCross />
                <div className="hidden group-hover:block absolute -right-1/2 -top-[150%] bg-black text-white px-4 rounded-lg py-0.5 w-72">
                  Full name can only contain letters and spaces
                  <div className=" absolute bg-black size-4 rotate-45 bottom-0 left-0 translate-y-1/2 translate-x-1/2"></div>
                </div>
              </div>
            ))}
        </label>
        <label className="relative flex items-center sm:w-68 bg-[rgba(0,0,0,0.15)] rounded-lg ">
          <input
            onChange={(e) =>
              setSignupData({ ...signupData, username: e.target.value })
            }
            autoComplete="new-username"
            type="text"
            value={signupData.username}
            placeholder="username"
            className="outline-none flex-1  pl-2 py-1.5  placeholder:text-content-secondary text-content-primary"
          />

          {signupData.username.length > 3 &&
            (isUsernameAvailable ? (
              <div className="text-green-500 p-2.5">
                <FaCheck />
              </div>
            ) : (
              <div className="text-red-500 p-2.5 group">
                <ImCross />
                <div className="hidden group-hover:block absolute -right-1/2 -top-[150%] bg-black text-white px-4 rounded-lg py-0.5 w-72">
                  Username not available
                  <div className=" absolute bg-black size-4 rotate-45 bottom-0 left-0 translate-y-1/2 translate-x-1/2"></div>
                </div>
              </div>
            ))}
        </label>
        <label className="relative bg-[rgba(0,0,0,0.15)] sm:w-68 rounded-lg flex items-center">
          <input
            onChange={(e) =>
              setSignupData({ ...signupData, email: e.target.value })
            }
            autoComplete="new-email"
            type="text"
            value={signupData.email}
            placeholder="email"
            className="flex-1 outline-none pl-2 py-1.5 placeholder:text-content-secondary text-content-primary"
          />
          {signupData.email.length > 11 &&
            (/^[^\s@]+@gmail\.com$/.test(signupData.email) ? (
              <div className="text-green-500 p-2.5">
                <FaCheck />
              </div>
            ) : (
              <div className="group text-red-500 p-2.5">
                <ImCross />
                <div className="hidden group-hover:block absolute -right-1/2 -top-[150%] bg-black text-white px-4 rounded-lg py-0.5 w-72">
                  Invalid email format
                  <div className=" absolute bg-black size-4 rotate-45 bottom-0 left-0 translate-y-1/2 translate-x-1/2"></div>
                </div>
              </div>
            ))}
        </label>
        <label className="relative sm:w-68 bg-[rgba(0,0,0,0.15)] rounded-lg flex items-center">
          <input
            onChange={(e) =>
              setSignupData({ ...signupData, verifyEmail: e.target.value })
            }
            autoComplete="new-email"
            type="text"
            value={signupData.verifyEmail}
            placeholder="verify email"
            className="flex-1 outline-none pl-2 py-1.5 placeholder:text-content-secondary text-content-primary"
          />
          {signupData.verifyEmail.length > 0 &&
            (signupData.email === signupData.verifyEmail ? (
              <div className="text-green-500 p-2.5">
                <FaCheck />
              </div>
            ) : (
              <div className="group text-red-500 p-2.5">
                <ImCross />
                <div className="hidden group-hover:block absolute -right-1/2 -top-[150%] bg-black text-white px-4 rounded-lg py-0.5 w-72">
                  Email and verify email don't match
                  <div className=" absolute bg-black size-4 rotate-45 bottom-0 left-0 translate-y-1/2 translate-x-1/2"></div>
                </div>
              </div>
            ))}
        </label>
        <label className="relative sm:w-68 bg-[rgba(0,0,0,0.15)] rounded-lg flex items-center">
          <input
            onChange={(e) =>
              setSignupData({ ...signupData, password: e.target.value })
            }
            type="password"
            value={signupData.password}
            placeholder="password"
            className="flex-1 pl-2 py-1.5 outline-none placeholder:text-content-secondary text-content-primary"
          />
          {signupData.password.length > 0 &&
            (signupData.password.length > 8 &&
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!#%*?&])[A-Za-z\d@$!#%*?&]{8,}$/.test(
              signupData.password
            ) ? (
              <div className="text-green-500 p-2.5">
                <FaCheck />
              </div>
            ) : (
              <div className="group text-red-500 p-2.5">
                <ImCross />
                <div className="hidden group-hover:block absolute -right-1/2 top-0 -translate-y-full bg-black text-white px-4 rounded-lg py-0.5 w-72">
                  Password must contain at least one lowercase letter, one
                  uppercase letter, one number, and one special character{" "}
                  <div className=" absolute bg-black size-4 rotate-45 bottom-0 left-0 translate-y-1/2 translate-x-1/2"></div>
                </div>
              </div>
            ))}
        </label>
        <label className="relative sm:w-68 bg-[rgba(0,0,0,0.15)] flex items-center rounded-lg">
          <input
            onChange={(e) =>
              setSignupData({ ...signupData, verifyPassword: e.target.value })
            }
            autoComplete="off"
            type="password"
            value={signupData.verifyPassword}
            placeholder="verify password"
            className="flex-1 outline-none pl-2 py-1.5 placeholder:text-content-secondary text-content-primary"
          />
          {signupData.verifyPassword.length > 0 &&
            (signupData.password === signupData.verifyPassword ? (
              <div className="text-green-500 p-2.5">
                <FaCheck />
              </div>
            ) : (
              <div className="group text-red-500 p-2.5">
                <ImCross />
                <div className="hidden group-hover:block absolute -right-1/2 top-0 -translate-y-full bg-black text-white px-4 rounded-lg py-0.5 w-72">
                  Password don't match
                  <div className=" absolute bg-black size-4 rotate-45 bottom-0 left-0 translate-y-1/2 translate-x-1/2"></div>
                </div>
              </div>
            ))}
        </label>
        <button
          disabled={!isFormValid}
          type="submit"
          className="flex items-center justify-center gap-4 text-lg font-semibold bg-[rgba(0,0,0,0.06)] p-1 rounded-lg"
        >
          {isLoading ? (
            <div>
              <RiseLoader color="#e2b714" size={6} />
            </div>
          ) : (
            <>
              <div className="relative">
                <div className="text-lg">
                  <FaUser />
                </div>
                <div className="absolute -top-[3px] left-[15px] text-sm ">
                  +
                </div>
              </div>
              sign up
            </>
          )}
        </button>
      </fieldset>
    </form>
  );
};

export default SignupForm;

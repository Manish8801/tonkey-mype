import { create } from "zustand";
import axiosInstance from "../axios/axios";
import { ILoginData, ISignupData, IUser } from "../types/type";

type TStore = {
  isLoggedIn: boolean;
  user: null | IUser;
  isLoading: boolean;
  error: null | Error;
  isUsernameAvailable: boolean;
  checkAuth: () => Promise<void>;
  signup: (signupData: ISignupData) => Promise<void>;
  login: (loginDate: ILoginData) => Promise<void>;
  logout: () => Promise<void>;
  checkUsernameAvailability: (username: string) => Promise<void>;
};
const useAuthStore = create<TStore>()((set) => ({
  isLoggedIn: false,
  user: null,
  isLoading: false,
  error: null,
  isUsernameAvailable: false,
  checkAuth: async () => {
    try {
      set({ isLoading: true });
      const res = await axiosInstance.get("/auth/check-auth");
      const data = res.data;

      if (data.statusCode === 200) set({ user: data.result, isLoggedIn: true });
      set({ user: data.result });
    } catch (err) {
      set({ error: err as Error, isLoggedIn: false });
    } finally {
      set({ isLoading: false });
    }
  },
  checkUsernameAvailability: async (username) => {
    const res = await axiosInstance.post("/users/check-username-availability", {
      username,
    });
    if (res.data.statusCode === 200) {
      set({ isUsernameAvailable: res.data.result });
    }
  },
  signup: async (signupData) => {
    try {
      set({ isLoading: false });
      const res = await axiosInstance.post("/auth/register", signupData);
      if (res.data.statusCode === 201) {
        set({ user: res.data.result, isLoggedIn: true });
      }
    } catch (err) {
      set({ error: err as Error, isLoggedIn: false });
    } finally {
      set({ isLoading: false });
    }
  },
  login: async (loginData) => {
    try {
      set({ isLoading: true });
      // if usernameOrEmail contains @ or .com then it is email else it is username
      const isEmail =
        loginData.usernameOrEmail.includes("@") &&
        loginData.usernameOrEmail.includes(".com");

      const res = await axiosInstance.post("/auth/login", {
        [isEmail ? "email" : "username"]: loginData.usernameOrEmail,
        password: loginData.password,
        rememberMe: loginData.rememberMe,
      });
      if (res.data.statusCode === 200) {
        set({ user: res.data.result, isLoggedIn: true });
      }
    } catch (err) {
      set({ error: err as Error, isLoggedIn: false });
    } finally {
      set({ isLoading: false });
    }
  },
  logout: async () => {
    try {
      set({ isLoading: true });
      const res = await axiosInstance.post("/auth/logout");
      if (res.data.statusCode === 200) {
        set({ user: null, isLoggedIn: false });
      }
    } catch (err) {
      set({ error: err as Error, isLoggedIn: true });
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useAuthStore;

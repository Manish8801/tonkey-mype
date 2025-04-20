import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { StrictMode } from "react";
import Home from "./pages/home/Home.tsx";
import About from "./pages/about/About.tsx";
import Settings from "./pages/settings/Settings.tsx";
import Leaderboard from "./pages/leaderboard/Leaderboard.tsx";
import Login from "./pages/login/Login.tsx";
import Profile from "./pages/profile/Profile.tsx";
import ProtectRoute from "./components/globals/ProtectRoute.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "about", element: <About /> },
      { path: "settings", element: <Settings /> },
      { path: "leaderboard", element: <Leaderboard /> },
      { path: "login", element: <Login /> },
      {
        path: "profile",
        element: (
          <ProtectRoute>
            <Profile />
          </ProtectRoute>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

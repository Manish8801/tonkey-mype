import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home/Home.tsx";
import About from "./pages/about/About.tsx";
import Settings from "./pages/settings/Settings.tsx";
import Leaderboard from "./pages/leaderboard/Leaderboard.tsx";
import Login from "./pages/login/Login.tsx";
import Account from "./pages/account/Account.tsx";
import ProtectRoute from "./components/globals/ProtectRoute.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "about", element: <About /> },
      { path: "settings", element: <Settings /> },
      { path: "leaderboards", element: <Leaderboard /> },
      { path: "login", element: <Login /> },
      {
        path: "account",
        element: (
          <ProtectRoute>
            <Account />
          </ProtectRoute>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);

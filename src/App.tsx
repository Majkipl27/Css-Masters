import { useLocation, useRoutes } from "react-router-dom";
import Header from "./Layout/Header";
import LandingPage from "./Sites/LandingPage/LandingPage";
import Login from "./Sites/Auth/Login/Login";
import Register from "./Sites/Auth/Register/Register";
import ToasterComponent from "./Components/Toaster";
import Profile from "./Sites/Profile/Profile";
import Settings from "./Sites/Settings/Settings";
import PlayLandingPage from "./Sites/Play/PlayLandingPage";
import PlaylistLandingPage from "./Sites/Play/Sites/PlaylistLandingPage";
import { cloneElement } from "react";
import Play from "./Sites/Play/Play";
import { AnimatePresence } from "framer-motion";

export default function App() {
  const element = useRoutes([
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    {
      path: "/",
      element: <Header />,
      children: [
        {
          path: "/",
          element: <LandingPage />,
        },
        {
          path: "/play",
          element: <PlayLandingPage />,
        },
        {
          path: "/play/:playlistId/:challengeId",
          element: <Play />,
        },
        {
          path: "/playlist/:playlistId",
          element: <PlaylistLandingPage />,
        },
        {
          path: "/leaderboards",
          element: <h1>leaderboards</h1>,
        },
        {
          path: "/profile/:id",
          element: <Profile />,
        },
        {
          path: "/profile/settings",
          element: <Settings />,
        },
      ],
    },
    { path: "*", element: <h1>404</h1> },
  ]);

  const location = useLocation();

  if (!element) return null;

  return (
    <>
      <ToasterComponent />
      <AnimatePresence mode="wait">
        {cloneElement(element, { key: location.pathname })}
      </AnimatePresence>
    </>
  );
}

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
import { cloneElement, useEffect } from "react";
import Play from "./Sites/Play/Play";
import { AnimatePresence } from "framer-motion";
import { isMobile } from "react-device-detect";
import Logo from "./Graphics/Logo.svg";
import ErrorElement from "./Layout/ErrorElement";
import Leaderboards from "./Sites/Leaderboards/Leaderboards";
import { useAtomValue } from "jotai";
import { userAtom } from "./Atoms";
import Badges from "./Sites/Badges/Badges";

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
          path: "/badges",
          element: <Badges />,
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
          element: <Leaderboards />,
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
    { path: "*", element: <ErrorElement /> },
  ]);

  const location = useLocation();

  if (!element) return null;

  const user = useAtomValue(userAtom);

  useEffect(() => {
    let timerId: any;
    const setLastActive = async () => {
      if (user.id) {
        await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/user/lastactive`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
      }

      timerId = setInterval(() => {
        setLastActive();
      }, 5 * 60 * 1000);
    };

    setLastActive();

    return () => clearInterval(timerId);
  }, []);

  return isMobile ? (
    <div className="noMobile">
      <h1>
        This app is not available on mobile devices. Sorry for the inconvenience
      </h1>
      <img src={Logo} alt="css masters logo" />
      <h2>Css Masters Team</h2>
    </div>
  ) : (
    <>
      <ToasterComponent />
      <AnimatePresence mode="wait">
        {cloneElement(element, { key: location.pathname })}
      </AnimatePresence>
    </>
  );
}

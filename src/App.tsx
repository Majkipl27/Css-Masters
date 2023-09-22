import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./Layout/Header";
import LandingPage from "./Sites/LandingPage/LandingPage";
import Login from "./Sites/Auth/Login/Login";
import Register from "./Sites/Auth/Register/Register";
import ToasterComponent from "./Components/Toaster";
import Profile from "./Sites/Profile/Profile";
import Settings from "./Sites/Settings/Settings";
import PlayLandingPage from "./Sites/Play/PlayLandingPage";

const router = createBrowserRouter([
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
      }
    ],
  },
  { path: "*", element: <h1>404</h1> },
]);

export default function App() {
  return (
    <>
      <ToasterComponent />
      <RouterProvider router={router} />
    </>
  );
}

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./Layout/Header";
import LandingPage from "./Sites/LandingPage/LandingPage";
import Login from "./Sites/Auth/Login/Login";
import Register from "./Sites/Auth/Register/Register";
import ToasterComponent from "./Components/Toaster";

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
        element: <h1>play</h1>,
      },
      {
        path: "/leaderboards",
        element: <h1>leaderboards</h1>,
      },
      {
        path: "/login",
        element: <h1>login</h1>,
      },
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

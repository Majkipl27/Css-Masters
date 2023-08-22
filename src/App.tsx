import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./Layout/Header";
import LandingPage from "./Sites/LandingPage/LandingPage";

const router = createBrowserRouter([
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
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

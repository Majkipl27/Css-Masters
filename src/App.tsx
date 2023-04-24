import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Profile from "./Sites/Profile/Profile";
import Header from "./Layout/Header";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
    children: [
      {
        path: "/profile",
        element: <Profile />,
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

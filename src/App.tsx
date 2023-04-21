import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Profile from "./Sites/Profile/Profile";
import Frame from "./Layout/Frame";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Frame />,
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

import { Outlet } from "react-router-dom";
import Header from "./Header";

const Frame = () => {
  return (
    <div className="layout-frame">
      <Header />
      <Outlet />
    </div>
  );
};

export default Frame;

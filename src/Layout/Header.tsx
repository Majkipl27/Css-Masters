import { Outlet } from "react-router-dom";
import classes from "./Header.module.css";

const Header = () => {
  return (
    <>
    <header className={classes.header}>
      <p>CSS MASTERS</p>
    </header>
    <Outlet />
    </>
  );
};

export default Header;

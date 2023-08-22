import { Link, Outlet, NavLink } from "react-router-dom";
import Logo from "../Graphics/Logo.svg";
import classes from "./Header.module.css";
import Button from "../Components/Button";

export default function Header() {
  return (
    <>
      <header className={classes.header}>
        <div className={classes.logoSection}>
          <img src={Logo} alt="css-masters-logo" />
          <Link to={"/"}>
            <h2>Css Masters</h2>
          </Link>
        </div>
        <div className="Search">
          <h1>Tutaj zrobić szukajkę</h1>
        </div>
        <nav className={classes.nav}>
          <NavLink
            to={"/play"}
            className={({ isActive }) => (isActive ? `${classes.active}` : "")}
          >
            Play
          </NavLink>
          <NavLink
            to={"/leaderboards"}
            className={({ isActive }) => (isActive ? `${classes.active}` : "")}
          >
            Leaderboards
          </NavLink>
          <Button type="default" isLink={true} to="/login">Login</Button>
        </nav>
      </header>
      <Outlet />
    </>
  );
}

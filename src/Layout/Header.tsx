import { Link, Outlet, NavLink } from "react-router-dom";
import Logo from "../Graphics/Logo.svg";
import classes from "./Header.module.css";
import Button from "../Components/Button";
import { useAtom } from "jotai/react";
import { userAtom } from "../Atoms";
import { PersonCircle, DoorOpenFill } from "react-bootstrap-icons";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import getUserObject from "../lib/getUser";

export default function Header() {
  const [user, setUser] = useAtom(userAtom);

  useEffect(() => {
    setUser(getUserObject());
  }, []);

  function logout() {
    fetch(`${process.env.REACT_APP_API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          toast.success("Logged out successfully");
          window.location.reload();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

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
          {user.username ? (
            <>
              <NavLink to={`/profile/${user.id}`} className={classes.profile}>
                <PersonCircle />
                <p>{user.username}</p>
              </NavLink>
              <DoorOpenFill
                title="Logout"
                className={classes.logout}
                onClick={logout}
              />
            </>
          ) : (
            <Button type="default" isLink={true} to="/login">
              Login
            </Button>
          )}
        </nav>
      </header>
      <Outlet />
    </>
  );
}

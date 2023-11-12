import { Link, Outlet, NavLink } from "react-router-dom";
import Logo from "../Graphics/Logo.svg";
import classes from "./Header.module.css";
import Button from "../Components/Button";
import { useAtom } from "jotai/react";
import { userAtom } from "../Atoms";
import { DoorOpenFill } from "react-bootstrap-icons";
import { toast } from "react-hot-toast";
import { useEffect, useRef } from "react";
import getUserObject from "../lib/getUser";
import SearchBar from "../Components/SearchBar";
import AvatarComponent from "../Components/AvatarComponent";

export default function Header() {
  const [user, setUser] = useAtom(userAtom);
  const headerRef = useRef<HTMLHeadElement>(null);

  useEffect(() => {
    setUser(getUserObject());
  }, []);

  function logout() {
    fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/auth/logout`, {
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
      <header className={classes.header} ref={headerRef}>
        <div className={classes.logoSection}>
          <img src={Logo} alt="css-masters-logo" />
          <Link to="/">
            <h2>Css Masters</h2>
          </Link>
        </div>
        <SearchBar />
        <nav className={classes.nav}>
          <NavLink
            to="/play"
            className={({ isActive }) => (isActive ? `${classes.active}` : "")}
          >
            Play
          </NavLink>
          <NavLink
            to="/leaderboards"
            className={({ isActive }) => (isActive ? `${classes.active}` : "")}
          >
            Leaderboards
          </NavLink>
          {user.username ? (
            <>
              <NavLink
                to={`/profile/${user.id}`}
                className={({ isActive }) =>
                  isActive
                    ? `${classes.profile} ${classes.active}`
                    : classes.profile
                }
              >
                <AvatarComponent
                  userId={user.id}
                  userNameForAvatar={user.username}
                  size="verySmall"
                />
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

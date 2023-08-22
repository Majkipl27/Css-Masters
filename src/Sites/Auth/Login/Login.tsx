import classes from "./Login.module.css";
import { ArrowLeft } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import Input from "../../../Components/Input";
import Button from "../../../Components/Button";
import BgImage from "../Graphics/BgImage.svg";

export default function Login() {
  return (
    <div className={classes.main}>
      <Link to="/" className={classes.return}>
        <ArrowLeft />
        Back
      </Link>
      <div className={classes.loginSide}>
        <h2>Login</h2>
        <Input placeholder="Username" />
        <Input placeholder="Password" />
        <Button type="default">Login</Button>
        <p>
          New here? <Link to="/register">Create an Account!</Link>
        </p>
      </div>
      <img src={BgImage} alt="" />
    </div>
  );
}

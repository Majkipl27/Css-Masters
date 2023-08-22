import classes from "./Register.module.css";
import { ArrowLeft } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import Input from "../../../Components/Input";
import Button from "../../../Components/Button";
import BgImage from "../Graphics/BgImage.svg";

export default function Register() {
  return (
    <div className={classes.main}>
      <Link to="/" className={classes.return}>
        <ArrowLeft />
        Back
      </Link>
      <img src={BgImage} alt="" />
      <div className={classes.registerSide}>
        <h2>Register</h2>
        <Input placeholder="Username" />
        <Input placeholder="E-Mail" type="email" />
        <Input placeholder="Password" type="password" />
        <Input placeholder="Repeat Password" type="password" />
        <div className={classes.checkboxFlex}>
          <input type="checkbox" id="terms" />
          <label htmlFor="terms">I accept <Link to="/terms">Terms of serwice</Link></label>
        </div>
        <Button type="default">Register</Button>
        <p>
          GOT an account Already? <Link to="/login">Login!</Link>
        </p>
      </div>
    </div>
  );
}

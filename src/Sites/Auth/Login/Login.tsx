import classes from "./Login.module.css";
import { ArrowLeft } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import Input from "../../../Components/Input";
import Button from "../../../Components/Button";
import BgImage from "../Graphics/BgImage.svg";
import { useRef } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Login() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const login = async () => {
    if (!usernameRef.current?.value || !passwordRef.current?.value) {
      toast.error("Please provide login data!");
      return;
    }

    await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, 
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
          username: usernameRef.current?.value,
          password: passwordRef.current?.value
        })
      }
    ).then(response => {
      if (response.status === 200) {
        toast.success("Logged in!");
        navigate("/");
      } else if (response.status >= 400) {
        toast.error("Wrong username or password!");
      }
    }).catch((error) => {
      toast.error("Something went wrong!");
      console.log(error);
    });
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
      className={classes.main}
    >
      <Link to="/" className={classes.return}>
        <ArrowLeft />
        Back
      </Link>
      <div className={classes.loginSide}>
        <h2>Login</h2>
        <Input placeholder="Username" ref={usernameRef} />
        <Input placeholder="Password" type="password" ref={passwordRef} />
        <Button type="default" onClick={login}>
          Login
        </Button>
        <p>
          New here? <Link to="/register">Create an Account!</Link>
        </p>
      </div>
      <img src={BgImage} alt="" />
    </motion.div>
  );
}

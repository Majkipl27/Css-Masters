import classes from "./Register.module.css";
import { ArrowLeft } from "react-bootstrap-icons";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../../Components/Input";
import Button from "../../../Components/Button";
import BgImage from "../Graphics/BgImage.svg";
import toast from "react-hot-toast";
import { useRef } from "react";
import { motion } from "framer-motion";

export default function Register() {
  const navigate = useNavigate();

  function register() {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

    if (!usernameRef.current?.value || usernameRef.current?.value.length < 4) {
      toast.error("Please provide username longer than 3 signs!");
      return;
    }
    if (!emailRef.current?.value || !emailRegex.test(emailRef.current?.value)) {
      toast.error("Please provide valid E-Mail!");
      return;
    }
    if (!passwordRef.current?.value || passwordRef.current?.value.length < 8) {
      toast.error("Please provide at least 8 signs long password!");
      return;
    }
    if (!termsRef.current?.checked) {
      toast.error("You must accept terms of service!");
      return;
    }
    if (passwordRef.current?.value !== repeatPasswordRef.current?.value) {
      toast.error("Please provide identical passwords!");
      return;
    }

    const toastId = toast.loading("Registering...");
    fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: usernameRef.current?.value,
        email: emailRef.current?.value,
        password: passwordRef.current?.value,
      }),
    })
      .then((response) => {
        if (response.status === 201) {
          toast.success("Registered! you can now login!", {
            id: toastId,
          });
          navigate("/login");
        } else if (response.status === 403 && response.status < 500) {
          toast.error(
            "Somebody already have that username or this email was registered before!",
            {
              id: toastId,
            }
          );
        } else {
          toast.error("Something went wrong!", {
            id: toastId,
          });
        }
      })
      .catch((error) => {
        toast.error("Something went wrong!");
        console.log(error);
      });
  }

  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const repeatPasswordRef = useRef<HTMLInputElement>(null);
  const termsRef = useRef<HTMLInputElement>(null);

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
      <img src={BgImage} alt="" />
      <div className={classes.registerSide}>
        <h2>Register</h2>
        <Input placeholder="Username" ref={usernameRef} />
        <Input placeholder="E-Mail" type="email" ref={emailRef} />
        <Input placeholder="Password" type="password" ref={passwordRef} />
        <Input
          placeholder="Repeat Password"
          type="password"
          ref={repeatPasswordRef}
        />
        <div className={classes.checkboxFlex}>
          <input type="checkbox" id="terms" ref={termsRef} />
          <label htmlFor="terms">
            I accept <Link to="/terms">Terms of serwice</Link>
          </label>
        </div>
        <Button type="default" onClick={register}>
          Register
        </Button>
        <p>
          GOT an account Already? <Link to="/login">Login!</Link>
        </p>
      </div>
    </motion.div>
  );
}

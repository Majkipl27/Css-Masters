import classes from "./Button.module.css";
import { Link } from "react-router-dom";

interface ButtonProps {
  onClick?: () => void;
  type: "default" | "alt";
  isLink?: boolean;
  to?: string;
  className?: string;
  children: React.ReactNode;
  submit?: boolean
}

export default function Button({
  onClick,
  className,
  children,
  type,
  isLink,
  to,
  submit,
}: ButtonProps) {
  const link = (
    <Link
      to={to || "/"}
      className={`${type === "alt" ? classes.alt : classes.button} ${
        className || ""
      }`}
    >
      {children}
    </Link>
  );

  const button = (
    <button
      onClick={onClick}
      className={`${type === "alt" ? classes.alt : classes.button} ${
        className || ""
      }`}
      type={submit ? "submit" : "button"}
    >
      {children}
    </button>
  );

  return isLink ? link : button;
}

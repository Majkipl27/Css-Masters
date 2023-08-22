import classes from "./Input.module.css";
import { forwardRef } from "react";

interface InputProps {
    type?: string;
    placeholder: string;
    className?: string;
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default forwardRef(function Input({type, placeholder, className, value, onChange}: InputProps, ref: React.Ref<HTMLInputElement>) {
    return (
      <input
        ref={ref}
        className={`${classes.input} ${className || ""}`}
        type={type || "text"}
        placeholder={placeholder}
        defaultValue={value}
        onChange={onChange}
      />
    );
});
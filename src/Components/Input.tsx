import classes from "./Input.module.css";
import { forwardRef } from "react";

interface InputProps {
  type?: string;
  placeholder: string;
  className?: string;
  name?: string;
  value?: string;
  readonly?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default forwardRef(function Input(
  { type, placeholder, className, value, onChange, readonly, name }: InputProps,
  ref: React.Ref<HTMLInputElement>
) {
  return (
    <input
      ref={ref}
      className={`${classes.input} ${className || ""}`}
      type={type || "text"}
      placeholder={placeholder}
      name={name || ""}
      defaultValue={value}
      onChange={onChange}
      title={readonly ? `${placeholder}. (You can't change this)` : placeholder}
      readOnly={readonly}
    />
  );
});

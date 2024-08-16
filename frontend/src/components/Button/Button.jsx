import React from "react";
import "./Button.css";

export default function Button({
  text,
  className,
  action = () => null,
  type = "button",
  disabled = false,
}) {
  return (
    <button
      type={type}
      className={className}
      onClick={action}
      disabled={disabled}
    >
      {text}
    </button>
  );
}

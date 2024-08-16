import React from "react";
import "./Input.css";

export default function Input({
  className,
  placeholder,
  onClick,
  onChange,
  type = "text",
  name,
  value,
}) {
  return (
    <input
      name={name}
      className={className}
      type={type}
      placeholder={placeholder}
      onClick={onClick}
      onChange={onChange}
      autoComplete="off"
      value={value}
    />
  );
}

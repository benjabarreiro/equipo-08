import React from "react";

export default function Input({
  label,
  id,
  handler,
  value,
  type = "text",
  name = "",
}) {
  return (
    <div className="label-input">
      <label htmlFor={id}>{label}</label>
      <input
        name={name}
        type={type}
        id={id}
        value={value}
        onChange={(e) => handler(e.target.value, e.target.name)}
      />
    </div>
  );
}

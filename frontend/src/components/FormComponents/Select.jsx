import React from "react";

export default function Select({
  label,
  id,
  handler,
  multiple = false,
  children,
  name = "",
  value = "",
}) {
  return (
    <div className="label-input">
      <label htmlFor={id}>{label}</label>
      <select
        value={value}
        multiple={multiple}
        name={name || id}
        id={id}
        onChange={handler}
      >
        {children}
      </select>
    </div>
  );
}

import React from "react";

export default function Textarea({ label, id, handler, value }) {
  return (
    <div className="label-input">
      <label htmlFor={id}>{label}</label>
      <textarea
        id={id}
        value={value}
        onChange={(e) => handler(e.target.value)}
      />
    </div>
  );
}

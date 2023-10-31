import React from "react";
import "./styles.css";

export default function Input({
  title = "Titulo",
  placeholder = "escribir placeholder",
  type = "text",
  input = true,
  name,
  onChange,
  value,
  onKeyPress,
}) {
  const inputClass = `border border-black rounded-[33px] px-4`;
  return (
    <div className="flex flex-col mb-4">
      <span className="h-8 font-medium text-lg mb-4">{title}</span>
      {input ? (
        <input
          className={`h-12 ${inputClass}`}
          type={type}
          placeholder={placeholder}
          name={name}
          onChange={onChange}
          value={value}
          onKeyPress={onKeyPress}
        />
      ) : (
        <textarea
          className={`h-24 py-4 ${inputClass}`}
          name={name}
          onChange={onChange}
          value={value}
        ></textarea>
      )}
    </div>
  );
}

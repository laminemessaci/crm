import React from "react";

export default function Select({
  name,
  label,
  value,
  error = "",
  onChange,
  children,
}) {
  return (
    <div className="form-floating select-floating mb-4">
      {/* <label htmlFor={name}>{label}</label> */}
      <select
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        className={
          "form-select form-select form-select-lg" +
          (error ? " is-invalid" : "")
        }
      >
        {children}
      </select>
      <label htmlFor={name}>{label}</label>
      <p className="invalid-feedback">{error}</p>
    </div>
  );
}

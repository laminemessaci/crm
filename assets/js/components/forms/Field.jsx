import React from "react";

export default function Field({
  id,
  name,
  label,
  value,
  onChange,
  placeholder = "",
  type = "text",
  error = "",
}) {
  return (
    <div className="form-floating mb-4">
      <input
        id={id}
        type={type}
        className={"form-control" + (error ? " is-invalid" : "")}
        name={name}
        placeholder={placeholder || label}
        value={value}
        onChange={onChange}
      />
      <label htmlFor={name}>{label}</label>
      <p className="invalid-feedback">{error}</p>
    </div>
  );
}

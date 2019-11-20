import React from 'react';

export function PdsFormInput({
  input,
  label,
  type,
  name,
  placeholder,
  message,
  meta: { touched, error, warning },
  className
}) {
  const errorClass = `${(error && touched) || warning ? 'error' : ''}`;
  return (
    <div className="form-group">
      {label && <label htmlFor={name}>{label}</label>}
      <input
        {...input}
        placeholder={placeholder}
        type={type}
        className={'form-control ' + className + ' ' + errorClass}
      />
      {touched &&
        ((error && (
          <span className="text-danger">{message + ' is ' + error}</span>
        )) ||
          (warning && <span className="text-danger">{warning}</span>))}
    </div>
  );
}

export default PdsFormInput;

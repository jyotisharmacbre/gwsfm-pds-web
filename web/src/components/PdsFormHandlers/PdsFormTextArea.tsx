import React from 'react';

export function PdsFormTextArea({
  input,
  label,
  type,
  name,
  placeholder,
  rows,
  meta: { touched, error, warning },
  className,
  message
}) {
  const errorClass = `${(error && touched) || warning ? 'error' : ''}`;
  return (
    <div className="form-group">
      {label && <label htmlFor={name}>{label}</label>}
      <textarea
        {...input}
        placeholder={placeholder}
        rows={rows}
        type={type}
        className={'form-control ' + className + ' ' + errorClass}
      />
      {touched &&
        ((error && (
          <span className="text-danger">{error}</span>
        )) ||
          (warning && <span className="text-danger">{warning}</span>))}
    </div>
  );
}

export default PdsFormTextArea;

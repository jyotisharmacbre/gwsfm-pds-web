import React from 'react';

export function PdsFormInput({
  input,
  label,
  type,
  name,
  placeholder,
  currency,
  meta: { touched, error, warning },
  className,
  divPosition
}) {
  const errorClass = `${(error && touched) || warning ? 'error' : ''}`;
  return (
    <div className="form-group" style={{position: divPosition}}>
      {label && <label htmlFor={name}>{label}</label>}      
      <input
        {...input}
        placeholder={placeholder}
        type={type}
        className={'form-control ' + className + ' ' + errorClass}
      />
      {currency && <span style = {{
        position: "absolute",
        top: '39px',
        left: '8px',
        marginRight: '10px',
        fontSize: '14px',
        color: '#a9b2b5'
      }}
      >{currency}</span>}
      {touched &&
        ((error && (
          <span className="text-danger">{error}</span>
        )) ||
          (warning && <span className="text-danger">{warning}</span>))}
    </div>
  );
}

export default PdsFormInput;

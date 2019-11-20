import React from 'react';

export function PdsFormSelect({
  input,
  meta: { touched, error },
  message,
  children
}) {
  const errorClass = `${error && touched ? 'error' : ''}`;
  return (
    <React.Fragment>
      <select className={'form-control' + ' ' + errorClass} {...input}>
        {children}
      </select>

      {touched &&
        (error && (
          <span className="text-danger">{message + ' is ' + error}</span>
        ))}
    </React.Fragment>
  );
}

export default PdsFormSelect;

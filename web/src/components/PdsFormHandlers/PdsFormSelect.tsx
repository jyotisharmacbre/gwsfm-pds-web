import React from 'react';

export function PdsFormSelect({
  input,
  meta: { touched, error, warning },
  messages,
  children
}) {
  const errorClass = `${error && touched ? 'error' : ''}`;
  return (
    <React.Fragment>
      <select className={'form-control' + ' ' + errorClass} {...input}>
        {children}
      </select>

      {touched &&
        ((error && (
          <span className="text-danger">
            {messages && messages[error](input.value)}
          </span>
        )) ||
          (warning && <span className="text-danger">{warning}</span>))}
    </React.Fragment>
  );
}

export default PdsFormSelect;

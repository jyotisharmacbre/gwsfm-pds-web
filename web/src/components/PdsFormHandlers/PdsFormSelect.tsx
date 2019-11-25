import React from 'react';
import { Dropdown } from 'react-bootstrap';

export function PdsFormSelect({
  input,
  meta: { touched, error },
  message,
  children,
  DropdownCheck
}) {
  const errorClass = `${error && touched ? 'error' : ''}`;
  return (
    <React.Fragment>
      <select
        className={'form-control' + ' ' + errorClass + ' ' + DropdownCheck}
        {...input}
      >
        {children}
      </select>

      {touched && (error && <span className="text-danger">{error}</span>)}
    </React.Fragment>
  );
}

export default PdsFormSelect;

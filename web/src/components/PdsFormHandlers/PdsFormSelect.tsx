import React from 'react';
import { FormattedMessage } from 'react-intl';

export function PdsFormSelect({
  input,
  meta: { touched, error, warning },
  messages,
  messageKey,
  children,
  DropdownCheck,
  disabled
}) {
  const errorClass = `${error && touched ? 'error' : ''}`;
  
  return (
    <React.Fragment>
      <select
        className={'form-control' + ' ' + errorClass + ' ' + DropdownCheck}   
        {...input}
        disabled={disabled}
      >
        {children}
      </select>

      {touched && error && <span className="text-danger">{error}</span>}
    </React.Fragment>
  );
}

export default PdsFormSelect;

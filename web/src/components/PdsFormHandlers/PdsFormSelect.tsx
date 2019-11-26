import React from 'react';
import { FormattedMessage } from 'react-intl';

export function PdsFormSelect({
  input,
  meta: { touched, error, warning },
  messages,
  messageKey,
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

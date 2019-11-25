import React from 'react';
import { FormattedMessage } from 'react-intl';

export function PdsFormSelect({
  input,
  meta: { touched, error },
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

      {touched &&
        (error && (
          <span className="text-danger">{<FormattedMessage id={error} />}</span>
        ))}
    </React.Fragment>
  );
}

export default PdsFormSelect;

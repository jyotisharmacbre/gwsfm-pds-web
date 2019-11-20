import React from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';

export function PdsFormTextArea({
  input,
  label,
  type,
  name,
  placeholder,
  rows,
  meta: { touched, error, warning },
  className,
  message,
  intl
}) {
  const errorClass = `${(error && touched) || warning ? 'error' : ''}`;
  const _placeHolder = placeholder
    ? intl.formatMessage({ id: placeholder })
    : placeholder;
  const _message = message ? intl.formatMessage({ id: message }) : message;
  const _error = error ? intl.formatMessage({ id: error }) : error;
  return (
    <div className="form-group">
      {label && <label htmlFor={name}>{<FormattedMessage id={label} />}</label>}
      <textarea
        {...input}
        placeholder={_placeHolder}
        rows={rows}
        type={type}
        className={'form-control ' + className + ' ' + errorClass}
      />
      {touched &&
        ((error && (
          <span className="text-danger">{_message + ' is ' + _error}</span>
        )) ||
          (warning && <span className="text-danger">{warning}</span>))}
    </div>
  );
}

export default injectIntl(PdsFormTextArea);

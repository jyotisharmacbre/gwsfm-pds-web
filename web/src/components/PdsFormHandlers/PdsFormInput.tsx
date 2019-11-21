import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';

export function PdsFormInput({
  input,
  labelKey,
  type,
  name,
  placeholder,
  message,
  meta: { touched, error, warning },
  className,
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
      {labelKey && (
        <label htmlFor={name}>{<FormattedMessage id={labelKey} />}</label>
      )}
      <input
        {...input}
        placeholder={_placeHolder}
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

export default injectIntl(PdsFormInput);

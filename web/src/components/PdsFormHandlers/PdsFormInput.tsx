import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';

export function PdsFormInput({
  input,
  labelKey,
  type,
  name,
  placeholderKey,
  messageKey,
  meta: { touched, error, warning },
  className,
  intl
}) {
  const errorClass = `${(error && touched) || warning ? 'error' : ''}`;
  const _placeholder = placeholderKey
    ? intl.formatMessage({ id: placeholderKey })
    : placeholderKey;
  /*
  const _message = messageKey
    ? intl.formatMessage({ id: messageKey })
    : messageKey;
  */

  //const _error = error ? intl.formatMessage({ id: error }) : error;
  return (
    <div className="form-group">
      {labelKey && (
        <label htmlFor={name}>{<FormattedMessage id={labelKey} />}</label>
      )}
      <input
        {...input}
        placeholder={_placeholder}
        type={type}
        className={'form-control ' + className + ' ' + errorClass}
      />
      {touched &&
        ((error && (
          <span className="text-danger">{<FormattedMessage id={error} />}</span>
        )) ||
          (warning && <span className="text-danger">{warning}</span>))}
    </div>
  );
}

export default injectIntl(PdsFormInput);

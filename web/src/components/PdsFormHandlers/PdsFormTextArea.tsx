import React from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';

export function PdsFormTextArea({
  input,
  labelKey,
  type,
  name,
  placeholderKey,
  rows,
  meta: { touched, error, warning },
  className,
  messages,
  messageKey,
  intl
}) {
  const errorClass = `${(error && touched) || warning ? 'error' : ''}`;
  const _placeholder = placeholderKey
    ? intl.formatMessage({ id: placeholderKey })
    : placeholderKey;
  const _message = messageKey
    ? intl.formatMessage({ id: messageKey })
    : messageKey;
  const _error = error ? intl.formatMessage({ id: error }) : error;
  return (
    <div className="form-group">
      {labelKey && (
        <label htmlFor={name}>{<FormattedMessage id={labelKey} />}</label>
      )}
      <textarea
        {...input}
        placeholder={_placeholder}
        rows={rows}
        type={type}
        className={'form-control ' + className + ' ' + errorClass}
      />
      {touched &&
        ((error && <span className="text-danger">{error}</span>) ||
          (warning && <span className="text-danger">{warning}</span>))}
    </div>
  );
}

export default injectIntl(PdsFormTextArea);

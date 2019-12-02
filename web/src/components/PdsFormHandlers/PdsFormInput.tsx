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
  intl,
  currency,
  divPosition
}) {
  const errorClass = `${(error && touched) || warning ? 'error' : ''}`;
  const _placeholder = placeholderKey
    ? intl.formatMessage({ id: placeholderKey })
    : placeholderKey;
  return (
    <div className="form-group" style={{ position: divPosition }}>
      {labelKey && (
        <label htmlFor={name}>
          {<FormattedMessage id={labelKey} />}
          {className && className.split(' ').includes('required') ? '*' : ''}
        </label>
      )}
      <input
        {...input}
        placeholder={_placeholder}
        type={type}
        className={'form-control ' + className + ' ' + errorClass}
      />
      {currency && (
        <span
          style={{
            position: 'absolute',
            top: '39px',
            left: '8px',
            marginRight: '10px',
            fontSize: '14px',
            color: '#a9b2b5'
          }}
        >
          {currency}
        </span>
      )}
      {touched &&
        ((error && <span className="text-danger">{error}</span>) ||
          (warning && <span className="text-danger">{warning}</span>))}
    </div>
  );
}

export default injectIntl(PdsFormInput);

import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';

const PdsFormInput: React.FC = (field: any) => {
  const errorClass = `${field.meta.error && field.meta.touched ? 'error' : ''}`;

  const _placeholder = field.placeHolder
    ? field.intl.formatMessage({ id: field.placeHolder })
    : field.placeHolder;

  return (
    <div className={'form-group'}>
      {field.labelKey && (
        <label>
          {' '}
          <FormattedMessage id={field.labelKey} />
        </label>
      )}
      <input
        {...field.input}
        type={field.type}
        placeholder={_placeholder}
        className={'form-control ' + field.className + ' ' + errorClass}
      />
      {field.meta.touched && (
        <p className="text-danger">
          {<FormattedMessage id={field.meta.error} />}
        </p>
      )}
    </div>
  );
};

export default injectIntl(PdsFormInput);

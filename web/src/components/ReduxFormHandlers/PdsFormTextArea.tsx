import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';

const PdsFormTextArea: React.FC = (field: any) => {
  const _placeholder = field.placeHolder
    ? field.intl.formatMessage({ id: field.placeHolder })
    : field.placeHolder;

  const errorClass = `${field.meta.error && field.meta.touched ? 'error' : ''}`;
  return (
    <div className="form-group">
      {field.label && (
        <label>
          <FormattedMessage id={field.label} />
        </label>
      )}
      <textarea
        {...field.input}
        type={field.type}
        rows={field.rows}
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

export default injectIntl(PdsFormTextArea);

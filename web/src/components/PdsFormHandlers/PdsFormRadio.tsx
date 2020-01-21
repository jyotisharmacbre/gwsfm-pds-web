import { map } from 'lodash';
import React from 'react';
import { Field } from 'redux-form';
import { FormattedMessage } from 'react-intl';

const PdsFormRadio: React.FC = (field: any) => {
  const errorClass = `${field.meta.error && field.meta.touched ? 'error' : ''}`;
  return (
    <div className="form-group">
      {field.labelKey && (
        <label htmlFor={field.input.name}>
          {<FormattedMessage id={field.labelKey} />}
          {field.className && field.className.split(' ').includes('required') ? '*' : ''}
        </label>
      )}
      {field.data && field.data.map((data, index) => {
        return (
          <div className="form-check" key={index}>
            <input
              {...field.input}
              type="radio"
              value={data.lookupKey}     
            />
            <label className={"form-check-label" + ' ' + errorClass}>
              <FormattedMessage id={data.description} />
            </label>
          </div>
        );
      })}
      {field.meta.touched &&
        field.meta.error && (
          <span className="text-danger">{field.meta.error}</span>
        )}
    </div>
  );
};

export default PdsFormRadio;

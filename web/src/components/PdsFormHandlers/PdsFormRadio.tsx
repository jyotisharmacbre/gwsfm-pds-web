import { map } from 'lodash';
import React from 'react';
import { Field } from 'redux-form';
import { FormattedMessage } from 'react-intl';

const PdsFormRadio: React.FC = (field: any) => {
  const errorClass = `${field.meta.error && field.meta.touched ? 'error' : ''}`;
  const normalize = value => (value ? parseInt(value) : null);
  console.log(field.data, "field")
  return (
    <div className="form-group">
      {field.labelKey && (
        <label htmlFor={field.input.name}>
          {<FormattedMessage id={field.labelKey} />}
          {field.className && field.className.split(' ').includes('required') ? '*' : ''}
        </label>
      )}
      {field.data.map((data, index) => {
        return (
          <div className="form-check" key={index}>
            <Field
              name={field.input.name}
              component="input"
              type="radio"
              value={data.lookupKey}     
              normalize ={normalize}         
            />
            <label className="form-check-label">
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

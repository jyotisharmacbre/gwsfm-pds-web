import { map } from 'lodash';
import React from 'react';
import { Field } from 'redux-form';
import { FormattedMessage } from 'react-intl';

const normalize = value => (value ? parseInt(value) : null);

const PdsFormRadio: React.FC = (field: any) => {
  const errorClass = `${field.meta.error && field.meta.touched ? 'error' : ''}`;
  return (
    <div className="form-group">
      <label>
        <FormattedMessage id={field.labelKey} />
      </label>
      {field.datas.map((data, index) => {
        return (
          <div className="form-check" key={index}>
            <Field
              name={field.input.name}
              component="input"
              type="radio"
              value={data.value}
              normalize={normalize}
            />
            <label className="form-check-label">
              <FormattedMessage id={data.label} />
            </label>
          </div>
        );
      })}
      {field.meta.touched &&
        (field.meta.error && (
          <span className="text-danger">{field.meta.error}</span>
        ))}
    </div>
  );
};

export default PdsFormRadio;

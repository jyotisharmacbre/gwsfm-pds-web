import { map } from 'lodash';
import React from 'react';
import { Field } from 'redux-form';
import { FormattedMessage } from 'react-intl';

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
              name="enquiryTypeId"
              component="input"
              type="radio"
              value={data.value}
            />
            <label className="form-check-label">
              <FormattedMessage id={data.label} />
            </label>
          </div>
        );
      })}
      {field.meta.touched && (
        <p className="text-danger">
          {<FormattedMessage id={field.meta.error} />}
        </p>
      )}
    </div>
  );
};

export default PdsFormRadio;

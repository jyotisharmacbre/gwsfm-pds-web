import { map } from 'lodash';
import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';

const PdsFormSelect: React.FC = (field: any) => {
  const _placeholder = field.placeHolder
    ? field.intl.formatMessage({ id: field.placeHolder })
    : field.placeHolder;
  return (
    <div className={'form-group ' + field.className}>
      {field.labelKey && (
        <label>
          <FormattedMessage id={field.labelKey} />
        </label>
      )}
      <div className="select-wrapper">
        <select {...field.input} className="form-control">
          <option value="" disabled={true}>
            {_placeholder}
          </option>
          {map(field.datas, (data: any, i: number) => {
            const label = data.label
              ? field.intl.formatMessage({ id: data.label })
              : data.label;
            return (
              <option key={i} value={data.value}>
                {label}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

export default injectIntl(PdsFormSelect);

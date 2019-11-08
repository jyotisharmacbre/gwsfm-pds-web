import { map } from 'lodash';
import React from 'react';

const ReduxFormSelect: React.FC = (field: any) => (
  <div className={'form-group ' + field.className}>
    {field.label && <label>{field.label}</label>}
    <div className="select-wrapper">
      <select {...field.input} className="form-control">
        <option value="" disabled={true}>
          {field.placeHolder}
        </option>
        {map(field.datas, (data: any, i: number) => {
          return (
            <option key={i} value={data.value}>
              {data.label}
            </option>
          );
        })}
      </select>
    </div>
  </div>
);

export default ReduxFormSelect;

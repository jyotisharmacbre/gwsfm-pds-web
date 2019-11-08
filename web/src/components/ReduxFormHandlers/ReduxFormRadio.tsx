import { map } from 'lodash';
import React from 'react';

const ReduxFormRadio: React.FC = (field: any) => (
  <div className="form-group">
    <label>{field.label}</label>
    {map(field.datas, (data: any) => {
      return (
        <div className="form-check">
          <input
            {...field.input}
            type={field.type}
            id={data.value}
            className="form-check-label"
          />
          <label className="form-check-label">{data.label}</label>
        </div>
      );
    })}
  </div>
);

export default ReduxFormRadio;

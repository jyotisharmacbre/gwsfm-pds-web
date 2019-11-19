import React from 'react';

const PdsFormRadio: React.FC = (field: any) => {
  const errorClass = `${field.meta.error && field.meta.touched ? 'error' : ''}`;
  return (
    <div className="form-group">
      <label>{field.label}</label>
      {field.datas.map(data => {
        return (
          <div className="form-check">
            <input
              {...field.input}
              type={field.type}
              id={data.value}
              key={data.value}
              className={'form-check-label' + ' ' + errorClass}
            />
            <label className="form-check-label">{data.label}</label>
          </div>
        );
      })}
      {field.meta.touched && <p className="text-danger">{field.meta.error}</p>}
    </div>
  );
};

export default PdsFormRadio;

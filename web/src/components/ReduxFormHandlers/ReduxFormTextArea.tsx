import React from 'react';

const ReduxFormTextArea: React.FC = (field: any) => {
  const errorClass = `${field.meta.error && field.meta.touched ? 'error' : ''}`;
  return (
    <div className="form-group">
      {field.label && <label>{field.label}</label>}
      <textarea
        {...field.input}
        type={field.type}
        rows={field.rows}
        placeholder={field.placeHolder}
        className={'form-control ' + field.className + ' ' + errorClass}
      />
      {field.meta.touched && <p className="text-danger">{field.meta.error}</p>}
    </div>
  );
};

export default ReduxFormTextArea;

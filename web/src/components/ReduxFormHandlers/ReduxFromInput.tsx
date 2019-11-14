import React from 'react';

const ReduxFormInput: React.FC = (field: any) => {
  const errorClass = `${field.meta.error && field.meta.touched ? 'error' : ''}`;

  return (
    <div className={'form-group'}>
      {field.label && <label>{field.label}</label>}
      <input
        {...field.input}
        type={field.type}
        placeholder={field.placeHolder}
        className={'form-control ' + field.className + ' ' + errorClass}
      />
      {field.meta.touched && <p className="text-danger">{field.meta.error}</p>}
    </div>
  );
};

export default ReduxFormInput;

import React from 'react';

const PdsFormInput: React.FC = (field: any) => {
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
      {field.meta.touched && field.meta.error && (
        <p className="text-danger">
          {field.messages[field.meta.error](field.input.value)}
        </p>
      )}
    </div>
  );
};

export default PdsFormInput;

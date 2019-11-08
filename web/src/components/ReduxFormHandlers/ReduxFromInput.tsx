import React from 'react';

const ReduxFormInput: React.FC = (field: any) => (
  <div className="form-group">
    {field.label && <label>{field.label}</label>}
    <input
      {...field.input}
      type={field.type}
      placeholder={field.placeHolder}
      className={'form-control ' + field.className}
    />
  </div>
);

export default ReduxFormInput;

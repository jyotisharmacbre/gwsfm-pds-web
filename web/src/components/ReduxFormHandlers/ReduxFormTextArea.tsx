import React from 'react';

const ReduxFormTextArea: React.FC = (field: any) => (
  <div className="form-group">
    {field.label && <label>{field.label}</label>}
    <textarea
      {...field.input}
      type={field.type}
      rows={field.rows}
      placeholder={field.placeHolder}
      className={'form-control ' + field.className}
    />
  </div>
);

export default ReduxFormTextArea;

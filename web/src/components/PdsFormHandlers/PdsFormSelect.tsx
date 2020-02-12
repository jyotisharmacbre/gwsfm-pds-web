import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from 'redux-form';
import PdsFormInput from './PdsFormInput';
import { Validate } from '../../helpers/fieldValidations';

export function PdsFormSelect({
  input,
  meta: { touched, error, warning },
  messages,
  messageKey,
  children,
  DropdownCheck,
  disabled,
  showOtherField,
  otherFieldName
}) {
  
  const isOtherOption = input?.value === 0 && otherFieldName ? true : false;

  const errorClass = `${error && touched ? 'error' : ''}`;
  
  return (
    <React.Fragment>
      <select
        className={'form-control' + ' ' + errorClass + ' ' + DropdownCheck}   
        {...input}
        disabled={disabled}
      >
        {children}
      </select>

      {touched && error && <span className="text-danger">{error}</span>}

      {isOtherOption && 
        <Field
									name={otherFieldName}
									type="text"
									component={PdsFormInput}
									className="required"
									validate={
										[Validate.required('LABEL_OTHER'), Validate.maxLength(1000)]}
									messageKey="MESSAGE_OTHER"
									labelKey="LABEL_OTHER"
									placeholderKey="PLACEHOLDER_OTHER_NAME"
								/>
      }
    </React.Fragment>
  );
}

export default PdsFormSelect;

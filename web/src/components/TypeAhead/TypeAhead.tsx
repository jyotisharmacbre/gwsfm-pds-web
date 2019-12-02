import React from "react";
import { connect } from "react-redux";
import {
    Field
  } from 'redux-form';
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import { FormattedMessage, injectIntl } from 'react-intl';
import { Validate } from "../../helpers/fieldValidations";
import { getDynamicOther } from "../../store/DynamicsData/Action";
import { formatMessage } from "../../Translations/connectedIntlProvider";

const AdaptedTypeahead = ({ input, render, meta, labelName, className, ...rest }) => (
    <div className={'form-group'}>
      <label>
        <FormattedMessage id={labelName} />{className && className.split(' ').includes('required') ? '*' : ''}
      </label>
  <AsyncTypeahead {...input} {...rest} 
  minLength={3} 
  />
  {meta.touched &&
        ((meta.error && <span className="text-danger">{meta.error}</span>))}   
  </div>
);


const TypeAhead = ({ name, options, onSearch, DynamicsType, placeholderKey, intl,className, 
    searchText, labelName,validationKey, ...props }) => {
    function handleChange(value: any) {
        props.handleOtherFieldChange(value, DynamicsType);
      }    
 
      const _placeholder = placeholderKey
    ? formatMessage(placeholderKey)
    : placeholderKey;

    const normalizingValue = value => (value? value[0].DynamicsType : "" );

  return (
    <Field
      filterBy={() => true}
      name={name}
      component={AdaptedTypeahead}
      labelKey={option => `${option.label}`}
      options={options}
      onSearch={onSearch}
      id={DynamicsType}
      onChange={handleChange}
      validate={[
        Validate.required(validationKey),
        Validate.maxLength(1000)
      ]}
      searchText={searchText}
      placeholder={_placeholder}
      className= {className}
      labelName={labelName}
      normalize = {normalizingValue}
    />
  );
};

const mapDispatchToProps = dispatch => {
    return {
      handleOtherFieldChange: (otherText, type) =>
        dispatch(getDynamicOther(otherText, type))
    };
  };
  
  export default connect(
    null,
    mapDispatchToProps
  )(TypeAhead);


import React from 'react';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Validate } from '../../helpers/fieldValidations';
import { getDynamicOther } from '../../store/DynamicsData/Action';

const AdaptedTypeahead = ({
  input,
  render,
  meta,
  labelName,
  className,
  ...rest
}) => {
  const formatValue = () => {
    let result = '';
    result =
      input.value != ''
        ? rest.options
            .filter(option => option[rest.submitParam] == input.value)
            .slice()
        : '';
    return result;
  };

  return (
    <div className={'form-group'}>
      {labelName && (
        <label>
          <FormattedMessage id={labelName} defaultMessage={labelName} />
          {className && className.split(' ').includes('required') ? '*' : ''}
        </label>
      )}
      <AsyncTypeahead
        {...input}
        {...rest}
        minLength={3}
        defaultSelected={formatValue()}
      />
      {meta.error && meta.touched && (
        <span className="text-danger">{meta.error}</span>
      )}
    </div>
  );
};

const TypeAhead = ({
  name,
  options,
  onSearch,
  DynamicsType,
  placeholderKey,
  intl,
  className,
  searchText,
  labelName,
  validationKey,
  submitParam,
  selected,
  ...props
}) => {
  function handleChange(value: any) {
    props.handleOtherFieldChange(value, DynamicsType);
  }

  const _placeholder = placeholderKey
    ? intl.formatMessage({ id: placeholderKey })
    : placeholderKey;

  const normalizingValue = value =>
    value.length > 0 ? value[0][submitParam] : '';

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
      searchText={searchText}
      placeholder={_placeholder}
      className={className}
      labelName={labelName}
      normalize={normalizingValue}
      submitParam={submitParam}
      validate={validationKey && [Validate.required(validationKey)]}
    />
  );
};

const mapDispatchToProps = dispatch => {
  return {
    handleOtherFieldChange: (otherText, type) =>
      dispatch(getDynamicOther(otherText, type))
  };
};

export default connect(null, mapDispatchToProps)(injectIntl(TypeAhead));

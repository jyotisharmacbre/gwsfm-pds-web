import React, { useState } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import { Field } from 'redux-form';
import { Validate, alphaNumeric } from '../../helpers/fieldValidations';
import { PdsFormInput } from './PdsFormInput';
import { connect } from 'react-redux';
import { placeholder } from '@babel/types';
import { getDynamicOther } from '../../store/DynamicsData/Action';

interface IMapDispatchToProps {
  handleOtherFieldChange: (type: string, otherText: string) => void;
}

const PdsFormTHDropdown: React.FC<IMapDispatchToProps> = (props: any) => {
  const {
    onSearch,
    name,
    meta: { touched, error, warning },
    intl,
    searchText,
    options,
    placeholder,
    labelKey,
    DynamicsType
  } = props;

  function handleChange(value: any) {
    props.handleOtherFieldChange(value, DynamicsType);
  }

  return (
    <div className={'form-group'}>
      <label>
        <FormattedMessage id={labelKey} />
      </label>
      <AsyncTypeahead
        filterBy={() => true}
        name={name}
        onSearch={onSearch}
        labelKey={option => `${option.label}`}
        minLength={3}
        placeholder={placeholder}
        options={options}
        searchText={searchText}
        maxResults={50}
        onChange={handleChange}
        valueKey={option => `${option.id}`}
      />
    </div>
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
)(PdsFormTHDropdown);
// export default injectIntl(PdsFormTHDropdown);

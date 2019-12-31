import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Validate } from '../../helpers/fieldValidations';
import { getDynamicOther } from '../../store/DynamicsData/Action';
import AdaptedTypeahead from './AdaptedTypeahead';

interface IProps {
	name: any;
	DynamicsType: any;
	labelName?: any;
	submitParam?: any;
	placeholderKey?: any;
	intl: any;
	searchText?: any;
	className?: any;
	validationKey?: any;
	onSearch: (value: any, success: any, failure: any) => void;
    formatData:(value:any) => void;
    handleOtherFieldChange?:(value:any,type:any) => void;
}
const NewTypeAhead: React.FC<IProps> = (props) => {
	const [ values, setValues ] = useState<any>([]);
	
    const handleChange = (value: any) => {
		props.handleOtherFieldChange && props.handleOtherFieldChange(value, props.DynamicsType);
	}

	const onSearchValue = (value: any) => {
		props.onSearch(value, getValueSuccess, failure);
	};

	const getValueSuccess = (response: any) => {
		setValues(props.formatData(response));
	};

	const failure = (error: string) => {
	};

	const _placeholder = props.placeholderKey
		? props.intl.formatMessage({ id: props.placeholderKey })
		: props.placeholderKey;

	const normalizingValue = (value) => (value.length > 0 ? value[0][props.submitParam] : '');

	return (
		<Field
			filterBy={() => true}
			name={props.name}
			component={AdaptedTypeahead}
			labelKey={(option) => `${option.label}`}
			options={values}
			onSearch={onSearchValue}
			id={props.DynamicsType}
			onChange={handleChange}
			searchText={props.searchText}
			placeholder={_placeholder}
			className={props.className}
			labelName={props.labelName}
			normalize={normalizingValue}
			submitParam={props.submitParam}
			validate={props.validationKey && [ Validate.required(props.validationKey) ]}
		/>
	);
};

const mapDispatchToProps = (dispatch) => {
	return {
		handleOtherFieldChange: (otherText, type) => dispatch(getDynamicOther(otherText, type))
	};
};

export default connect(null, mapDispatchToProps)(injectIntl(NewTypeAhead));

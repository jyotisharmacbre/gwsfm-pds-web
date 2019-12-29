import React, { Component } from 'react';
import { Field, FieldArray, reduxForm, InjectedFormProps, FormSection, formValueSelector } from 'redux-form';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import CalculationsSummaryTable from '../../Table/CalculationsSummaryTable';
import SubContractorActivityForm from './SubContractorActivityForm';
import IReactIntl from '../../../Translations/IReactIntl';
import { ISubContractor } from '../../../store/SubContractor/Types/ISubContractor';
import { ISubContractorActivity } from '../../../store/SubContractor/Types/ISubContractorActivity';
import { IState } from '../../../store/state';
import FontawsomeSvg from '@fortawesome/fontawesome-svg-core';
import FontawsomeFree from '@fortawesome/free-solid-svg-icons';
import FontawsomeReact, { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import EventType from '../../../enums/EventType';
import { IPreliminariesComponentDetails } from '../../../store/Preliminaries/Types/IPreliminariesComponentDetails';
import { IDiscountActivity } from '../../../store/DiscountForm/Types/IDiscountActivity';

interface Props {
	projectId: string;
	onSubmitForm: (data: ISubContractor, event: EventType) => void;
	currencySymbol: string;
  preliminaryState: Array<IPreliminariesComponentDetails>;
	discountState: IDiscountActivity;
}

let SubcontractorForm: React.FC<Props & IReactIntl & InjectedFormProps<ISubContractor, Props>> = (props: any) => {
	const { handleSubmit, intl } = props;
	return (
		<form className="subcontractor_form" onSubmit={handleSubmit} noValidate={true}>
			<CalculationsSummaryTable
				data-test="calculation-summary"
				preliminary={props.preliminaryState}
				subContractor={props.subContractorForm}
				discount={props.discountState}
				currencySymbol={props.currencySymbol}
			/>
			<FieldArray
				name="activities"
				component={SubContractorActivityForm}
				intl={props.intl}
				currencySymbol={props.currencySymbol}
			/>

			<div className="mr-35 three-btn">
				<button
					className="active"
					data-test="previous-click"
					type="button"
					name="previous"
					onClick={handleSubmit((values) => props.onSubmitForm(values, EventType.previous))}
				>
					<FormattedMessage id="BUTTON_PREVIOUS" />
				</button>
				<button
					name="save"
					data-test="save-click"
					className="active ml-auto"
					type="button"
					onClick={handleSubmit((values) => props.onSubmitForm(values, EventType.save))}
				>
					<FormattedMessage id="BUTTON_SAVE" />
				</button>
				<button
					data-test="next-click"
					type="button"
					name="next"
					onClick={handleSubmit((values) => props.onSubmitForm(values, EventType.next))}
				>
					<FormattedMessage id="BUTTON_NEXT" />
				</button>
			</div>
		</form>
	);
};

const selector = formValueSelector('subContractorForm');

const mapStateToProps = (state: IState) => ({
	initialValues: state.subContractor.form,
	subContractorForm: selector(state, 'activities')
});

const form = reduxForm<ISubContractor, Props>({
	destroyOnUnmount: false,
	forceUnregisterOnUnmount: false,
	form: 'subContractorForm',
	enableReinitialize: true,
	keepDirtyOnReinitialize: true
})(injectIntl(SubcontractorForm));

export default connect(mapStateToProps)(form);

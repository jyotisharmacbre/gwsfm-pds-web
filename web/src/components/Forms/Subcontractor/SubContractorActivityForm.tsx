import React from 'react';
import { Field, FieldArray, reduxForm, InjectedFormProps, FormSection, formValueSelector } from 'redux-form';
import PdsFormInput from '../../PdsFormHandlers/PdsFormInput';
import PdsFormSelect from '../../PdsFormHandlers/PdsFormSelect';
import PdsFormTextArea from '../../PdsFormHandlers/PdsFormTextArea';
import PdsFormButton from '../../PdsFormHandlers/PdsFormButton';
import PdsFormTypeAhead from '../../PdsFormHandlers/PdsFormTypeAhead';
import Quote from './Quote';
import { ISubContractorActivity } from '../../../store/SubContractor/Types/ISubContractorActivity';
import IReactIntl from '../../../Translations/IReactIntl';
import { FormattedMessage, injectIntl } from 'react-intl';
import FontawsomeSvg from '@fortawesome/fontawesome-svg-core';
import FontawsomeFree from '@fortawesome/free-solid-svg-icons';
import FontawsomeReact, { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Validate, alphaNumeric, onlyNumber } from '../../../helpers/fieldValidations';
import { selectionButtons } from '../../../helpers/constants';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { newActivity } from '../../../store/SubContractor/InitialState';
import { connect } from 'react-redux';
import { IState } from '../../../store/state';
import { calculateSell } from '../../../helpers/formulas';

import NewTypeAhead from '../../TypeAhead/NewTypeAhead';
import { confirmAlert } from '../../Popup/CustomModalPopup';

import ValidatedNumericInput from '../../../components/NumericInput/index';
import { restrictMinus, restrictMinusAndAllowDecimal, restrictMinusAndAllowDecimalForMaxRangeHundred } from '../../../helpers/utility-helper';
interface Props {
	fields: any;
	activities: Array<ISubContractorActivity>;
	currencySymbol: string;
  intl: any;
  getListOfSubContractorData: (value: any) => Promise<any>; 
}

const SubContractorActivityForm: React.FC<Props> = (props: Props) => {
	const { fields, intl } = props;

	const formatSubcontractForTypeAhead = (data) => {
		let result: any = [];
		data.map((subcontractData: any) => {
			result.push({ label: subcontractData.name, id: subcontractData.subContractorId });
		});
		return result;
	};

	return (
		<div>
			{fields.map((member, index) => (
				<div className="row" key={index} data-test="sub-contractor-form">
					<div className="col-lg-12">
						<div className="forms_wrap">
							{fields.length > 1 ? (
								<button
									data-test="deleteactivity"
									className="delete_text"
									onClick={() =>
										confirmAlert({
											intl: props.intl,
											titleKey: 'TITLE_CONFIRMATION',
											contentKey: 'MESSAGE_SUBCONTRACTOR_DELETE_ACTIVITY',
											handleConfirm: () => fields.remove(index)
										})}
								>
									<FormattedMessage id="BUTTON_DELETE" />
									<FontAwesomeIcon className="" icon={faTrash} />
								</button>
							) : null}
							<div className="row">
								<div className="col-lg-7">
									<Field
										name={`${member}.activityName`}
										data-test="activityName"
										type="text"
										component={PdsFormInput}
										validate={[ Validate.maxLength(250) ]}
										labelKey="LABEL_ACTIVITY_NAME"
										placeholderKey="PLACEHOLDER_ACTIVITY_NAME"
									/>
									<Field
										name={`${member}.isExistingSubcontractor`}
										component={PdsFormButton}
										buttons={selectionButtons}
										labelKey="LABEL_EXISTING_SUBCONTRACTOR"
									/>
									<NewTypeAhead
										name={`${member}.subcontractorId`}
										onSearch={props.getListOfSubContractorData}
										formatData={formatSubcontractForTypeAhead}
										DynamicsType="subcontractorId"
										placeholderKey="PLACEHOLDER_SUBCONTRACTOR"
										labelName="LABEL_SUBCONTRACTOR"
										validationKey="LABEL_SUBCONTRACTOR"
										submitParam="id"
										className="required"
									/>

									{props.activities[index].subcontractorId === '0' && (
										<Field
											name={`${member}.otherSubcontractorName`}
											type="text"
											component={PdsFormInput}
											labelKey="LABEL_OTHER_SUBCONTRACTOR"
											placeholderKey="PLACEHOLDER_OTHER_SUBCONTRACTOR"
											className="required"
											validate={[Validate.required('LABEL_OTHER_SUBCONTRACTOR'), Validate.maxLength(250)]}
										/>
									)}

									<Field
										name={`${member}.isPreferredSupplier`}
										component={PdsFormButton}
										buttons={selectionButtons}
										labelKey="LABEL_PREFERRED_SUPPLIER"
									/>
									<Field
										name={`${member}.totalCost`}
										type="text"
										component={PdsFormInput}
										className="width-120 pl-20"
										validate={[ Validate.maxLength(1000), onlyNumber ]}
										currency={props.currencySymbol}
										normalize={restrictMinusAndAllowDecimal}
										divPosition="relative"
										labelKey="LABEL_TOTAL_COST"
										placeholderKey=""
									/>
									<Field
										name={`${member}.grossMargin`}
										type="text"
										component={PdsFormInput}
										className="width-120 pl-20"
										validate={[ Validate.maxLength(1000), onlyNumber ]}
										currency="%"
										normalize={restrictMinusAndAllowDecimalForMaxRangeHundred}
										divPosition="relative"
										labelKey="LABEL_GROSS_MARGIN"
										placeholderKey=""
									/>
									<Field
										name={`${member}.totalSell`}
										type="number"
										input={{
											value: calculateSell(
												props.activities[index].totalCost,
												props.activities[index].grossMargin
											),
											disabled: true
										}}
										component={PdsFormInput}
										className="width-120 pl-20"
										currency={props.currencySymbol}
										divPosition="relative"
										labelKey="LABEL_TOTAL_SELL"
										placeholderKey=""
									/>
									<Field
										labelKey="LABEL_COMMENTS"
										name={`${member}.comments`}
										rows="7"
										component={PdsFormTextArea}
										validate={[ Validate.maxLength(5000) ]}
										placeholderKey="PLACEHOLDER_ADDITIONAL_COMMENTS"
									/>
								</div>
							</div>
							<FieldArray name={`${member}.quotes`} currencySymbol = {props.currencySymbol} component={Quote} key={index} />
						</div>
					</div>
				</div>
			))}
			<div className="newActiv_btn">
				<button
					data-test="addActivity"
					name="addActivity"
					type="button"
					disabled={fields.length > 4}
					className="active"
					onClick={() => fields.push({ ...newActivity })}
				>
					<FontAwesomeIcon className="" icon={faPlusCircle} />
					<FormattedMessage id="BUTTON_NEW_ACTIVITY" />
				</button>
			</div>
		</div>
	);
};

const mapStateToProps = (state: IState) => ({
	activities: selector(state, 'activities')
});

const selector = formValueSelector('subContractorForm');

export default connect(mapStateToProps)(SubContractorActivityForm);

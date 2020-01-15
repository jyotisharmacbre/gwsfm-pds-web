import React from 'react';
import { Field, reduxForm, InjectedFormProps, FieldArray } from 'redux-form';
import { connect } from 'react-redux';
import PdsFormInput from '../../PdsFormHandlers/PdsFormInput';
import PdsFormSelect from '../../PdsFormHandlers/PdsFormSelect';
import PdsFormRadio from '../../PdsFormHandlers/PdsFormRadio';
import PdsFormTextArea from '../../PdsFormHandlers/PdsFormTextArea';
import PdsFormButton from '../../PdsFormHandlers/PdsFormButton';
import DatePicker from '../../DatePicker';
import { selectionButtons } from '../../../helpers/constants';
import { enquiryTypeData } from '../../../helpers/dropDownFormValues';
import { IState } from '../../../store/state';
import { IProjectAdditionalDetail } from '../../../store/ProjectOverviewForm/Types/IProjectAdditionalDetail';
import { getPropertyName, getDropdown, getClassNameForProjectStatus } from '../../../helpers/utility-helper';
import { LookupType } from '../../../store/Lookups/Types/LookupType';
import EventType from '../../../enums/EventType';
import FontawsomeSvg from '@fortawesome/fontawesome-svg-core';
import FontawsomeFree from '@fortawesome/free-solid-svg-icons';
import FontawsomeReact, { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CalculationsSummaryTable from '../../Table/CalculationsSummaryTable';
import {
	faCheckCircle,
	faClock,
	faExclamationTriangle,
	faUser,
	faTimes,
	faCheck,
	faDownload
} from '@fortawesome/free-solid-svg-icons';

import { projectStatusData, engagementData } from '../../../helpers/dropDownFormValues';
import { Validate, alphaNumeric } from '../../../helpers/fieldValidations';
import { FormattedMessage, injectIntl } from 'react-intl';
import IReactIntl from '../../../Translations/IReactIntl';
import TypeAhead from '../../TypeAhead/TypeAhead';
import { IDynamicsOtherSubContractor } from '../../../store/DynamicsData/Types/IDynamicData';
import ProjectStatus from '../../../enums/ProjectStatus';
import ProjectActivity from '../ProjectActivities/ProjectActivity';
import { IProjectOverviewDetails } from '../../../store/ProjectOverviewForm/Types/IProjectOverviewDetails';
import { formatMessage } from '../../../Translations/connectedIntlProvider';
import PricingSummaryTable from '../../Table/PricingSummaryTable';
import ProjectOverviewRiskForm from './ProjectOverviewRiskForm';
import { ISubContractorActivity } from '../../../store/SubContractor/Types/ISubContractorActivity';
import { IPreliminariesComponentDetails } from '../../../store/Preliminaries/Types/IPreliminariesComponentDetails';
import { IDiscountActivity } from '../../../store/DiscountForm/Types/IDiscountActivity';
import ProjectApprovalForm from './ProjectApprovalForm';
import ActivityFeedList from './ActivityFeedList';

interface Props {
	onNext: (data: IProjectOverviewDetails) => void;
	onPrevious: () => void;
	projectstatus: any;
	status: number;
	projectId: string;
	subContractorState: Array<ISubContractorActivity>;
	preliminaryState: Array<IPreliminariesComponentDetails>;
	discountState: IDiscountActivity;
	currencySymbol: string;
	lookups: any;
	getListOfUsers: (value: any) => Promise<any>;
	handleGetUserNamesForEmails: (emails: Array<string>) => void;
}

let ProjectOverviewForm: React.FC<Props & InjectedFormProps<IProjectOverviewDetails, Props>> = (props) => {
	const { handleSubmit, initialValues, getListOfUsers } = props;
	const DropdownOptions = projectStatusData.map((status: any, i: number) => (
		<option key={i} value={status.value}>
			{status.label}
		</option>
	));

	const formatUserData = (data) => {
		let returnValue: any = [];
		if (data && data.length > 0) {
			data.filter((user) => user.firstname && user.lastName).map((data: any) => {
				returnValue.push({
					label: `${data.firstname} ${data.lastName} (${data.email === null ? 'NA' : data.email})`,
					id: data.id,
					email: data.email
				});
			});
		}
		return returnValue;
	};

	const normalize = (value) => (value ? parseInt(value) : null);

	return (
		<form className="project-overview-form" noValidate={true} data-test="projectOverviewForm">
			<div className={`${getClassNameForProjectStatus(props.status)} row`}>
				<div className="col-lg-8">
					<Field
						name="projectAdditionalDetail.mainContractor"
						type="text"
						component={PdsFormInput}
						className="required"
						validate={[ Validate.required('LABEL_MAIN_CONTRACTOR') ]}
						labelKey="LABEL_MAIN_CONTRACTOR"
						placeholderKey="PLACEHOLDER_CONTRACTORS_NAME"
					/>
					<Field
						name="projectAdditionalDetail.enquiryReceivedFrom"
						data-test="enquiryReceivedFrom"
						type="text"
						component={PdsFormInput}
						className="required"
						validate={[ Validate.required('LABEL_ENQUIRY_RECEIVED_FROM'), Validate.maxLength(1000) ]}
						warn={alphaNumeric}
						labelKey="LABEL_ENQUIRY_RECEIVED_FROM"
						placeholderKey="PLACEHOLDER_ENQUIRY_SENDER_NAME"
					/>
					<div className="form-group">
						<label>
							<FormattedMessage id="LABEL_TYPE_OF_ENQUIRY" />*
						</label>
						{props.projectstatus &&
							props.projectstatus
								.filter((element) => element.lookupItem == LookupType.Enquiry_Type)
								.map((data, index) => {
									return (
										<div className="form-check" key={index}>
											<Field
												name="projectAdditionalDetail.enquiryTypeId"
												component="input"
												type="radio"
												value={+data.lookupKey}
												normalize={normalize}
											/>
											<label className="form-check-label">
												<FormattedMessage id={data.description} />
											</label>
										</div>
									);
								})}
					</div>
					<Field
						name="projectAdditionalDetail.creditCheckResult"
						data-test="creditCheckResult"
						type="text"
						component={PdsFormInput}
						className="required"
						validate={[ Validate.required('LABEL_CREDIT_CHECK_RESULT'), Validate.maxLength(1000) ]}
						warn={alphaNumeric}
						labelKey="LABEL_CREDIT_CHECK_RESULT"
						placeholderKey="PLACEHOLDER_CREDIT_CHECK_DETAILS"
					/>
					<Field
						name="projectAdditionalDetail.siteAddress"
						data-test="siteAddress"
						type="text"
						component={PdsFormInput}
						className="required"
						validate={[ Validate.required('LABEL_SITE_ADDRESS'), Validate.maxLength(1000) ]}
						labelKey="LABEL_SITE_ADDRESS"
						placeholderKey="PLACEHOLDER_ADD_SITE_ADDRESS"
					/>
					{false && (
						<Field
							className="d-none"
							name="projectAdditionalDetail.cdmNotifiable"
							data-test="cdmNotifiable"
							component={PdsFormButton}
							buttons={selectionButtons}
							labelKey="LABEL_CDMNOTIFIABLE"
						/>
					)}
					<Field
						name="projectAdditionalDetail.formOfContract"
						data-test="formOfContract"
						type="text"
						component={PdsFormInput}
						className="required"
						validate={[ Validate.required('LABEL_FORM_OF_CONTRACT'), Validate.maxLength(1000) ]}
						warn={alphaNumeric}
						labelKey="LABEL_FORM_OF_CONTRACT"
						placeholderKey="PLACEHOLDER_FORM_OF_CONTRACT"
					/>
					<Field
						name="projectAdditionalDetail.retention"
						data-test="retention"
						type="text"
						component={PdsFormInput}
						validate={[ Validate.maxLength(1000) ]}
						warn={alphaNumeric}
						labelKey="LABEL_RETENTION"
						placeholderKey="PLACEHOLDER_ADD_RETENTION"
					/>
					<Field
						name="projectAdditionalDetail.liquidatedDamages"
						data-test="liquidatedDamages"
						type="text"
						component={PdsFormInput}
						validate={[ Validate.maxLength(1000) ]}
						warn={alphaNumeric}
						labelKey="LABEL_LIQUIDATED_DAMAGES"
						placeholderKey="PLACEHOLDER_ADD_LIQUIDATED_DAMAGES"
					/>
					<Field
						name="projectAdditionalDetail.insurance"
						data-test="insurance"
						type="text"
						component={PdsFormInput}
						className="required"
						validate={[ Validate.required('LABEL_INSURANCE'), Validate.maxLength(1000) ]}
						warn={alphaNumeric}
						labelKey="LABEL_INSURANCE"
						placeholderKey="PLACEHOLDER_ADD_INSURANCE"
					/>
					<div className={'form-group'}>
						<label>
							<FormattedMessage id="LABEL_WORK_TYPE" />*
						</label>
						<div className="select-wrapper">
							<Field
								name="projectAdditionalDetail.workTypeId"
								component={PdsFormSelect}
								className="required"
								validate={[ Validate.required('MESSAGE_PROJECT_STATUS') ]}
								placeholderKey="PLACEHOLDER_WORK_TYPES"
								messageKey="MESSAGE_PROJECT_STATUS"
							>
								<FormattedMessage id="PLACEHOLDER_WORK_TYPES">
									{(message) => <option value="">{message}</option>}
								</FormattedMessage>
								{getDropdown(props.projectstatus, LookupType.Work_Type)}
							</Field>
						</div>
					</div>

					<div className="row">
						<div className="col-xl-10">
							<div className="form-group">
								<label>
									<FormattedMessage id="LABEL_PROJECT_PLAN" />
								</label>
								<div className="calender-wrap">
									<div className="row">
										<div className="col-xl-6 mt-2 position-relative manipulate-calendar">
											<DatePicker
												name="projectAdditionalDetail.commenceDate"
												data-test="commenceDate"
												className="required"
												labelKey="LABEL_COMMENCE_DATE"
											/>
										</div>
										<div className="col-xl-6 mt-2 position-relative manipulate-calendar">
											<DatePicker
												name="projectAdditionalDetail.completionDate"
												data-test="completionDate"
												className="required"
												labelKey="LABEL_COMPLETION_DATE"
											/>
										</div>
									</div>
									<div className="row">
										<div className="col-xl-12">
											<Field
												name="projectAdditionalDetail.milestones"
												data-test="milestones"
												labelKey="LABEL_PROJECTMILE_STONES"
												rows="7"
												className="required"
												validate={[ Validate.required('LABEL_PROJECTMILE_STONES') ]}
												component={PdsFormTextArea}
												placeholderKey="PLACEHOLDER_PROJECT_MILESTONES"
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="row">
						<div className="col-xl-10">
							<div className="form-group">
								<label>
									<FormattedMessage id="LABEL_PROJECT_PLAN" />
								</label>
								<div className="calender-wrap">
									<div className="row">
										<div className="col-xl-6 mt-2 position-relative manipulate-calendar">
											<DatePicker
												name="projectAdditionalDetail.firstValuationDate"
												data-test="firstValuationDate"
												className="required"
												labelKey="LABEL_FIRST_VALUATION_DATE"
											/>
										</div>
										<div className="col-xl-6 mt-2 position-relative manipulate-calendar">
											<DatePicker
												name="projectAdditionalDetail.finalAccountDate"
												data-test="finalAccountDate"
												className="required"
												labelKey="LABEL_FIRST_ACCOUNT_DATE"
											/>
										</div>
									</div>
									<div className="row">
										<div className="col-xl-12">
											<Field
												name="projectAdditionalDetail.valuationIntervals"
												data-test="valuationIntervals"
												type="text"
												className="required"
												validate={[ Validate.required('LABEL_VALUATION_INTERVALS') ]}
												component={PdsFormInput}
												labelKey="LABEL_VALUATION_INTERVALS"
												placeholderKey="PLACEHOLDER_VALUATION_INTERVALS"
											/>
										</div>
									</div>
									<div className="row">
										<div className="col-xl-12">
											<Field
												name="projectAdditionalDetail.paymentTerms"
												data-test="paymentTerms"
												type="text"
												className="required"
												validate={[ Validate.required('LABEL_PAYMENT_TERMS') ]}
												component={PdsFormInput}
												labelKey="LABEL_PAYMENT_TERMS"
												placeholderKey="PLACEHOLDER_PAYMENT_TERMS"
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					{false && (
						<Field
							name="projectAdditionalDetail.isProjectLive"
							data-test="isProjectLive"
							component={PdsFormButton}
							buttons={selectionButtons}
							labelKey="LABEL_PROJECT_IS_LIVE"
						/>
					)}
					<Field
						name="projectAdditionalDetail.comments"
						data-test="comments"
						labelKey="LABEL_COMMENTS"
						rows="7"
						component={PdsFormTextArea}
						placeholderKey="PLACEHOLDER_ADDITIONAL_COMMENTS"
					/>
				</div>
			</div>
			{/* AUTHORISED SECTION */}
			<div className={`${getClassNameForProjectStatus(props.status)} row`}>
				<div className="col-xl-6">
					<div className="authorised_form_wrap">
						<h6 className="ml-0">
							<FormattedMessage id="LABEL_PROJECT_AUTHORISED" />
						</h6>
						<div className="authorised_form_inner">
							<FieldArray
								name="projectApprovals"
								component={ProjectApprovalForm}
								formatUserData={formatUserData}
								getListOfUsers={getListOfUsers}
							/>
						</div>
					</div>
				</div>
				<div className="col-xl-6">
					<ActivityFeedList
						currencySymbol={props.currencySymbol}
						handleGetUserNamesForEmails={props.handleGetUserNamesForEmails}
					/>
				</div>
			</div>
			<div className="row">
				<div className="col-xl-12">
					<PricingSummaryTable
						data-test="pricing-summary"
						preliminary={props.preliminaryState}
						subContractor={props.subContractorState}
						discount={props.discountState}
						currencySymbol={props.currencySymbol}
					/>
					<CalculationsSummaryTable
						data-test="calculation-summary"
						preliminary={props.preliminaryState}
						subContractor={props.subContractorState}
						discount={props.discountState}
						currencySymbol={props.currencySymbol}
					/>
				</div>
			</div>
			<div className={`${getClassNameForProjectStatus(props.status)} row`}>
				<div className="col-lg-4">
					<ProjectOverviewRiskForm
						riskName="projectAdditionalDetail.projectRisk1"
						riskLabelName="LABEL_PROJECT_RISK_1"
						riskControlMeasureName="projectAdditionalDetail.projectRiskControlMeasure1"
						riskControlMeasureLabelName="LABEL_RISK_1_CONTROL_MEASURE"
					/>
				</div>
				<div className="col-lg-4">
					<ProjectOverviewRiskForm
						riskName="projectAdditionalDetail.projectRisk2"
						riskLabelName="LABEL_PROJECT_RISK_2"
						riskControlMeasureName="projectAdditionalDetail.projectRiskControlMeasure2"
						riskControlMeasureLabelName="LABEL_RISK_2_CONTROL_MEASURE"
					/>
				</div>
				<div className="col-lg-4">
					<ProjectOverviewRiskForm
						riskName="projectAdditionalDetail.projectRisk3"
						riskLabelName="LABEL_PROJECT_RISK_3"
						riskControlMeasureName="projectAdditionalDetail.projectRiskControlMeasure3"
						riskControlMeasureLabelName="LABEL_RISK_3_CONTROL_MEASURE"
					/>
				</div>
			</div>

			<div className={`${getClassNameForProjectStatus(props.status)} mr-35 three-btn`}>
				<button className="active" type="button" onClick={() => props.onPrevious()}>
					<FormattedMessage id="BUTTON_PREVIOUS" />
				</button>
				<button name="save" className="active ml-auto" data-test="save" type="button">
					<FormattedMessage id="BUTTON_SAVE" />
				</button>
				<button type="button" name="next" onClick={handleSubmit((values) => props.onNext(values))} className="">
					<FormattedMessage id="BUTTON_NEXT" />
				</button>
			</div>
		</form>
	);
};

const mapStateToProps = (state: IState) => ({
	initialValues: state.projectOverview.form,
	dynamicsOtherSubContractor: state.dynamicData.dynamicsOtherSubContractor
});

const form = reduxForm<IProjectOverviewDetails, Props>({
	destroyOnUnmount: false,
	forceUnregisterOnUnmount: false,
	form: 'projectOverviewForm',
	enableReinitialize: true
})(ProjectOverviewForm);

export default connect(mapStateToProps)(form);

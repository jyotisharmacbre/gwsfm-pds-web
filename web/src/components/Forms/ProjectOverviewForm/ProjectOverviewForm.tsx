import React, { useState } from 'react';
import { Field, reduxForm, InjectedFormProps, FieldArray } from 'redux-form';
import { connect } from 'react-redux';
import PdsFormInput from '../../PdsFormHandlers/PdsFormInput';
import PdsFormSelect from '../../PdsFormHandlers/PdsFormSelect';
import PdsFormRadio from '../../PdsFormHandlers/PdsFormRadio';
import PdsFormTextArea from '../../PdsFormHandlers/PdsFormTextArea';
import DatePicker from '../../DatePicker';
import { IState } from '../../../store/state';
import { getDropdown, getClassNameForProjectStatus, displayUserName } from '../../../helpers/utility-helper';
import { LookupType } from '../../../store/Lookups/Types/LookupType';
import EventType from '../../../enums/EventType';
import CalculationsSummaryTable from '../../Table/CalculationsSummaryTable';
import { projectStatusData} from '../../../helpers/dropDownFormValues';
import { Validate, onErrorScrollToField,allowWhitelist } from '../../../helpers/fieldValidations';
import { FormattedMessage} from 'react-intl';
import { IProjectOverviewDetails } from '../../../store/ProjectOverviewForm/Types/IProjectOverviewDetails';
import PricingSummaryTable from '../../Table/PricingSummaryTable';
import ProjectOverviewRiskForm from './ProjectOverviewRiskForm';
import { ISubContractorActivity } from '../../../store/SubContractor/Types/ISubContractorActivity';
import { IPreliminariesComponentDetails } from '../../../store/Preliminaries/Types/IPreliminariesComponentDetails';
import { IDiscountActivity } from '../../../store/DiscountForm/Types/IDiscountActivity';
import ProjectApprovalForm from './ProjectApprovalForm';
import ActivityFeedList from './ActivityFeedList';
import PostCommentForm from '../PostComment/PostCommentForm';
import { IPostCommentForm } from '../PostComment/IPostCommentForm';
import { IUserServiceData } from '../../../store/UserService/Types/IUserService';
import { CircularProgress } from '@material-ui/core';
import ErrorBoundary from '../../Error/ErrorBoundary';
interface Props {
	onNext: (data: IProjectOverviewDetails) => void;
	onPrevious: () => void;
	onSave: (data: IProjectOverviewDetails) => void;
	projectstatus: any;
	status: number;
	projectId: string;
	subContractorState: Array<ISubContractorActivity>;
	preliminaryState: Array<IPreliminariesComponentDetails>;
	discountState: IDiscountActivity;
	currencySymbol: string;
	lookups: any;
	getListOfUsers: (value: any) => Promise<any>;
	handleGetUserNamesForEmails: (emails: Array<string>) => Array<IUserServiceData>;
	getUserNamesForEmails: (emails: Array<string>) => Array<IUserServiceData>;
	postComment: (projectId: string, comment: string, success, failure) => void;
	getProjectActivities: (projectId: string) => void;
	countryCode: string;
	insuranceRate: number;
	event: EventType;
	loading: boolean;
}

let ProjectOverviewForm: React.FC<Props & InjectedFormProps<IProjectOverviewDetails, Props>> = (props) => {
	const { handleSubmit, initialValues, getListOfUsers, status } = props;
	/* istanbul ignore next */
	const formatUserData = (data) => {
		let returnValue: any = [];
		if (data && data.length > 0) {
			data.filter((user) => user.displayName).map((data: any) => {
				returnValue.push({
					label: `${displayUserName(data)} (${data.email === null ? 'NA' : data.email})`,
					id: data.id,
					email: data.email
				});
			});
		}
		return returnValue;
	};

	const [comentLoading, setCommentLoading] = useState(false);

	/* istanbul ignore next */
	const normalize = (value) => (value ? parseInt(value) : null);
	const handlePostComment = (data: IPostCommentForm) => {
		setCommentLoading(true);
		props.postComment(props.projectId, `"${data.comment}"`, handlePostCommentSuccess, handlePostCommentError);
	};
	
	/* istanbul ignore next */
	
	const handlePostCommentSuccess = (response) => {
		setCommentLoading(false);
		props.getProjectActivities(props.projectId);
	};

	/* istanbul ignore next */

	const handlePostCommentError = (error) => {
		setCommentLoading(false);
	};
	return (
		<form className="project-overview-form" noValidate={true} data-test="projectOverviewForm">
			<div className={`${getClassNameForProjectStatus(props.status)} row`}>
				<div className="col-xl-7 col-lg-9 col-md-12">
					<Field
						name="projectAdditionalDetail.mainContractor"
						type="text"
						component={PdsFormInput}
						className="required"
						validate={[Validate.required('LABEL_MAIN_CONTRACTOR'),allowWhitelist]}
						labelKey="LABEL_MAIN_CONTRACTOR"
						placeholderKey="PLACEHOLDER_CONTRACTORS_NAME"
					/>
					<Field
						name="projectAdditionalDetail.enquiryReceivedFrom"
						data-test="enquiryReceivedFrom"
						type="text"
						component={PdsFormInput}
						className="required"
						validate={[Validate.required('LABEL_ENQUIRY_RECEIVED_FROM'), Validate.maxLength(1000),allowWhitelist]}
						labelKey="LABEL_ENQUIRY_RECEIVED_FROM"
						placeholderKey="PLACEHOLDER_ENQUIRY_SENDER_NAME"
					/>
					<Field
						name="projectAdditionalDetail.enquiryTypeId"
						component={PdsFormRadio}
						data={props.projectstatus && props.projectstatus.filter((element) => element.lookupItem == LookupType.Enquiry_Type)}
						className="required"
						labelKey="LABEL_TYPE_OF_ENQUIRY"
						normalize={normalize}
						validate={[Validate.required('LABEL_TYPE_OF_ENQUIRY')]}
					/>
					<Field
						name="projectAdditionalDetail.creditCheckResult"
						data-test="creditCheckResult"
						type="text"
						component={PdsFormInput}
						className="required"
						validate={[Validate.required('LABEL_CREDIT_CHECK_RESULT'), Validate.maxLength(1000),allowWhitelist]}
						labelKey="LABEL_CREDIT_CHECK_RESULT"
						placeholderKey="PLACEHOLDER_CREDIT_CHECK_DETAILS"
					/>
					<Field
						name="projectAdditionalDetail.siteAddress"
						data-test="siteAddress"
						type="text"
						component={PdsFormInput}
						className="required"
						validate={[Validate.required('LABEL_SITE_ADDRESS'), Validate.maxLength(1000),
						allowWhitelist]}
						labelKey="LABEL_SITE_ADDRESS"
						placeholderKey="PLACEHOLDER_ADD_SITE_ADDRESS"
					/>
					<Field
						name="projectAdditionalDetail.formOfContract"
						data-test="formOfContract"
						type="text"
						component={PdsFormInput}
						className="required"
						validate={[Validate.required('LABEL_FORM_OF_CONTRACT'), Validate.maxLength(1000),
						allowWhitelist]}
						labelKey="LABEL_FORM_OF_CONTRACT"
						placeholderKey="PLACEHOLDER_FORM_OF_CONTRACT"
					/>
					<Field
						name="projectAdditionalDetail.retention"
						data-test="retention"
						type="text"
						component={PdsFormInput}
						validate={[Validate.maxLength(1000),allowWhitelist]}
						labelKey="LABEL_RETENTION"
						placeholderKey="PLACEHOLDER_ADD_RETENTION"
					/>
					<Field
						name="projectAdditionalDetail.liquidatedDamages"
						data-test="liquidatedDamages"
						type="text"
						component={PdsFormInput}
						validate={[Validate.maxLength(1000),allowWhitelist]}
						labelKey="LABEL_LIQUIDATED_DAMAGES"
						placeholderKey="PLACEHOLDER_ADD_LIQUIDATED_DAMAGES"
					/>
					<Field
						name="projectAdditionalDetail.insurance"
						data-test="insurance"
						type="text"
						component={PdsFormInput}
						className="required"
						validate={[Validate.required('LABEL_INSURANCE'), Validate.maxLength(1000),allowWhitelist]}
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
								validate={[Validate.required('MESSAGE_WORK_TYPE')]}
								placeholderKey="PLACEHOLDER_WORK_TYPES"
								messageKey="MESSAGE_WORK_TYPE"
							>
								<FormattedMessage id="PLACEHOLDER_WORK_TYPES">
									{(message) => <option value="">{message}</option>}
								</FormattedMessage>
								{getDropdown(props.projectstatus, LookupType.Work_Type)}
							</Field>
						</div>
					</div>

					<div className="row">
						<div className="col-xl-12">
							<div className="form-group">
								<label>
									<FormattedMessage id="LABEL_PROJECT_PLAN" />
								</label>
								<div className="calender-wrap">
									<div className="row">
										<div className="col-md-6 mt-2 position-relative manipulate-calendar">
											<DatePicker
												name="projectAdditionalDetail.commenceDate"
												data-test="commenceDate"
												className="required"
												labelKey="LABEL_COMMENCE_DATE"
											/>
										</div>
										<div className="col-md-6 mt-2 position-relative manipulate-calendar">
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
												validate={[Validate.required('LABEL_PROJECTMILE_STONES'),allowWhitelist]}
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
						<div className="col-xl-12">
							<div className="form-group">
								<label>
									<FormattedMessage id="LABEL_PROJECT_PLAN" />
								</label>
								<div className="calender-wrap">
									<div className="row">
										<div className="col-md-6 mt-2 position-relative manipulate-calendar">
											<DatePicker
												name="projectAdditionalDetail.firstValuationDate"
												data-test="firstValuationDate"
												className="required"
												labelKey="LABEL_FIRST_VALUATION_DATE"
											/>
										</div>
										<div className="col-md-6 mt-2 position-relative manipulate-calendar">
											<DatePicker
												name="projectAdditionalDetail.finalAccountDate"
												data-test="finalAccountDate"
												className="required"
												labelKey="LABEL_FINAL_ACCOUNT_DATE"
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
												validate={[Validate.required('LABEL_VALUATION_INTERVALS'),allowWhitelist]}
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
												validate={[Validate.required('LABEL_PAYMENT_TERMS'),allowWhitelist]}
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

					<Field
						name="projectAdditionalDetail.comments"
						data-test="comments"
						labelKey="LABEL_COMMENTS"
						rows="7"
						component={PdsFormTextArea}
						validate={[Validate.maxLength(5000),allowWhitelist]}
						placeholderKey="PLACEHOLDER_ADDITIONAL_COMMENTS"
					/>
				</div>
			</div>
			{/* AUTHORISED SECTION */}
			<div className="row">
				<div className={`${getClassNameForProjectStatus(props.status)} col-xl-6`}>

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
								status={props.status}
							/>
						</div>
					</div>
				</div>
				<div className="col-xl-6">
					<ErrorBoundary>
						<ActivityFeedList
							currencySymbol={props.currencySymbol}
							handleGetUserNamesForEmails={props.getUserNamesForEmails}
						/>
					</ErrorBoundary>
					<PostCommentForm
						postComment={handlePostComment}
						loading={comentLoading} />
				</div>
			</div>
			<div className="row">
				<div className="col-xl-12 mt-4 mt-lg-0">
					<PricingSummaryTable
						data-test="pricing-summary"
						preliminary={props.preliminaryState}
						subContractor={props.subContractorState}
						discount={props.discountState}
						currencySymbol={props.currencySymbol}
						insuranceRate={props.insuranceRate}
						countryCode={props.countryCode}
						showDiscount={true}
						showContractor={true}
						showPreliminary={true}
						showInsurance={true}
					/>
					<CalculationsSummaryTable
						data-test="calculation-summary"
						preliminary={props.preliminaryState}
						subContractor={props.subContractorState}
						discount={props.discountState}
						currencySymbol={props.currencySymbol}
						insuranceRate={props.insuranceRate}
					/>
				</div>
			</div>
			<div className="card_outer_wrap quote_wrap">
				<div className={`${getClassNameForProjectStatus(props.status)} row`}>
					<div className="col-lg-4 px-2">
						<ProjectOverviewRiskForm
							riskName="projectAdditionalDetail.projectRisk1"
							riskLabelName="LABEL_PROJECT_RISK_1"
							riskControlMeasureName="projectAdditionalDetail.projectRiskControlMeasure1"
							riskControlMeasureLabelName="LABEL_RISK_1_CONTROL_MEASURE"
						/>
					</div>
					<div className="col-lg-4 px-2">
						<ProjectOverviewRiskForm
							riskName="projectAdditionalDetail.projectRisk2"
							riskLabelName="LABEL_PROJECT_RISK_2"
							riskControlMeasureName="projectAdditionalDetail.projectRiskControlMeasure2"
							riskControlMeasureLabelName="LABEL_RISK_2_CONTROL_MEASURE"
						/>
					</div>
					<div className="col-lg-4 px-2">
						<ProjectOverviewRiskForm
							riskName="projectAdditionalDetail.projectRisk3"
							riskLabelName="LABEL_PROJECT_RISK_3"
							riskControlMeasureName="projectAdditionalDetail.projectRiskControlMeasure3"
							riskControlMeasureLabelName="LABEL_RISK_3_CONTROL_MEASURE"
						/>
					</div>
				</div>
			</div>


			<div className="hr_line mb-0 mt-5"></div>

			<div className={`${getClassNameForProjectStatus(props.status)} mr-35 three-btn`}>
				<button className="active" name="previous_button" type="button" onClick={() => props.onPrevious()}>
					<FormattedMessage id="BUTTON_PREVIOUS" />
				</button>
				<button
					name="save"
					className="active ml-auto"
					data-test="save"
					type="button"
					onClick={handleSubmit((values) => props.onSave(values))}
					disabled={(props.loading && props.event == EventType.save)}
				>
					{(props.loading && props.event == EventType.save) && <CircularProgress />}
					<FormattedMessage id="BUTTON_SAVE" />
				</button>
				<button type="button" data-test="next" name="next" onClick={handleSubmit((values) => props.onNext(values))} className=""
					disabled={(props.loading && props.event == EventType.next)}
				>
					{(props.loading && props.event == EventType.next) && <CircularProgress />}
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
	enableReinitialize: true,

	onSubmitFail: (errors: any) => 	/* istanbul ignore next */ {		
		let err = {};
		Object.keys(errors.projectAdditionalDetail).forEach((key) => {
			err['projectAdditionalDetail.' + key] = errors.projectAdditionalDetail[key];
		});

		onErrorScrollToField(err);
	}
})(ProjectOverviewForm);

export default connect(mapStateToProps)(form);

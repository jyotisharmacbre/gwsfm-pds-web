import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { match } from 'react-router-dom';
import { History } from 'history';
import CalculationsSummaryTable from '../components/Table/CalculationsSummaryTable';
import PricingSummaryTable from '../components/Table/PricingSummaryTable';
import * as actions from '../store/rootActions';
import { toast } from 'react-toastify';
import { getPropertyName, getFilterElementFromArray } from '../helpers/utility-helper';
import { IState } from '../store/state';
import ProjectSummary from '../components/Forms/ProjectForm/ProjectSummary';
import ProjectOverviewSummary from '../components/Forms/ProjectOverviewForm/ProjectOverviewSummary';
import { IProjectDetail } from '../store/CustomerEnquiryForm/Types/IProjectDetail';
import { ICurrency } from '../store/Lookups/Types/ICurrency';
import Currency from '../store/Lookups/InitialState/Currency';
import { ISubContractorActivity } from '../store/SubContractor/Types/ISubContractorActivity';
import { IPreliminariesComponentDetails } from '../store/Preliminaries/Types/IPreliminariesComponentDetails';
import { IDiscountActivity } from '../store/DiscountForm/Types/IDiscountActivity';
import { ILookup } from '../store/Lookups/Types/ILookup';
import { LookupType } from '../store/Lookups/Types/LookupType';
import { IProjectOverviewDetails } from '../store/ProjectOverviewForm/Types/IProjectOverviewDetails';
import QueryPopup from '../components/Popup/QueryPopup';
import { FormattedMessage } from 'react-intl';
import { IUserServiceData } from '../store/UserService/Types/IUserService';
import ActivityFeedList from '../components/Forms/ProjectOverviewForm/ActivityFeedList';
import EventType from '../enums/EventType';
import IReactIntl from '../Translations/IReactIntl';
import { formatMessage } from '../Translations/connectedIntlProvider';
import { IAdminDefaults } from '../store/Admin/Types/IAdminDefault';
import { ICountry } from '../store/Lookups/Types/ICountry';
import { ICountryHoc, countryHoc } from '../hoc/CountryHoc';
import { insuranceRateHoc, IInsuranceRateHoc } from '../hoc/InsuranceRateHoc';
import { IDynamicBusinessUnits, IDynamicsDivision } from '../store/DynamicsData/Types/IDynamicData';
import { getDisplayEmail } from '../helpers/auth-helper';
import { ProjectSignOffStatus } from '../store/ProjectOverviewForm/Types/ProjectApprovalEnums';
import ProjectStatus from '../enums/ProjectStatus';
import ErrorType from '../enums/ErrorType';
import { IProjectApprovals } from '../store/ProjectOverviewForm/Types/IProjectApprovals';

interface IProps {
	match: match<{ projectId: string }>;
	intl: any;
}

interface IMapStateToProps {
	history: History;
	projectStatus: Array<ILookup>;
	project: IProjectDetail;
	projectOverview: IProjectOverviewDetails;
	subContractorState: Array<ISubContractorActivity>;
	preliminaryState: Array<IPreliminariesComponentDetails>;
	discountState: IDiscountActivity;
	currencies: Array<ICurrency> | null;
	userNamesForEmails: Array<IUserServiceData>;
	initialStateSetForProjectApprovals: boolean;
	lookups: Array<ILookup>;
	adminDefaultValues: Array<IAdminDefaults>;
	countries: Array<ICountry> | null;
	getListOfDivisions: Array<IDynamicsDivision>;
	getListOfBusinessUnit: Array<IDynamicBusinessUnits>;
}

interface IMapDispatchToProps {
	getSubContractor: (projectId: string) => void;
	getPreliminaryDetails: (projectId: string) => void;
	getDiscountData: (projectId: string) => void;
	getAllCurrencies: () => void;
	getProjectDetail: (projectId: string) => void;
	getAdditionalDetails: (projectId: string) => void;
	getProjectStatus: () => void;
	handleGetUserNamesForEmails: (emails: Array<string>) => Array<IUserServiceData>;
	getUserNamesForEmails: (emails: Array<string>) => Array<IUserServiceData>;
	getLookups: () => void;
	getProjectActivities: (projectId: string) => void;
	queryAdd: (projectId: string, formValue: string, event: EventType) => void;
	getProjectParameters: (countryId: number) => void;
	getAllCountries: () => void;
	getDynamicsListOfDivision: () => void;
	getListOfBusinessUnits: () => void;
}

const lookupKeyList: string[] = [
	LookupType.Project_Approval_Range,
	LookupType.Project_Approval_Sign_Off_Status,
	LookupType.Project_Approver_Type
];

const ReviewApprove: React.FC<IProps & IMapStateToProps & IMapDispatchToProps & ICountryHoc & IInsuranceRateHoc> = (
	props
) => {
	const CurrencyObj = new Currency();
	const [currencySymbol, setCurrencySymbol] = useState<string>('');
	const projectId = props.match.params.projectId;
	const [showQueryPopup, setShowQueryPopup] = useState<boolean>(false);
	const [showQueryApproveButton, setShowQueryApproveButton] = useState<boolean>(true);
	const [renderReviewApprove, setRenderReviewApprove] = useState<boolean>(false);

	useEffect(() => {
		window.scrollTo(0, 0);
		props.getAdditionalDetails(projectId);
		props.getAllCurrencies();
		props.getProjectStatus();
		props.getProjectDetail(projectId);
		props.getSubContractor(projectId);
		props.getPreliminaryDetails(projectId);
		props.getDiscountData(projectId);
		props.getLookups();
		props.getProjectActivities(projectId);
		props.getAllCountries();
	}, []);

	useEffect(
		() => {
			if (props.project.currencyId > 0 && props.currencies) {
				setCurrencySymbol(
					getFilterElementFromArray(
						props.currencies,
						getPropertyName(CurrencyObj, (prop) => prop.currencyId),
						props.project.currencyId,
						getPropertyName(CurrencyObj, (prop) => prop.currencySymbol)
					)
				);
			}
		},
		[props.project.currencyId, props.currencies]
	);
	useEffect(
		() => {
			if (props.project.countryId > 0) props.getProjectParameters(props.project.countryId);
		},
		[props.project.countryId]
	);

	// Redirect page to unauthorised page in case of approver status is pending
	useEffect(
		() => {
			if (props.projectOverview.projectId !== '' && props.project.projectId !== '') {
				let email = getDisplayEmail();
				let loggedInApprover = props.projectOverview.projectApprovals.find(x => x.userId?.toLowerCase() === email.toLowerCase());
				if (props.projectOverview.projectApprovals.length === 0 || !loggedInApprover) {
					redirect('Error', ErrorType.unauthorised);
					return;
				}
				handleInvalidApproverAction(loggedInApprover);
			}
		},
		[props.projectOverview, props.project]
	);

	const handleInvalidApproverAction = (loggedInApprover: IProjectApprovals) => {
		let message = "";
		setRenderReviewApprove(true);
		let isReviewRequestApproved = loggedInApprover?.approvalStatus === ProjectSignOffStatus.Approved;
		let isReviewRequestPending = loggedInApprover?.approvalStatus === ProjectSignOffStatus.Pending;
		let isReviewRequestInDraft = loggedInApprover?.approvalStatus === ProjectSignOffStatus.Draft;

		let isProjectInReview = parseInt(props.project.status.toString()) === ProjectStatus.InReview;

		if (isReviewRequestApproved) message = formatMessage('MESSAGE_ALREADY_APPROVED');
		if (isReviewRequestInDraft) message = formatMessage('MESSAGE_NOT_IN_REVIEW');

		if (!(isReviewRequestPending && isProjectInReview)) {
			handleApproveUnauthorizedError(message);
		}
	}

	const redirect = (module: string, errorType: ErrorType) => {
		return props.history.push({
			pathname: `/${module}`,
			state: {
				type: errorType
			}
		});
	};

	/* istanbul ignore next */
	const handleApproval = () => {
		actions.projectApprove(props.match.params.projectId, handleApprovalSuccess, handleApprovalError);
	};
	/* istanbul ignore next */
	const handleApprovalSuccess = (data) => {
		toast.success(formatMessage('MESSAGE_SUCCESSFUL_APPROVED'));
		props.history.push('/');
	};
	/* istanbul ignore next */
	const handleApprovalError = (data) => {
		toast.error(formatMessage('MESSAGE_ERROR'));
	};
	/* istanbul ignore next */
	const handleQuerySuccess = (data) => {
		toast.success(formatMessage('MESSAGE_QUERY_SUCCESS'));
		props.history.push('/');
	};
	/* istanbul ignore next */
	const handleQueryError = (data) => {
		toast.error(formatMessage('MESSAGE_ERROR'));
	};
	/* istanbul ignore next */
	const handleQuerySave = (data: string) => {
		actions.postQuery(props.match.params.projectId, data, handleQuerySuccess, handleQueryError);
	};
	/* istanbul ignore next */
	const actionEditBtn = () => {
		props.history.push(`/Project/${props.match.params.projectId}`);
	}
	/* istanbul ignore next */
	const actionEditBtnOverview = () => {
		props.history.push(`/ProjectOverview/${props.match.params.projectId}`);
	}
	/* istanbul ignore next */
	const handleQueryCancel = () => { setShowQueryPopup(false); }

	const handleApproveUnauthorizedError = (message: string) => {
		if (showQueryApproveButton) {
			toast.warn(message);
			setShowQueryApproveButton(false);
		}
	}

	return (
		<React.Fragment>
			{
				renderReviewApprove &&
				<div className="container-fluid" data-test="review-approve-component">
					{showQueryPopup && (
						<QueryPopup
							intl={props.intl}
							handleConfirm={handleQuerySave}
							handleCancel={handleQueryCancel}
							titleKey={<FormattedMessage id="TITLE_QUERY" />}
							subTitleKey={<FormattedMessage id="SUB_TITLE_QUERY" />}
							contentKey={<FormattedMessage id="PLACEHOLDER_QUERY" />}
						/>
					)}
					<div className="row">
						<div className="col-lg-12">
							<div className="custom-wrap">
								<div className="heading-subtitle">
									<h1>
										<FormattedMessage id="LABEL_REVIEW_APPROVE" />
									</h1>
								</div>
								<ProjectSummary
									oneditclick={actionEditBtn}
									project={props.project}
									lookUpData={props.projectStatus}
									currencySymbol={currencySymbol}
									userNamesForEmails={props.userNamesForEmails}
									handleGetUserNamesForEmails={props.handleGetUserNamesForEmails}
									listOfDivisions={props.getListOfDivisions}
									listOfBusinessUnits={props.getListOfBusinessUnit}
								/>
								<ProjectOverviewSummary
									oneditOverview={actionEditBtnOverview}
									projectOverview={props.projectOverview}
									lookUpData={props.projectStatus}
								/>
								<div className="row">
									<div className="col-xl-9">
										<PricingSummaryTable
											data-test="pricing-summary"
											preliminary={props.preliminaryState}
											subContractor={props.subContractorState}
											discount={props.discountState}
											currencySymbol={currencySymbol}
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
											currencySymbol={currencySymbol}
											insuranceRate={props.insuranceRate}
										/>
									</div>
								</div>
								<div className="row">
									<div className="col-xl-12">
										<ActivityFeedList
											data-test="activity-feed-list"
											currencySymbol={currencySymbol}
											handleGetUserNamesForEmails={props.getUserNamesForEmails}
										/>
									</div>
								</div>
								<div className="two-side-btn pt-2">
									<button data-test="btnQuery" type="button" onClick={() => setShowQueryPopup(true)} hidden={!showQueryApproveButton}>
										<FormattedMessage id="BUTTON_QUERY" />
									</button>
									<button data-test="btnApprove" type="button" name="next" onClick={handleApproval} hidden={!showQueryApproveButton}>
										<FormattedMessage id="BUTTON_APPROVE" />
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			}
		</React.Fragment>
	);
};

const mapStateToProps = (state: IState) => ({
	projectStatus: state.lookup.projectstatus,
	project: state.project.form,
	subContractorState: state.subContractor.form.activities,
	preliminaryState: state.preliminary.preliminaryDetails,
	discountState: state.discount.form,
	currencies: state.lookup.currencies,
	projectOverview: state.projectOverview.form,
	userNamesForEmails: state.userService.userServiceData,
	lookups: state.lookup.lookups,
	initialStateSetForProjectApprovals: state.projectOverview.initialStateSetForProjectApprovals,
	adminDefaultValues: state.admin.adminDefaultValues,
	countries: state.lookup.countries,
	getListOfDivisions: state.dynamicData.dynamicsListOfDivision,
	getListOfBusinessUnit: state.dynamicData.dynamicsListOfBusinessUnits
});

const mapDispatchToProps = (dispatch) => {
	return {
		getProjectStatus: () => dispatch(actions.getProjectStatus()),
		getSubContractor: (projectId: string) => dispatch(actions.getSubContractor(projectId)),
		getPreliminaryDetails: (projectId: string) => dispatch(actions.getPreliminaryDetails(projectId)),
		getDiscountData: (projectId: string) => dispatch(actions.getDiscountData(projectId)),
		getAllCurrencies: () => dispatch(actions.getAllCurrencies()),
		getProjectDetail: (projectId) => dispatch(actions.getProjectDetail(projectId)),
		getAdditionalDetails: (projectId) => dispatch(actions.getAdditionalDetails(projectId)),
		handleGetUserNamesForEmails: (emails: Array<string>) => dispatch(actions.getUserNamesForEmailsService(emails)),
		getUserNamesForEmails: (emails: Array<string>) => dispatch(actions.getNamesForEmailActivitiesFeed(emails)),
		getLookups: () => dispatch(actions.getLookupsByLookupItems(lookupKeyList)),
		getProjectActivities: (projectId) => dispatch(actions.getProjectActivities(projectId)),
		getProjectParameters: (countryId: number) => dispatch(actions.getProjectParameters(countryId)),
		getAllCountries: () => dispatch(actions.getAllContries()),
		getDynamicsListOfDivision: () => dispatch(actions.getListOfDivision()),
		getListOfBusinessUnits: () => dispatch(actions.getListOfBusinessUnits())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(countryHoc(insuranceRateHoc(ReviewApprove)));

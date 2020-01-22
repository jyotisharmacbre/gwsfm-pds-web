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

interface IProps {
	match: match<{ projectId: string }>;
	history: History;
	intl: any;
}

interface IMapStateToProps {
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
}

interface IMapDispatchToProps {
	getSubContractor: (projectId: string) => void;
	getPreliminaryDetails: (projectId: string) => void;
	getDiscountData: (projectId: string) => void;
	getAllCurrencies: () => void;
	getProjectDetail: (projectId: string) => void;
	getAdditionalDetails: (projectId: string) => void;
	getProjectStatus: () => void;
	handleGetUserNamesForEmails: (emails: Array<string>) => void;
	getLookups: () => void;
	getProjectActivities: (projectId: string) => void;
	queryAdd: (projectId: string, formValue: string, event: EventType) => void;
	getProjectParameters: (countryId: number) => void;
	getAllCountries: () => void;
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
	const [ currencySymbol, setCurrencySymbol ] = useState<string>('');
	const projectId = props.match.params.projectId;
	const [ showQueryPopup, setShowQueryPopup ] = useState<boolean>(false);
	useEffect(() => {
		window.scrollTo(0, 0);
		props.getAllCurrencies();
		props.getProjectStatus();
		props.getAdditionalDetails(projectId);
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
		[ props.project.currencyId, props.currencies ]
	);
	useEffect(
		() => {
			if (props.project.countryId > 0) props.getProjectParameters(props.project.countryId);
		},
		[ props.project.countryId ]
	);

	const redirect = (module: string) => {
		return props.history.push(`/${module}/${props.match.params.projectId}`);
	};

	const handleApproval = () => {
		actions.projectApprove(props.match.params.projectId, handleApprovalSuccess, handleApprovalError);
	};

	const handleApprovalSuccess = (data) => {
		toast.success(formatMessage('MESSAGE_SUCCESSFUL_APPROVED'));
		props.history.push('/');
	};

	const handleApprovalError = (data) => {
		toast.error(formatMessage('MESSAGE_ERROR'));
	};
	const handleQuerySuccess = (data) => {
		toast.success(formatMessage('MESSAGE_QUERY_SUCCESS'));
		props.history.push('/');
	};
	const handleQueryError = (data) => {
		toast.error(formatMessage('MESSAGE_ERROR'));
	};
	const handleQuerySave = (data: string) => {
		actions.postQuery(props.match.params.projectId, data, handleQuerySuccess, handleQueryError);
	};
	return (
		<div className="container-fluid" data-test="review-approve-component">
			{showQueryPopup && (
				<QueryPopup
					intl={props.intl}
					handleConfirm={handleQuerySave}
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
							project={props.project}
							lookUpData={props.projectStatus}
							currencySymbol={currencySymbol}
							userNamesForEmails={props.userNamesForEmails}
							handleGetUserNamesForEmails={props.handleGetUserNamesForEmails}
						/>
						<ProjectOverviewSummary
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
									handleGetUserNamesForEmails={props.handleGetUserNamesForEmails}
								/>
							</div>
						</div>
						<div className="two-side-btn pt-2">
							<button type="button" onClick={() => setShowQueryPopup(true)}>
								<FormattedMessage id="BUTTON_QUERY" />
							</button>
							<button type="button" name="next" onClick={handleApproval}>
								<FormattedMessage id="BUTTON_APPROVE" />
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
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
	countries: state.lookup.countries
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
		getLookups: () => dispatch(actions.getLookupsByLookupItems(lookupKeyList)),
		getProjectActivities: (projectId) => dispatch(actions.getProjectActivities(projectId)),
		getProjectParameters: (countryId: number) => dispatch(actions.getProjectParameters(countryId)),
		getAllCountries: () => dispatch(actions.getAllContries())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(countryHoc(insuranceRateHoc(ReviewApprove)));

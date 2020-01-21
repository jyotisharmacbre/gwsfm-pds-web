import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { match } from 'react-router-dom';
import { History } from 'history';
import CalculationsSummaryTable from '../components/Table/CalculationsSummaryTable';
import PricingSummaryTable from '../components/Table/PricingSummaryTable';
import * as actions from '../store/rootActions';
import { toast } from 'react-toastify';
import { getClassNameForProjectStatus, getPropertyName, getFilterElementFromArray } from '../helpers/utility-helper';
import { IState } from '../store/state';
import { FormattedMessage } from 'react-intl';
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
import { IUserServiceData } from '../store/UserService/Types/IUserService';
<<<<<<< Updated upstream
=======
import { formatMessage } from '../Translations/connectedIntlProvider';
import { IAdminDefaults } from '../store/Admin/Types/IAdminDefault';
import { ICountry } from '../store/Lookups/Types/ICountry';
import { ICountryHoc, countryHoc } from '../hoc/CountryHoc';
import { insuranceRateHoc, IInsuranceRateHoc } from '../hoc/InsuranceRateHoc';
>>>>>>> Stashed changes

interface IProps {
	match: match<{ projectId: string }>;
	history: History;
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
	getProjectParameters: (countryId: number) => void;
	getAllCountries: () => void;
}

const ReviewSubmit: React.FC<IProps & IMapStateToProps & IMapDispatchToProps & ICountryHoc & IInsuranceRateHoc> = (
	props
) => {
	const CurrencyObj = new Currency();
	const [ currencySymbol, setCurrencySymbol ] = useState<string>('');
	const projectId = props.match.params.projectId;

	useEffect(() => {
		window.scrollTo(0, 0);
		props.getAllCurrencies();
		props.getProjectStatus();
		props.getAdditionalDetails(projectId);
		props.getProjectDetail(projectId);
		props.getSubContractor(projectId);
		props.getPreliminaryDetails(projectId);
		props.getDiscountData(projectId);
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

	const updateProjectStatusToInReview = () => {
		actions.updateProjectStatusToInReview(
			props.match.params.projectId,
			updateProjectStatusToInReviewSuccess,
			updateProjectStatusToInReviewError
		);
	};

	const updateProjectStatusToInReviewSuccess = (data) => {
<<<<<<< Updated upstream
		toast.success('Submitted Successfully');
=======
		toast.success(formatMessage('MESSAGE_SUCCESSFUL_SUBMITED'));
>>>>>>> Stashed changes
		props.history.push('/');
	};

	const updateProjectStatusToInReviewError = (data) => {
<<<<<<< Updated upstream
		toast.error('Some error occured');
=======
		toast.error(formatMessage('MESSAGE_ERROR'));
>>>>>>> Stashed changes
	};

	return (
		<div className="container-fluid" data-test="review-approve-component">
			<div className="row">
				<div className="col-lg-12">
					<div className="custom-wrap">
						<div className="heading-subtitle">
							<h1>
								<FormattedMessage id="MENU_REVIEW_SUBMIT" />
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

						<div className={`${getClassNameForProjectStatus(props.project.status)} two-side-btn pt-2`}>
							<button
								data-test="previous-button"
								type="button"
								className="active"
								onClick={() => redirect('Discounts')}
							>
								<FormattedMessage id="BUTTON_PREVIOUS" />
							</button>
							<button onClick={updateProjectStatusToInReview} type="button" name="next">
								<FormattedMessage id="BUTTON_SUBMIT" />
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
		getProjectParameters: (countryId: number) => dispatch(actions.getProjectParameters(countryId)),
		getAllCountries: () => dispatch(actions.getAllContries())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(countryHoc(insuranceRateHoc(ReviewSubmit)));

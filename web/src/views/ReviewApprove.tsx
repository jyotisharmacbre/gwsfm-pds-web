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
import ProjectSummary from '../components/Forms/ProjectForm/ProjectSummary';
import ProjectOverviewSummary from '../components/Forms/ProjectOverviewForm/ProjectOverviewSummary';
import { IProjectDetail } from '../store/CustomerEnquiryForm/Types/IProjectDetail';
import { IDynamicContractCustomerData, IDynamicCompanyData } from '../store/DynamicsData/Types/IDynamicData';
import Company from '../store/DynamicsData/InitialState/Company';
import { ICurrency } from '../store/Lookups/Types/ICurrency';
import Currency from '../store/Lookups/InitialState/Currency';
import { ISubContractorActivity } from '../store/SubContractor/Types/ISubContractorActivity';
import { IPreliminariesComponentDetails } from '../store/Preliminaries/Types/IPreliminariesComponentDetails';
import { IDiscountActivity } from '../store/DiscountForm/Types/IDiscountActivity';
import { ILookup } from '../store/Lookups/Types/ILookup';
import { LookupType } from '../store/Lookups/Types/LookupType';
import { IProjectOverviewDetails } from '../store/ProjectOverviewForm/Types/IProjectOverviewDetails';

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
	dynamicsCompany: Array<IDynamicCompanyData>;
}

interface IMapDispatchToProps {
	getSubContractor: (projectId: string) => void;
	getPreliminaryDetails: (projectId: string) => void;
	getDiscountData: (projectId: string) => void;
	getAllCurrencies: () => void;
	getProjectDetail: (projectId: string) => void;
	getAdditionalDetails: (projectId: string) => void;
	handleGetDynamicCompanyData: (searchCompany: string) => void;
	getProjectStatus: () => void;
}

const ReviewApprove: React.FC<IProps & IMapStateToProps & IMapDispatchToProps> = (props) => {
	const CurrencyObj = new Currency();
	const [ currencySymbol, setCurrencySymbol ] = useState<string>('');
	const companyObj = new Company();
	const projectId = props.match.params.projectId;
	const [ companyName, setCompanyName ] = useState<string>('');
	const [ headOfProject, setHeadOfProject ] = useState<string>('');
	const [ projectOwner, setProjectOwner ] = useState<string>('');
	const [ projectManager, setProjectManager ] = useState<string>('');

	useEffect(() => {
		window.scrollTo(0, 0);
		props.getAllCurrencies();
		props.getProjectStatus();
		props.getAdditionalDetails(projectId);
		props.getProjectDetail(projectId);
		props.getSubContractor(projectId);
		props.getPreliminaryDetails(projectId);
		props.getDiscountData(projectId);
	}, []);

	useEffect(
		() => {
			if (props.project.projectId) {
				props.handleGetDynamicCompanyData(props.project.companyId);
				if (props.project.headOfProject)
					actions.getUserServiceCallback(props.project.headOfProject, headofProjectSuccess, failure);
				if (props.project.projectOwner)
					actions.getUserServiceCallback(props.project.projectOwner, projectOwnerSuccess, failure);
				if (props.project.projectManager)
					actions.getUserServiceCallback(props.project.projectManager, projectManagerSuccess, failure);
			}
		},
		[ props.project ]
	);

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
			if (props.dynamicsCompany && props.dynamicsCompany.length > 0) {
				setCompanyName(
					getFilterElementFromArray(
						props.dynamicsCompany,
						getPropertyName(companyObj, (prop) => prop.companyId),
						props.project.companyId,
						getPropertyName(companyObj, (prop) => prop.name)
					)
				);
			}
		},
		[ props.dynamicsCompany ]
	);

	const headofProjectSuccess = (response) => {
		let filter = response.find((ele) => ele.email == props.project.headOfProject);
		setHeadOfProject(filter.lastName + ' ' + filter.firstname);
	};

	const projectOwnerSuccess = (response) => {
		let filter = response.find((ele) => ele.email == props.project.projectOwner);
		setProjectOwner(filter.lastName + ' ' + filter.firstname);
	};
	const projectManagerSuccess = (response) => {
		let filter = response.find((ele) => ele.email == props.project.projectManager);
		setProjectManager(filter.lastName + ' ' + filter.firstname);
	};
	const failure = (error) => {
		toast.error('Some error occured');
	};

	const redirect = (module: string) => {
		return props.history.push(`/${module}/${props.match.params.projectId}`);
	};

	return (
		<div className="container-fluid" data-test="review-approve-component">
			<div className="row">
				<div className="col-lg-12">
					<div className="custom-wrap">
						<div className="heading-subtitle">
							<h1>Review &#38; Submit</h1>
						</div>
						<ProjectSummary
							project={props.project}
							lookUpData={props.projectStatus}
							company={companyName}
							headOfProject={headOfProject}
							projectOwner={projectOwner}
							projectManager={projectManager}
						/>
						<ProjectOverviewSummary
							projectOverview={props.projectOverview}
							lookUpData={props.projectStatus}
							company={companyName}
							headOfProject={headOfProject}
							projectOwner={projectOwner}
							projectManager={projectManager}
						/>
						<div className="row">
							<div className="col-xl-9">
								<PricingSummaryTable
									data-test="pricing-summary"
									preliminary={props.preliminaryState}
									subContractor={props.subContractorState}
									discount={props.discountState}
									currencySymbol={currencySymbol}
								/>
								<CalculationsSummaryTable
									data-test="calculation-summary"
									preliminary={props.preliminaryState}
									subContractor={props.subContractorState}
									discount={props.discountState}
									currencySymbol={currencySymbol}
								/>
							</div>
						</div>

						<div className={`${getClassNameForProjectStatus(props.project.status)} two-side-btn pt-2`}>
							<button
								data-test="previous-button"
								type="button"
								className="active"
								onClick={() => redirect('ReviewSubmit')}
							>
								PREVIOUS
							</button>
                            <button type="button">
								QUERY
							</button>
							<button type="button" name="next">
								APPROVE
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
	dynamicsCompany: state.dynamicData.dynamicsCompany,
	projectOverview: state.projectOverview.form
});

const mapDispatchToProps = (dispatch) => {
	return {
		getProjectStatus: () => dispatch(actions.getProjectStatus()),
		getSubContractor: (projectId: string) => dispatch(actions.getSubContractor(projectId)),
		getPreliminaryDetails: (projectId: string) => dispatch(actions.getPreliminaryDetails(projectId)),
		getDiscountData: (projectId: string) => dispatch(actions.getDiscountData(projectId)),
		getAllCurrencies: () => dispatch(actions.getAllCurrencies()),
		getProjectDetail: (projectId) => dispatch(actions.getProjectDetail(projectId)),
		handleGetDynamicCompanyData: (searchCompany) => dispatch(actions.getDynamicCompanyData(searchCompany)),
		getAdditionalDetails: (projectId) => dispatch(actions.getAdditionalDetails(projectId))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ReviewApprove);

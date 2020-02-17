import React, { useEffect } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import ProjectForm from '../components/Forms/ProjectForm/ProjectForm';
import { connect } from 'react-redux';
import { IState } from '../store/state';
import { ILookup } from '../store/Lookups/Types/ILookup';
import { getProjectStatus } from '../store/Lookups/Actions';
import { IProjectDetail } from '../store/CustomerEnquiryForm/Types/IProjectDetail';
import { projectDetailAdd } from '../store/CustomerEnquiryForm/Action';
import EventType from '../enums/EventType';
import { useHistory } from 'react-router-dom';
import * as actions from '../store/rootActions';
import Notify from '../enums/Notify';
import { toast } from 'react-toastify';
import { ICurrency } from '../store/Lookups/Types/ICurrency';
import {
	getDynamicContractData,
	getDynamicCompanyData,
} from '../store/DynamicsData/Action';
import { IDynamicContractCustomerData, IDynamicCompanyData, IDynamicsDivision, IDynamicBusinessUnits } from '../store/DynamicsData/Types/IDynamicData';
import { IUserServiceData } from '../store/UserService/Types/IUserService';
import ProjectStatus from '../enums/ProjectStatus';
import { ICountry } from '../store/Lookups/Types/ICountry';
import { getUserPreferences } from '../services/lookup.service';
import { getClassNameForProjectStatus } from '../helpers/utility-helper';
import * as services from '../services';
import { formatMessage } from '../Translations/connectedIntlProvider';

interface IMapStateToProps {
	notify: Notify;
	event: EventType;
	projectId: string;
	currencies: Array<ICurrency> | null;
	projectStatus: Array<ILookup>;
	dynamicsContract: Array<IDynamicContractCustomerData>;
	dynamicsCompany: Array<IDynamicCompanyData>;
	userServiceData: Array<IUserServiceData>;
	status: number;
	countries: Array<ICountry> | null;
	getListOfDivisions: Array<IDynamicsDivision>;
	getListOfBusinessUnit:Array<IDynamicBusinessUnits>;
	loading: boolean;
}

interface IMapDispatchToProps {
	handleGetDynamicContractData: (searchContract: string) => void;
	handleGetDynamicCompanyData: (searchCompany: string) => void;
	getDynamicsListOfDivision: () => void;
	getListOfBusinessUnits:()=>void;
	getProjectStatus: () => void;
	getProjectDetail: (projectId: string) => void;
	resetProjectDetailState: () => void;
	getAllCurrencies: () => void;
	getAllCountries: () => void;
	getDynamicContractData: () => void;
	getDynamicCompanyData: () => void;
	getDynamicSubContractorData: () => void;
	getUserService: () => void;
	handleProjectDetailsSubmit: (form: IProjectDetail, event: EventType) => void;
	handleProjectDetailsEdit: (form: IProjectDetail, event: EventType) => void;
	resetProjectDetailStateToInitial: () => void;
}

interface IProps {
	match: any;
}

const Project: React.FC<IProps & IMapStateToProps & IMapDispatchToProps> = (props) => {
	let history = useHistory();
	useEffect(() => {
		window.scrollTo(0, 0);
		props.getProjectStatus();
		props.getAllCurrencies();
		props.getAllCountries();
		props.getDynamicsListOfDivision();
		props.getListOfBusinessUnits();
		let paramProjectId = props.match.params.projectId;
		if (paramProjectId != null && paramProjectId != '') {
			props.getProjectDetail(paramProjectId);
		} else {
			props.resetProjectDetailStateToInitial();
		}
	}, []);

	useEffect(() => {
		if (props.notify == Notify.success) {
			if (props.event == EventType.next) {
				toast.success(formatMessage("MESSAGE_SUCCESSFUL"));
				history.push({
					pathname: `/projectOverview/${props.projectId}`
				})
			} else if (props.event == EventType.save) {
				toast.success(formatMessage("MESSAGE_SUCCESSFUL"));
			}
			props.resetProjectDetailState();
		}
	}, [props.notify, props.event]);
	/* istanbul ignore next */
	const handleSave = (data: IProjectDetail) => {
		data.projectId == ''
			? props.handleProjectDetailsSubmit(data, EventType.save)
			: props.handleProjectDetailsEdit(data, EventType.save);
	};
	/* istanbul ignore next */
	const handleNext = (data: IProjectDetail) => {
		data.projectId == ''
			? props.handleProjectDetailsSubmit(data, EventType.next)
			: props.handleProjectDetailsEdit(data, EventType.next);
	};
/* istanbul ignore next */
	const onSearchContract = (values: any) => {
		props.handleGetDynamicContractData(values);
	};
/* istanbul ignore next */
	const onSearchCompany = (values: any) => {
		props.handleGetDynamicCompanyData(values);
	};
	return (
		<div className={getClassNameForProjectStatus(props.status)}>
			<ProjectForm
				onSave={handleSave}
				onNext={handleNext}
				currencies={props.currencies}
				onSearchContract={onSearchContract}
				onSearchCompany={onSearchCompany}
				projectstatus={props.projectStatus}
				userServiceData={props.userServiceData}
				dynamicsContractCustomerData={props.dynamicsContract}
				dynamicsCompany={props.dynamicsCompany}
				countries={props.countries}
				getListOfUsers={services.getUsersForEmailService}
				getListOfCompanies={services.getCompanies}
				getListOfContract={services.getContractsAndCustomers}
				listOfDivisions={props.getListOfDivisions}
				listOfBusinessUnits ={props.getListOfBusinessUnit}
				loading = {props.loading}
				event = {props.event}
			/>
		</div>
	);
};

const mapStateToProps = (state: IState) => {
	return {
		projectStatus: state.lookup.projectstatus,
		dynamicsContract: state.dynamicData.dynamicsContract,
		dynamicsCompany: state.dynamicData.dynamicsCompany,
		getListOfDivisions: state.dynamicData.dynamicsListOfDivision,
		getListOfBusinessUnit:state.dynamicData.dynamicsListOfBusinessUnits,
		userServiceData: state.userService.userServiceData,
		notify: state.project.notify,
		loading: state.project.loading,
		event: state.project.event,
		projectId: state.project.form.projectId,
		currencies: state.lookup.currencies,
		status: state.project.form.status,
		countries: state.lookup.countries
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getProjectStatus: () => dispatch(getProjectStatus()),
		handleProjectDetailsSubmit: (form, event) => dispatch(projectDetailAdd(form, event)),
		handleProjectDetailsEdit: (form, event) => dispatch(actions.projectDetailEdit(form, event)),
		getProjectDetail: (projectId: string) => dispatch(actions.getProjectDetail(projectId)),
		resetProjectDetailState: () => dispatch(actions.resetProjectDetailState()),
		getAllCurrencies: () => dispatch(actions.getAllCurrencies()),
		getAllCountries: () => dispatch(actions.getAllContries()),
		handleGetDynamicContractData: (searchContract) => dispatch(getDynamicContractData(searchContract)),
		handleGetDynamicCompanyData: (searchCompany) => dispatch(getDynamicCompanyData(searchCompany)),
		resetProjectDetailStateToInitial: () => dispatch(actions.resetProjectDetailStateToInitial()),
		getDynamicsListOfDivision: () => dispatch(actions.getListOfDivision()),
		getListOfBusinessUnits:() =>dispatch(actions.getListOfBusinessUnits())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Project);

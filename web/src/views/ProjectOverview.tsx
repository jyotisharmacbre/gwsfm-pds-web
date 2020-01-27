import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import HeaderPage from '../components/HeaderPage/HeaderPage';
import GeneralTable from '../components/Table/General';
import { Grid, Container } from '@material-ui/core';
import ProjectOverviewForm from '../components/Forms/ProjectOverviewForm/ProjectOverviewForm';
import { IGeneralTableHeaderProps, IGeneralTableProps } from '../components/Table/General/props';
import * as actions from '../store/rootActions';
import { IProjectAdditionalDetail } from '../store/ProjectOverviewForm/Types/IProjectAdditionalDetail';
import { IProject } from '../store/CustomerEnquiryForm/Types/IProject';
import { IState } from '../store/state';
import Notify from '../enums/Notify';
import EventType from '../enums/EventType';
import { ILookup } from '../store/Lookups/Types/ILookup';
import { History } from 'history';
import { toast } from 'react-toastify';
import { formatMessage } from '../Translations/connectedIntlProvider';
import {
	getFilterElementFromArray,
	getClassNameForProjectStatus,
	getPropertyName,
	displayUserName
} from '../helpers/utility-helper';
import ProjectOverviewStatusTab from '../components/Forms/ProjectOverviewForm/ProjectOverviewStatusTab';
import { getDynamicSubContractorData } from '../store/DynamicsData/Action';
import { IDynamicSubContractorData, IDynamicContractCustomerData } from '../store/DynamicsData/Types/IDynamicData';
import { IProjectOverviewDetails } from '../store/ProjectOverviewForm/Types/IProjectOverviewDetails';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { ICurrency } from '../store/Lookups/Types/ICurrency';
import { ISubContractorActivity } from '../store/SubContractor/Types/ISubContractorActivity';
import { IPreliminariesComponentDetails } from '../store/Preliminaries/Types/IPreliminariesComponentDetails';
import { IDiscountActivity } from '../store/DiscountForm/Types/IDiscountActivity';
import { IProjectDetail } from '../store/CustomerEnquiryForm/Types/IProjectDetail';
import { IUserServiceData } from '../store/UserService/Types/IUserService';
import { LookupType } from '../store/Lookups/Types/LookupType';
import * as services from '../services';
import { currencyHoc, ICurrencyHoc } from '../hoc/CurrencyHoc';
import { insuranceRateHoc, IInsuranceRateHoc } from '../hoc/InsuranceRateHoc';
import { IAdminDefaults } from '../store/Admin/Types/IAdminDefault';
import ProjectStatus from '../enums/ProjectStatus';
import { ICountryHoc, countryHoc } from '../hoc/CountryHoc';
import { ICountry } from '../store/Lookups/Types/ICountry';
import { injectIntl } from 'react-intl';
import { reset, isDirty } from 'redux-form';
import { confirmAlert } from '../components/Popup/CustomModalPopup';

const tableHeaders: IGeneralTableHeaderProps[] = [
	{ heading: 'End Client Name', subHeading: 'ING' },
	{ heading: 'Project Name', subHeading: 'Building Maintainance' },
	{ heading: 'Project ID', subHeading: 'ING65956' },
	{ heading: 'CN Number', subHeading: 'ING89855' }
];

const table: IGeneralTableProps = {
	headers: tableHeaders,
	content: 'Working on new structure of a building with lighting',
	editActionClick: () => {
		alert('You clicked me');
	}
};

const lookupKeyList: string[] = [
	LookupType.Project_Approval_Range,
	LookupType.Project_Approval_Sign_Off_Status,
	LookupType.Project_Approver_Type
];
interface IMapStateToProps {
	form: IProjectOverviewDetails;
	project: IProjectDetail;
	notify: Notify;
	projectStatus: Array<ILookup>;
	enquiryOverview: IProject;
	event: EventType;
	dynamicsSubContractor: Array<IDynamicSubContractorData>;
	history: History;
	dynamicsContractCustomerData: Array<IDynamicContractCustomerData>;
	subContractorState: Array<ISubContractorActivity>;
	preliminaryState: Array<IPreliminariesComponentDetails>;
	discountState: IDiscountActivity;
	currencies: Array<ICurrency> | null;
	initialStateSetForProjectApprovals: boolean;
	lookups: Array<ILookup>;
	userNamesForEmails: Array<IUserServiceData>;
	countries: Array<ICountry> | null;
	adminDefaultValues: Array<IAdminDefaults>;
	isProjectOverviewFormDirty:boolean;
	intl:any;
}
interface IMapDispatchToProps {
	getProjectStatus: () => void;
	projectOverviewFormAdd: (projectId: string, form: IProjectOverviewDetails, event: EventType) => void;
	projectOverviewFormEdit: (form: IProjectOverviewDetails, event: EventType) => void;
	getAdditionalDetails: (projectId: string) => void;
	getEnquiryOverview: (projectId: string) => void;
	resetProjectOverviewState: () => void;
	getProjectDetail: (projectId: string) => void;
	changeProjectStatusToOnHold: (projectId: string) => void;
	changeProjectStatusToBidLost: (projectId: string) => void;
	reactivateProject: (projectId: string) => void;
	setProjectStatus: (status: number) => void;
	setAdminDefaultValues: (countryId: number) => void;
	getSubContractor: (projectId: string) => void;
	getPreliminaryDetails: (projectId: string) => void;
	getDiscountData: (projectId: string) => void;
	getAllCurrencies: () => void;
	getLookups: () => void;
	setupPojectApprovalsInitialData: (lookupdata, currencySymbol, projectId) => void;
	getProjectActivities: (projectId: string) => void;
	handleGetUserNamesForEmails: (emails: Array<string>) => void;
	postComment: (projectId: string, comment: string, success, failure) => void;
	getProjectParameters: (countryId: number) => void;
	getAllCountries: () => void;
	resetProjectOverviewFormState:()=>void;
}
interface IProps {
	projectId: string;
	match: any;
}

const ProjectOverview: React.FC<
	IProps & IMapStateToProps & IMapDispatchToProps & ICurrencyHoc & ICountryHoc & IInsuranceRateHoc
> = (props) => {
	const projectId = props.match.params.projectId;
	const [ customerName, setCustomerName ] = useState<string>('');
	const [ projectManager, setProjectManager ] = useState<string>('');
	const [ getProjectManagerName, setGetProjectManagerName ] = useState<boolean>(false);
	useEffect(() => {
		window.scrollTo(0, 0);
		props.getAllCurrencies();
		props.getLookups();
		props.getProjectStatus();
		props.getProjectDetail(projectId);
		props.getEnquiryOverview(projectId);
		props.getSubContractor(projectId);
		props.getPreliminaryDetails(projectId);
		props.getDiscountData(projectId);
		props.getProjectActivities(projectId);
		props.getAllCountries();
	}, []);

	useEffect(
		() => {
			if (props.notify == Notify.success) {
				if (props.event == EventType.next) {
					toast.success(formatMessage('MESSAGE_SUCCESSFUL'));
					props.history.push(`/JustificationAuthorisation/${props.match.params.projectId}`);
				} else if (props.event == EventType.save) {
					toast.success('Data Saved Successfully');
				} else if (props.event == EventType.previous) {
					toast.success(formatMessage('MESSAGE_SUCCESSFUL'));
					props.history.push(`/Project/${props.match.params.projectId}`);
				}
				props.resetProjectOverviewState();
			}
		},
		[ props.notify, props.event ]
	);

	useEffect(
		() => {
			if (props.project.countryId > 0) {
				props.getProjectParameters(props.project.countryId);
				props.setAdminDefaultValues(props.project.countryId);
			}
		},
		[ props.project.countryId ]
	);
	const redirectionToComponent=(componentName:string)=>{
		props.resetProjectOverviewFormState();
		props.history.push(`/${componentName}/${props.match.params.projectId}`);
	
	  }
	const handlePrevious = () => {
		if(props.isProjectOverviewFormDirty)
		{
			confirmAlert({
				intl: props.intl,
				titleKey: 'TITLE_CONFIRMATION',
				contentKey: 'MESSAGE_DIRTY_CHECK',
				handleConfirm: () => redirectionToComponent('Project')})
		}
		else{
			redirectionToComponent('Project');
		   }
	  };
	useEffect(
		() => {
			if (
				props.project.currencyId > 0 &&
				props.currencies &&
				props.currencies.length > 0 &&
				props.lookups.length > 0
			) {
				props.setupPojectApprovalsInitialData(
					props.lookups,
					props.currencySymbol,
					props.match.params.projectId
				);
			}
		},
		[ props.lookups, props.project.currencyId, props.currencies ]
	);

	useEffect(
		() => {
			if (props.form.projectApprovals.length > 0) props.getAdditionalDetails(props.match.params.projectId);
		},
		[ props.initialStateSetForProjectApprovals ]
	);
	useEffect(
		() => {
			if (props.enquiryOverview.contractorId) {
				if (props.enquiryOverview.contractorId === '0')
					setCustomerName(props.enquiryOverview.otherContractName);
				else
					services
						.getContractsAndCustomers(props.enquiryOverview.contractorId)
						.then((response) => {
							getListOfContractSuccess(response.data);
						})
						.catch((error) => {
							failure(error);
						});
			}
		},
		[ props.enquiryOverview ]
	);

	useEffect(
		() => {
			if (props.enquiryOverview.projectManager) {
				setGetProjectManagerName(true);
				props.handleGetUserNamesForEmails([ props.enquiryOverview.projectManager ]);
			}
		},
		[ props.enquiryOverview ]
	);

	useEffect(
		() => {
			if (getProjectManagerName) {
				let filter = props.userNamesForEmails.find((ele) => ele.email == props.enquiryOverview.projectManager);
				if (filter) setProjectManager(displayUserName(filter));
			}
		},
		[ props.userNamesForEmails, getProjectManagerName]
	);

	const getListOfContractSuccess = (response) => {
		setCustomerName(
			getFilterElementFromArray(response, 'contractId', props.enquiryOverview.contractorId, 'customerName')
		);
	};
	const failure = (error) => {};
	const handleNext = (data: IProjectOverviewDetails) => {
		data.projectAdditionalDetail.projectAddDetailId == ''
			? props.projectOverviewFormAdd(props.match.params.projectId, data, EventType.next)
			: props.projectOverviewFormEdit(data, EventType.next);
	};
	const handleSave = (data: IProjectOverviewDetails) => {
		data.projectAdditionalDetail.projectAddDetailId == ''
			? props.projectOverviewFormAdd(props.match.params.projectId, data, EventType.save)
			: props.projectOverviewFormEdit(data, EventType.save);
	};
	const convertToString = (id) => {
		let data = '';
		if (id != null && id != undefined) data = id.toString();
		return data;
	};
	const getProjectStatusName = () => {
		let projectStatusData: Array<ILookup> = [];
		if (props.projectStatus.length > 0) {
			projectStatusData = props.projectStatus.filter((data) => {
				return data.lookupItem == 'Project_Status' && data.lookupKey == props.project.status;
			});
		} else if (sessionStorage.getItem('lookupData')) {
			let lookupData: any = sessionStorage.getItem('lookupData');
			projectStatusData = JSON.parse(lookupData).filter((data) => {
				return data.lookupItem == 'Project_Status' && data.lookupKey == props.project.status;
			});
		}
		return projectStatusData.length > 0 ? projectStatusData[0].description : '';
	};

	const notifySucess = (data, actionType) => {
		if (actionType === 'reactivate') {
			toast.success(formatMessage('MESSAGE_SUCCESSFUL_REACTIVATED'));
			props.getProjectDetail(props.match.params.projectId);
		} else {
			toast.success(formatMessage('MESSAGE_SUCCESSFUL_STATUS_CHANGED'));
		}
	};

	const notifyError = (error) => {
		toast.error(formatMessage('MESSAGE_ERROR_MESSAGE'));
	};

	const handleReactivateEvent = () => {
		actions.reactivateProject(props.match.params.projectId, notifySucess, notifyError);
	};
	const handleOnHoldEvent = () => {
		props.setProjectStatus(ProjectStatus.OnHold);
		actions.changeProjectStatusToOnHold(props.match.params.projectId, notifySucess, notifyError);
	};
	const handleBidLostEvent = () => {
		props.setProjectStatus(ProjectStatus.BidLost);
		actions.changeProjectStatusToBidLost(props.match.params.projectId, notifySucess, notifyError);
	};
	const handleOrderReceivedEvent = () => {
		props.setProjectStatus(ProjectStatus.OrderReceived);
		actions.changeProjectStatusToOrderReceived(props.match.params.projectId, notifySucess, notifyError);
	};
	return (
		<div className="container-fluid ">
			<div className="row">
				<div className="col-lg-12 col-sm-12">
					<div className="custom-wrap">
						<div className="row align-items-center my-3 my-lg-4 pb-2">
							<div className="col-lg-6">
								<h1 className="m-0">{formatMessage('TITLE_PROJECT_OVERVIEW')}</h1>
							</div>
							<ProjectOverviewStatusTab
								status={props.project.status}
								statusName={getProjectStatusName()}
								onReactivate={handleReactivateEvent}
								handleOnHold={handleOnHoldEvent}
								handleBidLost={handleBidLostEvent}
								handleOrderReceived={handleOrderReceivedEvent}
							/>
						</div>

						<GeneralTable
							{...{
								headers: [
									{
										heading: formatMessage('LABEL_END_CUSTOMER_NAME'),
										subHeading: customerName
									},
									{
										heading: formatMessage('MESSAGE_PROJECT_NAME'),
										subHeading: props.enquiryOverview.projectName
									},
									{
										heading: formatMessage('MESSAGE_PROJECT_MANAGER'),
										subHeading: projectManager
									},
									{
										heading: formatMessage('LABEL_CN_NUMBER'),
										subHeading: convertToString(props.enquiryOverview.cnNumber)
									}
								],
								content: props.project.scope,
								editActionClick: () => {
									handlePrevious();
								}
							}}
						/>
						<ProjectOverviewForm
							onSave={handleSave}
							onNext={handleNext}
							onPrevious={handlePrevious}
							projectstatus={props.projectStatus}
							lookups={props.lookups}
							status={props.project.status}
							projectId={props.match.params.projectId}
							getListOfUsers={services.getUsersForEmailService}
							subContractorState={props.subContractorState}
							preliminaryState={props.preliminaryState}
							discountState={props.discountState}
							currencySymbol={props.currencySymbol}
							handleGetUserNamesForEmails={props.handleGetUserNamesForEmails}
							postComment={props.postComment}
							getProjectActivities={props.getProjectActivities}
							countryCode={props.countryCode}
							insuranceRate={props.insuranceRate}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state: IState) => ({
	form: state.projectOverview.form,
	project: state.project.form,
	notify: state.projectOverview.notify,
	projectStatus: state.lookup.projectstatus,
	enquiryOverview: state.project.enquiryOverview,
	event: state.projectOverview.event,
	dynamicsSubcontractor: state.dynamicData.dynamicsSubcontractor,
	dynamicsContractCustomerData: state.dynamicData.dynamicsContract,
	subContractorState: state.subContractor.form.activities,
	preliminaryState: state.preliminary.preliminaryDetails,
	discountState: state.discount.form,
	currencies: state.lookup.currencies,
	lookups: state.lookup.lookups,
	initialStateSetForProjectApprovals: state.projectOverview.initialStateSetForProjectApprovals,
	userNamesForEmails: state.userService.userServiceData,
	adminDefaultValues: state.admin.adminDefaultValues,
	countries: state.lookup.countries,
	isProjectOverviewFormDirty:isDirty("projectOverviewForm")(state)
});

const mapDispatchToProps = (dispatch) => {
	return {
		getProjectStatus: () => dispatch(actions.getProjectStatus()),
		projectOverviewFormAdd: (projectId, form, event) =>
			dispatch(actions.projectOverviewFormAdd(projectId, form, event)),
		projectOverviewFormEdit: (form, event) => dispatch(actions.projectOverviewFormEdit(form, event)),
		getAdditionalDetails: (projectId) => dispatch(actions.getAdditionalDetails(projectId)),
		getEnquiryOverview: (projectId) => dispatch(actions.getEnquiryOverview(projectId)),
		resetProjectOverviewState: () => dispatch(actions.resetProjectOverviewNotifier()),
		getProjectDetail: (projectId) => dispatch(actions.getProjectDetail(projectId)),
		setProjectStatus: (status) => dispatch(actions.changeProjectStatus(status)),
		setAdminDefaultValues: (countryId) => dispatch(actions.getAdminDefaultValues(countryId)),
		getSubContractor: (projectId: string) => dispatch(actions.getSubContractor(projectId)),
		getPreliminaryDetails: (projectId: string) => dispatch(actions.getPreliminaryDetails(projectId)),
		getDiscountData: (projectId: string) => dispatch(actions.getDiscountData(projectId)),
		getAllCurrencies: () => dispatch(actions.getAllCurrencies()),
		setupPojectApprovalsInitialData: (lookupdata, currencySymbol, projectId) =>
			dispatch(actions.setupPojectApprovalsInitialData(lookupdata, currencySymbol, projectId)),
		getLookups: () => dispatch(actions.getLookupsByLookupItems(lookupKeyList)),
		getProjectActivities: (projectId) => dispatch(actions.getProjectActivities(projectId)),
		handleGetUserNamesForEmails: (emails: Array<string>) => dispatch(actions.getUserNamesForEmailsService(emails)),
		postComment: (projectId: string, comment: string, success, failure) =>
			dispatch(actions.postComments(projectId, comment, success, failure)),
		getProjectParameters: (countryId: number) => dispatch(actions.getProjectParameters(countryId)),
		getAllCountries: () => dispatch(actions.getAllContries()),
		resetProjectOverviewFormState:()=>dispatch(reset("projectOverviewForm"))
	};
};

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(currencyHoc(countryHoc(insuranceRateHoc(ProjectOverview)))));

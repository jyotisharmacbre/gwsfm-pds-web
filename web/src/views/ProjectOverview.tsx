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
import { getFilterElementFromArray, getClassNameForProjectStatus, getPropertyName } from '../helpers/utility-helper';
import ProjectOverviewStatusTab from '../components/Forms/ProjectOverviewForm/ProjectOverviewStatusTab';
import { getDynamicSubContractorData } from '../store/DynamicsData/Action';
import { IDynamicSubContractorData, IDynamicContractCustomerData } from '../store/DynamicsData/Types/IDynamicData';
import { IProjectOverviewDetails } from '../store/ProjectOverviewForm/Types/IProjectOverviewDetails';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { ICurrency } from '../store/Lookups/Types/ICurrency';
import Currency from '../store/Lookups/InitialState/Currency';
import { ISubContractorActivity } from '../store/SubContractor/Types/ISubContractorActivity';
import { IPreliminariesComponentDetails } from '../store/Preliminaries/Types/IPreliminariesComponentDetails';
import { IDiscountActivity } from '../store/DiscountForm/Types/IDiscountActivity';
import { IProjectDetail } from '../store/CustomerEnquiryForm/Types/IProjectDetail';
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
	handleGetDynamicSubContractorData: (searchSubContractor: string) => void;
	setAdminDefaultValues: (countryId: number) => void;
	getSubContractor: (projectId: string) => void;
	getPreliminaryDetails: (projectId: string) => void;
	getDiscountData: (projectId: string) => void;
	getAllCurrencies: () => void;
}
interface IProps {
	projectId: string;
	match: any;
}

const ProjectOverview: React.FC<IProps & IMapStateToProps & IMapDispatchToProps> = (props) => {
	const projectId = props.match.params.projectId;
	const CurrencyObj = new Currency();
	const [ currencySymbol, setCurrencySymbol ] = useState<string>('');
	useEffect(() => {
		window.scrollTo(0, 0);
		props.getAllCurrencies();
		props.getProjectStatus();
		props.getProjectDetail(projectId);
		props.getAdditionalDetails(projectId);
		props.getEnquiryOverview(projectId);
		props.getSubContractor(projectId);
		props.getPreliminaryDetails(projectId);
		props.getDiscountData(projectId);
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
			if (props.notify == Notify.success) {
				if (props.event == EventType.next) {
					toast.success('Data Saved Successfully');
					props.history.push(`/JustificationAuthorisation/${props.match.params.projectId}`);
				} else if (props.event == EventType.previous) {
					toast.success('Data Saved Successfully');
					props.history.push(`/Project/${props.match.params.projectId}`);
				}
				props.resetProjectOverviewState();
			}
		},
		[ props.notify, props.event ]
	);

	useEffect(
		() => {
			if (props.notify == Notify.success) {
				if (props.event == EventType.save) {
					toast.success('Project reactivated successfully');
					props.getProjectDetail(props.match.params.projectId);
				} else {
					toast.success('Project status changed successfully');
				}
			} else if (props.notify == Notify.error) {
				toast.error('Error occured.Please contact administrator');
			}
			props.resetProjectOverviewState();
		},
		[ props.notify ]
	);

	useEffect(
		() => {
			props.setAdminDefaultValues(props.project.countryId);
		},
		[ props.project.countryId ]
	);
	const handlePrevious = () => {
		props.history.push(`/Project/${props.match.params.projectId}`);
	};

	const handleNext = (data: IProjectOverviewDetails) => {
		data.projectAdditionalDetail.projectAddDetailId == ''
			? props.projectOverviewFormAdd(props.match.params.projectId, data, EventType.next)
			: props.projectOverviewFormEdit(data, EventType.next);
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
	const handleReactivateEvent = () => {
		props.reactivateProject(props.match.params.projectId);
	};
	const handleOnHoldEvent = () => {
		props.setProjectStatus(6);
		props.changeProjectStatusToOnHold(props.match.params.projectId);
	};
	const handleBidLostEvent = () => {
		props.setProjectStatus(4);
		props.changeProjectStatusToBidLost(props.match.params.projectId);
	};

	return (
		<div className="container-fluid ">
			<div className="row">
				<div className="col-lg-12 col-sm-12">
					{/* 20-dec-2019 */}
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
							/>
						</div>

						<GeneralTable
							{...{
								headers: [
									{
										heading: formatMessage('LABEL_END_CUSTOMER_NAME'),
										subHeading: convertToString(
											getFilterElementFromArray(
												props.dynamicsContractCustomerData,
												'contractId',
												props.enquiryOverview.contractorId,
												'customerName'
											) || props.enquiryOverview.otherContractName
										)
									},
									{
										heading: formatMessage('MESSAGE_PROJECT_NAME'),
										subHeading: props.enquiryOverview.projectName
									},
									{
										heading: formatMessage('MESSAGE_PROJECT_MANAGER'),
										subHeading: props.enquiryOverview.projectManager
									},
									{
										heading: formatMessage('LABEL_CN_NUMBER'),
										subHeading: convertToString(props.enquiryOverview.cnNumber)
									}
								],
								content: props.project.scope,
								editActionClick: () => {
									props.history.push(`/Project/${props.match.params.projectId}`);
								}
							}}
						/>
						<ProjectOverviewForm
							onNext={handleNext}
							onPrevious={handlePrevious}
							projectstatus={props.projectStatus}
							status={props.project.status}
							projectId={props.match.params.projectId}
							subContractorState={props.subContractorState}
							preliminaryState={props.preliminaryState}
							discountState={props.discountState}
							currencySymbol={currencySymbol}
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
	currencies: state.lookup.currencies
});

const mapDispatchToProps = (dispatch) => {
	return {
		getProjectStatus: () => dispatch(actions.getProjectStatus()),
		projectOverviewFormAdd: (projectId, form, event) =>
			dispatch(actions.projectOverviewFormAdd(projectId, form, event)),
		projectOverviewFormEdit: (form, event) => dispatch(actions.projectOverviewFormEdit(form, event)),
		getAdditionalDetails: (projectId) => dispatch(actions.getAdditionalDetails(projectId)),
		getEnquiryOverview: (projectId) => dispatch(actions.getEnquiryOverview(projectId)),
		resetProjectOverviewState: () => dispatch(actions.resetProjectOverviewState()),
		getProjectDetail: (projectId) => dispatch(actions.getProjectDetail(projectId)),
		changeProjectStatusToOnHold: (projectId) => dispatch(actions.changeProjectStatusToOnHold(projectId)),
		changeProjectStatusToBidLost: (projectId) => dispatch(actions.changeProjectStatusToBidLost(projectId)),
		reactivateProject: (projectId) => dispatch(actions.reactivateProject(projectId)),
		setProjectStatus: (status) => dispatch(actions.changeProjectStatus(status)),
		handleGetDynamicSubContractorData: (searchSubContractor) =>
			dispatch(getDynamicSubContractorData(searchSubContractor)),
		setAdminDefaultValues: (countryId) => dispatch(actions.getAdminDefaultValues(countryId)),
		getSubContractor: (projectId: string) => dispatch(actions.getSubContractor(projectId)),
		getPreliminaryDetails: (projectId: string) => dispatch(actions.getPreliminaryDetails(projectId)),
		getDiscountData: (projectId: string) => dispatch(actions.getDiscountData(projectId)),
		getAllCurrencies: () => dispatch(actions.getAllCurrencies())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectOverview);

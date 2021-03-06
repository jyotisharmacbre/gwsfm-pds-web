import { History } from 'history';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import ProjectPipelineForm from '../../components/Forms/Pipeline/ProjectPipelineForm';
import Notify from '../../enums/Notify';
import { isValidEmail } from '../../helpers/fieldValidations';
import { exportToExcel } from '../../helpers/file-helper';
import { extractQueryParams, setTableQueryParams, setURLParammsForGridTable } from '../../helpers/table-helper';
import useConfigContext from '../../hooks/useConfigContext';
import IFilterParams from '../../models/tableQueryParams/IFilterParams';
import IQueryParams from '../../models/tableQueryParams/IQueryParams';
import * as services from '../../services';
import { getContractDetailsByIds } from '../../store/DynamicsData/Action';
import { IDynamicContractCustomerData } from '../../store/DynamicsData/Types/IDynamicData';
import { getProjectStatus } from '../../store/Lookups/Actions';
import Currency from '../../store/Lookups/InitialState/Currency';
import { ICurrency } from '../../store/Lookups/Types/ICurrency';
import { ILookup } from '../../store/Lookups/Types/ILookup';
import { projectPipelineDetail } from '../../store/pipeline/Action';
import { IProjectPipelineGridState } from '../../store/pipeline/Types/IProjectPipelineGridState';
import * as actions from '../../store/rootActions';
import { getUserNamesForEmailsService } from '../../store/rootActions';
import { IState } from '../../store/state';
import { IUserServiceData } from '../../store/UserService/Types/IUserService';
import { formatMessage } from '../../Translations/connectedIntlProvider';
import { formatDataToExportExcel } from './PipelineExcelFormatter';

interface IProps {
	history: History;
	location: Location;
}
interface IMapDispatchToProps {
	projectPipelineGridDetail: (queryParams: IQueryParams) => void;
	getLookups: () => void;
	getAllCurrencies: () => void;
	handleGetUserNamesForEmails: (emails: any) => void;
	handleGetContractDetailsByIds: (contractIds: any) => void;
}
interface IMapStateToProps {
	projectPipeline: IProjectPipelineGridState;
	userPreferencesNotify: Notify;
	lookupDetails: Array<ILookup>;
	currencies: Array<ICurrency> | null;
	userNamesForEmails: Array<IUserServiceData>;
	contractDetailsByIds: Array<IDynamicContractCustomerData>;
	applyFilterLoader: boolean;
}

const ProjectPipeline: React.FC<IProps & IMapStateToProps & IMapDispatchToProps> = (props) => {
	const config = useConfigContext();
	const [exportLoader, setExportLoader] = useState<boolean>(false);
	const CurrencyObj = new Currency();
	const [isComponentLoaded, setIsComponentLoaded] = useState<boolean>(false);
	const [queryParams, setQueryParams] = useState<IQueryParams>({} as IQueryParams);
	const [filterParams, setFilterParams] = useState<Array<IFilterParams>>([]);

	const [locationSearchKey, setLocationSearchKey] = useState<string>();

	useEffect(() => {
		let searchKey = props.location ? props.location['key'] : '';
		if (props.userPreferencesNotify == Notify.success || searchKey !== locationSearchKey || !searchKey) {
			const params = extractQueryParams(props.location?.search, "projectRefId", 1, 20);
			params.filterParams = filterParams;
			setQueryParams(params);
			setLocationSearchKey(searchKey);
			props.projectPipelineGridDetail(params);
		}

	}, [props.userPreferencesNotify, props.location?.search]);

	useEffect(() => {
		setIsComponentLoaded(true);
		props.getLookups();
		props.getAllCurrencies();
	}, []);

	useEffect(
		() => {
			if (props.projectPipeline?.data?.length > 0 && props.projectPipeline.data[0].projectId !== '') {
				var allEmails = new Array();
				var allClients = new Array();
				for (let recordNo in props.projectPipeline.data) {
					let currentRecord = props.projectPipeline.data[recordNo];

					if (isValidEmail(currentRecord.headOfProject) && allEmails.indexOf(currentRecord.headOfProject.toLowerCase()) === -1) {
						allEmails.push(currentRecord.headOfProject.toLowerCase());
					}
					if (currentRecord.contractorId !== "0" && allClients.indexOf(currentRecord.contractorId) === -1) {
						allClients.push(currentRecord.contractorId);
					}
				}
				allEmails && props.handleGetUserNamesForEmails(allEmails);
				allClients && props.handleGetContractDetailsByIds(allClients);

			}
		},
		[props.projectPipeline]
	);


	const exportToExcelPipelineData = () => /* istanbul ignore next */ {
		setExportLoader(true);
		services.getAllPipelineData({})
			.then((response) => {
				let newEmails: Array<string> = [];
				let newClients: Array<string> = [];
				response.data.data.map((element) => {
					if (isValidEmail(element.headOfProject)
						&& props.userNamesForEmails.find(aa => aa.email.toLowerCase() == element.headOfProject.toLowerCase()) == undefined
						&& newEmails.indexOf(element.headOfProject.toLowerCase()) == -1) {
						newEmails.push(element.headOfProject.toLowerCase());
					}
					if (props.contractDetailsByIds.find(aa => aa.contractId == element.contractorId) == undefined
						&& (newClients.length == 0 || (newClients.length > 0 && newClients.indexOf(element.contractorId) == -1))) {
						newClients.push(element.contractorId);
					}
				})
				let download = async function (data, newEmails, newClients) {
					let allEmails = [...props.userNamesForEmails];
					if (newEmails.length > 0) {
						let response = await services.getUsersForEmailsService(newEmails);
						if (response.data.length > 0) {
							allEmails = [...props.userNamesForEmails, ...response.data];
						}
					}
					let allClients = [...props.contractDetailsByIds];
					if (newClients.length > 0) {
						let response = await services.getContractsAndCustomersList(newClients);
						if (response.data.length > 0) {
							allClients = [...props.contractDetailsByIds, ...response.data];
						}
					}
					let finalData = formatDataToExportExcel(data, allEmails, allClients, props.currencies, CurrencyObj, props.lookupDetails, config.REACT_APP_DATE_FORMAT);
					exportToExcel(finalData, 'Projects');
					setExportLoader(false);
				};
				download(response.data.data, newEmails, newClients);
			})
			.catch(() => {
				toast.error(formatMessage('MESSAGE_ERROR'));
				setExportLoader(false);
			});
	};

	const onApplyFilter = (filterParamsList: Array<IFilterParams>) =>  /* istanbul ignore next */ {
		const params = extractQueryParams(props.location?.search, "projectRefId", 1, 20);
		const existingPagingIndex = params.pagingParams.pageIndex;
		params.pagingParams.pageIndex = 1;
		params.filterParams = filterParamsList;
		setFilterParams(filterParamsList);
		setURLParammsForGridTable(props.history, '/Pipeline', params);

		//Call get project pipeline directly only if no page index changed else it will be handled by useeffect subscribed by props.location?.search
		if (existingPagingIndex === params.pagingParams.pageIndex) {
			props.projectPipelineGridDetail(params);
		}
	}

	const handleTableChange = (type, params) => /* istanbul ignore next */ {
		if (isComponentLoaded) {
			const updatedParams = setTableQueryParams(params);
			updatedParams.filterParams = filterParams;
			setQueryParams(updatedParams);
			setURLParammsForGridTable(props.history, '/Pipeline', updatedParams);
		}
	};

	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-lg-12">
					<div className="custom-wrap">


						<div className="table-grid-wrap pipeline_grid overflowX">
							<div className="inner-block">
								<React.Fragment>
									<ProjectPipelineForm
										lookupValues={props.lookupDetails}
										pipelineValues={props.projectPipeline}
										currencies={props.currencies}
										userNamesForEmailsValues={props.userNamesForEmails}
										contractCustomerList={props.contractDetailsByIds}
										handleTableChange={handleTableChange}
										queryParams={queryParams}
										onApplyFilter={onApplyFilter}
										exportToExcelPipelineData={exportToExcelPipelineData}
										exportLoader={exportLoader}
										applyFilterLoader={props.applyFilterLoader}
										showExcel={true}
									/>
								</React.Fragment>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state: IState) => ({
	lookupDetails: state.lookup.projectstatus,
	userPreferencesNotify: state.userPreferences.notify,
	projectPipeline: state.pipelineGrid,
	currencies: state.lookup.currencies,
	userNamesForEmails: state.userService.userServiceData,
	contractDetailsByIds: state.dynamicData.dynamicsContract,
	applyFilterLoader: state.pipelineGrid.loading,
});

const mapDispatchToProps = (dispatch) => {
	return {
		getLookups: () => dispatch(getProjectStatus()),
		projectPipelineGridDetail: (queryParams: IQueryParams) => dispatch(projectPipelineDetail(queryParams)),
		getAllCurrencies: () => dispatch(actions.getAllCurrencies()),
		handleGetUserNamesForEmails: (allEmails) => dispatch(getUserNamesForEmailsService(allEmails)),
		handleGetContractDetailsByIds: (allContracts) => dispatch(getContractDetailsByIds(allContracts))
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(ProjectPipeline);

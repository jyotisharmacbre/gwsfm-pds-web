import { History } from 'history';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import ProjectPipelineForm from '../components/Forms/Pipeline/ProjectPipelineForm';
import { isValidEmail } from '../helpers/fieldValidations';
import { extractQueryParams, setTableQueryParams, setURLParammsForGridTable } from '../helpers/table-helper';
import IQueryParams from '../models/tableQueryParams/IQueryParams';
import { getContractDetailsByIds } from '../store/DynamicsData/Action';
import { IDynamicContractCustomerData } from '../store/DynamicsData/Types/IDynamicData';
import { getProjectStatus } from '../store/Lookups/Actions';
import { formatMessage } from '../Translations/connectedIntlProvider';
import * as actions from '../store/rootActions';
import { ICurrency } from '../store/Lookups/Types/ICurrency';
import { ILookup } from '../store/Lookups/Types/ILookup';
import { projectPipelineDetail } from '../store/pipeline/Action';
import { IProjectPipelineGridState } from '../store/pipeline/Types/IProjectPipelineGridState';
import { getUserNamesForEmailsService } from '../store/rootActions';
import { FormattedMessage } from 'react-intl';
import * as services from '../services';
import { exportToExcel } from '../helpers/file-helper';
import { toast } from 'react-toastify';
import { CircularProgress } from '@material-ui/core';
import { displayUserName, getLookupDescription, getFilterElementFromArray, getPropertyName } from '../helpers/utility-helper';
import { LookupItems } from '../helpers/constants';
import Currency from '../store/Lookups/InitialState/Currency';
import moment from 'moment';
import appConfig from '../helpers/config-helper';
import { IState } from '../store/state';
import { IUserServiceData } from '../store/UserService/Types/IUserService';
const config = appConfig();

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
	lookupDetails: Array<ILookup>;
	currencies: Array<ICurrency> | null;
	userNamesForEmails: Array<IUserServiceData>;
	contractDetailsByIds: Array<IDynamicContractCustomerData>;

}

const ProjectPipeline: React.FC<IProps & IMapStateToProps & IMapDispatchToProps> = (props) => {
const [exportLoader, setExportLoader] = useState<boolean>(false);
	const CurrencyObj = new Currency();
	const [isComponentLoaded, setIsComponentLoaded] = useState<boolean>(false);
	const [queryParams, setQueryParams] = useState<IQueryParams>({} as IQueryParams);

	useEffect(() => {

		const params = extractQueryParams(props.location?.search, "lastModified", 1, 20);
		setQueryParams(params);
		props.projectPipelineGridDetail(params);

	}, [props.lookupDetails, props.location?.search]);

	useEffect(() => {
		setIsComponentLoaded(true);
		props.getLookups();
		props.getAllCurrencies();
	}, []);

	useEffect(
		() => {
			if (props.projectPipeline.totalNumberOfRecord > 0 && props.projectPipeline.data[0].projectId !== '') {
				var allEmails = new Array();
				var allClients = new Array();
				for (let recordNo in props.projectPipeline.data) {
					if (isValidEmail(props.projectPipeline.data[recordNo].projectOwner)) {
						allEmails.push(props.projectPipeline.data[recordNo].projectOwner.toLowerCase());
						allClients.push(props.projectPipeline.data[recordNo].contractorId);
					}
				}
				const disinctvals = (value, index, self) => {
					if (value !== '')
						return self.indexOf(value) === index;
				}
				const uniqueVals = allEmails.filter(disinctvals);
				allEmails && props.handleGetUserNamesForEmails(uniqueVals);
				allClients && props.handleGetContractDetailsByIds(allClients.filter(disinctvals));

			}
		},
		[props.projectPipeline]
	);
	const formatDataToExportExcel = (data, allEmails, allClients) => {
		let result: any = [];
		data.map(element => {
			let mailObj = allEmails && element.projectOwner && allEmails.find(
				lk => lk.email && element.projectOwner && lk.email.toUpperCase() === element.projectOwner.toUpperCase()
			);
			let customerObj = allClients && element.contractorId && allClients.find(
				lk => lk.contractId && element.contractorId && lk.contractId.toUpperCase() === element.contractorId.toUpperCase()
			);
			const currencySymbol = getFilterElementFromArray(
				props.currencies,
				getPropertyName(CurrencyObj, (prop) => prop.currencyId),
				element.currencyId,
				getPropertyName(CurrencyObj, (prop) => prop.currencySymbol)
			);
			let contractTypeID = element.contractTypeId;
			if (contractTypeID > 0 && props.lookupDetails.length > 0)
				contractTypeID = getLookupDescription(
					props.lookupDetails,
					element.contractTypeId,
					LookupItems.ContractType
				);
			result.push({
				[formatMessage('MESSAGE_PROJECT_NAME')]: element.name,
				[formatMessage('LABEL_OWNER')]: mailObj && mailObj
					? `${displayUserName(mailObj)}`
					: element.projectOwner,
				[formatMessage('LABEL_LAST_UPDATE')]: element.lastModified ? moment(element.lastModified).format(config.REACT_APP_DATE_FORMAT) : '',
				[formatMessage('LABEL_CLIENT_CUSTOMER')]: customerObj ? customerObj.customerName : element.contractorId,
				[formatMessage('LABEL_PROBABILITY_OF_WINING')]: element.probabilityOfWinning,
				[formatMessage('LABEL_STATUS')]: getLookupDescription(
					props.lookupDetails,
					element.status,
					LookupItems.Project_Status
				),
				[formatMessage('LABEL_EXPECTED_START_DATE')]: element.commenceDate ? moment(element.commenceDate).format(config.REACT_APP_DATE_FORMAT) : '',
				[formatMessage('LABEL_APPROX_VALUE')]: element.approxValue.toString().indexOf(currencySymbol) > -1 ? element.approxValue : `${currencySymbol}${element.approxValue}`,
				[formatMessage('LABEL_CONTRACT_TYPE')]: contractTypeID,
				[formatMessage('LABEL_CMD_NOTIFIABLE')]: element.cdmNotifiable ? formatMessage('LABEL_YES') : formatMessage('LABEL_NO'),
				[formatMessage('LABEL_SOLD_MARGIN')]: element.soldmargin ? element.soldmargin : 0,
				[formatMessage('LABEL_WEIGHTED_TCV')]: element.weightedTCV.toString().indexOf(currencySymbol) > -1 ? element.weightedTCV : `${currencySymbol}${element.weightedTCV ? element.weightedTCV : 0}`
			})
		})
		return result;
	}

	const exportToExcelPipelineData = () => {
		setExportLoader(true);
		services.getAllPipelineData({})
			.then((response) => {
			/* istanbul ignore next */
				let newEmails:Array<string> = [];
				let newClients: Array<string> = [];
				response.data.map((element) => {
					if (isValidEmail(element.projectOwner)
						&& props.userNamesForEmails.find(aa => aa.email.toLowerCase() == element.projectOwner.toLowerCase()) == undefined
						&& newEmails.indexOf(element.projectOwner.toLowerCase()) == -1) {
						newEmails.push(element.projectOwner.toLowerCase());
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
							allClients = [...props.userNamesForEmails, ...response.data];
						}
					}
					let finalData = formatDataToExportExcel(data, allEmails, allClients);
					exportToExcel(finalData, 'Projects');
					setExportLoader(false);
				};
				download(response.data, newEmails, newClients);
			})
			.catch(() => {
				/* istanbul ignore next */
				toast.error(formatMessage('MESSAGE_ERROR'));
				setExportLoader(false);
			});
	};

	const handleTableChange = (type, params) => {
		if (isComponentLoaded) {
			const updatedParams = setTableQueryParams(params);
			setQueryParams(updatedParams);
			setURLParammsForGridTable(props.history, '/Pipeline', updatedParams);
		}
	};

	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-lg-12">
					<div className="custom-wrap">
						<div className="top_Title justify-content-between d-flex">
							<h2>{formatMessage('TITLE_CURRENT_PIPELINE')}</h2>
							<span>
								<button
									className="active"
									type="button"
									onClick={() => exportToExcelPipelineData()}
									disabled={exportLoader}
								>
									{exportLoader && <CircularProgress />}
									<FormattedMessage id="EXPORT_TO_EXCEL" />
								</button>
							</span>
						</div>

						<div className="table-grid-wrap price-sumry overflowX">
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
	projectPipeline: state.pipelineGrid,
	currencies: state.lookup.currencies,
	userNamesForEmails: state.userService.userServiceData,
	contractDetailsByIds: state.dynamicData.dynamicsContract
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

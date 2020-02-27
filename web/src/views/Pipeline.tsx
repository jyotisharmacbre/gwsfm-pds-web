import { History } from 'history';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import ProjectPipelineForm from '../components/Forms/Pipeline/ProjectPipelineForm';
import SortOrder from '../enums/SortOrder';
import { isValidEmail } from '../helpers/fieldValidations';
import ITableParams from '../models/tableParameters/IQueryParams';
import { getContractDetailsByIds } from '../store/DynamicsData/Action';
import { IDynamicContractCustomerData } from '../store/DynamicsData/Types/IDynamicData';
import { getProjectStatus } from '../store/Lookups/Actions';
import { ICurrency } from '../store/Lookups/Types/ICurrency';
import { ILookup } from '../store/Lookups/Types/ILookup';
import { projectPipelineDetail } from '../store/pipeline/Action';
import { IProjectPipelineGridState } from '../store/pipeline/Types/IProjectPipelineGridState';
import * as actions from '../store/rootActions';
import { getUserNamesForEmailsService } from '../store/rootActions';
import { IState } from '../store/state';
import { IUserServiceData } from '../store/UserService/Types/IUserService';
import { formatMessage } from '../Translations/connectedIntlProvider';
import IQueryParams from '../models/tableParameters/IQueryParams';

interface IProps {
	history: History;
	location: Location;
}
interface IMapDispatchToProps {
	projectPipelineGridDetail: (queryParams: ITableParams) => void;
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
	const [isComponentLoaded, setIsComponentLoaded] = useState<boolean>(false);
	const queryParams = {} as ITableParams;

	useEffect(() => {
		props.getLookups();
		props.getAllCurrencies();
	}, []);
	useEffect(
		() => {
			if (props.projectPipeline.totalNumberOfRecord > 0) {
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
	useEffect(
		() => {
			props.projectPipelineGridDetail(extractQUeryParams());
			setIsComponentLoaded(true);
		}, []
	);

	const extractQUeryParams = () => {
		const query = new URLSearchParams(props.location.search);

		let pageIndex = query.get('pageIndex');
		let pageSize = query.get('pageSize');
		let sortField = query.get('sortField');
		let sortOrder = query.get('sortOrder');
		let updatedTableParams: IQueryParams = {
			pagingParams: {
				pageIndex: parseInt(pageIndex ? pageIndex : "1"),
				pageSize: parseInt(pageSize ? pageSize : "20")
			},
			sortingParams: {
				sortColumnName: sortField ? sortField : "lastModified",
				sortOrder: sortOrder ? SortOrder[sortOrder] : SortOrder.desc
			}
		};
		return updatedTableParams;
	}



	const handleTableChange = (type, params) => {
		if (isComponentLoaded) {
			updateTableParams(params);

			props.history.push({
				pathname: '/Pipeline',
				search: `?pageIndex=${params.page}&pageSize=${params.sizePerPage}&sortField=${params.sortField}&sortOrder=${params.sortOrder}`
			})

			props.projectPipelineGridDetail(queryParams);
		}
	};

	const updateTableParams = (params) => {
		queryParams.pagingParams = queryParams.pagingParams || {};
		queryParams.sortingParams = queryParams.sortingParams || {};

		queryParams.pagingParams.pageIndex = params.page;
		queryParams.pagingParams.pageSize = params.sizePerPage;
		queryParams.sortingParams.sortOrder = params.sortOrder;
		queryParams.sortingParams.sortColumnName = params.sortField;
	};

	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-lg-12">
					<div className="custom-wrap">
						<div className="top_Title">
							<h2>{formatMessage('TITLE_CURRENT_PIPELINE')}</h2>
						</div>

						<div className="table-grid-wrap price-sumry">
							<div className="inner-block">
								<React.Fragment>
									<ProjectPipelineForm
										lookupValues={props.lookupDetails}
										pipelineValues={props.projectPipeline}
										currencies={props.currencies}
										userNamesForEmailsValues={props.userNamesForEmails}
										contractCustomerList={props.contractDetailsByIds}
										handleTableChange={handleTableChange}
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
		projectPipelineGridDetail: (queryParams: ITableParams) => dispatch(projectPipelineDetail(queryParams)),
		getAllCurrencies: () => dispatch(actions.getAllCurrencies()),
		handleGetUserNamesForEmails: (allEmails) => dispatch(getUserNamesForEmailsService(allEmails)),
		handleGetContractDetailsByIds: (allContracts) => dispatch(getContractDetailsByIds(allContracts))
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(ProjectPipeline);

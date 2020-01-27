import React, { useEffect, Props } from 'react';
import { connect } from 'react-redux';
import ProjectPipelineForm from '../components/Forms/Pipeline/ProjectPipelineForm';
import { IState } from '../store/state';
import { projectPipelineDetail } from '../store/pipeline/Action';
import { IProjectPipelineGrid } from '../store/pipeline/Types/IProjectPipelineGrid';
import { ILookup } from '../store/Lookups/Types/ILookup';
import { getProjectStatus } from '../store/Lookups/Actions';
import Notify from '../enums/Notify';
import { formatMessage } from '../Translations/connectedIntlProvider';
import * as actions from '../store/rootActions';
import { ICurrency } from '../store/Lookups/Types/ICurrency';
import { isValidEmail } from '../helpers/fieldValidations';
import { IUserServiceData } from '../store/UserService/Types/IUserService';
import { getUserNamesForEmailsService } from '../store/rootActions';

interface IMapDispatchToProps {
	projectPipelineGridDetail: () => void;
	getLookups: () => void;
	getAllCurrencies: () => void;
	handleGetUserNamesForEmails: (emails: any) => void;
}
interface IMapStateToProps {
	projectPipeline: Array<IProjectPipelineGrid>;
	lookupDetails: Array<ILookup>;
	currencies: Array<ICurrency> | null;
	userNamesForEmails: Array<IUserServiceData>;
}
const ProjectPipeline: React.FC<IMapStateToProps & IMapDispatchToProps> = (props) => {
	useEffect(() => {
		props.getLookups();
		props.getAllCurrencies();
	}, []);
	useEffect(
		() => {
			if (props.projectPipeline.length > 0) {
				var allEmails = new Array();
				for (let recordNo in props.projectPipeline) {
					if (isValidEmail(props.projectPipeline[recordNo].projectOwner))
						allEmails.push(props.projectPipeline[recordNo].projectOwner.toLowerCase());
				}
				allEmails = allEmails.filter(function(el) {
					return el != '';
				});
				const disinctvals = (value,index,self) =>{
					return self.indexOf(value) === index;
				}
				const uniqueVals = allEmails.filter(disinctvals);
				if (allEmails.length > 0) props.handleGetUserNamesForEmails(uniqueVals);
			}
		},
		[ props.projectPipeline ]
	);
	useEffect(
		() => {
			props.projectPipelineGridDetail();
		},
		[ props.lookupDetails ]
	);
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
	projectPipeline: state.pipelineGrid.pipelineDetails,
	currencies: state.lookup.currencies,
	userNamesForEmails: state.userService.userServiceData,
});

const mapDispatchToProps = (dispatch) => {
	return {
		getLookups: () => dispatch(getProjectStatus()),
		projectPipelineGridDetail: () => dispatch(projectPipelineDetail()),
		getAllCurrencies: () => dispatch(actions.getAllCurrencies()),
		handleGetUserNamesForEmails: (allEmails) => dispatch(getUserNamesForEmailsService(allEmails)),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(ProjectPipeline);

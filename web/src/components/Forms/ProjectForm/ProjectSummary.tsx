import React, { useState, useEffect } from 'react';
import { IProjectDetail } from '../../../store/CustomerEnquiryForm/Types/IProjectDetail';
import { ILookup } from '../../../store/Lookups/Types/ILookup';
import { LookupType } from '../../../store/Lookups/Types/LookupType';
import Company from '../../../store/DynamicsData/InitialState/Company';
import { toast } from 'react-toastify';
import {
	getPropertyName,
	getFilterElementFromArray,
	calculateRank,
	displayUserName
} from '../../../helpers/utility-helper';
import { FormattedMessage } from 'react-intl';
import { IUserServiceData } from '../../../store/UserService/Types/IUserService';
import * as services from '../../../services';
import { formatMessage } from '../../../Translations/connectedIntlProvider';
import { IDynamicsDivision, IDynamicBusinessUnits } from '../../../store/DynamicsData/Types/IDynamicData';

interface IProps {
	oneditclick: () => void;
	project: IProjectDetail;
	lookUpData: Array<ILookup>;
	currencySymbol: string;
	userNamesForEmails: Array<IUserServiceData>;
	handleGetUserNamesForEmails: (emails: Array<string>) => void;
	listOfDivisions: Array<IDynamicsDivision>;
	listOfBusinessUnits: Array<IDynamicBusinessUnits>;
	countryCode: string;
}
const ProjectSummary: React.FC<IProps> = (props) => {
	const [projectStatus, setProjectStatus] = useState<string>('');
	const [typeOfEngagement, setTypeOfEngagement] = useState<string>('');
	const companyObj = new Company();
	const [companyName, setCompanyName] = useState<string>('');
	const [headOfProject, setHeadOfProject] = useState<string>('');
	const [projectManager, setProjectManager] = useState<string>('');
	const [contractor, setContractor] = useState<string>('');
	const [division, setDivision] = useState<string>('');
	const [businessUnit, setBusinessUnit] = useState<string>('');

	useEffect(
		() => {
			let emails: Array<string> = [];
			if (props.project.projectId) {
				if (props.project.companyId == '0') setCompanyName(props.project.otherCompanyName);
				else
					services
						.getCompanies(props.project.companyId)
						.then((response) => {
							listOfCompaniesSuccess(response.data);
						})
						.catch((error) => {
							failure(error);
						});
				if (
					props.project.headOfProject &&
					emails.find((ele) => ele == props.project.headOfProject) == undefined
				)
					emails.push(props.project.headOfProject);
				if (
					props.project.projectManager &&
					emails.find((ele) => ele == props.project.projectManager) == undefined
				)
					emails.push(props.project.projectManager);
				props.handleGetUserNamesForEmails(emails);
				if (props.project.contractorId) {
					if (props.project.contractorId == '0') setContractor(props.project.otherContractName);
					else
						services
							.getContractsAndCustomers(props.project.contractorId)
							.then((response) => {
								getContractorSuccess(response.data);
							})
							.catch((error) => {
								failure(error);
							});
				}
				let filterDivision = props.listOfDivisions?.filter(
					(element) => element.divisionId == parseInt(props.project.divisionId)
				);
				if (filterDivision && filterDivision[0]) setDivision(filterDivision[0].description);
				let filterBusinessUnit = props.listOfBusinessUnits?.filter(
					(element) => element.businessUnitId == props.project.businessUnitId
				);
				if (filterBusinessUnit && filterBusinessUnit[0]) setBusinessUnit(filterBusinessUnit[0].description);
			}
		},
		[props.project, props.listOfDivisions, props.listOfBusinessUnits]
	);

	useEffect(
		() => {
			if (props.project.projectId && props.lookUpData && props.lookUpData.length > 0) {
				let filterStatus = props.lookUpData.filter(
					(element) =>
						element.lookupItem == LookupType.Project_Status && element.lookupKey == props.project.status
				);
				if (filterStatus && filterStatus[0]) setProjectStatus(filterStatus[0].description);
				let filterEngagementType = props.lookUpData.filter(
					(element) =>
						element.lookupItem == LookupType.Engagement_Type &&
						element.lookupKey == props.project.engagementId
				);
				let engagementLookupItem = filterEngagementType[0];
				if (filterEngagementType && engagementLookupItem) {
					const engagementVal = engagementLookupItem.lookupKey === 0 && props.project.otherEngagementType ? props.project.otherEngagementType : engagementLookupItem.description;
					setTypeOfEngagement(engagementVal);
				}
			}
		},
		[props.project, props.lookUpData]
	);

	useEffect(
		() => {
			if (props.userNamesForEmails && props.userNamesForEmails.length > 0) {
				let headOfProjectFilter = props.userNamesForEmails.find(
					(ele) => ele.email == props.project.headOfProject
				);
				if (headOfProjectFilter)
					setHeadOfProject(displayUserName(headOfProjectFilter));

				let projectManagerFilter = props.userNamesForEmails.find(
					(ele) => ele.email == props.project.projectManager
				);
				if (projectManagerFilter)
					setProjectManager(displayUserName(projectManagerFilter));
			}
		},
		[props.project, props.userNamesForEmails]
	);
	/* istanbul ignore next */
	const getContractorSuccess = (response) => {
		let filter = response.find((ele) => ele.contractId == props.project.contractorId);
		if (filter) setContractor(filter.contractName);
	};
	/* istanbul ignore next */
	const listOfCompaniesSuccess = (response) => {
		if (response && response.length > 0) {
			setCompanyName(
				getFilterElementFromArray(
					response,
					getPropertyName(companyObj, (prop) => prop.companyId),
					props.project.companyId,
					getPropertyName(companyObj, (prop) => prop.name)
				)
			);
		}
	};
	/* istanbul ignore next */
	const failure = error => {
		toast.error(formatMessage("MESSAGE_ERROR"));
	};


	return (
		<div className="RS_custom_block">
			<div className="title_edit_btn">
				<h4>
					<FormattedMessage id="HEADING_CUSTOMER_ENQUIRY" />
				</h4>
				<button type="submit" className="edit-btn" onClick={props.oneditclick} ><FormattedMessage id="BUTTON_EDIT" /></button>
			</div>

			<div className="RS_custom_inner">
				<div className="row">
					<div className="col-lg-4 col-sm-6">
						<ul>
							<li>
								<span>
									<FormattedMessage id="LABEL_CONTRACT" />
								</span>
								<p data-test="company">{contractor}</p>
							</li>
						</ul>
					</div>
					<div className="col-lg-4 col-sm-6">
						<ul>
							<li>
								<span>
									<FormattedMessage id="LABEL_DIVISION" />
								</span>
								<p data-test="company">{division}</p>
							</li>
						</ul>
					</div>
					<div className="col-lg-4 col-sm-6">
						<ul>
							<li>
								<span>
									<FormattedMessage id="LABEL_BUSINESS_UNIT" />
								</span>
								<p data-test="company">{businessUnit}</p>
							</li>
						</ul>
					</div>
					<div className="col-lg-4 col-sm-6">
						<ul>
							<li>
								<span>
									<FormattedMessage id="LABEL_PROJECT_MANAGER" />
								</span>
								<p>{projectManager}</p>
							</li>
						</ul>
					</div>
					<div className="col-lg-4 col-sm-6">
						<ul>
							<li>
								<span>
									<FormattedMessage id="LABEL_HEAD_OF_PROJECT" />
								</span>
								<p data-test="head-of-project">{headOfProject}</p>
							</li>
						</ul>
					</div>
					<div className="col-lg-4 col-sm-6">
						<ul>
							<li>
								<span>
									<FormattedMessage id="LABEL_CN_NUMBER" />
								</span>
								<p>{props.project.cnNumber}</p>
							</li>
						</ul>
					</div>
					<div className="col-lg-4 col-sm-6">
						<ul>
							<li>
								<span>
									<FormattedMessage id="LABEL_PROJECT" />
								</span>
								<p>{props.project.name}</p>
							</li>
						</ul>
					</div>
					{props.countryCode == "GBR" &&
						<div data-test="cdm_notifiable" className="col-lg-4 col-sm-6">
							<ul>
								<li>
									<span>
										<FormattedMessage id="LABEL_CDMNOTIFIABLE" />
									</span>
									<p>
										<FormattedMessage id={props.project.cdmNotifiable ? 'LABEL_YES' : 'LABEL_NO'} />
									</p>
								</li>
							</ul>
						</div>}
					<div className="col-lg-4 col-sm-6">
						<ul>
							<li>
								<span>
									<FormattedMessage id="LABEL_TYPE_OF_ENGAGEMENT" />
								</span>
								<p>{typeOfEngagement}</p>
							</li>
						</ul>
					</div>
					<div className="col-lg-4 col-sm-6">
						<ul>
							<li>
								<span>
									<FormattedMessage id="LABEL_PROBABILITY_OF_WINING" />
								</span>
								<p>{props.project.probabilityOfWinning}</p>
							</li>
						</ul>
					</div>
					<div className="col-lg-4 col-sm-6">	</div>
				</div>
				<div className="hr_line" />
				<div className="row">
					<div className="col-lg-12">
						<div className="scope_block">
							<h5>
								<FormattedMessage id="LABEL_PROJECT_SCOPE" />
							</h5>
							<ul>
								<li>{props.project.scope}</li>
							</ul>
						</div>
						<div className="comment_block">
							<h5>
								<FormattedMessage id="LABEL_COMMENTS" />
							</h5>
							<p>{props.project.comment}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProjectSummary;

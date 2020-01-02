import React, { useState, useEffect } from 'react';
import { IProjectDetail } from '../../../store/CustomerEnquiryForm/Types/IProjectDetail';
import { ILookup } from '../../../store/Lookups/Types/ILookup';
import { LookupType } from '../../../store/Lookups/Types/LookupType';
import Company from '../../../store/DynamicsData/InitialState/Company';
import * as actions from '../../../store/rootActions';
import { toast } from 'react-toastify';
import { getPropertyName, getFilterElementFromArray } from '../../../helpers/utility-helper';

interface IProps {
	project: IProjectDetail;
	lookUpData: Array<ILookup>;
}
const ProjectSummary: React.FC<IProps> = (props) => {
	const [ projectStatus, setProjectStatus ] = useState<string>('');
	const [ typeOfEngagement, setTypeOfEngagement ] = useState<string>('');
	const companyObj = new Company();
	const [ companyName, setCompanyName ] = useState<string>('');
	const [ headOfProject, setHeadOfProject ] = useState<string>('');
	const [ projectOwner, setProjectOwner ] = useState<string>('');
	const [ projectManager, setProjectManager ] = useState<string>('');
	
	useEffect(
		() => {
			if (props.project.projectId) {
				actions.getListOfCompanies(props.project.companyId,listOfCompaniesSuccess,failure);
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
			if (props.project.projectId && props.lookUpData && props.lookUpData.length > 0) {
				let filterStatus = props.lookUpData.filter(
					(element) =>
						element.lookupItem == LookupType.Project_Status && element.lookupKey == props.project.status
				);
				if (filterStatus  && filterStatus[0]) setProjectStatus(filterStatus[0].description);
				let filterEngagementType = props.lookUpData.filter(
					(element) =>
						element.lookupItem == LookupType.Engagement_Type &&
						element.lookupKey == props.project.engagementId
				);
				if (filterEngagementType && filterEngagementType[0]) 
					setTypeOfEngagement(filterEngagementType[0].description);
			}
		},
		[ props.project, props.lookUpData ]
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
	
	const failure = (error) => {
		toast.error('Some error occured');
	};

		

	return (
		<div className="RS_custom_block">
			<h4>Customer Enquiry</h4>
			<div className="RS_custom_inner">
				<div className="row">
					<div className="col-lg-4 col-sm-6">
						<ul>
							<li>
								<span>Company</span>
								<p data-test='company'>{companyName}</p>
							</li>
						</ul>
					</div>
					<div className="col-lg-4 col-sm-6">
						<ul>
							<li>
								<span>Head of Project</span>
								<p data-test='head-of-project'>{headOfProject}</p>
							</li>
						</ul>
					</div>
					<div className="col-lg-4 col-sm-6">
						<ul>
							<li>
								<span>Manager Experienced</span>
								<p>{props.project.pmHasExperience ? 'Yes' : 'No'}</p>
							</li>
						</ul>
					</div>
				</div>
				<div className="row">
					<div className="col-lg-4 col-sm-6">
						<ul>
							<li>
								<span>Project</span>
								<p>{props.project.name}</p>
							</li>
						</ul>
					</div>
					<div className="col-lg-4 col-sm-6">
						<ul>
							<li>
								<span>Project Manager</span>
								<p>{projectManager}</p>
							</li>
						</ul>
					</div>
					<div className="col-lg-4 col-sm-6">
						<ul>
							<li>
								<span>Project Owner</span>
								<p>{projectOwner}</p>
							</li>
						</ul>
					</div>
				</div>

				<div className="row">
					<div className="col-lg-4 col-sm-6">
						<ul>
							<li>
								<span>Project Status</span>
								<p>{projectStatus}</p>
							</li>
						</ul>
					</div>
					<div className="col-lg-4 col-sm-6">
						<ul>
							<li>
								<span>Type of Engagement</span>
								<p>{typeOfEngagement}</p>
							</li>
						</ul>
					</div>
				</div>
				<div className="hr_line" />
				<div className="row">
					<div className="col-lg-12">
						<div className="scope_block">
							<h5>Project Scope</h5>
							<ul>
								<li>{props.project.scope}</li>
							</ul>
						</div>
						<div className="comment_block">
							<h5>Comments</h5>
							<p>{props.project.comment}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProjectSummary;

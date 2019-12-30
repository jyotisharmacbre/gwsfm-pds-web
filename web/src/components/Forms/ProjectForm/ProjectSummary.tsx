import React, { useState, useEffect } from 'react';
import { IProjectDetail } from '../../../store/CustomerEnquiryForm/Types/IProjectDetail';
import { ILookup } from '../../../store/Lookups/Types/ILookup';
import { LookupType } from '../../../store/Lookups/Types/LookupType';

interface IProps {
	project: IProjectDetail;
	lookUpData: Array<ILookup>;
	company: string;
	headOfProject: string;
	projectOwner: string;
	projectManager: string;
}
const ProjectSummary: React.FC<IProps> = (props) => {
	const [ projectStatus, setProjectStatus ] = useState<string>('');
	const [ typeOfEngagement, setTypeOfEngagement ] = useState<string>('');
	useEffect(
		() => {
			if (props.project.projectId && props.lookUpData && props.lookUpData.length > 0) {
				let filterStatus = props.lookUpData.filter(
					(element) =>
						element.lookupItem == LookupType.Project_Status && element.lookupKey == props.project.status
				);
				if (filterStatus) setProjectStatus(filterStatus[0].description);
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
	return (
		<div className="RS_custom_block">
			<h4>Customer Enquiry</h4>
			<div className="RS_custom_inner">
				<div className="row">
					<div className="col-lg-4 col-sm-6">
						<ul>
							<li>
								<span>Company</span>
								<p data-test='company'>{props.company}</p>
							</li>
						</ul>
					</div>
					<div className="col-lg-4 col-sm-6">
						<ul>
							<li>
								<span>Head of Project</span>
								<p data-test='head-of-project'>{props.headOfProject}</p>
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
								<p>{props.projectManager}</p>
							</li>
						</ul>
					</div>
					<div className="col-lg-4 col-sm-6">
						<ul>
							<li>
								<span>Project Owner</span>
								<p>{props.projectOwner}</p>
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

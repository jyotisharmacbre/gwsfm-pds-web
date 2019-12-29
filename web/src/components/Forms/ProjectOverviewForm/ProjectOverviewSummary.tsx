import React, { useState, useEffect } from 'react';
import { IProjectDetail } from '../../../store/CustomerEnquiryForm/Types/IProjectDetail';
import { ILookup } from '../../../store/Lookups/Types/ILookup';
import { LookupType } from '../../../store/Lookups/Types/LookupType';
import { IProjectOverviewDetails } from '../../../store/ProjectOverviewForm/Types/IProjectOverviewDetails';
import { convertDate } from '../../../helpers/utility-helper';

interface IProps {
	project: IProjectDetail;
	projectOverview: IProjectOverviewDetails;
	lookUpData: Array<ILookup>;
	company: string;
	headOfProject: string;
	projectOwner: string;
	projectManager: string;
}
const ProjectOverviewSummary: React.FC<IProps> = (props) => {
	const [ projectStatus, setProjectStatus ] = useState<string>('');
	const [ enquiryType, setEnquiryType ] = useState<string>('');
	const [ workType, setWorkType ] = useState<string>('');
	useEffect(
		() => {
			if (props.projectOverview.projectId && props.lookUpData && props.lookUpData.length > 0) {
				let filterEnquiryType = props.lookUpData.filter(
					(element) =>
						element.lookupItem == LookupType.Enquiry_Type &&
						element.lookupKey == props.projectOverview.projectAdditionalDetail.enquiryTypeId
				);
				if (filterEnquiryType) setEnquiryType(filterEnquiryType[0].description);
				let filterWorkType = props.lookUpData.filter(
					(element) =>
						element.lookupItem == LookupType.Work_Type &&
						element.lookupKey == props.projectOverview.projectAdditionalDetail.workTypeId
				);
				if (filterWorkType) setWorkType(filterWorkType[0].description);
			}
		},
		[ props.projectOverview, props.lookUpData ]
	);

	useEffect(
		() => {
			if (props.projectOverview.projectId) console.log('projectOverview', props.projectOverview);
		},
		[ props.projectOverview ]
	);

	return (
		<div className="RS_custom_block">
			<h4>Project Overview</h4>
			<div className="RS_custom_inner">
				<div className="row">
					<div className="col-lg-4 col-sm-6">
						<ul>
							<li>
								<span>Main Contractor</span>
								<p>{props.projectOverview.projectAdditionalDetail.mainContractor}</p>
							</li>
						</ul>
					</div>
					<div className="col-lg-4 col-sm-6">
						<ul>
							<li>
								<span>Enquiry Received From</span>
								<p>{props.projectOverview.projectAdditionalDetail.enquiryReceivedFrom}</p>
							</li>
						</ul>
					</div>
					<div className="col-lg-4 col-sm-6">
						<ul>
							<li>
								<span>Liquidated Damages</span>
								<p>{props.projectOverview.projectAdditionalDetail.liquidatedDamages}</p>
							</li>
						</ul>
					</div>
				</div>
				<div className="row">
					<div className="col-lg-4 col-sm-6">
						<ul>
							<li>
								<span>Type of Enquiry</span>
								<p>{enquiryType}</p>
							</li>
						</ul>
					</div>
					<div className="col-lg-4 col-sm-6">
						<ul>
							<li>
								<span>Work Type</span>
								<p>{workType}</p>
							</li>
						</ul>
					</div>
					<div className="col-lg-4 col-sm-6">
						<ul>
							<li>
								<span>Credit Check Result</span>
								<p>{props.projectOverview.projectAdditionalDetail.creditCheckResult}</p>
							</li>
						</ul>
					</div>
				</div>
				<div className="row">
					<div className="col-lg-4 col-sm-6">
						<ul>
							<li>
								<span>Insurance</span>
								<p>{props.projectOverview.projectAdditionalDetail.insurance}</p>
							</li>
						</ul>
					</div>
					<div className="col-lg-4 col-sm-6">
						<ul>
							<li>
								<span>Site Address</span>
								<p>{props.projectOverview.projectAdditionalDetail.siteAddress}</p>
							</li>
						</ul>
					</div>
					<div className="col-lg-4 col-sm-6">
						<ul>
							<li>
								<span>Form of Contract</span>
								<p>{props.projectOverview.projectAdditionalDetail.formOfContract}</p>
							</li>
						</ul>
					</div>
				</div>
				<div className="row">
					<div className="col-lg-4 col-sm-6">
						<ul>
							<li>
								<span>CDM Notifiable</span>
								<p>{props.projectOverview.projectAdditionalDetail.cdmNotifiable ? 'Yes' : 'No'}</p>
							</li>
						</ul>
					</div>
					<div className="col-lg-4 col-sm-6">
						<ul>
							<li>
								<span>Project is live</span>
								<p>{props.projectOverview.projectAdditionalDetail.isProjectLive ? 'Yes' : 'No'}</p>
							</li>
						</ul>
					</div>
					<div className="col-lg-4 col-sm-6">
						<ul>
							<li>
								<span>Retention</span>
								<p>{props.projectOverview.projectAdditionalDetail.retention}</p>
							</li>
						</ul>
					</div>
				</div>
				<div className="hr_line" />
				<div className="row">
					<div className="col-lg-12">
						<div className="plan_block">
							<h5>Project Plan</h5>
							<div className="row mb-4 justify-content-end">
								<div className="col-lg-2 mb-2 mb-lg-0">
									<label>Commence Date</label>
									<p>{convertDate(props.projectOverview.projectAdditionalDetail.commenceDate)}</p>
								</div>
								<div className="col-lg-2 mb-2 mb-lg-0">
									<label>Completion Date</label>
									<p>{convertDate(props.projectOverview.projectAdditionalDetail.completionDate)}</p>
								</div>
								<div className="col-lg-8">
									<label>Project Milestones</label>
									<p>{props.projectOverview.projectAdditionalDetail.milestones}</p>
								</div>
							</div>
							<div className="row mb-4 justify-content-end">
								<div className="col-lg-2 mb-2 mb-lg-0">
									<label>First Valuation Date</label>
									<p>
										{convertDate(props.projectOverview.projectAdditionalDetail.firstValuationDate)}
									</p>
								</div>
								<div className="col-lg-2 mb-2 mb-lg-0">
									<label>Final Account Date</label>
									<p>{convertDate(props.projectOverview.projectAdditionalDetail.finalAccountDate)}</p>
								</div>
								<div className="col-lg-8">
									<label>Valuation Intervals</label>
									<p>{props.projectOverview.projectAdditionalDetail.valuationIntervals}</p>
								</div>
								<div className="col-lg-8">
									<label>Payment Terms</label>
									<p>{props.projectOverview.projectAdditionalDetail.paymentTerms}</p>
								</div>
							</div>
							<div className="comment_block">
								<h5>Comments</h5>
								<p>{props.projectOverview.projectAdditionalDetail.comments}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProjectOverviewSummary;

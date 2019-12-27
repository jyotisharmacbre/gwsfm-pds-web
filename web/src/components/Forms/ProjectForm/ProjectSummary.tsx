import React from 'react';
import { IProjectDetail } from '../../../store/CustomerEnquiryForm/Types/IProjectDetail';

interface IProps {
	project: IProjectDetail;
}
const ProjectSummary: React.FC<IProps> = (props) => {
	return (
		<div className="RS_custom_block">
			<h4>Customer Enquiry</h4>
			<div className="RS_custom_inner">
				<div className="row">
					<div className="col-lg-4 col-sm-6">
						<ul>
							<li>
								<span>company</span>
								<p>{props.project.companyId}</p>
							</li>
						</ul>
					</div>
					<div className="col-lg-4 col-sm-6">
						<ul>
							<li>
								<span>company</span>
								<p>Lorem Ipsum Dolor</p>
							</li>
						</ul>
					</div>
					<div className="col-lg-4 col-sm-6">
						<ul>
							<li>
								<span>company</span>
								<p>Lorem Ipsum Dolor</p>
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
								<li>hello world one!...</li>
								<li>hello world two!...</li>
							</ul>
						</div>
						<div className="comment_block">
							<h5>Comments</h5>
							<p>Would you like to run the app on another port instead?</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProjectSummary;

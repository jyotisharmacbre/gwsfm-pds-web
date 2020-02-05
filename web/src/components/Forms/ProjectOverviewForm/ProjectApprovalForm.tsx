import React from 'react';
import { FormattedMessage } from 'react-intl';
import NewTypeAhead from '../../TypeAhead/NewTypeAhead';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faClock, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { ProjectSignOffStatus } from '../../../store/ProjectOverviewForm/Types/ProjectApprovalEnums';
import ProjectStatus from '../../../enums/ProjectStatus';

interface IProps {
	fields: any;
	formatUserData: any;
	getListOfUsers: (value: any) => Promise<any>;
	status: number
}

const ProjectApprovalForm: React.FC<IProps> = (props) => {
	const { fields, formatUserData, getListOfUsers } = props;
	const getClassAndIcon = (approverType) => {
		let className: string = '', iconType: any;
		let labelID: string = '';
		switch (approverType) {
			case ProjectSignOffStatus.Approved:
				className = "green";
				iconType = faCheckCircle;
				labelID = "LABEL_APPROVED"
				break;
			default:
				className = "orange";
				iconType = faClock;
				labelID = "LABEL_PENDING";
				break;
		}
		return {
			className: className,
			iconType: iconType,
			labelID: labelID
		};
	}
	return (
		<div>
			<div className="row">
				<div className="col-md-12 d-flex">
					<label />
					<h6 className="mb-0 d-none d-lg-block">
						<FormattedMessage id="LABEL_SIGN_OFF_STATUS" />{' '}
					</h6>
				</div>
			</div>
			{fields.map((member, index) => (
				<div className="row align-items-stretch" key={index} data-test="project-approval-form">
					<div className="col-lg-9">
						<div className="form-group">
							<NewTypeAhead
								name={`${member}.userId`}
								onSearch={getListOfUsers}
								formatData={formatUserData}
								DynamicsType={fields.get(index).approverTypeDescription}
								labelName={
									fields.get(index).showRangeLabel ? (
										fields.get(index).projectApprovalRangeDescription
									) : null
								}
								submitParam="email"
							/>
							<span className="right_fix_txt">{fields.get(index).approverTypeDescription}</span>
						</div>
					</div>
					<div className="col-lg-3">
						{fields.get(index).userId && fields.get(index).projectApprovalId && props.status == ProjectStatus.InReview && <div className="approve_state">
							{<span className="icon"><FontAwesomeIcon className={getClassAndIcon(fields.get(index).approvalStatus).className} icon={getClassAndIcon(fields.get(index).approvalStatus).iconType} /></span>}
							{<label className='approv_label'><FormattedMessage id={getClassAndIcon(fields.get(index).approvalStatus).labelID} /> </label>}
						</div>
						}	</div>
				</div>
			))}
		</div>
	);
};

export default ProjectApprovalForm;

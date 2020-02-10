import React from 'react';
import { FormattedMessage } from 'react-intl';
import NewTypeAhead from '../../TypeAhead/NewTypeAhead';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faClock, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { ProjectSignOffStatus } from '../../../store/ProjectOverviewForm/Types/ProjectApprovalEnums';

interface IProps {
	fields: any;
	formatUserData: any;
	getListOfUsers: (value: any) => Promise<any>;
}

const ProjectApprovalForm: React.FC<IProps> = (props) => {
	const { fields, formatUserData, getListOfUsers } = props;
	const getClassAndIcon = (approverType) => {
		let className: string = '', iconType: any;
		switch (approverType) {
			case ProjectSignOffStatus.Approved:
				className = "green";
				iconType = faCheckCircle
				break;
			case ProjectSignOffStatus.Pending:
				className = "orange";
				iconType = faClock
				break;
			case ProjectSignOffStatus.Draft:
				className = "orange";
				iconType = faExclamationTriangle
				break;
			default:
				break;
		}
		return {
			className: className,
			iconType: iconType
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
						{fields.get(index).userId && <div className="approve_state">
							{
								<span className="icon"><FontAwesomeIcon className={getClassAndIcon(fields.get(index).approvalStatus).className} icon={getClassAndIcon(fields.get(index).approvalStatus).iconType} /></span>}
						</div>
						}	</div>
				</div>
			))}
		</div>
	);
};

export default ProjectApprovalForm;

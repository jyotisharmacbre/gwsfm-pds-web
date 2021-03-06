import React from 'react';
import { FormattedMessage } from 'react-intl';
import TypeAhead from '../../TypeAhead/TypeAhead';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faClock, faExclamationTriangle, faSearch } from '@fortawesome/free-solid-svg-icons';
import { ProjectSignOffStatus } from '../../../store/ProjectOverviewForm/Types/ProjectApprovalEnums';
import ProjectStatus from '../../../enums/ProjectStatus';
import { getClassNameForProjectStatus } from '../../../helpers/utility-helper';

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
			labelKey: labelID
		};
	}
	const shouldDisplay = (currVal) => {
		return currVal.userId && currVal.projectApprovalId && (props.status == ProjectStatus.InReview || props.status == ProjectStatus.JAApproved);
	};
	
	return (
		<div>
			<div className="row">
				<div className="col-md-12 d-flex">
					<label />
					<h6 className="mb-0 d-none">
						<FormattedMessage id="LABEL_SIGN_OFF_STATUS" />{' '}
					</h6>
				</div>
			</div>
			{fields.map((member, index) => (
				<div className="row align-items-stretch" key={index} data-test="project-approval-form">
					<div className={`${getClassNameForProjectStatus(props.status)} col-11`}>
						<div className="form-group">
							<TypeAhead
								name={`${member}.userId`}
								onSearch={getListOfUsers}
								className="empty"
								formatData={formatUserData}
								DynamicsType={fields.get(index).approverTypeDescription}
								labelName={
									fields.get(index).showRangeLabel ? (
										fields.get(index).projectApprovalRangeDescription
									) : null
								}
								submitParam="email"
							/>
							
							<span className="placehold"><FontAwesomeIcon className="" icon={faSearch} /></span>
							<span className={`${getClassNameForProjectStatus(props.status)} right_fix_txt`}>{fields.get(index).approverTypeDescription}</span>							
						</div>
					</div>
					<div className="col-1 pl-0">
						{shouldDisplay(fields.get(index)) && <div className="approve_state ">
							<div className="form-group d-flex">
							{<span data-test="icons-approval-status" className="icon"><FontAwesomeIcon className={getClassAndIcon(fields.get(index).approvalStatus).className} icon={getClassAndIcon(fields.get(index).approvalStatus).iconType} /></span>}
							{<label className='approv_label'><FormattedMessage id={getClassAndIcon(fields.get(index).approvalStatus).labelKey} /> </label>}
						</div></div>
						}	</div>
				</div>
			))}
		</div>
	);
};

export default ProjectApprovalForm;

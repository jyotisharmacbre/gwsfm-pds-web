import React from 'react';
import { FormattedMessage } from 'react-intl';
import NewTypeAhead from '../../TypeAhead/NewTypeAhead';

interface IProps {
	fields: any;
	formatUserData: any;
	getListOfUsers: (value: any) => Promise<any>;
}

const ProjectApprovalForm: React.FC<IProps> = (props) => {
	const { fields, formatUserData, getListOfUsers } = props;

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
						<div className="approve_state">
							{/* <span className="icon"><FontAwesomeIcon className="green" icon={faCheckCircle} /></span> */}
							{/* <label className='approv_label'><FormattedMessage id="LABEL_APPROVED" /> </label> */}
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default ProjectApprovalForm;

import React from 'react';
import { IUserServiceData } from '../../../store/UserService/Types/IUserService';
import NewTypeAhead from '../../TypeAhead/NewTypeAhead';
import { IState } from '../../../store/state';
import { formValueSelector } from 'redux-form';
import { connect } from 'react-redux';

interface IProps {
  fields: any;
  getUserServiceDropdown: any;
  getListOfUsers: (value: any, success: any, failure: any) => void;
}

const ProjectApprovalForm: React.FC<IProps> = props => {
  const { fields, getUserServiceDropdown, getListOfUsers } = props;

  return (
    <div>
      {fields.map((member, index) => (
        <div
          className="row align-items-stretch"
          key={fields.get(index).approverTypeDescription}
        >
          {/* <div className="col-md-12 d-flex">
                <label><FormattedMessage id="LABEL_AUTHORISED_BY" /></label>
                <h6 className="mb-0 d-none d-lg-block"><FormattedMessage id="LABEL_SIGN_OFF_STATUS" /> </h6>
            </div> */}
          <div className="col-lg-9">
            <div className="form-group">
              <NewTypeAhead
                name={`${member}.userId`}
                onSearch={getListOfUsers}
                formatData={getUserServiceDropdown}
                DynamicsType={fields.get(index).approverTypeDescription}
                labelName={
                  fields.get(index).showRangeLabel
                    ? fields.get(index).projectApprovalRangeDescription
                    : null
                }
                submitParam="email"
              />
              <span className="right_fix_txt">
                {fields.get(index).approverTypeDescription}
              </span>
            </div>
          </div>
          {/* <div className="col-lg-3">
                <div className="approve_state">
                    <span className="icon"><FontAwesomeIcon className="green" icon={faCheckCircle} /></span>
                    <label className='approv_label'><FormattedMessage id="LABEL_APPROVED" /> </label>
                </div>
            </div> */}
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state: IState) => ({
  projectApprovals: selector(state, 'projectApprovals')
});
const selector = formValueSelector('ProjectOverviewForm');
export default connect(mapStateToProps)(ProjectApprovalForm);

import React from 'react';
import { IUserServiceData } from '../../../store/UserService/Types/IUserService';
import TypeAhead from '../../TypeAhead/TypeAhead';
import { IState } from '../../../store/state';
import { formValueSelector } from 'redux-form';
import { connect } from 'react-redux';

interface IProps {
    fields: any;
    onSearchUserService: (value: any) => void;
    userServiceData: Array<IUserServiceData>;
    getUserServiceDropdown: any;
}

const ProjectApprovalForm: React.FC<IProps> = props => {
    const {
        fields,
        onSearchUserService,
        getUserServiceDropdown
    } = props;


    return (
        <div>
            {fields.map((member, index) => (

                <div className="row align-items-stretch" key={fields.get(index).approverTypeDescription}>
                    {/* <div className="col-md-12 d-flex">
                <label><FormattedMessage id="LABEL_AUTHORISED_BY" /></label>
                <h6 className="mb-0 d-none d-lg-block"><FormattedMessage id="LABEL_SIGN_OFF_STATUS" /> </h6>
            </div> */}
                    <div className="col-lg-9">
                        <div className="form-group">
                            <TypeAhead name={`${member}.userId`}
                                options={getUserServiceDropdown}
                                DynamicsType={fields.get(index).approverTypeDescription}
                                onSearch={onSearchUserService}
                                labelName={fields.get(index).showRangeLabel ? fields.get(index).projectApprovalRangeDescription : null}
                                submitParam="email" />
                            <span className="right_fix_txt">{fields.get(index).approverTypeDescription}</span>
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
// export default ProjectApprovalForm;



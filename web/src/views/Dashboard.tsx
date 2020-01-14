import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { IState } from '../store/state';
import DashboardActionApprovalForm from '../components/Forms/Dashboard/ApprovalActionForm/DashboardActionApprovalForm';
import { IProjectDashboardGrid } from '../store/Dashboard/Types/IProjectDashboardGrid';
import { projectDashboardGridDetail } from '../store/Dashboard/Action';
import { ILookup } from '../store/Lookups/Types/ILookup';
import { getProjectStatus } from '../store/rootActions';
import { formatMessage } from '../Translations/connectedIntlProvider';
import { getDisplayName } from '../helpers/auth-helper';
import { getUserNamesForEmailsService } from '../store/UserService/Action';
import { IUserServiceData } from '../store/UserService/Types/IUserService';
import Notify from '../enums/Notify';
interface IMapDispatchToProps {
  dashboardGridDetail: () => void;
  getLookups: () => void;
  handleGetUserNamesForEmails: (emails: any) => void;
}
interface IMapStateToProps {
  dashboardGridValues: Array<IProjectDashboardGrid>;
  valuesCount: number;
  lookupDetails: Array<ILookup>;
  userNamesForEmails: Array<IUserServiceData>;
}
const Dashboard: React.FC<IMapStateToProps & IMapDispatchToProps> = props => {
  useEffect(() => {
    props.getLookups();
  }, []);
  useEffect(() => {
    if (props.dashboardGridValues.length > 0) {
      var allEmails = new Array();
      for (let recordNo in props.dashboardGridValues) {
        allEmails.push(props.dashboardGridValues[recordNo].modifiedBy);
      }
      allEmails = allEmails.filter(function(el) {
        return el != '';
      });
      if (allEmails.length > 0) props.handleGetUserNamesForEmails(allEmails);
    }
  }, [props.dashboardGridValues]);
  useEffect(() => {
      props.dashboardGridDetail();
  }, [props.lookupDetails]);
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="custom-wrap">
              <div className="row align-items-center my-3 my-lg-4 pb-2">
                <div className="col-xl-6">
                  <h1 className="top_Title2 m-0">
                    {formatMessage('TITLE_WELCOME')}{' '}
                    {getDisplayName() && getDisplayName()}
                  </h1>
                </div>
                <div className="col-xl-6">
                  <div className="mr-35 three-btn pb-0 pt-0 mt-4 mt-xl-0 d-flex justify-content-start justify-content-xl-end">
                    <Link to="/Pipeline">
                      <button name="save" className="active mr-3" type="button">
                        {formatMessage('BUTTON_PIPELINE')}
                      </button>
                    </Link>
                    <Link to="/Project">
                      <button type="button" name="next">
                        {formatMessage('BUTTON_CREATE_NEW_PROJ')}
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="top_Title top_Title2">
                <h2>{formatMessage('TITLE_MYACTIONS')}</h2>
              </div>
              <div className="table-grid-wrap price-sumry home_screen_table">
                <DashboardActionApprovalForm
                  actionApprovalValues={props.dashboardGridValues}
                  showValues={props.valuesCount}
                  lookupValues={props.lookupDetails}
                  userNamesForEmailsValues={props.userNamesForEmails}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: IState) => ({
  valuesCount: 5,
  lookupDetails: state.lookup.projectstatus,
  dashboardGridValues: state.dashboardGrid.actionApprovalDetails,
  userNamesForEmails: state.userService.userServiceData
});

const mapDispatchToProps = dispatch => {
  return {
    getLookups: () => dispatch(getProjectStatus()),
    dashboardGridDetail: () => dispatch(projectDashboardGridDetail()),
    handleGetUserNamesForEmails: allEmails =>
      dispatch(getUserNamesForEmailsService(allEmails))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);

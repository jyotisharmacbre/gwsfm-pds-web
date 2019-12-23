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
interface IMapDispatchToProps {
  dashboardGridDetail: () => void;
  getLookups: () => void;
}
interface IMapStateToProps {
  dashboardGridValues: Array<IProjectDashboardGrid>;
  valuesCount: number;
  lookupDetails: Array<ILookup>;
}
const Dashboard: React.FC<IMapStateToProps & IMapDispatchToProps> = props => {
  useEffect(() => {
    props.getLookups();
    props.dashboardGridDetail();
  }, []);
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="custom-wrap">
              <div className="row align-items-center">
                <div className="col-xl-6">
                  <h1 className="mb-0">{formatMessage('TITLE_WELCOME')} {getDisplayName() && getDisplayName()}</h1>
                </div>
                <div className="col-xl-6">
                  <div className="mr-35 three-btn justify-content-xl-end justify-content-lg-start pb-0">
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
            </div>
          </div>
          <DashboardActionApprovalForm
            actionApprovalValues={props.dashboardGridValues}
            showValues={props.valuesCount}
            lookupValues={props.lookupDetails}
          />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: IState) => ({
  valuesCount: 5,
  lookupDetails: state.lookup.projectstatus,
  dashboardGridValues: state.dashboardGrid.actionApprovalDetails
});

const mapDispatchToProps = dispatch => {
  return {
    getLookups: () => dispatch(getProjectStatus()),
    dashboardGridDetail: () => dispatch(projectDashboardGridDetail())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);

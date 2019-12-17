import { Grid } from '@material-ui/core';
import React, { useEffect } from 'react';
import { injectIntl } from 'react-intl';
import CardContainer from '../components/CardContainer/CardContainer';
import MultipleChart from '../components/Charts/MultipleCharts';
import PreferredChart from '../components/Charts/PreferredChart';
import RunRateChart from '../components/Charts/RunRateChart';
import HeaderPage from '../components/HeaderPage/HeaderPage';
import Table from '../components/Table/Simple/Table';
import { IBtnActionProps } from '../props/AppProps';
import IReactIntl from '../Translations/IReactIntl';
import Translate from '../Translations/translate';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { IState } from '../store/state';
import DashboardActionApprovalForm from '../components/Forms/Dashboard/ApprovalActionForm/DashboardActionApprovalForm';
import { IProjectDashboardGrid } from '../store/Dashboard/Types/IProjectDashboardGrid';
import { projectDashboardGridDetail } from '../store/Dashboard/Action';
import { ILookup } from '../store/Lookups/Types/ILookup';
import { getProjectStatus } from '../store/rootActions';
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
                  <h1 className="mb-0">Welcome Usersame Surname</h1>
                </div>
                <div className="col-xl-6">
                  <div className="mr-35 three-btn justify-content-xl-end justify-content-lg-start pb-0">
                    <Link to="/Pipeline">
                      <button name="save" className="active mr-3" type="button">
                        PIPELINE
                      </button>
                    </Link>
                    <Link to="/Project">
                      <button type="button" name="next">
                        CREATE NEW PROJECT
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <React.Fragment>
            <DashboardActionApprovalForm
              actionApprovalValues={props.dashboardGridValues}
              showValues={props.valuesCount}
              lookupValues={props.lookupDetails}
            />
          </React.Fragment>
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

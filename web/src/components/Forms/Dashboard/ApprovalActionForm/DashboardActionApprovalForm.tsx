import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { IState } from '../../../../store/state';
import moment from 'moment';
import { Link } from 'react-router-dom';
import GridTable from '../../../Table/GridTable';
import { getLookupDescription } from '../../../../helpers/utility-helper';
import { LookupItems } from '../../../../helpers/constants';

interface Props {
  actionApprovalValues: any;
  showValues: number;
  lookupValues: any;
}
const DashboardActionApprovalForm: React.FC<Props> = (props: any) => {
  const { actionApprovalValues, lookupValues } = props;
  const getActionApprovalValues = (allLookups, countVals) => {
    let data = actionApprovalValues.map(function(rowProject) {
      debugger;
      var statusID = rowProject.projectStatus;
      if (allLookups.length > 0)
        rowProject.projectStatus = (
          <p className="DashboardGridButtons">{rowProject.projectStatus}</p>
        );
      rowProject.name = (
        <Link
          to={{
            pathname: `/projectoverview/${rowProject.projectID}`,
            state: { fromDashboard: true }
          }}
        >
          {rowProject.name}
        </Link>
      );
      return rowProject;
    });
    return data;
  };
  return (
    <React.Fragment>
      <GridTable
        columns={getTableColumns()}
        data={getActionApprovalValues(lookupValues, props.showValues)}
        sorting={false}
        className="DashboardGrid"
        ActionList={[]}
      />
    </React.Fragment>
  );
};
const getTableColumns = () => {
  return [
    {
      title: 'Name',
      field: 'name'
    },
    { title: 'Updated By', field: 'updatedBy' },
    { title: 'Date', field: 'updatedDate' },
    {
      title: 'Status',
      field: 'projectStatus'
    }
  ];
};

const mapStateToProps = (state: IState) => ({
  initialValues: state.dashboardGrid.actionApprovalDetails
});
export default connect(mapStateToProps)(DashboardActionApprovalForm);

import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { IState } from '../../../../store/state';
import moment from 'moment';
import { Link } from 'react-router-dom';
import GridTable from '../../../Table/GridTable';
import { injectIntl } from 'react-intl';
import { reduxForm, InjectedFormProps } from 'redux-form';
import { IProjectDashboardGrid } from '../../../../store/Dashboard/Types/IProjectDashboardGrid';
import IReactIntl from '../../../../Translations/IReactIntl';
import { ILookup } from '../../../../store/Lookups/Types/ILookup';
import { getLookupDescription } from '../../../../helpers/utility-helper';
import { LookupItems } from '../../../../helpers/constants';

interface Props {
  actionApprovalValues: any;
  showValues: number;
  lookupValues: Array<ILookup>;
  userNamesForEmailsValues: any;
}
let DashboardActionApprovalForm: React.FC<
  Props & InjectedFormProps<Array<IProjectDashboardGrid>, Props>
> = props => {
  const [gridData, setGridData] = useState<Array<IProjectDashboardGrid>>([]);

  useEffect(() => {
    if (
      props.actionApprovalValues &&
      props.lookupValues &&
      props.userNamesForEmailsValues &&
      props.showValues &&
      props.userNamesForEmailsValues
    ) {
      debugger;
      setGridData(
        getActionApprovalValues(
          props.actionApprovalValues,
          props.lookupValues,
          props.userNamesForEmailsValues,
          props.showValues
        )
      );
    }
  }, [
    props.actionApprovalValues,
    props.lookupValues,
    props.userNamesForEmailsValues,
    props.showValues
  ]);

  const getActionApprovalValues = (
    data,
    allLookups,
    namesAndEmails,
    countVals
  ) => {
    let result = data.map(function(rowProject) {
      var statusID = rowProject.approvalStatus;
      if (!isNaN(statusID) && allLookups.length > 0)
        rowProject.approvalStatus = getLookupDescription(
          allLookups,
          rowProject.approvalStatus,
          LookupItems.Project_Approval_Sign_Off_Status
        );
      var mailObj = namesAndEmails.find(
        lk => lk.email.toUpperCase() === rowProject.modifiedBy.toUpperCase()
      );
      rowProject.modifiedBy = mailObj
        ? `${mailObj.firstname} ${mailObj.lastName}`
        : rowProject.modifiedBy;
      rowProject.name = (
        <Link
          to={{
            pathname: `/reviewsubmit/${rowProject.projectId}`,
            state: { fromDashboard: true }
          }}
        >
          {rowProject.name}
        </Link>
      );
      rowProject.modifiedOn =
        rowProject.modifiedOn != ''
          ? moment(rowProject.modifiedOn).format('MM/DD/YYYY')
          : '';
      return rowProject;
    });
    return result;
  };
  return (
    <React.Fragment>
      <GridTable
        columns={getTableColumns()}
        data={gridData}
        sorting={false}
        className="price-table home_screen_table"
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
    { title: 'Updated By', field: 'modifiedBy' },
    { title: 'Date', field: 'modifiedOn' },
    {
      title: 'Status',
      field: 'approvalStatus'
    }
  ];
};

const mapStateToProps = (state: IState) => ({
  initialValues: state.dashboardGrid.actionApprovalDetails
});

const form = reduxForm<Array<IProjectDashboardGrid>, Props>({
  form: 'DashboardActionApprovalForm',
  enableReinitialize: true
})(DashboardActionApprovalForm);
export default connect(mapStateToProps)(form);

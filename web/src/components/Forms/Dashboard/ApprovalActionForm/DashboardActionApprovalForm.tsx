import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { IState } from '../../../../store/state';
import moment from 'moment';
import { Link } from 'react-router-dom';
import GridTable from '../../../Table/GridTable';
import { injectIntl, FormattedMessage } from 'react-intl';
import { reduxForm, InjectedFormProps } from 'redux-form';
import { IProjectDashboardGrid } from '../../../../store/Dashboard/Types/IProjectDashboardGrid';
import IReactIntl from '../../../../Translations/IReactIntl';
import { ILookup } from '../../../../store/Lookups/Types/ILookup';
import { getLookupDescription } from '../../../../helpers/utility-helper';
import { LookupItems } from '../../../../helpers/constants';
import { IUserServiceData } from '../../../../store/UserService/Types/IUserService';

interface Props {
  actionApprovalValues: Array<IProjectDashboardGrid>;
  showValues: number;
  lookupValues: Array<ILookup>;
  userNamesForEmailsValues: Array<IUserServiceData>;
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
    let result =
      data &&
      data.map(function (rowProject) {
        var statusID = rowProject.approvalStatus;
        if (!isNaN(statusID) && allLookups.length > 0) {
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
        }
        return rowProject;
      });
    return result;
  };
  return (
    <React.Fragment>
      {gridData.length > 0 ? <GridTable
        columns={getTableColumns()}
        data={gridData}
        sorting={false}
        className="price-table home_screen_table"
        ActionList={[]}
      /> : <span>{'No pending actions'}</span>}
    </React.Fragment>
  );
};
const getTableColumns = () => {
  return [
    {
      title: <FormattedMessage id="HOMESCREEN_GRID_COLUMN_NAME" />,
      field: 'name'
    },
    {
      title: <FormattedMessage id="HOMESCREEN_GRID_COLUMN_UPDATEDBY" />,
      field: 'modifiedBy'
    },
    {
      title: <FormattedMessage id="HOMESCREEN_GRID_COLUMN_DATE" />,
      field: 'modifiedOn'
    },
    {
      title: <FormattedMessage id="HOMESCREEN_GRID_COLUMN_STATUS" />,
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

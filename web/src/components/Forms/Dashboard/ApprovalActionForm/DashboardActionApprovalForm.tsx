import React, { useEffect } from 'react';
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

interface Props {
  actionApprovalValues: Array<IProjectDashboardGrid>;
  showValues: number;
  lookupValues: Array<ILookup>;
}
let DashboardActionApprovalForm: React.FC<
  Props & InjectedFormProps<Array<IProjectDashboardGrid>, Props>
> = props => {
  const { actionApprovalValues, lookupValues } = props;
  const getActionApprovalValues = (allLookups, countVals) => {
    return actionApprovalValues;
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
const form = reduxForm<Array<IProjectDashboardGrid>, Props>({
  form: 'DashboardActionApprovalForm',
  enableReinitialize: true
})(DashboardActionApprovalForm);
export default connect(mapStateToProps)(form);

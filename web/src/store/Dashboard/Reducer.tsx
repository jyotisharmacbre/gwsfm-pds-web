import { ActionType } from './Types/ActionType';
import { updateObject } from '../../helpers/utility-helper';
import { IProjectDashboardGridState } from './Types/IProjectDashboardGridState';
import moment from 'moment';
import Notify from '../../enums/Notify';

export const initialState: IProjectDashboardGridState = {
  actionApprovalDetails: [
    {
      name: '',
      modifiedBy: 'last@name.test',
      modifiedOn: '',
      approvalStatus: '1',
      projectId: ''
    }
  ],
  error: null
};

const DashboardGridDetailSuccess = (oldState, action) => {
  return updateObject(oldState, {
    error: null,
    loading: false,
    actionApprovalDetails: action.payload
  });
};

const DashboardGridDetailError = (oldState, action) => {
  return updateObject(oldState, {
    error: action.error,
    loading: false,
    notify: Notify.error
  });
};

const DashboardGridDetailReducer = (oldState = initialState, action) => {
  switch (action.type) {
    case ActionType.PROJECT_DASHBOARD_GRID_DETAILS:
      return DashboardGridDetailSuccess(oldState, action);
    case ActionType.PROJECT_DASHBOARD_GRID_ERROR:
      return DashboardGridDetailError(oldState, action);
    default:
      return oldState;
  }
};

export default DashboardGridDetailReducer;

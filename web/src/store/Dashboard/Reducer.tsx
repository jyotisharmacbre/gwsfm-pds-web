import { ActionType } from './Types/ActionType';
import { updateObject } from '../../helpers/utility-helper';
import { IProjectDashboardGridState } from './Types/IProjectDashboardGridState';
import moment from 'moment';
import Notify from '../../enums/Notify';

const initialState: IProjectDashboardGridState = {
  actionApprovalDetails: [
    {
      name: '',
      updatedBy: '',
      updatedDate: '',
      projectStatus: 2,
      projectID: ''
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
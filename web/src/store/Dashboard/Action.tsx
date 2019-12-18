import * as axios from '../../client';
import { ActionType } from './Types/ActionType';
import { Dispatch } from 'redux';

const DashboardGridDetailSuccess = (response: any) => {
  return {
    type: ActionType.PROJECT_DASHBOARD_GRID_DETAILS,
    payload: response
  };
};

const DashboardGridDetailError = (error: string) => {
  return {
    type: ActionType.PROJECT_DASHBOARD_GRID_ERROR,
    payload: error
  };
};

const headers = {
  'Content-Type': 'application/json'
};

export const projectDashboardGridDetail = () => {
  return (dispatch: Dispatch) => {
    let data = [
      {
        name: 'Sample Project',
        updatedBy: 'Admin',
        updatedDate: '01-01-2019',
        projectStatus: 2,
        projectID: 'GUID_Value'
      },
      {
        name: 'Dummy Project',
        updatedBy: 'head admin',
        updatedDate: '02-02-2019',
        projectStatus: 1,
        projectID: 'Some_GUID_Value'
      }
    ];
    dispatch(DashboardGridDetailSuccess(data));
  };
};

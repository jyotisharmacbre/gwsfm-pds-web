import * as axios from '../../client';
import { ActionType } from './Types/ActionType';
import { Dispatch } from 'redux';

const getProjectStatusSuccess = (response: any) => {
  return {
    type: ActionType.LOOKUP_PROJECT_STATUS_GET_SUCCESS,
    payload: response
  };
};

const getProjectStatusError = (error: any) => {
  return {
    type: ActionType.LOOKUP_PROJECT_STATUS_GET_ERROR,
    payload: error
  };
};

const headers = {
  'Content-Type': 'application/json'
};
export const getProjectStatus = () => {
  var data = [
    'Project_Status',
    'Engagement_Type',
    'Contract_Type',
    'Country',
    'Currency',
    'Asset'
  ];
  return (dispatch: Dispatch) => {
    axios.baseAPI
      .post('LookupData/GetLookupsByIds', data, { headers: headers })
      .then(response => {
        dispatch(getProjectStatusSuccess(response.data));
      })
      .catch(error => {
        dispatch(getProjectStatusError(error));
      });
  };
};

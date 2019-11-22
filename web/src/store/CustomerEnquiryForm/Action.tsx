import * as axios from '../../client';
import { ActionType } from './Types/ActionType';
import { Dispatch } from 'redux';
import { IProjectDetail } from './Types/IProjectDetail';

const projectDetailAddSuccess = (response: any) => {
  return {
    type: ActionType.PROJECT_ADD,
    payload: response
  };
};

const projectDetailEditSuccess = (response: number) => {
  return {
    type: ActionType.PROJECT_EDIT_SUCCESS,
    payload: response
  };
};

const projectDetailError = (error: string) => {
  return {
    type: ActionType.PROJECT_ADD_ERROR,
    payload: error
  };
};

const headers = {
  'Content-Type': 'application/json'
};

export const projectDetailAdd = (data: IProjectDetail) => {
  console.log(data,"submitted data")
  return (dispatch: Dispatch) => {
    axios.baseAPI
      .post('Projects/customerEnquiry', data, { headers: headers })
      .then(response => {
        debugger;
        dispatch(projectDetailAddSuccess(response.data));
      })
      .catch(error => {
        dispatch(projectDetailError(error));
      });
  };
};

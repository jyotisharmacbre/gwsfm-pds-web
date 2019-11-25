import * as axios from '../../client';
import { ActionType } from './Types/ActionType';
import { Dispatch } from 'redux';
import { IProjectDetail } from './Types/IProjectDetail';
import { IProject } from './Types/IProject';

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
  return (dispatch: Dispatch) => {
    axios.baseAPI
      .post('Projects/customerEnquiry', data, { headers: headers })
      .then(response => {
        dispatch(projectDetailAddSuccess(response.data));
      })
      .catch(error => {
        dispatch(projectDetailError(error));
      });
  };
};

const getEnquiryOverviewSuccess = (response: IProject) => {
  return {
    type: ActionType.GET_ENQUIRY_OVERVIEW_SUCCESS,
    payload: response
  };
};

const getEnquiryOverviewError = (error: string) => {
  return {
    type: ActionType.GET_ENQUIRY_OVERVIEW_ERROR,
    payload: error
  };
};

export const getEnquiryOverview = (projectId: string) => {
  return (dispatch: Dispatch) => {
    axios.baseAPI
      .get(`api/Projects/${projectId}/enquiryOverview`)
      .then(response => {
        dispatch(getEnquiryOverviewSuccess(response.data));
      })
      .catch(error => {
        dispatch(getEnquiryOverviewError(error));
      });
  };
};

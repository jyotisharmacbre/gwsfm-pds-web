import * as axios from '../../client';
import { ActionType } from './Types/ActionType';
import { Dispatch } from 'redux';
import { IProjectAdditionalDetail } from './Types/IProjectAdditionalDetail';

const projectOverviewFormAddSuccess = (response: any) => {
  return {
    type: ActionType.PROJECT_OVERVIEW_FORM_ADD_SUCCESS,
    payload: response
  };
};

const projectOverviewFormEditSuccess = (response: number) => {
  return {
    type: ActionType.PROJECT_OVERVIEW_FORM_EDIT_SUCCESS,
    payload: response
  };
};

const projectOverviewFormError = (error: string) => {
  return {
    type: ActionType.PROJECT_OVERVIEW_FORM_ERROR,
    payload: error
  };
};

export const projectOverviewFormAdd = (data: IProjectAdditionalDetail) => {
  return (dispatch: Dispatch) => {
    axios.baseAPI
      .post('/projectoverview/add')
      .then(response => {
        dispatch(projectOverviewFormAddSuccess(response.data));
      })
      .catch(error => {
        dispatch(projectOverviewFormError(error));
      });
  };
};

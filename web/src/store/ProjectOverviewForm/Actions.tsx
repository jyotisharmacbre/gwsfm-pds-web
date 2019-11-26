import * as axios from '../../client';
import { ActionType } from './Types/ActionType';
import { Dispatch } from 'redux';
import { IProjectAdditionalDetail } from './Types/IProjectAdditionalDetail';
import moment from 'moment';
import EventType from '../../enums/EventType';

const projectOverviewFormAddSuccess = (response: any, event: EventType) => {
  return {
    type: ActionType.PROJECT_OVERVIEW_FORM_ADD_SUCCESS,
    payload: response,
    event: event
  };
};

const projectOverviewFormEditSuccess = (response: any, event: EventType) => {
  return {
    type: ActionType.PROJECT_OVERVIEW_FORM_EDIT_SUCCESS,
    payload: response,
    event: event
  };
};

const projectOverviewFormError = (error: string) => {
  return {
    type: ActionType.PROJECT_OVERVIEW_FORM_ERROR,
    payload: error
  };
};

const getAdditionalDetailsSuccess = (response: any) => {
  return {
    type: ActionType.GET_ADDITIONALS_DETAILS_SUCCESS,
    payload: response
  };
};

const getAdditionalDetailsError = (error: string) => {
  return {
    type: ActionType.GET_ADDITIONALS_DETAILS_ERROR,
    payload: error
  };
};
let config = {
  headers: {
    'Content-Type': 'application/json'
  }
};
export const projectOverviewFormAdd = (
  projectId: string,
  data: IProjectAdditionalDetail,
  event: EventType
) => {
  data.projectId = projectId;
  return (dispatch: Dispatch) => {
    axios.baseAPI
      .post('api/Projects/additionalDetails', data, config)
      .then(response => {
        dispatch(projectOverviewFormAddSuccess(response.data, event));
      })
      .catch(error => {
        dispatch(projectOverviewFormError(error));
      });
  };
};

export const projectOverviewFormEdit = (
  data: IProjectAdditionalDetail,
  event: EventType
) => {
  return (dispatch: Dispatch) => {
    axios.baseAPI
      .put('api/Projects/additionalDetails', data, config)
      .then(response => {
        dispatch(projectOverviewFormEditSuccess(response.data, event));
      })
      .catch(error => {
        dispatch(projectOverviewFormError(error));
      });
  };
};

export const getAdditionalDetails = (projectId: string) => {
  return (dispatch: Dispatch) => {
    axios.baseAPI
      .get(`api/Projects/${projectId}/additionalDetails`, config)
      .then(response => {
        dispatch(getAdditionalDetailsSuccess(response.data));
      })
      .catch(error => {
        dispatch(getAdditionalDetailsError(error));
      });
  };
};

const resetProjectOverviewStateDispatch = () => {
  return {
    type: ActionType.RESET_PROJECT_OVERVIEW_STATE
  };
};

export const resetProjectOverviewState = () => {
  return (dispatch: Dispatch) => {
    dispatch(resetProjectOverviewStateDispatch());
  }
};

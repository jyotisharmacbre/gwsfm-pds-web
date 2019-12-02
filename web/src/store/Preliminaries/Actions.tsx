import * as axios from '../../client';
import { ActionType } from './Types/ActionType';
import { Dispatch } from 'redux';
import { IPreliminariesComponentDetails } from './Types/IPreliminariesComponentDetails';

const preliminaryAddSuccess = (response: any) => {
  return {
    type: ActionType.PRELIMINARY_ADD_SUCCESS,
    payload: response
  };
};
const preliminaryAddError = (error: string) => {
  return {
    type: ActionType.PRELIMINARY_ADD_ERROR,
    payload: error
  };
};
const preliminaryEditSuccess = (response: any) => {
  return {
    type: ActionType.PRELIMINARY_EDIT_SUCCESS,
    payload: response
  };
};
const preliminaryEditError = (response: any) => {
  return {
    type: ActionType.PRELIMINARY_EDIT_ERROR,
    payload: response
  };
};

const preliminaryGetDataSuccess = (response: any) => {
  return {
    type: ActionType.GET_PRELIMINARY_SUCCESS,
    payload: response
  };
};

const preliminaryGetDataError = (error: string) => {
  return {
    type: ActionType.GET_PRELIMINARY_ERROR,
    payload: error
  };
};

let config = {
  headers: {
    'Content-Type': 'application/json'
  }
};
export const preliminaryAdd = (
  projectId: string,
  preliminaryDetails: Array<IPreliminariesComponentDetails>
) => {
  return (dispatch: Dispatch) => {
    axios.baseAPI
      .post(
        'api/Preliminary/preliminaryDataDetails',
        preliminaryDetails,
        config
      )
      .then(response => {
        dispatch(preliminaryAddSuccess(response));
      })
      .catch(error => {
        dispatch(preliminaryAddError(error));
      });
  };
};

export const preliminaryEdit = (
  projectId: string,
  preliminaryDetails: Array<IPreliminariesComponentDetails>
) => {
  return (dispatch: Dispatch) => {
    axios.baseAPI
      .put(
        'api/Preliminary/updatePreliminaryDetails',
        preliminaryDetails,
        config
      )
      .then(response => {
        dispatch(preliminaryEditSuccess(response));
      })
      .catch(error => {
        dispatch(preliminaryEditError(error));
      });
  };
};

export const getPreliminaryDetails = (projectId: string) => {
  return (dispatch: Dispatch) => {
    axios.baseAPI
      .get(`api/Preliminary/${projectId}/getPreliminaryDetails`, config)
      .then(response => {
        dispatch(preliminaryGetDataSuccess(response));
      })
      .catch(error => {
        dispatch(preliminaryGetDataError(error));
      });
  };
};

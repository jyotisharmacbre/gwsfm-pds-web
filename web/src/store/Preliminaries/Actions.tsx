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
const expandPreliminaryComponentBy = (componentId: string) => {
  return {
    type: ActionType.EXPAND_PRELIMINARY_COMPONENT,
    payload: componentId
  };
};
const expandAllPreliminaryComponent = () => {
  return {
    type: ActionType.EXPAND_ALL_PRELIMINARY_COMPONENTS
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
        dispatch(preliminaryAddSuccess(response.data));
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
        dispatch(preliminaryEditSuccess(response.data));
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
        dispatch(preliminaryGetDataSuccess(response.data));
      })
      .catch(error => {
        dispatch(preliminaryGetDataError(error));
      });
  };
};
export const expandPreliminaryComponentByComponentId = (
  componentId: string
) => {
  return (dispatch: Dispatch) => {
    dispatch(expandPreliminaryComponentBy(componentId));
  };
};
export const expandAllPreliminaryComponents = () => {
  return (dispatch: Dispatch) => {
    dispatch(expandAllPreliminaryComponent());
  };
};

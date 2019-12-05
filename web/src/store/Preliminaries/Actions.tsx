import * as axios from '../../client';
import { ActionType } from './Types/ActionType';
import { Dispatch } from 'redux';
import { IPreliminaries } from './Types/IPreliminaries';
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
const getLookUpDetail=(response:any)=>
{
  return {
    type: ActionType.GET_LOOKUP_DETAILS,
    payload: response
  };
}

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
  preliminaryDetails:  Array<IPreliminaries>
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
  preliminaryDetails:  Array<IPreliminaries>
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
export const getLookUpDetails = (projectId:string) => {
  var data = [
    'Pre_Components',
    'Pre_Component_Items'
  ];
  return (dispatch: Dispatch) => {
    axios.baseAPI
      .post('api/LookupData/GetLookupsByIds', data, config)
      .then(response => {
        dispatch(getLookUpDetail(response.data));
        getPreliminaryDetails(projectId);
      })
      .catch(error => {
        dispatch(getLookUpDetail(error));
      });
  };
};

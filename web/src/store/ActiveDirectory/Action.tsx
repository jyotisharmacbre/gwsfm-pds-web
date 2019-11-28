import * as axios from '../../client';
import { ActionType } from './Types/ActionType';
import { Dispatch } from 'redux';

const getADhopSuccess = (response: any) => {
  return {
    type: ActionType.AD_HOP_GET_SUCCESS,
    payload: response
  };
};

const getADhopError = (error: any) => {
  return {
    type: ActionType.AD_HOP_GET_ERROR,
    payload: error
  };
};

const getADpmSuccess = (response: any) => {
  return {
    type: ActionType.AD_PM_GET_SUCCESS,
    payload: response
  };
};

const getADpmError = (error: any) => {
  return {
    type: ActionType.AD_PM_GET_ERROR,
    payload: error
  };
};

const getADpoSuccess = (response: any) => {
  return {
    type: ActionType.AD_PO_GET_SUCCESS,
    payload: response
  };
};

const getADpoError = (error: any) => {
  return {
    type: ActionType.AD_PO_GET_ERROR,
    payload: error
  };
};

export const getADhopOther = (response: any) => {
  console.log(response);
  return {
    type: ActionType.AD_HOP_GET_OTHER,
    payload: response
  };
};

export const getADpmOther = (response: any) => {
  console.log(response);
  return {
    type: ActionType.AD_PM_GET_OTHER,
    payload: response
  };
};

export const getADpoOther = (response: any) => {
  console.log(response);
  return {
    type: ActionType.AD_PO_GET_OTHER,
    payload: response
  };
};

let config = {
  headers: {
    'Content-Type': 'application/json'
  }
};
export const getActiveDirectoryHOP = (searchHOP: string) => {
  return (dispatch: Dispatch) => {
    axios.baseAPI
      .get(
        `/api/DynamicsLookup/getCompanies/${searchHOP}?topCount=50
    `,
        config
      )
      .then(response => {
        dispatch(getADhopSuccess(response.data));
      })
      .catch(error => {
        dispatch(getADhopError(error));
      });
  };
};

export const getActiveDirectoryPM = (searchPM: string) => {
  return (dispatch: Dispatch) => {
    axios.baseAPI
      .get(
        `/api/DynamicsLookup/getCompanies/${searchPM}?topCount=50
    `,
        config
      )
      .then(response => {
        dispatch(getADpmSuccess(response.data));
      })
      .catch(error => {
        dispatch(getADpmError(error));
      });
  };
};

export const getActiveDirectoryPO = (searchPO: string) => {
  return (dispatch: Dispatch) => {
    axios.baseAPI
      .get(
        `/api/DynamicsLookup/getCompanies/${searchPO}?topCount=50
    `,
        config
      )
      .then(response => {
        dispatch(getADpoSuccess(response.data));
      })
      .catch(error => {
        dispatch(getADpoError(error));
      });
  };
};

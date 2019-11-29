import { ActionType } from './Types/ActionType';
import { updateObject } from '../../helpers/utility-helper';
import { IUserServiceState } from './Types/IUserServiceState';

const initialState: IUserServiceState = {
  ADhopData: [],
  ADpmData: [],
  ADpoData: [],
  error: null
};

const getADHOPSuccess = (oldState, action) => {
  return updateObject(oldState, {
    error: null,
    ADhopData: action.payload
  });
};

const getADHOPError = (oldState, action) => {
  return updateObject(oldState, {
    error: action.payload
  });
};

const getADPMSuccess = (oldState, action) => {
  return updateObject(oldState, {
    error: null,
    ADpmData: action.payload
  });
};

const getADPMError = (oldState, action) => {
  return updateObject(oldState, {
    error: action.payload
  });
};

const getADPOSuccess = (oldState, action) => {
  return updateObject(oldState, {
    error: null,
    ADpoData: action.payload
  });
};

const getADPOError = (oldState, action) => {
  return updateObject(oldState, {
    error: action.payload
  });
};

const userServiceReducer = (oldState = initialState, action) => {
  switch (action.type) {
    case ActionType.AD_HOP_GET_SUCCESS:
      return getADHOPSuccess(oldState, action);
    case ActionType.AD_HOP_GET_ERROR:
      return getADHOPError(oldState, action);
    case ActionType.AD_PM_GET_SUCCESS:
      return getADPMSuccess(oldState, action);
    case ActionType.AD_PM_GET_ERROR:
      return getADPMError(oldState, action);
    case ActionType.AD_PO_GET_SUCCESS:
      return getADPOSuccess(oldState, action);
    case ActionType.AD_PO_GET_ERROR:
      return getADPOError(oldState, action);
    default:
      return oldState;
  }
};

export default userServiceReducer;

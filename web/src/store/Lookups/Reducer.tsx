import { ActionType } from './Types/ActionType';
import { updateObject } from '../../helpers/utility-helper';
import { ILookupState } from './Types/ILookupState';
import moment from 'moment';

const initialState: ILookupState = {
  projectstatus: [],
  currencies: null,
  error: null
};

const getProjectStatusSuccess = (oldState, action) => {
  return updateObject(oldState, {
    error: null,
    projectstatus: action.payload
  });
};

const getProjectStatusError = (oldState, action) => {
  return updateObject(oldState, {
    error: action.payload
  });
};

const getAllCurrenciesSuccess = (oldState, action) => {
  return updateObject(oldState, {
    currencies: action.payload,
    error: null
  });
};

const getAllCurrenciesError = (oldState, action) => {
  return updateObject(oldState, {
    error: action.payload
  });
};

const lookupReducer = (oldState = initialState, action) => {
  switch (action.type) {
    case ActionType.LOOKUP_PROJECT_STATUS_GET_SUCCESS:
      return getProjectStatusSuccess(oldState, action);
    case ActionType.LOOKUP_PROJECT_STATUS_GET_ERROR:
      return getProjectStatusError(oldState, action);
    case ActionType.GET_ALL_CURRENCIES_SUCCESS:
      return getAllCurrenciesSuccess(oldState, action);
    case ActionType.GET_ALL_CURRENCIES_ERROR:
      return getAllCurrenciesError(oldState, action);
    default:
      return oldState;
  }
};

export default lookupReducer;

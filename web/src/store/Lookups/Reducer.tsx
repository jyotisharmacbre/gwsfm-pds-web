import { ActionType } from './Types/ActionType';
import { updateObject } from '../../helpers/utility-helper';
import { ILookupState } from './Types/ILookupState';
import moment from 'moment';

const initialState: ILookupState = {
  projectstatus: [],
  lookups: [],
  currencies: null,
  languages: null,
  countries: null,
  error: null
};

const getProjectStatusSuccess = (oldState, action) => {
  sessionStorage.setItem("lookupData", JSON.stringify(action.payload));
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

const getLookupsSuccess = (oldState, action) => {
  // sessionStorage.setItem("lookupApprovalData", JSON.stringify(action.payload));
  return updateObject(oldState, {
    error: null,
    lookups: action.payload
  });
};

const getLookupsError = (oldState, action) => {
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

const getAllLanguagesSuccess = (oldState, action) => {
  return updateObject(oldState, {
    languages: action.payload,
    error: null
  });
};

const getAllLanguagesError = (oldState, action) => {
  return updateObject(oldState, {
    error: action.payload
  });
};

const getAllCountriesSuccess = (oldState, action) => {
  return updateObject(oldState, {
    countries: action.payload,
    error: null
  });
};

const getAllCountriesError = (oldState, action) => {
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
    case ActionType.LOOKUPS_GET_SUCCESS:
      return getLookupsSuccess(oldState, action);
    case ActionType.LOOKUPS_GET_ERROR:
      return getLookupsError(oldState, action);
    case ActionType.GET_ALL_CURRENCIES_SUCCESS:
      return getAllCurrenciesSuccess(oldState, action);
    case ActionType.GET_ALL_CURRENCIES_ERROR:
      return getAllCurrenciesError(oldState, action);
    case ActionType.GET_ALL_LANGUAGE_SUCCESS:
      return getAllLanguagesSuccess(oldState, action);
    case ActionType.GET_ALL_LANGUAGE_ERROR:
      return getAllLanguagesError(oldState, action);
    case ActionType.GET_ALL_COUNTRIES_SUCCESS:
      return getAllCountriesSuccess(oldState, action);
    case ActionType.GET_ALL_COUNTRIES_ERROR:
      return getAllCountriesError(oldState, action);
    default:
      return oldState;
  }
};

export default lookupReducer;

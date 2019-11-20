import { ActionType } from './Types/ActionType';
import { updateObject } from '../../helpers/utility-helper';
import { ILookupState } from './Types/ILookupState';
import moment from 'moment';

const initialState: ILookupState = {
  projectstatus: [],
  error: null
};

const getProjectStatusSuccess = (oldState, action) => {
  debugger;
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

const lookupReducer = (oldState = initialState, action) => {
  switch (action.type) {
    case ActionType.LOOKUP_PROJECT_STATUS_GET_SUCCESS:
      return getProjectStatusSuccess(oldState, action);
    case ActionType.LOOKUP_PROJECT_STATUS_GET_ERROR:
      return getProjectStatusError(oldState, action);
    default:
      return oldState;
  }
};

export default lookupReducer;

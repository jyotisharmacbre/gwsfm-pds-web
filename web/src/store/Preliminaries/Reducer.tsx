import { ActionType } from './Types/ActionType';
import { initialState } from './InitialState';
import { updateObject } from '../../helpers/utility-helper';
import { bindUserData } from "./DataWrapper";
import Notify from '../../enums/Notify';
const preliminaryAddSuccess = (oldState, action) => {
  let preliminaryDetails = oldState.preliminaryDetails;
  action.payload?.data.forEach((item) => {
    preliminaryDetails.filter(x => x.componentId == item.preliminariesComponentId)[0].
      items.filter(x => x.itemId == item.preliminariesItemId)[0].
      preliminaryId = item.preliminaryId;
  });
  return updateObject(oldState, {
    notify: Notify.success,
    event: action.event,
    preliminaryDetails
  });
};
const preliminaryAddError = (oldState, action) => {
  return updateObject(oldState, {
    notify: Notify.error,
    event: action.event
  });
}
const preliminaryEditSuccess = (oldState, action) => {
  return updateObject(oldState, {
    notify: Notify.success,
    event: action.event
  });
}
const preliminaryEditError = (oldState, action) => {
  return updateObject(oldState, {
    notify: Notify.error,
    event: action.event
  });
};
const preliminaryGetSuccess = (oldState, action) => {
  return updateObject(oldState, {
    notify: Notify.none,
    preliminaryDetails: bindUserData(action.payload)
  });
};
const preliminaryGetError = (oldState, action) => {
  return initialState;
};
const preliminaryReducer = (oldState = initialState, action) => {
  switch (action.type) {
    case ActionType.PRELIMINARY_ADD_SUCCESS:
      return preliminaryAddSuccess(oldState, action);
    case ActionType.PRELIMINARY_ADD_ERROR:
      return preliminaryAddError(oldState, action);
    case ActionType.PRELIMINARY_EDIT_SUCCESS:
      return preliminaryEditSuccess(oldState, action);
    case ActionType.PRELIMINARY_EDIT_SUCCESS:
      return preliminaryEditError(oldState, action);
    case ActionType.GET_PRELIMINARY_SUCCESS:
      return preliminaryGetSuccess(oldState, action);
    case ActionType.GET_PRELIMINARY_ERROR:
      return preliminaryGetError(oldState, action);
    default:
      return oldState;
  }
};
export default preliminaryReducer;

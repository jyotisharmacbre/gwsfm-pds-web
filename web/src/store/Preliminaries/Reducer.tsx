import { ActionType } from './Types/ActionType';
import { initialState } from './InitialState';
import { updateObject } from '../../helpers/utility-helper';
import Notify from '../../enums/Notify';

const updatePreliminaryState=(preliminaryDetails, action)=>{
  action.payload?.data.forEach((item) => {
    let newItem =   preliminaryDetails.find(x => x.componentId == item.preliminariesComponentId)
      .items.find(x => x.itemId == item.preliminariesItemId);
      newItem.preliminaryId = item.preliminaryId;
      newItem.nameOfSupplier=item.nameOfSupplier;
      newItem.noOfHours= item.noOfHours;
      newItem.hourRate= item.hourRate;
      newItem.totalCost= item.totalCost;
      newItem.grossMargin= item.grossMargin;
      newItem.comments=item.comments;
    });
    return preliminaryDetails;
}
const preliminaryAddSuccess = (oldState, action) => {
  let preliminaryDetails =updatePreliminaryState(oldState.preliminaryDetails,action);
  return updateObject(oldState, {
    notify: Notify.success,
    preliminaryDetails,
  });
};
const preliminaryAddError = (oldState, action) => {
  return updateObject(oldState, {
    notify: Notify.error,
  });
}
const preliminaryEditSuccess = (oldState, action) => {
  let preliminaryDetails = updatePreliminaryState(oldState.preliminaryDetails,action);
  return updateObject(oldState, {
    notify: Notify.success,
    preliminaryDetails,
  });
}
const preliminaryEditError = (oldState, action) => {
  return updateObject(oldState, {
    notify: Notify.error,
  });
};
const preliminaryGetSuccess = (oldState, action) => {
  return updateObject(oldState, {
    notify:Notify.none,
    preliminaryDetails:action.payload,
  });
};

const preliminaryGetError = (oldState, action) => {
  return initialState;
};

const resetPreliminaryState = (oldState, action) => {
	return updateObject(oldState, {
    notify:Notify.none,
  });
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
      case ActionType.RESET_PRELIMINARY_STATE:
      return resetPreliminaryState(oldState, action);
    default:
      return oldState;
  }
};
export default preliminaryReducer;

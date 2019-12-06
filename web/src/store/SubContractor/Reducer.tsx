import { ActionType } from './Types/ActionType';
import { updateObject } from '../../helpers/utility-helper';
import {ISubContractorActivity} from './Types/ISubContractorActivity';
import { ISubContractorState } from './Types/ISubContractorState';
import {IQuote} from './Types/IQuote';
import Notify from '../../enums/Notify';
import EventType from '../../enums/EventType';
import {initialState,newActivity} from './InitialState';

const addNewActivity = (oldState, action) => {
  return updateObject(oldState, {
    form:updateObject(oldState.form,{
      activities:oldState.form.activities.concat(newActivity)
    })
  });
};

const deleteActivity = (oldState, action) => {
  return updateObject(oldState, {
    form:updateObject(oldState.form,{
      activities:
      [
  ...oldState.form.activities.slice(0, action.payload),
  ...oldState.form.activities.slice(action.payload + 1)
]
    })
  });
};

const subContractorFormAddSuccess = (oldState, action) => {
  return updateObject(oldState, {
    error: null,
    loading: false,
    notify: Notify.success,
    event: action.event,
    form: updateObject(oldState.form, action.payload)
  });
};

const subContractorFormEditSuccess = (oldState, action) => {
  return updateObject(oldState, {
    error: null,
    loading: false,
    notify: Notify.success,
    event: action.event
  });
};

const subContractorFormError = (oldState, action) => {
  return updateObject(oldState, {
    error: action.error,
    loading: false,
    notify: Notify.error
  });
};

const getSubContractorSuccess = (oldState, action) => {
  return updateObject(oldState, {
    form: updateObject(oldState.form,
     {activities: action.payload
     })
  });
};

const getSubContractorError = (oldState, action) => {
  return updateObject(oldState, {
    error: action.error,
    loading: false,
    notify: Notify.error
  });
};

const resetSubContractorState = (oldState, action) => {
  return updateObject(oldState, {
    notify: Notify.none,
    event: EventType.none
  });
};

const subContractorReducer = (oldState = initialState, action) => {
  switch (action.type) {
    case ActionType.SUB_CONTRACTOR_ADD_NEW_ACTIVITY:
      return addNewActivity(oldState, action);
    case ActionType.SUB_CONTRACTOR_DELETE_ACTIVITY:
      return deleteActivity(oldState, action);  
    case ActionType.SUB_CONTRACTOR_FORM_ADD_SUCCESS:
      return subContractorFormAddSuccess(oldState, action);
    case ActionType.SUB_CONTRACTOR_FORM_EDIT_SUCCESS:
      return subContractorFormEditSuccess(oldState, action);
    case ActionType.SUB_CONTRACTOR_FORM_ERROR:
      return subContractorFormError(oldState, action);
    case ActionType.GET_SUB_CONTRACTOR_SUCCESS:
      return getSubContractorSuccess(oldState, action);
    case ActionType.GET_SUB_CONTRACTOR_ERROR:
      return getSubContractorError(oldState, action);
    case ActionType.RESET_SUB_CONTRACTOR_STATE:
      return resetSubContractorState(oldState, action);
    default:
      return oldState;
  }
};

export default subContractorReducer;

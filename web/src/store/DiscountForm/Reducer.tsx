import { ActionType } from './Types/ActionType';
import { updateObject } from '../../helpers/utility-helper';
import Notify from '../../enums/Notify';
import EventType from '../../enums/EventType';
import {initialState } from './InitialState';


const discountFormAddSuccess = (oldState, action) => {
  return updateObject(oldState, {
    error: null,
    loading: false,
    notify: Notify.success,
    event: action.event,
    form: updateObject(oldState.form, action.payload)
  });
};

const discountFormEditSuccess = (oldState, action) => {
  return updateObject(oldState, {
    error: null,
    loading: false,
    notify: Notify.success,
    event: action.event,
    form: action.payload
  });
};

const discountFormError = (oldState, action) => {
  return updateObject(oldState, {
    error: action.error,
    loading: false,
    notify: Notify.error
  });
};

const resetDiscountState = (oldState, action) => {
  return updateObject(oldState, {
    notify: Notify.none,
    event: EventType.none
  });
};


const getdiscountDataSuccess = (oldState, action) => {
  return updateObject(oldState, {
    event: action.event,
    form: updateObject(oldState.form, action.payload)
  });
};

const getdiscountDataError = (oldState, action) => {
  return initialState;
};


const discountFormReducer = (oldState = initialState, action) => {
  switch (action.type) {
    case ActionType.DISCOUNT_FORM_DATA_ADD:
      return discountFormAddSuccess(oldState, action);
    case ActionType.DISCOUNT_FORM_DATA_EDIT:
      return discountFormEditSuccess(oldState, action);
    case ActionType.DISCOUNT_FORM_DATA_ERROR:
      return discountFormError(oldState, action);
      case ActionType.RESET_DISCOUNT_FORM_STATE:
      return resetDiscountState(oldState, action);
      case ActionType.DISCOUNT_FORM_DATA_GET:
      return getdiscountDataSuccess(oldState, action);
    case ActionType.DISCOUNT_FORM_DATA_GET_ERROR:
      return getdiscountDataError(oldState, action);
    default:
      return oldState;
  }
};

export default discountFormReducer;

import { ActionType } from './Types/ActionType';
import { updateObject } from '../../helpers/utility-helper';
import {initialState} from './InitialState';

const setSummaryCalculationStateDispatch = (oldState, action) => {
  return updateObject(oldState, action.payload);
};

const summaryCalculationReducer = (oldState = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_SUMMARY_CALCULATION_STATE:
      return setSummaryCalculationStateDispatch(oldState, action);
    default:
      return oldState;
  }
};

export default summaryCalculationReducer;
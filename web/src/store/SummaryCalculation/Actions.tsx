import { ActionType } from './Types/ActionType';
import { Dispatch } from 'redux';
import ISummaryCalculation from './Types/ISummaryCalculation';

const setSummaryCalculationStateDispatch = (data:ISummaryCalculation) => {
  return {
    type: ActionType.SET_SUMMARY_CALCULATION_STATE,
    payload:data
  };
};

export const setSummaryCalculationState = (data:ISummaryCalculation) => {
  return (dispatch: Dispatch) => {
    dispatch(setSummaryCalculationStateDispatch(data));
  };
};

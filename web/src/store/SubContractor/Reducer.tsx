import { ActionType } from '../ProjectOverviewForm/Types/ActionType';
import { updateObject } from '../../helpers/utility-helper';
import { ISubContractorState } from './Types/ISubContractorState';
import Notify from '../../enums/Notify';
import EventType from '../../enums/EventType';

const initialState: ISubContractorState = {
  form: {
    activities: [
      {
        activityName: 'Avneet',
        existingSubcontractor: true,
        subcontractor: 'Test',
        preferredSupplier: true,
        totalCost: 10,
        grossMargin: 10,
        totalSell: 10,
        comments: 'string',
        quote1: {
          supplierName: 'string',
          quoteValue: 10
        },
        quote2: {
          supplierName: 'string',
          quoteValue: 10
        },
        quote3: {
          supplierName: 'string',
          quoteValue: 10
        }
      }
    ]
  },
  error: null,
  loading: false,
  notify: Notify.none,
  event: EventType.none
};

const projectOverviewFormAddSuccess = (oldState, action) => {
  return updateObject(oldState, {
    error: null,
    loading: false,
    notify: Notify.success,
    event: action.event,
    form: updateObject(oldState.form, action.payload)
  });
};

const projectOverviewFormEditSuccess = (oldState, action) => {
  return updateObject(oldState, {
    error: null,
    loading: false,
    notify: Notify.success,
    event: action.event
  });
};

const projectOverviewFormError = (oldState, action) => {
  return updateObject(oldState, {
    error: action.error,
    loading: false,
    notify: Notify.error
  });
};

const getAdditionalDetailsSuccess = (oldState, action) => {
  return updateObject(oldState, {
    form: updateObject(oldState.form, action.payload)
  });
};

const getAdditionalDetailsError = (oldState, action) => {
  return updateObject(oldState, {
    error: action.error,
    loading: false,
    notify: Notify.error
  });
};

const resetProjectOverviewState = (oldState, action) => {
  return updateObject(oldState, {
    notify: Notify.none,
    event: EventType.none
  });
};

const subContractorReducer = (oldState = initialState, action) => {
  switch (action.type) {
    case ActionType.PROJECT_OVERVIEW_FORM_ADD_SUCCESS:
      return projectOverviewFormAddSuccess(oldState, action);
    case ActionType.PROJECT_OVERVIEW_FORM_EDIT_SUCCESS:
      return projectOverviewFormEditSuccess(oldState, action);
    case ActionType.PROJECT_OVERVIEW_FORM_ERROR:
      return projectOverviewFormError(oldState, action);
    case ActionType.GET_ADDITIONALS_DETAILS_SUCCESS:
      return getAdditionalDetailsSuccess(oldState, action);
    case ActionType.GET_ADDITIONALS_DETAILS_ERROR:
      return getAdditionalDetailsError(oldState, action);
    case ActionType.RESET_PROJECT_OVERVIEW_STATE:
      return resetProjectOverviewState(oldState, action);
    default:
      return oldState;
  }
};

export default subContractorReducer;

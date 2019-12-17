import { ActionType } from './Types/ActionType';
import { updateObject } from '../../helpers/utility-helper';
import { IProjectOverviewState } from './Types/IProjectOverviewState';
import moment from 'moment';
import Notify from '../../enums/Notify';
import EventType from '../../enums/EventType';
import { changeProjectStatusToBidLost } from './Actions';

const initialState: IProjectOverviewState = {
  form: {
    projectAddDetailId: '',
    projectId: '',
    mainContractor: '',
    otherMainContractor: '',
    enquiryReceivedFrom: '',
    enquiryTypeId: -1,
    creditCheckResult: '',
    siteAddress: '',
    cdmNotifiable: false,
    formOfContract: '',
    retention: '',
    liquidatedDamages: '',
    insurance: '',
    workTypeId: -1,
    commenceDate: new Date().toJSON(),
    completionDate: new Date().toJSON(),
    milestones: '',
    firstValuationDate: new Date().toJSON(),
    finalAccountDate: new Date().toJSON(),
    valuationIntervals: '',
    paymentTerms: '',
    isProjectLive: false,
    comments: '',
    authorizedByHop: '',
    budget: 1,
    authorizedBy: '',
    authorizedBySecond: '',
    authorizedByThird: ''
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
const changeProjectStatusToBidLostSuccess = (oldState, action) => {
  return updateObject(oldState, {
    notify: Notify.success
  });
};
const changeProjectStatusToBidLostError = (oldState, action) => {
  return updateObject(oldState, {
    notify: Notify.error
  });
};
const changeProjectStatusToOnHoldSuccess = (oldState, action) => {
  return updateObject(oldState, {
    notify: Notify.success
  });
};
const changeProjectStatusToOnHoldError = (oldState, action) => {
  return updateObject(oldState, {
    notify: Notify.error
  });
};
const reactivateProjectSuccess = (oldState, action) => {
  return updateObject(oldState, {
    notify: Notify.error
  });
};
const reactivateProjectError = (oldState, action) => {
  return updateObject(oldState, {
    notify: Notify.error
  });
};

const projectOverviewFormReducer = (oldState = initialState, action) => {
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
      case ActionType.RESET_PROJECT_OVERVIEW_STATE:
      return resetProjectOverviewState(oldState, action);
      case ActionType.CHANGE_PROJECT_STATUS_TO_BID_LOST_SUCCESS:
      return changeProjectStatusToBidLostSuccess(oldState, action);
      case ActionType.CHANGE_PROJECT_STATUS_TO_BID_LOST_ERROR:
        return changeProjectStatusToBidLostError(oldState, action);
      case ActionType.CHANGE_PROJECT_STATUS_TO_ON_HOLD_SUCCESS:
        return changeProjectStatusToOnHoldSuccess(oldState, action);
      case ActionType.CHANGE_PROJECT_STATUS_TO_ON_HOLD_ERROR:
        return changeProjectStatusToOnHoldError(oldState, action);
      case ActionType.REACTIVATE_PROJECT_SUCCESS:
        return reactivateProjectSuccess(oldState, action);
      case ActionType.REACTIVATE_PROJECT_ERROR:
        return reactivateProjectError(oldState, action);
    default:
      return oldState;
  }
};

export default projectOverviewFormReducer;

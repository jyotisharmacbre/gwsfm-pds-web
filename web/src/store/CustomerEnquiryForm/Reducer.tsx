import { ActionType } from './Types/ActionType';
import { updateObject } from '../../helpers/utility-helper';
import { initialState } from './InitialState';
import EventType from '../../enums/EventType';
import Notify from '../../enums/Notify';

const projectDetailAddSuccess = (oldState, action) => {
  return updateObject(oldState, {
    error: null,
    loading: false,
    form: updateObject(oldState.form, action.payload),
    notify: Notify.success,
    event: action.event
  });
};

const projectDetailEditSuccess = (oldState, action) => {
  return updateObject(oldState, {
    error: null,
    loading: false,
    form: updateObject(oldState.form, { projectId: action.payload.projectId }),
    notify: Notify.success,
    event: action.event
  });
};

const projectDetailError = (oldState, action) => {
  return updateObject(oldState, {
    error: action.error,
    loading: false,
    notify: Notify.error
  });
};

const getEnquiryOverviewSuccess = (oldState, action) => {
  return updateObject(oldState, {
    enquiryOverviewError: null,
    enquiryOverview: action.payload,
    loading: false
  });
};

const getEnquiryOverviewError = (oldState, action) => {
  return updateObject(oldState, {
    enquiryOverviewError: action.error,
    loading: false
  });
};

const getProjectDetailSuccess = (oldState, action) => {
  return updateObject(oldState, {
    form: action.payload,
    loading: false
  });
};

const getProjectDetailError = (oldState, action) => {
  return initialState;
};

const resetProjectDetailState = (oldState, action) => {
  return updateObject(oldState, {
    notify: Notify.none,
    event: EventType.none,
    loading: false
  });
};

const setProjectId = (oldState, action) => {
  return updateObject(oldState, {
    form: updateObject(oldState.form, { projectId: action.projectId })
  });
};
const changeProjectStatus = (oldState, action) => {
  return updateObject(oldState, {
    form: updateObject(oldState.form, { status: action.payload })
  });
};

const resetProjectDetailStateToInitial = (oldState, action) => {
  return initialState;
};

const resetCustomerEnquiryState = (oldState, action) => {
  return initialState;
};

const setloadingTrue = (oldState, action) => {
  return updateObject(oldState, {
    loading: true,
    event: action.event
  });
};


const projectDetailReducer = (oldState = initialState, action) => {
  switch (action.type) {
    case ActionType.PROJECT_ADD:
      return projectDetailAddSuccess(oldState, action);
    case ActionType.PROJECT_EDIT_SUCCESS:
      return projectDetailEditSuccess(oldState, action);
    case ActionType.PROJECT_ADD_ERROR:
      return projectDetailError(oldState, action);
    case ActionType.GET_ENQUIRY_OVERVIEW_SUCCESS:
      return getEnquiryOverviewSuccess(oldState, action);
    case ActionType.GET_ENQUIRY_OVERVIEW_ERROR:
      return getEnquiryOverviewError(oldState, action);
    case ActionType.GET_PROJECT_DETAIL_SUCCESS:
      return getProjectDetailSuccess(oldState, action);
    case ActionType.GET_PROJECT_DETAIL_ERROR:
      return getProjectDetailError(oldState, action);
    case ActionType.RESET_PROJECT_DETAIL_STATE:
      return resetProjectDetailState(oldState, action);
    case ActionType.SET_PROJECT_ID_STATE:
      return setProjectId(oldState, action);
    case ActionType.CHANGE_PROJECT_STATUS_STATE:
      return changeProjectStatus(oldState, action);
    case ActionType.RESET_PROJECT_DETAIL_STATE_TO_INITIAL:
      return resetProjectDetailStateToInitial(oldState, action);
    case ActionType.RESET_CUSTOMER_ENQUIRY_STATE:
      return resetCustomerEnquiryState(oldState, action);
    case ActionType.SET_LOADING_TRUE:
      return setloadingTrue(oldState, action);
    default:
      return oldState;
  }
};

export default projectDetailReducer;

import { ActionType } from './Types/ActionType';
import { updateObject } from '../../helpers/utility-helper';
import { IProjectOverviewState } from './Types/IProjectOverviewState';
import moment from 'moment';
import Notify from '../../enums/Notify';

const initialState: IProjectOverviewState = {
  form: {
    projectAddDetailId: '',
    projectId: '',
    mainContractor: '',
    otherMainContractor: '',
    enquiryReceivedFrom: '',
    potentialCustomer: '',
    otherPotentialCustomer: '',
    enquiryTypeId: 1,
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
  notify: Notify.none
};

const projectOverviewFormAddSuccess = (oldState, action) => {
  return updateObject(oldState, {
    error: null,
    loading: false,
    notify: Notify.success
  });
};

const projectOverviewFormEditSuccess = (oldState, action) => {
  return updateObject(oldState, {
    error: null,
    loading: false,
    form: action.payload
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
    default:
      return oldState;
  }
};

export default projectOverviewFormReducer;

import { ActionType } from './Types/ActionType';
import { updateObject } from '../../helpers/utility-helper';
import { IProjectOverviewState } from './Types/IProjectOverviewState';
import moment from 'moment';
import Notify from '../../enums/Notify';

const initialState: IProjectOverviewState = {
  form: {
    projectAddDetailId: '',
    projectId: '40624d8c-e95d-4df8-9790-08d76e3ae812',
    mainContractor: '',
    enquiryReceivedFrom: '',
    potentialCustomer: '',
    enquiryTypeId: '1',
    creditCheckResult: '',
    siteAddress: '',
    cdmNotifiable: true,
    formOfContract: '',
    retention: '',
    liquidatedDamages: '',
    insurance: '',
    workTypeId: '1',
    commenceDate: moment().toString(),
    completionDate: moment().toString(),
    milestones: '',
    firstValuationDate: moment().toString(),
    finalAccountDate: moment().toString(),
    valuationIntervals: '',
    paymentTerms: '',
    isProjectLive: false,
    comments: '',
    authorizedByHop: '',
    budget: '',
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

const projectOverviewFormReducer = (oldState = initialState, action) => {
  switch (action.type) {
    case ActionType.PROJECT_OVERVIEW_FORM_ADD_SUCCESS:
      return projectOverviewFormAddSuccess(oldState, action);
    case ActionType.PROJECT_OVERVIEW_FORM_EDIT_SUCCESS:
      return projectOverviewFormEditSuccess(oldState, action);
    case ActionType.PROJECT_OVERVIEW_FORM_ERROR:
      return projectOverviewFormError(oldState, action);
    default:
      return oldState;
  }
};

export default projectOverviewFormReducer;

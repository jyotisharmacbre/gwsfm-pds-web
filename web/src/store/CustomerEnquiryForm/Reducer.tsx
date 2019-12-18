import { ActionType } from './Types/ActionType';
import { updateObject } from '../../helpers/utility-helper';
import { IProjectDetailState } from './Types/IProjectDetailState';
import EventType from '../../enums/EventType';
import Notify from '../../enums/Notify';

const initialState: IProjectDetailState = {
  form: {
    projectId: '',
    name: '',
    contractorId: '',
    companyId: '',
    headOfProject: '',
    projectOwner: '',
    projectManager: '',
    pmHasExperience: false,
    scope: '',
    cnNumber: '',
    status: 1,
    engagementId: 0,
    countryId: 0,
    currencyId: 0,
    probabilityOfWinning: '',
    approxValue: '',
    contractTypeId: '',
    cdmNotifiable: false,
    firstAssetWorkedOn: 0,
    secondAssetWorkedOn: 0,
    thirdAssetWorkedOn: 0,
    comment: '',
    otherCompanyName: '',
    otherContractName:'',
    divisionId : '',
    businessUnitId: '',
    weightedTCV: undefined,
  soldMargin: undefined
  },
  enquiryOverview: {
    projectName: '',
    contractorId: '',
    headOfProject: '',
    projectManager: '',
    scope: '',
    cnNumber: ''
  },
  error: null,
  loading: false,
  notify: Notify.none,
  event: EventType.none,
  enquiryOverviewError: null
};

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
    enquiryOverview: action.payload
  });
};

const getEnquiryOverviewError = (oldState, action) => {
  return updateObject(oldState, {
    enquiryOverviewError: action.error
  });
};

const getProjectDetailSuccess = (oldState, action) => {
  return updateObject(oldState, {
    form: action.payload
  });
};

const getProjectDetailError = (oldState, action) => {
  return updateObject(oldState, {
    error: action.error
  });
};

const resetProjectDetailState = (oldState, action) => {
  return updateObject(oldState, {
    notify: Notify.none,
    event: EventType.none
  });
};

const setProjectId = (oldState, action) => {
  return updateObject(oldState, {
    form: updateObject(oldState.form, { projectId: action.projectId })
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
    default:
      return oldState;
  }
};

export default projectDetailReducer;

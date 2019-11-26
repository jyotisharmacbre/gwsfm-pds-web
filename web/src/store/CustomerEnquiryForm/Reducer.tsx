import { ActionType } from './Types/ActionType';
import { updateObject } from '../../helpers/utility-helper';
import { IProjectDetailState } from './Types/IProjectDetailState';
import { Notify } from '../../helpers/constants';

const initialState: IProjectDetailState = {
  form: {
    projectId: '',
    name: '',
    contractorId: 1,
    companyId: 1,
    headOfProject: '',
    projectOwner: '',
    projectManager: '',
    pmHasExperience: true,
    scope: '',
    cnNumber: 2,
    status: 1,
    engagementId: 2,
    countryId: 3,
    currencyId: 1,
    probabilityOfWinning: '',
    approxValue: '',
    contractTypeId: '',
    cdmNotifiable: true,
    firstAssetWorkedOn: 0,
    secondAssetWorkedOn: 0,
    thirdAssetWorkedOn: 0,
    comment: ''
  },
  enquiryOverview: {
    projectName: '',
    companyId: -1,
    headOfProject: '',
    projectManager: '',
    scope: '',
    cnNumber: -1
  },
  error: null,
  loading: false,
  notify: Notify.none,
  enquiryOverviewError: null
};

const projectDetailAddSuccess = (oldState, action) => {
  return updateObject(oldState, {
    error: null,
    loading: false,
    form: action.payload
  });
};

const projectDetailEditSuccess = (oldState, action) => {
  return updateObject(oldState, {
    error: null,
    loading: false,
    form: action.payload
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
    default:
      return oldState;
  }
};

export default projectDetailReducer;

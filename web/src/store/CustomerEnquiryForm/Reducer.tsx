import { ActionType } from './Types/ActionType';
import { updateObject } from '../../helpers/utility-helper';
import { IProjectDetailState } from './Types/IProjectDetailState';
import { Notify } from '../../helpers/constants';

const initialState: IProjectDetailState = {
  form: {
    name: 'string',
    contractorId: 1,
    companyId: 1,
    headOfProject: 'string',
    projectOwner: 'string',
    projectManager: 'string',
    pmHasExperience: true,
    scope: 'string',
    cnNumber: 2,
    status: 1,
    engagementId: 2,
    countryId: 3,
    currencyId: 1,
    probabilityOfWinning: 'string',
    approxValue: 'string',
    contractTypeId: 'string',
    cdmNotifiable: true,
    firstAssetWorkedOn: 0,
    secondAssetWorkedOn: 0,
    thirdAssetWorkedOn: 0,
    comment: 'string'
  },
  error: null,
  loading: false,
  notify: Notify.none
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

const projectDetailReducer = (oldState = initialState, action) => {
  switch (action.type) {
    case ActionType.PROJECT_ADD:
      return projectDetailAddSuccess(oldState, action);
    case ActionType.PROJECT_EDIT_SUCCESS:
      return projectDetailEditSuccess(oldState, action);
    case ActionType.PROJECT_ADD_ERROR:
      return projectDetailError(oldState, action);
    default:
      return oldState;
  }
};

export default projectDetailReducer;

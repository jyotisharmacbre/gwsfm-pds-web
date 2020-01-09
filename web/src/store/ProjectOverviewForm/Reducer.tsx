import { ActionType } from './Types/ActionType';
import { updateObject } from '../../helpers/utility-helper';
import Notify from '../../enums/Notify';
import EventType from '../../enums/EventType';
import { IProjectApprovals } from './Types/IProjectApprovals';
import { initialState } from './InitialState';
import { setupInitialApprovalData } from './DataWrapper';

export const newProjectApprovals: IProjectApprovals = {
  projectApprovalId: '',
  projectId: '',
  projectApprovalRange: '',
  approverType: '',
  approvalStatus: '',
  userId: '',
  approvalStatusDescription: '',
  projectApprovalRangeDescription: '',
  approverTypeDescription: '',
  showRangeLabel: true
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

const setupPojectApprovalsInitialData = (oldState, action) => {
  return updateObject(oldState, {
    notify: Notify.none,
    form: updateObject(oldState.form, {
      projectApprovals: setupInitialApprovalData(action.payload)
    }),
    initialStateSetForProjectApprovals: true
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
  let updatedApproverList: Array<IProjectApprovals> = [];
  if (action.payload != '') {
    if (oldState.form.projectApprovals && action.payload.projectApprovals) {
      updatedApproverList = oldState.form.projectApprovals.map(item => {
        let savedApproverItem = action.payload.projectApprovals.find(
          x => x.approverType === item.approverType
        );
        return savedApproverItem ? { ...item, ...savedApproverItem } : item;
      });
    }
    action.payload.projectApprovals = updatedApproverList;
    return updateObject(oldState, {
      form: updateObject(oldState.form, action.payload)
    });
  }
  return oldState;
};

const getAdditionalDetailsError = (oldState, action) => {
  let state = { ...initialState };
  state.form.projectApprovals = oldState.form.projectApprovals;
  return state;
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
    notify: Notify.success,
    event: EventType.save
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
    case ActionType.BIND_PROJECT_APPROVAL_INITIAL_DATA:
      return setupPojectApprovalsInitialData(oldState, action);
    default:
      return oldState;
  }
};

export default projectOverviewFormReducer;

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
	projectApprovalRange: 0,
	approverType: 0,
	approvalStatus: 0,
	userId: '',
	approvalStatusDescription: '',
	projectApprovalRangeDescription: '',
	approverTypeDescription: '',
	showRangeLabel: true
};

const updateUserId = (oldState, newState) => {
	oldState.map((ele) => {
		let filter = newState.find((nstate) => nstate.approverType == ele.approverType);
		if (filter) ele.userId = filter.userId;
	});
	return oldState;
};

const projectOverviewFormAddSuccess = (oldState, action) => {
	return updateObject(oldState, {
		error: null,
		loading: false,
		notify: Notify.success,
		event: action.event,
		form: updateObject(oldState.form, {
			projectId: action.payload.projectId,
			projectAdditionalDetail: action.payload.projectAdditionalDetail,
			projectApprovals: updateUserId(oldState.form.projectApprovals, action.payload.projectApprovals)
		})
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
		event: action.event,
		form: updateObject(oldState.form, {
			projectId: action.payload.projectId,
			projectAdditionalDetail: action.payload.projectAdditionalDetail,
			projectApprovals: updateUserId(oldState.form.projectApprovals, action.payload.projectApprovals)
		})
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
			updatedApproverList = oldState.form.projectApprovals.map((item) => {
				let savedApproverItem = action.payload.projectApprovals.find(
					(x) => x.approverType === item.approverType
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
	return initialState;
};
const resetProjectOverviewNotifier = (oldState, action) => {
	return updateObject(oldState, {
		notify: Notify.none,
		event: EventType.none
	});
};

const getProjectActivitiesSuccess = (oldState, action) => {
	return updateObject(oldState, {
		projectActivities: updateObject(oldState.projectActivities, {
			data: action.payload,
			error: null,
			notify: Notify.success
		})
	});
};

const getProjectActivitiesError = (oldState, action) => {
	return updateObject(oldState, {
		projectActivities: updateObject(oldState.projectActivities, {
			error: action.payload,
			notify: Notify.none
		})
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
		case ActionType.BIND_PROJECT_APPROVAL_INITIAL_DATA:
			return setupPojectApprovalsInitialData(oldState, action);
		case ActionType.GET_PROJECT_ACTIVITIES_SUCCESS:
			return getProjectActivitiesSuccess(oldState, action);
		case ActionType.GET_PROJECT_ACTIVITIES_ERROR:
			return getProjectActivitiesError(oldState, action);
		case ActionType.RESET_PROJECT_OVERVIEW_STATE:
			return resetProjectOverviewState(oldState, action);
		case ActionType.RESET_PROJECT_OVERVIEW_NOTIFIER:
			return resetProjectOverviewNotifier(oldState, action);
		default:
			return oldState;
	}
};

export default projectOverviewFormReducer;

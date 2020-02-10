import { ActionType } from './Types/ActionType';
import { updateObject } from '../../helpers/utility-helper';
import { IProjectDashboardGridState } from './Types/IProjectDashboardGridState';
import moment from 'moment';
import Notify from '../../enums/Notify';

export const initialState: IProjectDashboardGridState = {
	actionApprovalDetails: [],
	error: null
};

const DashboardGridDetailSuccess = (oldState, action) => {
	return updateObject(oldState, {
		error: null,
		loading: false,
		actionApprovalDetails: action.payload
	});
};

const DashboardGridDetailError = (oldState, action) => {
	return updateObject(oldState, {
		error: action.error,
		loading: false,
		notify: Notify.error
	});
};

const resetDashboardState = (oldState, action) => {
	return updateObject(oldState, {
		actionApprovalDetails: [],
		error: null
	});
};

const DashboardGridDetailReducer = (oldState = initialState, action) => {
	switch (action.type) {
		case ActionType.PROJECT_DASHBOARD_GRID_DETAILS:
			return DashboardGridDetailSuccess(oldState, action);
		case ActionType.PROJECT_DASHBOARD_GRID_ERROR:
			return DashboardGridDetailError(oldState, action);
		case ActionType.RESET_DASHBOARD_STATE:
			return resetDashboardState(oldState, action);
		default:
			return oldState;
	}
};

export default DashboardGridDetailReducer;

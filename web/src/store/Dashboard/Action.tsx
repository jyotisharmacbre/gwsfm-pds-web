import * as axios from '../../client';
import { ActionType } from './Types/ActionType';
import { Dispatch } from 'redux';

const DashboardGridDetailSuccess = (response: any) => {
	return {
		type: ActionType.PROJECT_DASHBOARD_GRID_DETAILS,
		payload: response
	};
};

const DashboardGridDetailError = (error: string) => {
	return {
		type: ActionType.PROJECT_DASHBOARD_GRID_ERROR,
		payload: error
	};
};

const resetDashboardStateDispatch = () => {
	return {
		type: ActionType.RESET_DASHBOARD_STATE
	};
};

export const resetDashboardState = () => {
	return (dispatch: Dispatch) => {
		dispatch(resetDashboardStateDispatch());
	};
};

const headers = {
	'Content-Type': 'application/json'
};

export const projectDashboardGridDetail = () => {
	return (dispatch: Dispatch) => {
		axios.baseAPI
			.get('api/users/pendingApprovals', { headers: headers })
			.then((response) => {
				dispatch(DashboardGridDetailSuccess(response.data));
			})
			.catch((error) => {
				dispatch(DashboardGridDetailError(error));
			});
	};
};

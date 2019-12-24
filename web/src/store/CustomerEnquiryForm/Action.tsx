import * as axios from '../../client';
import { store } from '../index';
import { ActionType } from './Types/ActionType';
import { Dispatch } from 'redux';
import { IProjectDetail } from './Types/IProjectDetail';
import { IProject } from './Types/IProject';
import EventType from '../../enums/EventType';

const projectDetailAddSuccess = (response: IProjectDetail, event: EventType) => {
	return {
		type: ActionType.PROJECT_ADD,
		payload: response,
		event: event
	};
};

const projectDetailEditSuccess = (response: IProjectDetail, event: EventType) => {
	return {
		type: ActionType.PROJECT_EDIT_SUCCESS,
		payload: response,
		event: event
	};
};

const projectDetailError = (error: string) => {
	return {
		type: ActionType.PROJECT_ADD_ERROR,
		payload: error
	};
};
const changeProjectStatusState = (status: number) => {
	return {
		type: ActionType.CHANGE_PROJECT_STATUS_STATE,
		payload: status
	};
};

const headers = {
	'Content-Type': 'application/json'
};

export const projectDetailAdd = (data: IProjectDetail, event: EventType) => {
	return (dispatch: Dispatch) => {
		axios.baseAPI
			.post('/api/Projects/customerEnquiry', data, { headers: headers })
			.then((response) => {
				dispatch(projectDetailAddSuccess(response.data, event));
			})
			.catch((error) => {
				dispatch(projectDetailError(error));
			});
	};
};

export const projectDetailEdit = (data: IProjectDetail, event: EventType) => {
	return (dispatch: Dispatch) => {
		axios.baseAPI
			.put('/api/Projects/updatecustomerEnquiry', data, { headers: headers })
			.then((response) => {
				dispatch(projectDetailEditSuccess(response.data, event));
			})
			.catch((error) => {
				dispatch(projectDetailError(error));
			});
	};
};

const getEnquiryOverviewSuccess = (response: IProject) => {
	return {
		type: ActionType.GET_ENQUIRY_OVERVIEW_SUCCESS,
		payload: response
	};
};

const getEnquiryOverviewError = (error: string) => {
	return {
		type: ActionType.GET_ENQUIRY_OVERVIEW_ERROR,
		payload: error
	};
};

export const getEnquiryOverview = (projectId: string) => {
	return (dispatch: Dispatch) => {
		axios.baseAPI
			.get(`api/Projects/${projectId}/enquiryOverview`)
			.then((response) => {
				dispatch(getEnquiryOverviewSuccess(response.data));
			})
			.catch((error) => {
				dispatch(getEnquiryOverviewError(error));
			});
	};
};

const getProjectDetailSuccess = (response: IProjectDetail) => {
	return {
		type: ActionType.GET_PROJECT_DETAIL_SUCCESS,
		payload: response
	};
};

const getProjectDetailError = (error: string) => {
	return {
		type: ActionType.GET_PROJECT_DETAIL_ERROR,
		payload: error
	};
};

export const getProjectDetail = (projectId: string, cache: boolean = true) => {
	return (dispatch: Dispatch) => {
		let storeProjectId = store.getState().project.form.projectId;
		if (cache && storeProjectId && projectId == storeProjectId) dispatch({ type: ActionType.DEFAULT });
		else {
			axios.baseAPI
				.get(`api/Projects/${projectId}/customerEnquiry`)
				.then((response) => {
					dispatch(getProjectDetailSuccess(response.data));
				})
				.catch((error) => {
					dispatch(getProjectDetailError(error));
				});
		}
	};
};

const resetProjectDetailStateDispatch = () => {
	return {
		type: ActionType.RESET_PROJECT_DETAIL_STATE
	};
};

export const resetProjectDetailState = () => {
	return (dispatch: Dispatch) => {
		dispatch(resetProjectDetailStateDispatch());
	};
};

const setProjectIdDispatch = () => {
	return {
		type: ActionType.SET_PROJECT_ID_STATE
	};
};

export const setProjectId = (projectId: string) => {
	return (dispatch: Dispatch) => {
		dispatch(setProjectIdDispatch());
	};
};
export const changeProjectStatus = (status: number) => {
	return (dispatch: Dispatch) => {
		dispatch(changeProjectStatusState(status));
	};
};

const resetProjectDetailStateToInitialDispatch = () => {
	return {
		type: ActionType.RESET_PROJECT_DETAIL_STATE_TO_INITIAL
	};
};

export const resetProjectDetailStateToInitial = () => {
	return (dispatch: Dispatch) => {
		dispatch(resetProjectDetailStateToInitialDispatch());
	};
};

export const updateProjectStatusToInReview = (projectId: string, success, error) => {
	axios.baseAPI
		.put(`/api/Projects/${projectId}/inReview`, null, { headers: headers })
		.then((response) => {
			success(response.data);
		})
		.catch((error) => {
			error(error);
		});
};

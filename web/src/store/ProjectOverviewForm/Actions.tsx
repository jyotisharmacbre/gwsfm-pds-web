/* istanbul ignore file */

import * as axios from '../../client';
import { ActionType } from './Types/ActionType';
import { Dispatch } from 'redux';
import { IProjectAdditionalDetail } from './Types/IProjectAdditionalDetail';
import moment from 'moment';
import EventType from '../../enums/EventType';
import { IProjectOverviewState } from './Types/IProjectOverviewState';
import { IProjectOverviewDetails } from './Types/IProjectOverviewDetails';
import { isProjectStateInReview } from '../store-helper';
import { ILookup } from '../Lookups/Types/ILookup';

const projectOverviewFormAddSuccess = (response: IProjectAdditionalDetail, event: EventType) => {
	return {
		type: ActionType.PROJECT_OVERVIEW_FORM_ADD_SUCCESS,
		payload: response,
		event: event
	};
};

const projectOverviewFormEditSuccess = (response: any, event: EventType) => {
	return {
		type: ActionType.PROJECT_OVERVIEW_FORM_EDIT_SUCCESS,
		payload: response,
		event: event
	};
};

const projectOverviewFormError = (error: string) => {
	return {
		type: ActionType.PROJECT_OVERVIEW_FORM_ERROR,
		payload: error
	};
};

const getAdditionalDetailsSuccess = (response: any) => {
	return {
		type: ActionType.GET_ADDITIONALS_DETAILS_SUCCESS,
		payload: response
	};
};

const getAdditionalDetailsError = (error: string) => {
	return {
		type: ActionType.GET_ADDITIONALS_DETAILS_ERROR,
		payload: error
	};
};

const getProjectActivitiesSuccess = (response: any) => {
	return {
		type: ActionType.GET_PROJECT_ACTIVITIES_SUCCESS,
		payload: response
	};
};

const getProjectActivitiesError = (error: string) => {
	return {
		type: ActionType.GET_PROJECT_ACTIVITIES_ERROR,
		payload: error
	};
};
export const setupPojectApprovalsInitialData = (
	lookupdata: Array<ILookup>,
	currencySymbol: string,
	projectId: string
) => {
	return (dispatch: Dispatch) => {
		dispatch({
			type: ActionType.BIND_PROJECT_APPROVAL_INITIAL_DATA,
			payload: { lookupdata, currencySymbol, projectId }
		});
	};
};

const setloadingTrue = (event: EventType) => {
	return {
		type: ActionType.SET_LOADING_TRUE,		
		event: event
	};
};


let config = {
	headers: {
		'Content-Type': 'application/json'
	}
};
export const projectOverviewFormAdd = (projectId: string, data: IProjectOverviewDetails, event: EventType) => {
	return (dispatch: Dispatch) => {
		if (isProjectStateInReview()) dispatch(projectOverviewFormError('error'));
		data.projectId = projectId;
		data.projectAdditionalDetail.projectId = projectId;
		dispatch(setloadingTrue(event));
		axios.baseAPI
			.post('api/Projects/additionalDetails', data, config)
			.then((response) => {
				dispatch(projectOverviewFormAddSuccess(response.data, event));
			})
			.catch((error) => {
				dispatch(projectOverviewFormError(error));
			});
	};
};

export const projectOverviewFormEdit = (data: IProjectOverviewState, event: EventType) => {
	return (dispatch: Dispatch) => {
		if (isProjectStateInReview()) dispatch(projectOverviewFormError('error'));
		dispatch(setloadingTrue(event));
		axios.baseAPI
			.put('api/Projects/additionalDetails', data, config)
			.then((response) => {
				dispatch(projectOverviewFormEditSuccess(response.data, event));
			})
			.catch((error) => {
				dispatch(projectOverviewFormError(error));
			});
	};
};

export const getAdditionalDetails = (projectId: string) => {
	return (dispatch: Dispatch) => {
		axios.baseAPI
			.get(`api/Projects/${projectId}/additionalDetails`, config)
			.then((response) => {
				dispatch(getAdditionalDetailsSuccess(response.data));
			})
			.catch((error) => {
				dispatch(getAdditionalDetailsError(error));
			});
	};
};

const resetProjectOverviewStateDispatch = () => {
	return {
		type: ActionType.RESET_PROJECT_OVERVIEW_STATE
	};
};

export const resetProjectOverviewState = () => {
	return (dispatch: Dispatch) => {
		dispatch(resetProjectOverviewStateDispatch());
	};
};

const resetProjectOverviewNotifierDispatch = () => {
	return {
		type: ActionType.RESET_PROJECT_OVERVIEW_NOTIFIER
	};
};

export const resetProjectOverviewNotifier = () => {
	return (dispatch: Dispatch) => {
		dispatch(resetProjectOverviewNotifierDispatch());
	};
};
export const getAdminDefaultValues = (countryId: number) => {
	let sessionData: any = sessionStorage.getItem('defaultParameters');
	let isLookupSessionExists: boolean = sessionData ? (JSON.parse(sessionData).length > 0 ? true : false) : false;
	return (dispatch: Dispatch) => {
		if (!isLookupSessionExists) {
			axios.baseAPI
				.get(`api/Admin/getProjectParameters/${countryId}`)
				.then((response) => {
					sessionStorage.setItem('defaultParameters', JSON.stringify(response.data));
				})
				.catch((error) => {});
		}
	};
};

export const getProjectActivities = (projectId: string) => {
	return (dispatch: Dispatch) => {
		axios.baseAPI
			.get(`api/Projects/${projectId}/projectActivities`, config)
			.then((response) => {
				dispatch(getProjectActivitiesSuccess(response.data));
			})
			.catch((error) => {
				dispatch(getProjectActivitiesError(error));
			});
	};
};

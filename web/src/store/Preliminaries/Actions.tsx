import * as axios from '../../client';
import { ActionType } from './Types/ActionType';
import { Dispatch } from 'redux';
import { IPreliminaries } from './Types/IPreliminaries';
import EventType from '../../enums/EventType';
import { isProjectStateInReview } from '../store-helper';
import { bindUserData } from './DataWrapper';
const preliminaryAddSuccess = (response: any, event: EventType) => {
	return {
		type: ActionType.PRELIMINARY_ADD_SUCCESS,
		payload: response,
		event: event
	};
};
const preliminaryAddError = (error: string) => {
	return {
		type: ActionType.PRELIMINARY_ADD_ERROR,
		payload: error
	};
};
const preliminaryEditSuccess = (response: any, event: EventType) => {
	return {
		type: ActionType.PRELIMINARY_EDIT_SUCCESS,
		payload: response,
		event: event
	};
};
const preliminaryEditError = (response: any) => {
	return {
		type: ActionType.PRELIMINARY_EDIT_ERROR,
		payload: response
	};
};

const preliminaryGetDataSuccess = (response: any) => {
	return {
		type: ActionType.GET_PRELIMINARY_SUCCESS,
		payload: response
	};
};

const preliminaryGetDataError = (error: string) => {
	return {
		type: ActionType.GET_PRELIMINARY_ERROR,
		payload: error
	};
};

const resetPreliminaryStateDispatch = () => {
	return {
		type: ActionType.RESET_PRELIMINARY_STATE
	};
};

export const resetPreliminaryState = () => {
	return (dispatch: Dispatch) => {
		dispatch(resetPreliminaryStateDispatch());
	};
};


let config = {
	headers: {
		'Content-Type': 'application/json'
	}
};
export const preliminaryAdd = (preliminaryDetails: Array<IPreliminaries>, event: EventType) => {
	return (dispatch: Dispatch) => {
		if (isProjectStateInReview()) dispatch(preliminaryAddError('error'));
		axios.baseAPI
			.post('api/Preliminaries/preliminaryDetails', preliminaryDetails, config)
			.then((response) => {
				dispatch(preliminaryAddSuccess(response, event));
			})
			.catch((error) => {
				dispatch(preliminaryAddError(error));
			});
	};
};

export const preliminaryEdit = (preliminaryDetails: Array<IPreliminaries>, event: EventType) => {
	return (dispatch: Dispatch) => {
		if (isProjectStateInReview()) dispatch(preliminaryEditError('error'));
		axios.baseAPI
			.put('api/Preliminaries/preliminaryDetails', preliminaryDetails, config)
			.then((response) => {
				dispatch(preliminaryEditSuccess(response, event));
			})
			.catch((error) => {
				dispatch(preliminaryEditError(error));
			});
	};
};

export const getPreliminaryDetails = (projectId: string) => {
	return (dispatch: Dispatch) => {
		axios.baseAPI
			.get(`api/Preliminaries/${projectId}/preliminaryDetails`, config)
			.then((response) => {
				dispatch(preliminaryGetDataSuccess(bindUserData(response.data)));
			})
			.catch((error) => {
				dispatch(preliminaryGetDataError(error));
			});
	};
};

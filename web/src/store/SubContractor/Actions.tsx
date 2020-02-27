import * as axios from '../../client';
import { store } from '../index';
import { ActionType } from './Types/ActionType';
import { Dispatch } from 'redux';
import { IProjectAdditionalDetail } from '../ProjectOverviewForm/Types/IProjectAdditionalDetail';
import moment from 'moment';
import EventType from '../../enums/EventType';
import { ISubContractor } from './Types/ISubContractor';
import { isProjectStateInReview, isDataExists } from '../store-helper';
import { getDefaultState } from '../Common/Action';

const subContractorFormAddSuccess = (response: ISubContractor, event: EventType) => {
	return {
		type: ActionType.SUB_CONTRACTOR_FORM_ADD_SUCCESS,
		payload: response,
		event: event
	};
};

const subContractorFormEditSuccess = (response: ISubContractor, event: EventType) => {
	return {
		type: ActionType.SUB_CONTRACTOR_FORM_EDIT_SUCCESS,
		payload: response,
		event: event
	};
};

const subContractorFormError = (error: string) => {
	return {
		type: ActionType.SUB_CONTRACTOR_FORM_ERROR,
		payload: error
	};
};

const getSubContractorSuccess = (response: ISubContractor) => {
	return {
		type: ActionType.GET_SUB_CONTRACTOR_SUCCESS,
		payload: response
	};
};

const getSubContractorError = (error: string) => {
	return {
		type: ActionType.GET_SUB_CONTRACTOR_ERROR,
		payload: error
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
export const subContractorFormAdd = (projectId: string, data: ISubContractor, event: EventType) => {
	return (dispatch: Dispatch) => {
		if (isProjectStateInReview()) dispatch(subContractorFormError('error'));
		dispatch(setloadingTrue(event));
		data.activities.map((element) => {
			element.projectId = projectId;
		});
		axios.baseAPI
			.post('api/SubContractor/activities', data.activities, config)
			.then((response) => {
				dispatch(subContractorFormAddSuccess(response.data, event));
			})
			.catch((error) => {
				dispatch(subContractorFormError(error));
			});
	};
};

export const subContractorFormEdit = (
	projectId: string,
	subContrActivityId: string,
	data: ISubContractor,
	event: EventType
) => {
	return (dispatch: Dispatch) => {
		if (isProjectStateInReview()) dispatch(subContractorFormError('error'));
		dispatch(setloadingTrue(event));
		data.activities.map((element) => {
			element.projectId = projectId;
			element.quotes.map(inner => inner.subContrActivityId = element.quotes[0].subContrActivityId)
		});
		axios.baseAPI
			.put('api/SubContractor/activities', data.activities, config)
			.then((response) => {
				dispatch(subContractorFormEditSuccess(response.data, event));
			})
			.catch((error) => {
				dispatch(subContractorFormError(error));
			});
	};
};

export const getSubContractor = (projectId: string, cache: boolean = true) => {
	return (dispatch: Dispatch) => {
		let storeProjectId = store.getState().subContractor.form.activities[0].projectId;
		if (isDataExists(cache, storeProjectId, projectId)) dispatch(getDefaultState());
		axios.baseAPI
			.get(`api/SubContractor/${projectId}/activities`, config)
			.then((response) => {
				dispatch(getSubContractorSuccess(response.data));
			})
			.catch((error) => {
				dispatch(getSubContractorError(error));
			});
	};
};

const resetSubContractorStateDispatch = () => {
	return {
		type: ActionType.RESET_SUB_CONTRACTOR_STATE
	};
};

export const resetSubContractorState = () => {
	return (dispatch: Dispatch) => {
		dispatch(resetSubContractorStateDispatch());
	};
};

const resetSubContractorNotifierDispatch = () => {
	return {
		type: ActionType.RESET_SUB_CONTRACTOR_NOTIFIER
	};
};

export const resetSubContractorNotifier = () => {
	return (dispatch: Dispatch) => {
		dispatch(resetSubContractorNotifierDispatch());
	};
};

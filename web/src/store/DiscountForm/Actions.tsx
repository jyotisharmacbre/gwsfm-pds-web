import * as axios from '../../client';
import { store } from '../index';
import { ActionType } from './Types/ActionType';
import { Dispatch } from 'redux';
import { IDiscountActivity } from './Types/IDiscountActivity';
import EventType from '../../enums/EventType';
import { isProjectStateInReview,isDataExists } from '../store-helper';
import {getDefaultState} from '../Common/Action';

const discountFormAddSuccess = (response: IDiscountActivity, event: EventType) => {
	return {
		type: ActionType.DISCOUNT_FORM_DATA_ADD,
		payload: response,
		event: event
	};
};

const discountFormEditSuccess = (response: IDiscountActivity, event: EventType) => {
	return {
		type: ActionType.DISCOUNT_FORM_DATA_EDIT,
		payload: response,
		event: event
	};
};

const discountFormError = (error: string) => {
	return {
		type: ActionType.DISCOUNT_FORM_DATA_ERROR,
		payload: error
	};
};

const getDiscountDataSuccess = (response: IDiscountActivity) => {
	return {
		type: ActionType.DISCOUNT_FORM_DATA_GET,
		payload: response
	};
};

const getDiscountDataError = (error: string) => {
	return {
		type: ActionType.DISCOUNT_FORM_DATA_GET_ERROR,
		payload: error
	};
};

const headers = {
	'Content-Type': 'application/json'
};

export const discountFormAdd = (projectId: string, data: IDiscountActivity, event: EventType) => {
	return (dispatch: Dispatch) => {
		if (!isProjectStateInReview()) {
			data.projectId = projectId;
			axios.baseAPI
				.post('/api/Discounts/adddiscount', data, { headers: headers })
				.then((response) => {
					dispatch(discountFormAddSuccess(response.data, event));
				})
				.catch((error) => {
					dispatch(discountFormError(error));
				});
		}
		dispatch(discountFormError('error'));
	};
};

export const discountFormEdit = (data: IDiscountActivity, event: EventType) => {
	return (dispatch: Dispatch) => {
		if (!isProjectStateInReview()) {
			axios.baseAPI
				.put('/api/Discounts/UpdateDiscount', data, { headers: headers })
				.then((response) => {
					dispatch(discountFormEditSuccess(response.data, event));
				})
				.catch((error) => {
					dispatch(discountFormError(error));
				});
		}
		dispatch(discountFormError('error'));
	};
};

export const getDiscountData = (projectId: string, cache: boolean = true) => {
	return (dispatch: Dispatch) => {
		let storeProjectId = store.getState().discount.form.projectId;
		if (isDataExists(cache,storeProjectId,projectId)) dispatch(getDefaultState());
		else {
			axios.baseAPI
				.get(`api/Discounts/${projectId}`, { headers: headers })
				.then((response) => {
					dispatch(getDiscountDataSuccess(response.data));
				})
				.catch((error) => {
					dispatch(getDiscountDataError(error));
				});
		}
	};
};

const resetDiscountStateDispatch = () => {
	return {
		type: ActionType.RESET_DISCOUNT_FORM_STATE
	};
};

export const resetDiscountState = () => {
	return (dispatch: Dispatch) => {
		dispatch(resetDiscountStateDispatch());
	};
};

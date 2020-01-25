import * as axios from '../../client';
import { ActionType } from './Types/ActionType';
import { Dispatch } from 'redux';
import { getUsersForEmailsService } from '../../services';
import { store } from '../index';
import { getDefaultState } from '../Common/Action';

export const getUserNamesForEmailsServiceSuccess = (response: any) => {
	return {
		type: ActionType.USER_NAMES_FOR_EMAILSSERVICE_GET_SUCCESS,
		payload: response
	};
};

export const getUserNamesForEmailsServiceError = (error: any) => {
	return {
		type: ActionType.USER_NAMES_FOR_EMAILS_SERVICE_GET_ERROR,
		payload: error
	};
};

export const getUserNamesForEmailsService = (data: Array<string>) => {
	return (dispatch: Dispatch) => {
		let userData = store.getState().userService.userServiceData;
		let dataNotExists: Array<string> = [];
		data.map((email) => {
			let filter = userData.find((ele) => ele.email.toLowerCase() == email.toLowerCase());
			if (filter == undefined) dataNotExists.push(email);
		});
		if (dataNotExists.length == 0) dispatch(getDefaultState());
		else {
			getUsersForEmailsService(dataNotExists)
				.then((response) => {
					/* istanbul ignore next */ 
					dispatch(getUserNamesForEmailsServiceSuccess(response.data));
				})
				.catch((error) => {
					/* istanbul ignore next */ 
					dispatch(getUserNamesForEmailsServiceError(error));
				});
		}
	};
};

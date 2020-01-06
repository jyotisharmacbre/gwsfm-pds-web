import * as axios from '../../client';
import { ActionType } from './Types/ActionType';
import { Dispatch } from 'redux';

const getUserServiceSuccess = (response: any) => {
	return {
		type: ActionType.USER_SERVICE_GET_SUCCESS,
		payload: response
	};
};

const getUserServiceError = (error: any) => {
	return {
		type: ActionType.USER_SERVICE_GET_ERROR,
		payload: error
	};
};
const getUserNamesForEmailsServiceSuccess = (response: any) => {
	return {
		type: ActionType.USER_NAMES_FOR_EMAILSSERVICE_GET_SUCCESS,
		payload: response
	};
};

const getUserNamesForEmailsServiceError = (error: any) => {
	return {
		type: ActionType.USER_NAMES_FOR_EMAILS_SERVICE_GET_ERROR,
		payload: error
	};
};
let config = {
	headers: {
		'Content-Type': 'application/json'
	}
};
export const getUserService = (search: string) => {
	return (dispatch: Dispatch) => {
		axios.userServiceAPI
			.get(
				`/api/identity/users/GetListOfUsers/${search}
    `,
				config
			)
			.then((response) => {
				dispatch(getUserServiceSuccess(response.data));
			})
			.catch((error) => {
				dispatch(getUserServiceError(error));
			});
	};
};

export const getUserServiceCallback = (search: string, success, failure) => {
	axios.userServiceAPI
		.get(`/api/identity/users/GetListOfUsers/${search}`, config)
		.then((response) => {
			success(response.data);
		})
		.catch((error) => {
			failure(error);
		});
};
export const getUserNamesForEmailsService = (data: any) => {
	return (dispatch: Dispatch) => {
		axios.userServiceAPI
			.post(
				`/api/identity/users/getusernamesforemailids
    `,
				data,
				config
			)
			.then(response => {
				dispatch(getUserNamesForEmailsServiceSuccess(response.data));
			})
			.catch(error => {
				dispatch(getUserNamesForEmailsServiceError(error));
			});
	};
};

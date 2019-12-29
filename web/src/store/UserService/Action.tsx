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

let config = {
	headers: {
		'Content-Type': 'application/json'
	}
};
export const getUserService = (search: string) => {
	return (dispatch: Dispatch) => {
		axios.userServiceAPI
			.get(
				`/api/users/getListOfUsers/${search}
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
		.get(`/api/users/getListOfUsers/${search}`, config)
		.then((response) => {
			console.log('GET DATA SUCCESS');
			success(response.data);
		})
		.catch((error) => {
			failure(error);
		});
};

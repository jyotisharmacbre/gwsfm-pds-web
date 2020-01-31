import * as axios from '../../client';
import { ActionType } from './Types/ActionType';
import { Dispatch } from 'redux';
import { getUsersForEmailsService } from '../../services';
import { store } from '../index';
import { getDefaultState } from '../Common/Action';
import { getDisplayEmail } from '../../helpers/auth-helper';

const getUserNamesForEmailsServiceSuccess = (response: any) => {
	return {
		type: ActionType.USER_NAMES_FOR_EMAILSSERVICE_GET_SUCCESS,
		payload: response
	};
};
const getNamesForEmailsActivitiesFeedSuccess = (response: any) => {
	return {
		type: ActionType.NAMES_FOR_EMAILSSERVICE_ACTIVITIES_FEED_GET_SUCCESS,
		payload: response
	};
};

const getUserProfileForEmailsServiceSuccess = (response: any) => {
	return {
		type: ActionType.CURRENT_USER_PROFILE_FOR_EMAILSSERVICE_GET_SUCCESS,
		payload: response
	};
};

const getUserNamesForEmailsServiceError = (error: any) => {
	return {
		type: ActionType.USER_NAMES_FOR_EMAILS_SERVICE_GET_ERROR,
		payload: error
	};
};
const getNamesForEmailsActivitiesFeedError = (error: any) => {
	return {
		type: ActionType.NAMES_FOR_EMAILSSERVICE_ACTIVITIES_FEED_GET_ERROR,
		payload: error
	};
};

export const getCurrentUserProfileForEmailsService = () => {
	return (dispatch: Dispatch) => {
		const email = getDisplayEmail();
		getUsersForEmailsService([email])
			.then((response) => {
				dispatch(getUserProfileForEmailsServiceSuccess(response.data[0]));
			})
			.catch((error) => {
				dispatch(getUserNamesForEmailsServiceError(error));
			});
	}
}

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
					dispatch(getUserNamesForEmailsServiceSuccess(response.data));
				})
				.catch((error) => {
					dispatch(getUserNamesForEmailsServiceError(error));
				});
		}
	};
};

export const getNamesForEmailActivitiesFeed = (data: Array<string>) => {
	return (dispatch: Dispatch) => {
		getUsersForEmailsService(data)
			.then((response) => {
				dispatch(getNamesForEmailsActivitiesFeedSuccess(response.data));
			})
			.catch((error) => {
				dispatch(getNamesForEmailsActivitiesFeedError(error));
			});
	};
};


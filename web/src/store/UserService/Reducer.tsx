import { ActionType } from './Types/ActionType';
import { updateObject } from '../../helpers/utility-helper';
import { IUserServiceState } from './Types/IUserServiceState';

const initialState: IUserServiceState = {
	currentUserProfile: {
		id: '',
		lastName: '',
		firstname: '',
		email: '',
		displayName: '',
		groups: null,
	},
	userServiceData: [],
	error: null
};

const getUSerServiceSuccess = (oldState, action) => {
	return updateObject(oldState, {
		error: null,
		userServiceData: action.payload
	});
};

const getCurrentUserProfileSuccess = (oldState, action) => {
	return updateObject(oldState, {
		error: null,
		userServiceData: oldState.userServiceData,
		currentUserProfile: action.payload
	});
};


const getUSerServiceError = (oldState, action) => {
	return updateObject(oldState, {
		error: action.payload
	});
};

const userServiceReducer = (oldState = initialState, action) => {
	switch (action.type) {
		case ActionType.USER_SERVICE_GET_SUCCESS:
			return getUSerServiceSuccess(oldState, action);
		case ActionType.USER_SERVICE_GET_ERROR:
			return getUSerServiceError(oldState, action);
		case ActionType.USER_NAMES_FOR_EMAILSSERVICE_GET_SUCCESS:
			return getUSerServiceSuccess(oldState, action);
		case ActionType.USER_NAMES_FOR_EMAILS_SERVICE_GET_ERROR:
			return getUSerServiceError(oldState, action);
		case ActionType.CURRENT_USER_PROFILE_FOR_EMAILSSERVICE_GET_SUCCESS:
			return getCurrentUserProfileSuccess(oldState, action);
		default:
			return oldState;
	}
};

export default userServiceReducer;

import { ActionType } from './Types/ActionType';
import { updateObject } from '../../helpers/utility-helper';
import { IUserPreferencesState } from './Types/IUserPreferencesState';
import Notify from '../../enums/Notify';
import EventType from '../../enums/EventType';
import actions from 'redux-form/lib/actions';

const initialState: IUserPreferencesState = {
	preferences: {
		userPreferenceId: '',
		languageId: 1,
		languageName: 'en',
		currencyId: 1,
		currencySymbol: '$',
		currencyName: 'Dollar'
	},
	error: null,
	loading: false,
	notify: Notify.none,
	event: EventType.none
};

const userPreferencesFormAddSuccess = (oldState, action) => {
	return updateObject(oldState, {
		error: null,
		loading: false,
		notify: Notify.success,
		event: action.event
	});
};

const userPreferencesFormEditSuccess = (oldState, action) => {
	return updateObject(oldState, {
		error: null,
		loading: false,
		notify: Notify.success,
		event: action.event
	});
};

const userPreferencesGetSuccess = (oldState, action) => {
	return updateObject(oldState, {
		preferences: action.payload,
		error: null,
		loading: false,
		notify: Notify.none,
		event: action.event
	});
};

const userPreferencesFormError = (oldState, action) => {
	return updateObject(oldState, {
		error: action.error,
		loading: false,
		notify: Notify.error
	});
};

const resetUserPreferencesState = (oldState) => {
	return updateObject(oldState, {
		notify: Notify.none,
		loading: false
	});
};

const setloadingTrue = (oldState, action) => {
	return updateObject(oldState, {
		loading: true,
		event: action.event
	});
};

const userPreferencesFormReducer = (oldState = initialState, action) => {
	switch (action.type) {
		case ActionType.USER_PREFERENCES_GET_SUCCESS:
			return userPreferencesGetSuccess(oldState, action);
		case ActionType.USER_PREFERENCES_FORM_ADD_SUCCESS:
			return userPreferencesFormAddSuccess(oldState, action);
		case ActionType.USER_PREFERENCES_FORM_EDIT_SUCCESS:
			return userPreferencesFormEditSuccess(oldState, action);
		case ActionType.USER_PREFERENCES_FORM_ERROR:
			return userPreferencesFormError(oldState, action);
		case ActionType.RESET_USER_PREFERENCES_STATE:
			return resetUserPreferencesState(oldState);
		case ActionType.SET_LOADING_TRUE:
			return setloadingTrue(oldState, actions);
		default:
			return oldState;
	}
};

export default userPreferencesFormReducer;

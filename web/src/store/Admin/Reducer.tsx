import { ActionType } from './Types/ActionType';
import { updateObject } from '../../helpers/utility-helper';
import { initialState } from './InitialState';

const getProjectParametersSuccess = (oldState, action) => {
	return updateObject(oldState, {
		adminDefaultValues: action.payload
	});
};

const getProjectParametersError = (oldState, action) => {
	return updateObject(oldState, {
		error: action.payload
	});
};

const adminReducer = (oldState = initialState, action) => {
	switch (action.type) {
		case ActionType.GET_PROJECT_PARAMETERS_SUCCESS:
			return getProjectParametersSuccess(oldState, action);
		case ActionType.GET_PROJECT_PARAMETERS_ERROR:
			return getProjectParametersError(oldState, action);
		default:
			return oldState;
	}
};

export default adminReducer;

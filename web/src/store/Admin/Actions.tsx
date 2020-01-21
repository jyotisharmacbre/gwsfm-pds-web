import * as axios from '../../client';
import { store } from '../index';
import { ActionType } from './Types/ActionType';
import { Dispatch } from 'redux';
import { IAdminDefaults } from './Types/IAdminDefault';
import { getDefaultState } from '../Common/Action';

const getProjectParametersSuccess = (response: Array<IAdminDefaults>) => {
	return {
		type: ActionType.GET_PROJECT_PARAMETERS_SUCCESS,
		payload: response
	};
};

const getProjectParametersError = (error: string) => {
	return {
		type: ActionType.GET_PROJECT_PARAMETERS_ERROR,
		payload: error
	};
};

export const getProjectParameters = (countryId: number, cache: boolean = true) => {
	return (dispatch: Dispatch) => {
		let defaultValues = store.getState().admin.adminDefaultValues;
		if (defaultValues.length > 0 && countryId == defaultValues[0].countryId) {
			dispatch(getDefaultState());
		} else {
			axios.baseAPI
				.get(`api/Admin/getProjectParameters/${countryId}`)
				.then((response) => {
					dispatch(getProjectParametersSuccess(response.data));
				})
				.catch((error) => {
					dispatch(getProjectParametersError(error));
				});
		}
	};
};

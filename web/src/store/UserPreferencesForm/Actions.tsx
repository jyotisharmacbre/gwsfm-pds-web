
import { ActionType } from './Types/ActionType';
import { Dispatch } from 'redux';
import { IUserPreferences } from './Types/IUserPreferences';
import EventType from '../../enums/EventType';
import * as axios from '../../client';
import { getUserPreferences } from '../../services/lookup.service';

let config = {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'   
  }
};

export const userPreferencesFormAddSuccess = (
  response: IUserPreferences,
  event: EventType
) => {
  return {
    type: ActionType.USER_PREFERENCES_FORM_ADD_SUCCESS,
    payload: response,
    event: event
  };
};

export const userPreferencesFormEditSuccess = (response: any, event: EventType) => {
  return {
    type: ActionType.USER_PREFERENCES_FORM_EDIT_SUCCESS,
    payload: response,
    event: event
  };
};

export const userPreferencesGetSuccess = (response: any) => {
  return {
    type: ActionType.USER_PREFERENCES_GET_SUCCESS,
    payload: response
  };
};

export const userPreferencesFormError = (error: string) => {
  return {
    type: ActionType.USER_PREFERENCES_FORM_ERROR,
    payload: error
  };
};

const setloadingTrue = (event: EventType) => {
	return {
		type: ActionType.SET_LOADING_TRUE,		
		event: event
	};
};

export const userPreferencesFormAdd = (
  data: IUserPreferences,
  event: EventType
) => {
  return async (dispatch: Dispatch) => {
    {
      dispatch(setloadingTrue(EventType.save));
      axios.baseAPI
        .post('/api/Users/addUserPreferences', data, config)
        .then(response => {         
          /* istanbul ignore next */ 
          dispatch(userPreferencesFormAddSuccess(response.data, event));
        })
        .catch(error => {
          /* istanbul ignore next */ 
          dispatch(userPreferencesFormError(error));
        });
    };
  };
};


export const userPreferencesFormEdit = (
  data: IUserPreferences,
  event: EventType
) => {
  return async (dispatch: Dispatch) => {
    {
      dispatch(setloadingTrue(EventType.save));
      axios.baseAPI
        .put('/api/Users/updateUserPreferences', data, config)
        .then(response => {
          /* istanbul ignore next */ 
          dispatch(userPreferencesFormEditSuccess(response.data, event));
        })
        .catch(error => {
          /* istanbul ignore next */
          dispatch(userPreferencesFormError(error));
        });
    };
  };
};

export const userPreferencesGet = () => {
  return async (dispatch: Dispatch) => {
    {
      try {
        let res = await getUserPreferences();
        /* istanbul ignore next */ 
        dispatch(userPreferencesGetSuccess(res.data));
      } catch (err) {
        /* istanbul ignore next */ 
        dispatch(userPreferencesFormError(err));
      }
    }
  }
};

const resetUserPreferencesStateDispatch = () => {
  return {
    type: ActionType.RESET_USER_PREFERENCES_STATE
  };
};

export const resetUserPreferencesState = () => {
  return (dispatch: Dispatch) => {
    dispatch(resetUserPreferencesStateDispatch());
  };
};

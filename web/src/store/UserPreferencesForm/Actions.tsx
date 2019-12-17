
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

const userPreferencesFormAddSuccess = (
  response: IUserPreferences,
  event: EventType
) => {
  return {
    type: ActionType.USER_PREFERENCES_FORM_ADD_SUCCESS,
    payload: response,
    event: event
  };
};

const userPreferencesFormEditSuccess = (response: any, event: EventType) => {
  return {
    type: ActionType.USER_PREFERENCES_FORM_EDIT_SUCCESS,
    payload: response,
    event: event
  };
};

const userPreferencesGetSuccess = (response: any) => {
  return {
    type: ActionType.USER_PREFERENCES_GET_SUCCESS,
    payload: response
  };
};

const userPreferencesFormError = (error: string) => {
  return {
    type: ActionType.USER_PREFERENCES_FORM_ERROR,
    payload: error
  };
};

export const userPreferencesFormAdd = (
  data: IUserPreferences,
  event: EventType
) => {
  return async (dispatch: Dispatch) => {
    {
      axios.baseAPI
        .post('/api/Users/addUserPreferences', data, config)
        .then(response => {         
          dispatch(userPreferencesFormAddSuccess(response.data, event));
        })
        .catch(error => {
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
      axios.baseAPI
        .put('/api/Users/updateUserPreferences', data, config)
        .then(response => {
          userPreferencesGet();
          dispatch(userPreferencesFormEditSuccess(response.data, event));
        })
        .catch(error => {
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
        dispatch(userPreferencesGetSuccess(res.data));
      } catch (err) {
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

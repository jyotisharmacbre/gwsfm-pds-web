
import { ActionType } from './Types/ActionType';
import { Dispatch } from 'redux';
import { IUserPreferences } from './Types/IUserPreferences';
import EventType from '../../enums/EventType';
import { getUserPreferences } from '../../services/lookup.service';

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
    type: ActionType.USER_PREFERENCES_FORM_EDIT_SUCCESS,
    payload: error
  };
};


export const userPreferencesFormEdit = (
  data: IUserPreferences,
  event: EventType
) => {
  return async (dispatch: Dispatch) => {
    {
      try {
        let res = await getUserPreferences();
        dispatch(userPreferencesFormEditSuccess(res, event));
      } catch (err) {
        dispatch(userPreferencesFormError(err));
      }
    }
  }
};

export const userPreferencesGet = () => {
  return async (dispatch: Dispatch) => {
    {
      try {
        let res = await getUserPreferences();
        console.log("user prefrences response: ", res);
        dispatch(userPreferencesGetSuccess(res.data));
      } catch (err) {
        dispatch(userPreferencesFormError(err));
      }
    }
  }
};

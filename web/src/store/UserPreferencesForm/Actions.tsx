
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

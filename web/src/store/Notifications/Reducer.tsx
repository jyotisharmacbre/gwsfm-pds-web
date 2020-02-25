import { ActionType } from './Types/ActionType';
import { updateObject } from '../../helpers/utility-helper';
import { INotificationState } from './Types/INotificationState';


export const initialState: INotificationState = {
notifications: [],
loading: false,
error: null

};


const getNotificationsSuccess = (oldState, action) => {
  return updateObject(oldState, {
    notifications: action.payload,
    error: null,
    loading: false
  });
};

const getNotificationsError = (oldState, action) => {
  return updateObject(oldState, {
    error: action.payload,
    loading: false
  });
};

const notificationReducer = (oldState = initialState, action) => {
  switch (action.type) {
    case ActionType.GET_ALL_NOTIFICATIONS_SUCCESS:
      return getNotificationsSuccess(oldState, action);
    case ActionType.GET_ALL_NOTIFICATIONS_ERROR:
      return getNotificationsError(oldState, action);
    default:
      return oldState;
  }
};

export default notificationReducer;

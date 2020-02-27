import * as axios from '../../client';
import { store } from '../index';
import { ActionType } from './Types/ActionType';
import { Dispatch } from 'redux';
import { INotification } from './Types/INotification';

const getNotificationsSuccess = (response: Array<INotification>) => {
  return {
    type: ActionType.GET_ALL_NOTIFICATIONS_SUCCESS,
    payload: response
  };
};

const getNotificationsError = (error: any) => {
  return {
    type: ActionType.GET_ALL_NOTIFICATIONS_ERROR,
    payload: error
  };
};

export const getNotifications = () => {
  return (dispatch: Dispatch) => {
    axios.baseAPI
      .get('/api/Notification/Notifications')
      .then(response => {
        dispatch(getNotificationsSuccess(response.data));
      })
      .catch(error => {
        dispatch(getNotificationsError(error));
      });
  };
};

import { NotificationActions } from './Type';
import { INotificationState } from '../state';
import { Reducer } from 'redux';

const initialState: INotificationState = {
  notificationCount: 0
};

const notificationReducer: Reducer<INotificationState, NotificationActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case 'GetNotificationBeginAction':
      return { ...state };
    case 'GetNotificationSuccessAction':
      return Object.assign({}, state, action.data);
    //  case 'GetNotificationFailureAction':

    default:
      return state;
  }
};

export default notificationReducer;

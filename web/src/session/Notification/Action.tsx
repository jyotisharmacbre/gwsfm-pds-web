import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import {
  INotification,
  IGetNotificationSuccessAction,
  IGetNotificationBeginAction
} from './Type';

export const getNotificationActionCreator: ActionCreator<
  ThunkAction<
    Promise<IGetNotificationSuccessAction>,
    INotification,
    null,
    IGetNotificationSuccessAction
  >
> = () => {
  return async (dispatch: Dispatch) => {
    const beginAction: IGetNotificationBeginAction = {
      type: 'GetNotificationBeginAction'
    };

    dispatch(beginAction);

    const sucessAction: IGetNotificationSuccessAction = {
      type: 'GetNotificationSuccessAction',
      data: { notificationCount: 5 }
    };

    return dispatch(sucessAction);
  };
};

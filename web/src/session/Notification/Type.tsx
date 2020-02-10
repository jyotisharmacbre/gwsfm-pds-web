import { Action } from 'redux';

export interface INotification {
  notificationCount: number;
}

export interface IGetNotificationBeginAction
  extends Action<'GetNotificationBeginAction'> {}

export interface IGetNotificationSuccessAction
  extends Action<'GetNotificationSuccessAction'> {
  data: INotification;
}

export interface IGetNotificationFailureAction
  extends Action<'GetNotificationFailureAction'> {
  error: any;
}

export type NotificationActions =
  | IGetNotificationBeginAction
  | IGetNotificationSuccessAction
  | IGetNotificationFailureAction;

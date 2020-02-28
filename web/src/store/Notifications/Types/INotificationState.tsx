import { INotification } from "./INotification";


export interface INotificationState {
  notifications: Array<INotification>
  error: string | null;
  loading: boolean;
}

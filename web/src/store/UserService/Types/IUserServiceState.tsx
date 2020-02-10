import { IUserServiceData } from './IUserService';

export interface IUserServiceState {
  currentUserProfile: IUserServiceData;
  userServiceData: Array<IUserServiceData>;
  activityFeedUserServiceData: Array<IUserServiceData>;
  error: string | null;
}

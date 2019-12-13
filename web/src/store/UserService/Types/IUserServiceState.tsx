import { IUserServiceData } from './IUserService';

export interface IUserServiceState {
  userServiceData: Array<IUserServiceData>;
  error: string | null;
}

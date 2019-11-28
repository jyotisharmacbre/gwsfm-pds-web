import { IAdHOPData, IAdPMData, IAdPOData } from './IUserService';

export interface IUserServiceState {
  ADhopData: Array<IAdHOPData>;
  ADpmData: Array<IAdPMData>;
  ADpoData: Array<IAdPOData>;
  error: string | null;
}

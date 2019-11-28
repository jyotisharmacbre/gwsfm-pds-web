import { IAdHOPData, IAdPMData, IAdPOData } from './IActiveDirectory';

export interface IActiveDirectoryState {
  ADhopData: Array<IAdHOPData>;
  ADpmData: Array<IAdPMData>;
  ADpoData: Array<IAdPOData>;
  error: string | null;
}

import { IProjectOverviewState } from './ProjectOverviewForm/Types/IProjectOverviewState';
import { ILookupState } from './Lookups/Types/ILookupState';
import { IProjectDetailState } from './CustomerEnquiryForm/Types/IProjectDetailState';
import { ILocaleState } from '../session/state';
import { IUserServiceState } from './UserService/Types/IUserServiceState';
import { IDynamicDataState } from './DynamicsData/Types/IDynamicDataState';
import { IProjectPipelineGridState } from './pipeline/Types/IProjectPipelineGridState';

export type IState = {
  form: any;
  projectOverview: IProjectOverviewState;
  lookup: ILookupState;
  project: IProjectDetailState;
  locale: ILocaleState;
  pipelineGrid: IProjectPipelineGridState;
  UserService: IUserServiceState;
  dynamicData: IDynamicDataState;
  adData: IUserServiceState;
};

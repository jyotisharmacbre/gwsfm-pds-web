import { IProjectOverviewState } from './ProjectOverviewForm/Types/IProjectOverviewState';
import { ILookupState } from './Lookups/Types/ILookupState';
import { IProjectDetailState } from './CustomerEnquiryForm/Types/IProjectDetailState';
import { ILocaleState } from '../session/state';
import { IPreliminaryState } from './Preliminaries/Types/IPreliminaryState';
import { ISubContractorState } from './SubContractor/Types/ISubContractorState';
import { IUserServiceState } from './UserService/Types/IUserServiceState';
import { IDynamicDataState } from './DynamicsData/Types/IDynamicDataState';
import { IDiscountState } from './DiscountForm/Types/IDiscountState';
import { IProjectPipelineGridState } from './pipeline/Types/IProjectPipelineGridState';
import { IProjectDashboardGridState } from './Dashboard/Types/IProjectDashboardGridState';

export type IState = {
  form: any;
  projectOverview: IProjectOverviewState;
  lookup: ILookupState;
  project: IProjectDetailState;
  locale: ILocaleState;
  subContractor: ISubContractorState;
  pipelineGrid: IProjectPipelineGridState;
  userService: IUserServiceState;
  dynamicData: IDynamicDataState;
  discount: IDiscountState;
  preliminary: IPreliminaryState;
  dashboardGrid: IProjectDashboardGridState;
};

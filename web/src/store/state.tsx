import { IProjectOverviewState } from './ProjectOverviewForm/Types/IProjectOverviewState';
import { ILookupState } from './Lookups/Types/ILookupState';
import { IProjectDetailState } from './CustomerEnquiryForm/Types/IProjectDetailState';

export type IState = {
  projectOverview: IProjectOverviewState;
  lookup: ILookupState;
  project: IProjectDetailState;
};

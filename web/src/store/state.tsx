import { IProjectOverviewState } from './ProjectOverviewForm/Types/IProjectOverviewState';
import { ILookupState } from './Lookups/Types/ILookupState';

export type IState = {
  projectOverview: IProjectOverviewState;
  lookup: ILookupState;
};

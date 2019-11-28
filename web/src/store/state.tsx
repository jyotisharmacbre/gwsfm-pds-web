import { IProjectOverviewState } from './ProjectOverviewForm/Types/IProjectOverviewState';
import { ILookupState } from './Lookups/Types/ILookupState';
import { IProjectDetailState } from './CustomerEnquiryForm/Types/IProjectDetailState';
import { ILocaleState } from '../session/state';
import { IActiveDirectoryState } from './ActiveDirectory/Types/IActiveDirectoryState';
import { IDynamicDataState } from './DynamicsData/Types/IDynamicDataState';

export type IState = {
  form: any;
  projectOverview: IProjectOverviewState;
  lookup: ILookupState;
  project: IProjectDetailState;
  locale: ILocaleState;
  activeDirectory: IActiveDirectoryState;
  dynamicData: IDynamicDataState;
  adData: IActiveDirectoryState;
};

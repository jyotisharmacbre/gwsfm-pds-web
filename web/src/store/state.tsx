import { IProjectOverviewState } from './ProjectOverviewForm/Types/IProjectOverviewState';
import { ILookupState } from './Lookups/Types/ILookupState';
import { IProjectDetailState } from './CustomerEnquiryForm/Types/IProjectDetailState';
import { ILocaleState } from '../session/state';
import { ISubContractorState } from './SubContractor/Types/ISubContractorState';

export type IState = {
  form: any;
  projectOverview: IProjectOverviewState;
  lookup: ILookupState;
  project: IProjectDetailState;
  locale: ILocaleState;
  subContractor: ISubContractorState;
};

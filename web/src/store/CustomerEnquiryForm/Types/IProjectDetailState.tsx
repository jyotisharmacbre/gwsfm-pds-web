import { IProjectDetail } from './IProjectDetail';
import { IProject } from './IProject';
import { Notify } from '../../../helpers/constants';

export interface IProjectDetailState {
  form: IProjectDetail;
  enquiryOverview: IProject;
  error: string | null;
  loading: boolean;
  notify: Notify;
  enquiryOverviewError: string | null;
}

import { IProjectDetail } from './IProjectDetail';
import { IProject } from './IProject';
import { Notify } from '../../../helpers/constants';
import EventType from '../../../enums/EventType';

export interface IProjectDetailState {
  form: IProjectDetail;
  enquiryOverview: IProject;
  error: string | null;
  loading: boolean;
  notify: Notify;
  event: EventType;
  enquiryOverviewError: string | null;
}

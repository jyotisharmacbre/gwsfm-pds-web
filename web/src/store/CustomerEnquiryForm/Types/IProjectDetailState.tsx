import { IProjectDetail } from './IProjectDetail';
import { IProject } from './IProject';
import EventType from '../../../enums/EventType';
import Notify from '../../../enums/Notify';

export interface IProjectDetailState {
  form: IProjectDetail;
  enquiryOverview: IProject;
  error: string | null;
  loading: boolean;
  notify: Notify;
  event: EventType;
  enquiryOverviewError: string | null;
}

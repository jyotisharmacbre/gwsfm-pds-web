import { IProjectAdditionalDetail } from './IProjectAdditionalDetail';
import Notify from '../../../enums/Notify';
import EventType from '../../../enums/EventType';
import { IProjectOverviewDetails } from './IProjectOverviewDetails';

export interface IProjectOverviewState {
  form: IProjectOverviewDetails;
  error: string | null;
  loading: boolean;
  notify: Notify;
  event: EventType;
}

import { IProjectAdditionalDetail } from './IProjectAdditionalDetail';
import Notify from '../../../enums/Notify';
import EventType from '../../../enums/EventType';

export interface IProjectOverviewState {
  form: IProjectAdditionalDetail;
  error: string | null;
  loading: boolean;
  notify: Notify;
  event: EventType;
}

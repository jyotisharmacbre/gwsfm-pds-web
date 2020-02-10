import { IDiscountActivity } from './IDiscountActivity';
import EventType from '../../../enums/EventType';
import Notify from '../../../enums/Notify';

export interface IDiscountState {
  form: IDiscountActivity;
  error: string | null;
  loading: boolean;
  notify: Notify;
  event: EventType;
}

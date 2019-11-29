import { ISubContractor } from './ISubContractor';
import Notify from '../../../enums/Notify';
import EventType from '../../../enums/EventType';

export interface ISubContractorState {
  form: ISubContractor;
  error: string | null;
  loading: boolean;
  notify: Notify;
  event: EventType;
}

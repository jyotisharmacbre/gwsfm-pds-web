import { IUserPreferences } from './IUserPreferences';
import Notify from '../../../enums/Notify';
import EventType from '../../../enums/EventType';

export interface IUserPreferencesState {
  form: IUserPreferences;
  error: string | null;
  loading: boolean;
  notify: Notify;
  event: EventType;
}

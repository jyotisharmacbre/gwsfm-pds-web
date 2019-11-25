import { IProjectAdditionalDetail } from './IProjectAdditionalDetail';
import Notify from '../../../enums/Notify';

export interface IProjectOverviewState {
  form: IProjectAdditionalDetail;
  error: string | null;
  loading: boolean;
  notify: Notify;
}

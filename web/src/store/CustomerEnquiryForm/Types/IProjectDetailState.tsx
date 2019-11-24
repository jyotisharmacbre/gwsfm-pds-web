import { IProjectDetail } from './IProjectDetail';
import { Notify } from '../../../helpers/constants';

export interface IProjectDetailState {
  form: IProjectDetail;
  projectId:string;
  error: string | null;
  loading: boolean;
  notify: Notify;
}

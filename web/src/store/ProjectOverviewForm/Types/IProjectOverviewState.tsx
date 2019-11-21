import { IProjectAdditionalDetail } from './IProjectAdditionalDetail';

export interface IProjectOverviewState {
  form: IProjectAdditionalDetail;
  error: string | null;
  loading: boolean;
}

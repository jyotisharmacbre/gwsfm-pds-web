import { IProjectAdditionalDetail } from './IProjectAdditionalDetail';
import Notify from '../../../enums/Notify';
import EventType from '../../../enums/EventType';
import { IProjectOverviewDetails } from './IProjectOverviewDetails';
import {IProjectApprovalActivitiy} from './IProjectApprovalActivitiy';

export interface IProjectOverviewState {
  form: IProjectOverviewDetails;
  error: string | null;
  loading: boolean;
  notify: Notify;
  event: EventType;
  initialStateSetForProjectApprovals: boolean;
  projectActivities:{
        error:string|null;
        loading:boolean;
        notify: Notify;
        data:Array<IProjectApprovalActivitiy>;
    }
}

import { IPreliminariesComponentDetails } from './IPreliminariesComponentDetails';
import Notify from '../../../enums/Notify';
import EventType from '../../../enums/EventType';
export interface IPreliminaryForm {
  preliminaryDetails: Array<IPreliminariesComponentDetails>;
}

export interface IPreliminaryState {
  preliminaryDetails:Array<IPreliminariesComponentDetails>;
  notify: Notify;
  event:EventType.none;
  loading: boolean;

}

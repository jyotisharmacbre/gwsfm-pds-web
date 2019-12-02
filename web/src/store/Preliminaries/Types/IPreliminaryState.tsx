import { IPreliminariesComponentDetails } from './IPreliminariesComponentDetails';
import Notify from '../../../enums/Notify';



export interface IPreliminaryState {
  preliminaryDetails:Array<IPreliminariesComponentDetails>;
  projectId: string;
  isVisible: boolean;
  notify: Notify;
 
}

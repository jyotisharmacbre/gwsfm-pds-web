import { IPreliminariesComponentDetails } from './IPreliminariesComponentDetails';
import Notify from '../../../enums/Notify';

export interface IPreliminaryForm {
  preliminaryDetails: Array<IPreliminariesComponentDetails>;
 
}

export interface IPreliminaryState {
  projectId: string;
  preliminaryDetails:Array<IPreliminariesComponentDetails>;
}

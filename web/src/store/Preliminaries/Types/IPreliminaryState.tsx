import { IPreliminariesComponentDetails } from './IPreliminariesComponentDetails';
import Notify from '../../../enums/Notify';
import { ILookup } from '../../Lookups/Types/ILookup';

export interface IPreliminaryForm {
  preliminaryDetails: Array<IPreliminariesComponentDetails>;
 
}

export interface IPreliminaryState {
  lookupData:Array<ILookup>;
  preliminaryDetails:Array<IPreliminariesComponentDetails>;
}

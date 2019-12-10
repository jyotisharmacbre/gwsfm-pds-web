import Notify from '../../enums/Notify';
import { IPreliminaryState } from './Types/IPreliminaryState';
import EventType from '../../enums/EventType';
export const initialState: IPreliminaryState = {
    preliminaryDetails: [],
    notify: Notify.none,
    event: EventType.none
  };
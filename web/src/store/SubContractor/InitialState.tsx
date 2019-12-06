import Notify from '../../enums/Notify';
import EventType from '../../enums/EventType';
import {ISubContractorActivity} from './Types/ISubContractorActivity';
import { ISubContractorState } from './Types/ISubContractorState';
import {IQuote} from './Types/IQuote';

export const newQuote : IQuote = {
     activityQuoteId: '',
        subContrActivityId: '',
        supplierName: '',
        quoteValue: 0
};

export const newActivity : ISubContractorActivity ={
    subContrActivityId: '',
    projectId: '',
    activityName: '', 
    isExistingSubcontractor: null,
    subcontractorId: '',
    isPreferredSupplier: null,
    totalCost: 0,
    grossMargin: 0,
    totalSell: 0,
    comments: '',
    quotes:[
      {...newQuote},
      {...newQuote},
      {...newQuote}
      ]
};

export const initialState: ISubContractorState = {
  form: {
    activities: [{...newActivity}]
  },
  error: null,
  loading: false,
  notify: Notify.none,
  event: EventType.none
};
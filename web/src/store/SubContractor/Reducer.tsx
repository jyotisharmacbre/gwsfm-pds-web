import { ActionType } from './Types/ActionType';
import { updateObject } from '../../helpers/utility-helper';
import {ISubContractorActivity} from './Types/ISubContractorActivity';
import { ISubContractorState } from './Types/ISubContractorState';
import {IQuote} from './Types/IQuote';
import Notify from '../../enums/Notify';
import EventType from '../../enums/EventType';

const newQuote : IQuote = {
     activityQuoteId: '',
        subContrActivityId: '',
        supplierName: '',
        quoteValue: 0
}

const newActivity : ISubContractorActivity ={
    subContrActivityId: '',
    projectId: '',
    activityName: '',
    isExistingSubcontractor: true,
    subcontractorId: '',
    isPreferredSupplier: true,
    totalCost: 0,
    grossMargin: 0,
    totalSell: 0,
    comments: '',
    quotes:[
      {...newQuote},
      {...newQuote},
      {...newQuote}
      ]
}
const initialState: ISubContractorState = {
  form: {
    activities: [{...newActivity}]
  },
  error: null,
  loading: false,
  notify: Notify.none,
  event: EventType.none
};

const addNewActivity = (oldState, action) => {
  return updateObject(oldState, {
    form:updateObject(oldState.form,{
      activities:oldState.form.activities.concat(newActivity)
    })
  });
};

const deleteActivity = (oldState, action) => {
  return updateObject(oldState, {
    form:updateObject(oldState.form,{
      activities:
      [
  ...oldState.form.activities.slice(0, action.payload),
  ...oldState.form.activities.slice(action.payload + 1)
]
    })
  });
};

const subContractorReducer = (oldState = initialState, action) => {
  switch (action.type) {
    case ActionType.SUB_CONTRACTOR_ADD_NEW_ACTIVITY:
      return addNewActivity(oldState, action);
    case ActionType.SUB_CONTRACTOR_DELETE_ACTIVITY:
      return deleteActivity(oldState, action);  
    default:
      return oldState;
  }
};

export default subContractorReducer;

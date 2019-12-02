import { ActionType } from './Types/ActionType';
import { updateObject } from '../../helpers/utility-helper';
import {ISubContractorActivity} from './Types/ISubContractorActivity';
import { ISubContractorState } from './Types/ISubContractorState';
import {IQuote} from './Types/IQuote';
import Notify from '../../enums/Notify';
import EventType from '../../enums/EventType';

const newQuote : IQuote = {
    supplierName: '',
    quoteValue: null
}

const newActivity : ISubContractorActivity ={
        activityName: '',
        existingSubcontractor: null,
        subcontractor: '',
        preferredSupplier: null,
        totalCost: null,
        grossMargin: null,
        totalSell: null,
        comments: '',
        quote1: {...newQuote},
        quote2: {...newQuote},
        quote3: {...newQuote}
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

import { ActionType } from './Types/ActionType';
import { updateObject } from '../../helpers/utility-helper';
import { IPreliminaryState } from './Types/IPreliminaryState';
import Notify from '../../enums/Notify';

const initialState: IPreliminaryState = {
    preliminaryDetails: [
      {
        componentId: '1',
        componentName: 'H & S File Production',
        items: [
          {
            itemId: '1',
            itemName: 'Sub-Contractor',
              nameOfSupplier: 'Rishav',
              noOfHours: 1,
              hourRate: 1,
              totalCost: 1,
              grossMargin: 1,
              comments: 'string'
            
          },
          {
            itemId: '2',
            itemName: 'Lump Sum Allowance',
              nameOfSupplier: 'Rishav2',
              noOfHours: 1,
              hourRate: 1,
              totalCost: 1,
              grossMargin: 1,
              comments: 'string'
          },
          {
            itemId: '3',
            itemName: 'CBRE Labour',
              nameOfSupplier: 'Rishav3',
              noOfHours: 1,
              hourRate: 1,
              totalCost: 1,
              grossMargin: 1,
              comments: 'string'
          },
          {
            itemId: '4',
            itemName: 'Agency Labour',
              nameOfSupplier: 'Rishav4',
              noOfHours: 1,
              hourRate: 1,
              totalCost: 1,
              grossMargin: 1,
              comments: 'string'
          }
        ]
      },
      {
        componentId: '2',
        componentName: 'Site Setup',
        items: [
          {
            itemId: '1',
            itemName: 'Sub-Contractor',
              nameOfSupplier: 'Rishav',
              noOfHours: 1,
              hourRate: 1,
              totalCost: 1,
              grossMargin: 1,
              comments: 'string'
          },
          {
            itemId: '2',
            itemName: 'Lump Sum Allowance',
              nameOfSupplier: 'Rishav2',
              noOfHours: 1,
              hourRate: 1,
              totalCost: 1,
              grossMargin: 1,
              comments: 'string'
          },
          {
            itemId: '3',
            itemName: 'CBRE Labour',
              nameOfSupplier: 'Rishav3',
              noOfHours: 1,
              hourRate: 1,
              totalCost: 1,
              grossMargin: 1,
              comments: 'string'
          },
          {
            itemId: '4',
            itemName: 'Agency Labour',
              nameOfSupplier: 'Rishav4',
              noOfHours: 1,
              hourRate: 1,
              totalCost: 1,
              grossMargin: 1,
              comments: 'string'
          }
        ]
      }
    ],
  projectId: '',
  isVisible: false,
  notify: Notify.none
};
const preliminaryAddSuccess = (oldState, action) => {
  return updateObject(oldState, {
    isVisible: false,
    notify: Notify.success
  });
};
const preliminaryAddError = (oldState, action) => {
  return updateObject(oldState, {
    isVisible: false,
    notify: Notify.error
  });
};
const preliminaryEditSuccess = (oldState, action) => {
  return updateObject(oldState, {
    isVisible: false,
    notify: Notify.success
  });
};
const preliminaryEditError = (oldState, action) => {
  return updateObject(oldState, {
    isVisible: false,
    notify: Notify.error
  });
};
const preliminaryGetSuccess = (oldState, action) => {
  return updateObject(oldState, {
    preliminaryDetails: updateObject(
      oldState.preliminaryDetails,
      action.payload
    ),
    isVisible: false
  });
};
const preliminaryGetError = (oldState, action) => {
  return updateObject(oldState, {
    isVisible: false,
    notify: Notify.error
  });
};
const preliminaryReducer = (oldState = initialState, action) => {
  switch (action.type) {
    case ActionType.PRELIMINARY_ADD_SUCCESS:
      return preliminaryAddSuccess(oldState, action);
    case ActionType.PRELIMINARY_ADD_ERROR:
      return preliminaryAddError(oldState, action);
    case ActionType.PRELIMINARY_EDIT_SUCCESS:
      return preliminaryEditSuccess(oldState, action);
    case ActionType.PRELIMINARY_EDIT_SUCCESS:
      return preliminaryEditError(oldState, action);
    case ActionType.GET_PRELIMINARY_SUCCESS:
      return preliminaryGetSuccess(oldState, action);
    case ActionType.GET_PRELIMINARY_ERROR:
      return preliminaryGetError(oldState, action);
    default:
      return oldState;
  }
};
export default preliminaryReducer;
